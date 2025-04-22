/*"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, Bell, Download, Trash2, CheckCircle, Search, AlertTriangle, Pill, UserCheck, Heart } from "lucide-react"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"
import { getAlertas, getContadorAlertas, atualizarStatusAlerta, limparTodosAlertas, criarAlerta } from "@/lib/data"
import type { Alerta } from "@/types/alerta"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function AlertasPage() {
  const [alertas, setAlertas] = useState<Alerta[]>([])
  const [contadorAlertas, setContadorAlertas] = useState({
    emergencia: 0,
    medicamento: 0,
    resolvidos: 0,
    total: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    carregarAlertas()
  }, [])

  const carregarAlertas = async () => {
    setIsLoading(true)
    try {
      const alertasData = await getAlertas()
      setAlertas(alertasData)

      const contador = await getContadorAlertas()
      setContadorAlertas(contador)
    } catch (error) {
      console.error("Erro ao carregar alertas:", error)
      toast({
        title: "Erro ao carregar alertas",
        description: "Não foi possível carregar os alertas",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleMarcarResolvido = async (alerta: Alerta) => {
    try {
      // Atualizar o status do alerta para "resolvido"
      await atualizarStatusAlerta(alerta.id, "resolvido")

      // Criar um novo alerta para o idoso informando que o alerta foi resolvido
      await criarAlerta(
        alerta.idosoId,
        "notificacao",
        `Seu alerta "${alerta.mensagem}" foi resolvido pela central`,
        "resolvido",
      )

      toast({
        title: "Alerta resolvido",
        description: "O alerta foi marcado como resolvido com sucesso",
      })

      // Recarregar os alertas
      carregarAlertas()
    } catch (error) {
      console.error("Erro ao marcar alerta como resolvido:", error)
      toast({
        title: "Erro ao resolver alerta",
        description: "Não foi possível marcar o alerta como resolvido",
        variant: "destructive",
      })
    }
  }

  const handleLimparAlertas = async () => {
    try {
      await limparTodosAlertas()
      setAlertas([])
      setContadorAlertas({
        emergencia: 0,
        medicamento: 0,
        resolvidos: 0,
        total: 0,
      })
      toast({
        title: "Alertas limpos",
        description: "Todos os alertas foram removidos com sucesso",
      })
    } catch (error) {
      console.error("Erro ao limpar alertas:", error)
      toast({
        title: "Erro ao limpar alertas",
        description: "Não foi possível limpar os alertas",
        variant: "destructive",
      })
    }
  }

  const handleBaixarHistorico = () => {
    if (alertas.length === 0) {
      toast({
        title: "Sem alertas",
        description: "Não há alertas para baixar",
        variant: "destructive",
      })
      return
    }

    // Formatar os alertas para o arquivo de texto
    const conteudo = alertas
      .map((alerta) => {
        const data = new Date(alerta.data).toLocaleString()
        const statusFormatado =
          alerta.status === "resolvido"
            ? "Resolvido"
            : alerta.status === "em_andamento"
              ? "Em andamento"
              : "Não resolvido"

        return `[${data}] ${alerta.idosoNome} - ${alerta.tipo.toUpperCase()}: ${alerta.mensagem} (Status: ${statusFormatado})`
      })
      .join("\n")

    // Criar e baixar o arquivo
    const blob = new Blob([conteudo], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `historico-alertas-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Histórico baixado",
      description: "O histórico de alertas foi baixado com sucesso",
    })
  }

  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(data)
  }

  const getBadgeVariant = (tipo: string) => {
    switch (tipo) {
      case "emergencia":
        return "destructive"
      case "medicamento":
        return "warning"
      case "check-in":
        return "success"
      case "verificacao":
        return "purple"
      case "notificacao":
        return "info"
      default:
        return "default"
    }
  }

  const getIconByTipo = (tipo: string) => {
    switch (tipo) {
      case "emergencia":
        return <AlertTriangle className="h-4 w-4" />
      case "medicamento":
        return <Pill className="h-4 w-4" />
      case "check-in":
        return <UserCheck className="h-4 w-4" />
      case "verificacao":
        return <Heart className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getBadgeStatusVariant = (status: string) => {
    switch (status) {
      case "nao_resolvido":
        return "destructive"
      case "em_andamento":
        return "warning"
      case "resolvido":
        return "success"
      default:
        return "default"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "nao_resolvido":
        return "Não resolvido"
      case "em_andamento":
        return "Em andamento"
      case "resolvido":
        return "Resolvido"
      default:
        return status
    }
  }

  // Filtrar alertas com base no termo de pesquisa
  const alertasFiltrados = alertas.filter(
    (alerta) =>
      alerta.idosoNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alerta.mensagem.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Painel de Alertas</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2" onClick={handleBaixarHistorico}>
            <Download className="h-4 w-4" /> Baixar Histórico
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" /> Limpar Todos
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Limpar todos os alertas?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. Todos os alertas serão removidos permanentemente.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleLimparAlertas}>Confirmar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Alertas de Emergência</CardTitle>
            <CardDescription>Total nas últimas 24h</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-destructive" />
              <span className="text-2xl font-bold">{contadorAlertas.emergencia}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Alertas de Medicamentos</CardTitle>
            <CardDescription>Total nas últimas 24h</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-warning" />
              <span className="text-2xl font-bold">{contadorAlertas.medicamento}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Alertas Resolvidos</CardTitle>
            <CardDescription>Total nas últimas 24h</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-success" />
              <span className="text-2xl font-bold">{contadorAlertas.resolvidos}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alertas Recentes</CardTitle>
          <CardDescription>
            Monitore e gerencie alertas relacionados aos idosos cadastrados no sistema Sentinela Vida
          </CardDescription>
          <div className="mt-2 relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Pesquisar por nome ou mensagem..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : alertasFiltrados.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
              <p className="text-muted-foreground">Nenhum alerta registrado ainda.</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Idoso</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Mensagem</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alertasFiltrados.map((alerta) => (
                    <TableRow key={alerta.id}>
                      <TableCell className="font-medium">{alerta.idosoNome}</TableCell>
                      <TableCell>
                        <Badge variant={getBadgeVariant(alerta.tipo) as any} className="flex items-center gap-1 w-fit">
                          {getIconByTipo(alerta.tipo)}
                          <span className="capitalize">{alerta.tipo}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>{alerta.mensagem}</TableCell>
                      <TableCell>{formatarData(alerta.data)}</TableCell>
                      <TableCell>
                        <Badge variant={getBadgeStatusVariant(alerta.status) as any}>
                          {getStatusText(alerta.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/aplicativo/${alerta.idosoId}`} passHref>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Ver idoso</span>
                            </Button>
                          </Link>

                          {alerta.status !== "resolvido" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 text-green-500 hover:bg-green-50 hover:text-green-600"
                              onClick={() => handleMarcarResolvido(alerta)}
                            >
                              <CheckCircle className="h-4 w-4" />
                              <span className="sr-only">Marcar como resolvido</span>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
*/
