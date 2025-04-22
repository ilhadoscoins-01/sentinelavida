"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import { Card } from "@/components/ui/card"
import { Heart, MessageSquare, Phone, Pill, AlertTriangle, UserCheck, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import type { Idoso } from "@/types/idoso"
import { toast } from "@/components/ui/use-toast"
import { registrarAtividade, criarAlerta } from "@/lib/data"

interface AcoesRapidasProps {
  isIdoso: boolean
  idoso?: Idoso
  userId: string
  activeTab?: string
  setActiveTab?: (tab: string) => void
  audioRef?: React.RefObject<HTMLAudioElement | null>
}

export function AcoesRapidas({ isIdoso, idoso, userId, activeTab, setActiveTab, audioRef }: AcoesRapidasProps) {
  const [dialogAberto, setDialogAberto] = useState<string | null>(null)
  const [progresso, setProgresso] = useState(100)
  const [tempoRestante, setTempoRestante] = useState(30)
  const [isMobile, setIsMobile] = useState(false)
  const [isVideoCallActive, setIsVideoCallActive] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  // Verificar se é dispositivo móvel
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Função para tocar sons
  const playSound = (soundType: string) => {
    if (!audioRef?.current) return

    let soundUrl = ""

    switch (soundType) {
      case "check-in":
        soundUrl = "/sounds/check-in.mp3"
        break
      case "remedio":
        soundUrl = "/sounds/remedio.mp3"
        break
      case "emergencia":
        soundUrl = "/sounds/emergencia.mp3"
        break
      case "verificacao":
        soundUrl = "/sounds/verificacao.mp3"
        break
      case "mensagem":
        soundUrl = "/sounds/mensagem.mp3"
        break
      case "chamada":
        soundUrl = "/sounds/chamada.mp3"
        break
      default:
        return
    }

    audioRef.current.src = soundUrl
    audioRef.current.play().catch((e) => console.error("Erro ao tocar som:", e))
  }

  // Função para solicitar permissões de mídia
  const requestMediaPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream
      }
      return stream
    } catch (error) {
      console.error("Erro ao acessar câmera e microfone:", error)
      toast({
        title: "Erro na chamada de vídeo",
        description: "Não foi possível acessar sua câmera e microfone. Verifique as permissões.",
        variant: "destructive",
      })
      return null
    }
  }

  // Iniciar chamada de vídeo
  const startVideoCall = async () => {
    // Simular uma chamada de vídeo (em um sistema real, usaríamos WebRTC)
    const stream = await requestMediaPermissions()
    if (!stream) return

    setIsVideoCallActive(true)
    playSound("chamada")

    // Simular o acompanhante atendendo após 5 segundos
    setTimeout(() => {
      toast({
        title: "Chamada conectada",
        description: "O acompanhante atendeu sua chamada.",
      })

      // Em um sistema real, aqui receberíamos o stream remoto
      if (remoteVideoRef.current) {
        // Simulação: usar o mesmo stream local como remoto para demonstração
        remoteVideoRef.current.srcObject = stream
      }
    }, 5000)

    // Registrar atividade
    await registrarAtividade(userId, "chamada", "Iniciou uma chamada de vídeo")
  }

  // Encerrar chamada de vídeo
  const endVideoCall = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const tracks = (localVideoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
    }
    setIsVideoCallActive(false)
    toast({
      title: "Chamada encerrada",
      description: "A chamada de vídeo foi encerrada.",
    })
  }

  // Limpar timer quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      // Garantir que todas as streams de mídia sejam encerradas
      if (isVideoCallActive) {
        endVideoCall()
      }
    }
  }, [isVideoCallActive])

  // Iniciar timer quando diálogo de emergência ou verificação de saúde for aberto
  useEffect(() => {
    if ((dialogAberto === "emergencia" || dialogAberto === "verificacao") && !timerRef.current) {
      let segundosRestantes = 30
      setTempoRestante(segundosRestantes)
      setProgresso(100)

      timerRef.current = setInterval(() => {
        segundosRestantes -= 1
        setTempoRestante(segundosRestantes)
        setProgresso((segundosRestantes / 30) * 100)

        if (segundosRestantes <= 0) {
          if (timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
          }

          // Selecionar automaticamente a opção "Sim"
          if (dialogAberto === "emergencia") {
            confirmarEmergencia()
          } else if (dialogAberto === "verificacao") {
            confirmarVerificacao()
          }
        }
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [dialogAberto])

  const handleAcaoRapida = (acao: string) => {
    switch (acao) {
      case "check-in":
        setDialogAberto("check-in")
        break
      case "remedio":
        setDialogAberto("remedio")
        break
      case "emergencia":
        setDialogAberto("emergencia")
        break
      case "verificacao":
        setDialogAberto("verificacao")
        break
      case "mensagens":
        // Redirecionar para a aba de mensagens
        if (setActiveTab) {
          setActiveTab("mensagens")

          // Notificar o usuário
          toast({
            title: "Mensagens",
            description: "Redirecionado para a aba de mensagens.",
          })
        } else {
          toast({
            title: "Mensagens",
            description: "Acesse a aba de mensagens para conversar.",
          })
        }
        break
      case "chamada":
        if (isMobile) {
          // Iniciar chamada de vídeo em dispositivos móveis
          startVideoCall()
        } else {
          toast({
            title: "Chamada de vídeo",
            description: "Chamadas de vídeo estão disponíveis apenas em dispositivos móveis.",
          })
        }
        break
    }
  }

  const fecharDialog = () => {
    setDialogAberto(null)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const confirmarCheckIn = async () => {
    const mensagem = "Check-in de bem-estar realizado"

    // Tocar som
    playSound("check-in")

    // Registrar atividade
    await registrarAtividade(userId, "check-in", mensagem)

    // Criar alerta
    if (idoso) {
      await criarAlerta(idoso.id, "check-in", mensagem)
    }

    toast({
      title: "Check-in realizado",
      description:
        "Você acabou de realizar o seu check-in nos confirmando que está tudo bem, recomendamos que faça isso de manhã/tarde/noite para que nossa central e seus acompanhantes se mantenham informados.",
    })
    fecharDialog()
  }

  const confirmarRemedio = async () => {
    const mensagem = "Solicitação de remédio realizada"

    // Tocar som
    playSound("remedio")

    // Registrar atividade
    await registrarAtividade(userId, "remedio", mensagem)

    // Criar alerta
    if (idoso) {
      await criarAlerta(idoso.id, "medicamento", mensagem)
    }

    toast({
      title: "Solicitação de remédio",
      description:
        "Obrigado por nos avisar que está precisando de remédios! A nossa equipe entrará em contato através do telefone cadastrado, fique atento ok?",
    })
    fecharDialog()
  }

  const confirmarEmergencia = async () => {
    const mensagem = "Solicitação de emergência realizada"

    // Tocar som
    playSound("emergencia")

    // Registrar atividade
    await registrarAtividade(userId, "emergencia", mensagem)

    // Criar alerta
    if (idoso) {
      await criarAlerta(idoso.id, "emergencia", mensagem)
    }

    toast({
      title: "Emergência registrada",
      description:
        "Tente ficar o mais tranquilo(a) possível, está bem? Nossa equipe já foi alertada e tentará contato, caso não consiga, estará indo até a sua residência para te auxiliar, tente permanecer no local onde está para não gerar mais complicações à sua saúde.",
      variant: "destructive",
    })
    fecharDialog()
  }

  const confirmarVerificacao = async () => {
    const mensagem = "Solicitação de verificação de saúde realizada"

    // Tocar som
    playSound("verificacao")

    // Registrar atividade
    await registrarAtividade(userId, "verificacao", mensagem)

    // Criar alerta
    if (idoso) {
      await criarAlerta(idoso.id, "verificacao", mensagem)
    }

    toast({
      title: "Verificação de saúde solicitada",
      description:
        "Tente se sentar em um lugar seguro e confortável, está bem? Nossa equipe já foi alertada e tentará contato, caso não consiga, estará indo até a sua residência para te auxiliar. Por favor, não caminhe para evitar quedas ou desmaios até que sua saúde seja restabelecida.",
    })
    fecharDialog()
  }

  return (
    <>
      {/* Destacar os botões de Check-in e Emergência */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card
          className="flex cursor-pointer flex-col items-center justify-center gap-2 p-6 transition-colors hover:bg-green-50 border-green-200"
          onClick={() => handleAcaoRapida("check-in")}
          style={{ backgroundColor: "#E8F5E9", borderColor: "#81C784" }}
        >
          <div className="rounded-full bg-green-100 p-3">
            <UserCheck className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-center font-medium text-lg">Check-in de bem-estar</h3>
          <p className="text-center text-sm text-muted-foreground">Confirmar que está tudo bem</p>
        </Card>

        <Card
          className="flex cursor-pointer flex-col items-center justify-center gap-2 p-6 transition-colors hover:bg-red-50 border-red-200"
          onClick={() => handleAcaoRapida("emergencia")}
          style={{ backgroundColor: "#FFEBEE", borderColor: "#E57373" }}
        >
          <div className="rounded-full bg-red-100 p-3">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-center font-medium text-lg">Emergência</h3>
          <p className="text-center text-sm text-muted-foreground">Solicitar ajuda imediatamente</p>
        </Card>
      </div>

      {/* Outros botões */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <Card
          className="flex cursor-pointer flex-col items-center justify-center gap-2 p-6 transition-colors hover:bg-secondary"
          onClick={() => handleAcaoRapida("remedio")}
        >
          <div className="rounded-full bg-blue-100 p-3">
            <Pill className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-center font-medium">Solicitar Remédio</h3>
          <p className="text-center text-sm text-muted-foreground">Pedir assistência com medicamentos</p>
        </Card>

        <Card
          className="flex cursor-pointer flex-col items-center justify-center gap-2 p-6 transition-colors hover:bg-secondary"
          onClick={() => handleAcaoRapida("verificacao")}
        >
          <div className="rounded-full bg-purple-100 p-3">
            <Heart className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-center font-medium">Verificação de Saúde</h3>
          <p className="text-center text-sm text-muted-foreground">Solicitar verificação de saúde</p>
        </Card>

        <Card
          className="flex cursor-pointer flex-col items-center justify-center gap-2 p-6 transition-colors hover:bg-secondary"
          onClick={() => handleAcaoRapida("mensagens")}
        >
          <div className="rounded-full bg-orange-100 p-3">
            <MessageSquare className="h-6 w-6 text-orange-600" />
          </div>
          <h3 className="text-center font-medium">Mensagens</h3>
          <p className="text-center text-sm text-muted-foreground">Enviar ou verificar mensagens</p>
        </Card>

        <Card
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 p-6 transition-colors ${
            isMobile ? "hover:bg-indigo-50" : "hover:bg-secondary opacity-75"
          }`}
          onClick={() => handleAcaoRapida("chamada")}
          style={isMobile ? { borderColor: "#7986CB" } : {}}
        >
          <div className="rounded-full bg-indigo-100 p-3">
            <Video className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="text-center font-medium">Falar com {isIdoso ? "Acompanhante" : "Idoso"}</h3>
          <p className="text-center text-sm text-muted-foreground">
            {isMobile ? "Iniciar chamada de vídeo" : "Disponível apenas em dispositivos móveis"}
          </p>
        </Card>
      </div>

      {/* Diálogo de Check-in */}
      <Dialog open={dialogAberto === "check-in"} onOpenChange={() => fecharDialog()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Check-in de Bem-estar</DialogTitle>
            <DialogDescription>
              Confirme que você está bem e que não precisa de assistência no momento.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>Ao confirmar, você está informando que está tudo bem com você neste momento.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={fecharDialog}>
              Cancelar
            </Button>
            <Button
              onClick={confirmarCheckIn}
              style={{ backgroundColor: "#E50914", color: "#FAFAFA" }}
              className="hover:bg-[#B2060F]"
            >
              Confirmar Check-in
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Remédio */}
      <Dialog open={dialogAberto === "remedio"} onOpenChange={() => fecharDialog()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Solicitar Remédio</DialogTitle>
            <DialogDescription>Você tem certeza que deseja solicitar remédios?</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>
              Se você marcar que sim, nossa central vai ser notificada e entrará em contato para pedir mais informações
              sobre quais remédios você precisa.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={fecharDialog}>
              Não, apertei errado
            </Button>
            <Button
              onClick={confirmarRemedio}
              style={{ backgroundColor: "#E50914", color: "#FAFAFA" }}
              className="hover:bg-[#B2060F]"
            >
              Sim, eu quero
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Emergência */}
      <Dialog open={dialogAberto === "emergencia"} onOpenChange={() => fecharDialog()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-destructive">Emergência</DialogTitle>
            <DialogDescription>Você está em uma situação de perigo?</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>Por exemplo: não está se sentindo bem, se acidentou, ou caiu e não consegue se levantar.</p>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Resposta automática em {tempoRestante} segundos</p>
              <Progress value={progresso} className="h-2" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={fecharDialog}>
              Não, apertei errado
            </Button>
            <Button
              variant="destructive"
              onClick={confirmarEmergencia}
              style={{ backgroundColor: "#E50914" }}
              className="hover:bg-[#B2060F]"
            >
              Sim, eu estou
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Verificação de Saúde */}
      <Dialog open={dialogAberto === "verificacao"} onOpenChange={() => fecharDialog()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Verificação de Saúde</DialogTitle>
            <DialogDescription>
              Você não está se sentindo bem e precisa de uma aferição de pressão ou glicemia?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>Nossa equipe será notificada e entrará em contato para verificar sua saúde.</p>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Resposta automática em {tempoRestante} segundos</p>
              <Progress value={progresso} className="h-2" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={fecharDialog}>
              Não, apertei errado
            </Button>
            <Button
              onClick={confirmarVerificacao}
              style={{ backgroundColor: "#E50914", color: "#FAFAFA" }}
              className="hover:bg-[#B2060F]"
            >
              Sim, eu preciso
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Interface de chamada de vídeo */}
      {isVideoCallActive && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-black rounded-lg overflow-hidden">
            {/* Vídeo remoto (acompanhante) */}
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-auto aspect-video object-cover"
            ></video>

            {/* Vídeo local (idoso) */}
            <div className="absolute bottom-4 right-4 w-1/4 border-2 border-white rounded-lg overflow-hidden">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-auto aspect-video object-cover"
              ></video>
            </div>

            {/* Controles */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
              <Button
                variant="destructive"
                size="lg"
                className="rounded-full h-12 w-12 p-0"
                onClick={endVideoCall}
                style={{ backgroundColor: "#E50914" }}
              >
                <Phone className="h-6 w-6 transform rotate-135" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
