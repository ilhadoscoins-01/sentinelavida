"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Download, AlertCircle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getUsuarioPorId } from "@/lib/data"
import { toast } from "@/components/ui/use-toast"
import type { Idoso } from "@/types/idoso"
import type { Acompanhante } from "@/types/acompanhante"

interface MensagensIdosoProps {
  idosoId: string
  acompanhanteId?: string
  isIdoso?: boolean
  audioRef?: React.RefObject<HTMLAudioElement | null>
}

type Mensagem = {
  id: string
  texto: string
  enviado: boolean
  data: Date
  expiracaoTimestamp: number
}

export function MensagensIdoso({ idosoId, acompanhanteId, isIdoso = false, audioRef }: MensagensIdosoProps) {
  const [mensagens, setMensagens] = useState<Mensagem[]>([])
  const [novaMensagem, setNovaMensagem] = useState("")
  const [idoso, setIdoso] = useState<Idoso | null>(null)
  const [acompanhante, setAcompanhante] = useState<Acompanhante | null>(null)
  const [carregando, setCarregando] = useState(true)

  // Função para tocar som de mensagem
  const playMessageSound = () => {
    if (!audioRef?.current) return

    audioRef.current.src = "/sounds/message.mp3"
    audioRef.current.play().catch((e) => console.error("Erro ao tocar som:", e))
  }

  // Carregar dados do idoso e acompanhante
  useEffect(() => {
    const carregarDados = async () => {
      try {
        if (idosoId) {
          const idosoData = (await getUsuarioPorId(idosoId)) as Idoso
          if (idosoData && "rotinaMedicamentos" in idosoData) {
            setIdoso(idosoData)
          }
        }

        if (acompanhanteId) {
          const acompanhanteData = (await getUsuarioPorId(acompanhanteId)) as Acompanhante
          if (acompanhanteData && "grauParentesco" in acompanhanteData) {
            setAcompanhante(acompanhanteData)
          }
        } else if (idosoId) {
          // Se não temos um acompanhanteId específico, vamos buscar o primeiro acompanhante
          const idosos = JSON.parse(localStorage.getItem("sentinela_idosos") || "[]")
          const acompanhantes = JSON.parse(localStorage.getItem("sentinela_acompanhantes") || "[]")

          // Encontrar o primeiro acompanhante (para simplificar)
          if (acompanhantes.length > 0) {
            setAcompanhante(acompanhantes[0])
          }
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
      } finally {
        setCarregando(false)
      }
    }

    carregarDados()
  }, [idosoId, acompanhanteId])

  // Carregar mensagens do localStorage
  useEffect(() => {
    if (!idosoId) return

    const chave = `mensagens_${idosoId}`
    const mensagensArmazenadas = localStorage.getItem(chave)

    if (mensagensArmazenadas) {
      const mensagensParsed = JSON.parse(mensagensArmazenadas) as Mensagem[]

      // Filtrar mensagens expiradas (72 horas = 259200000 ms)
      const agora = Date.now()
      const mensagensValidas = mensagensParsed.filter((msg) => msg.expiracaoTimestamp > agora)

      // Atualizar localStorage se alguma mensagem foi removida
      if (mensagensValidas.length < mensagensParsed.length) {
        localStorage.setItem(chave, JSON.stringify(mensagensValidas))
      }

      setMensagens(mensagensValidas)
    }
  }, [idosoId])

  const enviarMensagem = () => {
    if (novaMensagem.trim() === "" || !idosoId) return

    const agora = new Date()
    const expiracaoTimestamp = agora.getTime() + 72 * 60 * 60 * 1000 // 72 horas em milissegundos

    const mensagem: Mensagem = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      texto: novaMensagem,
      enviado: true,
      data: agora,
      expiracaoTimestamp,
    }

    const novasMensagens = [...mensagens, mensagem]
    setMensagens(novasMensagens)
    setNovaMensagem("")

    // Tocar som de mensagem
    playMessageSound()

    // Salvar no localStorage
    const chave = `mensagens_${idosoId}`
    localStorage.setItem(chave, JSON.stringify(novasMensagens))

    toast({
      title: "Mensagem enviada",
      description: "Sua mensagem foi enviada com sucesso.",
    })
  }

  const formatarHorario = (data: Date) => {
    return new Date(data).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const baixarHistorico = () => {
    if (mensagens.length === 0) {
      toast({
        title: "Sem mensagens",
        description: "Não há mensagens para baixar.",
        variant: "destructive",
      })
      return
    }

    const conteudo = mensagens
      .map((msg) => {
        const dataFormatada = new Date(msg.data).toLocaleString()
        const remetente = msg.enviado
          ? isIdoso
            ? idoso?.nome
            : acompanhante?.nome
          : isIdoso
            ? acompanhante?.nome
            : idoso?.nome
        return `[${dataFormatada}] ${remetente}: ${msg.texto}`
      })
      .join("\n")

    const blob = new Blob([conteudo], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `historico-mensagens-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Histórico baixado",
      description: "O histórico de mensagens foi baixado com sucesso.",
    })
  }

  // Determinar a mensagem de placeholder baseada no tipo de usuário
  const getMensagemPlaceholder = () => {
    if (carregando) return "Carregando..."

    if (isIdoso) {
      return acompanhante
        ? `Envie uma mensagem para o acompanhante ${acompanhante.nome}.`
        : "Envie uma mensagem para seu acompanhante."
    } else {
      return idoso && acompanhante
        ? `Envie uma mensagem para o seu ${acompanhante.grauParentesco.toLowerCase()} ${idoso.nome}.`
        : "Envie uma mensagem."
    }
  }

  return (
    <Card className="border">
      <CardHeader>
        <CardTitle>Mensagens</CardTitle>
        <CardDescription>Converse em tempo real</CardDescription>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-2 gap-2">
          <Alert variant="warning" className="bg-amber-50 text-amber-800 border-amber-200 flex-1">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Atenção</AlertTitle>
            <AlertDescription>
              As mensagens expiram após 72 horas. Baixe o histórico para manter um registro.
            </AlertDescription>
          </Alert>
          <Button variant="outline" size="sm" onClick={baixarHistorico} className="whitespace-nowrap">
            <Download className="h-4 w-4 mr-2" /> Baixar Histórico
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80 pr-4">
          {mensagens.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground text-center">Nenhuma mensagem ainda. Comece uma conversa!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {mensagens.map((mensagem) => (
                <div key={mensagem.id} className={`flex ${mensagem.enviado ? "justify-end" : "justify-start"}`}>
                  <div className="flex items-end gap-2">
                    {!mensagem.enviado && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {isIdoso ? acompanhante?.nome?.charAt(0) || "A" : idoso?.nome?.charAt(0) || "I"}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className="flex flex-col gap-1">
                      <div
                        className={`rounded-lg px-3 py-2 max-w-[80%] ${
                          mensagem.enviado ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p>{mensagem.texto}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{formatarHorario(mensagem.data)}</span>
                    </div>
                    {mensagem.enviado && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-secondary text-secondary-foreground">
                          {isIdoso ? idoso?.nome?.charAt(0) || "I" : acompanhante?.nome?.charAt(0) || "A"}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center gap-2">
          <Input
            placeholder={getMensagemPlaceholder()}
            value={novaMensagem}
            onChange={(e) => setNovaMensagem(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
            className="flex-1"
          />
          <Button
            size="icon"
            onClick={enviarMensagem}
            style={{ backgroundColor: "#E50914", color: "#FAFAFA" }}
            className="hover:bg-[#B2060F]"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Enviar mensagem</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
