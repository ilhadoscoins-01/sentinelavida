"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Pill, UserCheck, Heart, Bell, Users } from "lucide-react"
import { getUsuarioPorId, getIdosos, getAcompanhantes, getAlertas } from "@/lib/data"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import type { Idoso } from "@/types/idoso"
import type { Acompanhante } from "@/types/acompanhante"
import type { Alerta } from "@/types/alerta"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MensagensIdoso } from "@/components/dashboard/mensagens"
import { AcoesRapidas } from "@/components/dashboard/acoes-rapidas"
import { HistoricoAtividades } from "@/components/dashboard/historico-atividades"
import { AgendaMedicamentos } from "@/components/dashboard/agenda-medicamentos"
import { useSearchParams } from "next/navigation"

export default function DashboardPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [usuario, setUsuario] = useState<Idoso | Acompanhante | null>(null)
  const [tipoUsuario, setTipoUsuario] = useState<"idoso" | "acompanhante" | null>(null)
  const [idosos, setIdosos] = useState<Idoso[]>([])
  const [acompanhantes, setAcompanhantes] = useState<Acompanhante[]>([])
  const [alertas, setAlertas] = useState<Alerta[]>([])
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null)
  const [activeTab, setActiveTab] = useState("atividades")
  const searchParams = useSearchParams()
  const tabFromUrl = searchParams.get("tab")
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Função para carregar alertas
  const carregarAlertas = async (idosoId?: string) => {
    try {
      const alertasData = await getAlertas(idosoId)
      setAlertas(alertasData)
    } catch (error) {
      console.error("Erro ao carregar alertas:", error)
    }
  }

  useEffect(() => {
    // Inicializar o elemento de áudio
    audioRef.current = new Audio()

    return () => {
      // Limpar o elemento de áudio quando o componente for desmontado
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    // Se houver um parâmetro de tab na URL, use-o
    if (tabFromUrl && ["atividades", "medicamentos", "mensagens", "alertas"].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl)
    }
  }, [tabFromUrl])

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setIsLoading(true)

        // Carregar dados do usuário específico (idoso ou acompanhante)
        const usuario = await getUsuarioPorId(params.id)
        setUsuario(usuario)

        // Determinar o tipo de usuário (se é idoso ou acompanhante)
        if (usuario) {
          if ("rotinaMedicamentos" in usuario) {
            setTipoUsuario("idoso")
            // Carregar alertas para este idoso
            await carregarAlertas(usuario.id)
          } else if ("grauParentesco" in usuario) {
            setTipoUsuario("acompanhante")
            // Para acompanhantes, carregaremos todos os alertas depois
          }
        }

        // Carregar listas para referência
        const idososData = await getIdosos()
        const acompanhantesData = await getAcompanhantes()
        setIdosos(idososData)
        setAcompanhantes(acompanhantesData)

        // Se for acompanhante, carregar alertas de todos os idosos
        if (usuario && "grauParentesco" in usuario) {
          await carregarAlertas()
        }
      } catch (error) {
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar os dados do usuário",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    carregarDados()

    // Configurar intervalo para atualizar alertas a cada 10 segundos
    const interval = setInterval(() => {
      if (tipoUsuario === "idoso" && usuario) {
        carregarAlertas((usuario as Idoso).id)
      } else if (tipoUsuario === "acompanhante") {
        carregarAlertas()
      }
    }, 10000)

    setRefreshInterval(interval)

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval)
      }
    }
  }, [params.id, toast, tipoUsuario])

  // Renderiza o loading state enquanto carrega os dados
  if (isLoading) {
    return <DashboardSkeleton />
  }

  // Renderiza mensagem se o usuário não for encontrado
  if (!usuario) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Usuário não encontrado</CardTitle>
            <CardDescription>Não foi possível encontrar o usuário com o ID especificado.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <a href="/aplicativo/admin/idosos">Voltar para a lista</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Renderiza a dashboard específica de idoso
  if (tipoUsuario === "idoso") {
    const idoso = usuario as Idoso
    const acompanhantesVinculados = acompanhantes.filter((a) =>
      idoso.telefonesAcompanhantes.some((tel) => a.telefones.includes(tel)),
    )
    const acompanhanteVinculado = acompanhantesVinculados.length > 0 ? acompanhantesVinculados[0] : null

    return (
      <div className="container mx-auto p-4 md:p-6">
        <header className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">{idoso.nome}</h1>
              <p className="text-muted-foreground">
                {idoso.idade} anos - Plano {idoso.plano}
              </p>
            </div>
            <div className="mt-2 md:mt-0">
              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                Dashboard do Idoso
              </Badge>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>Use estas ações para interações rápidas com o sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <AcoesRapidas
                isIdoso={true}
                idoso={idoso}
                userId={idoso.id}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                audioRef={audioRef}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Informações de Contato</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Endereço:</h3>
                  <p className="text-muted-foreground">{idoso.endereco}</p>
                </div>
                <div>
                  <h3 className="font-medium">Telefones:</h3>
                  <ul className="space-y-1">
                    {idoso.telefones.map((telefone, index) => (
                      <li key={index} className="text-muted-foreground">
                        {telefone}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium">Possui chave da residência:</h3>
                  <p className="text-muted-foreground">{idoso.possuiChave ? "Sim" : "Não"}</p>
                </div>
                <div>
                  <h3 className="font-medium">Acompanhantes:</h3>
                  {acompanhantesVinculados.length > 0 ? (
                    <ul className="space-y-2 mt-2">
                      {acompanhantesVinculados.map((acompanhante) => (
                        <li key={acompanhante.id} className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">{acompanhante.nome.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{acompanhante.nome}</p>
                            <p className="text-xs text-muted-foreground">{acompanhante.grauParentesco}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">Nenhum acompanhante cadastrado.</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 h-auto">
            <TabsTrigger value="atividades" className="py-2">
              Histórico de Atividades
            </TabsTrigger>
            <TabsTrigger value="medicamentos" className="py-2">
              Agenda de Medicamentos
            </TabsTrigger>
            <TabsTrigger value="mensagens" className="py-2">
              Mensagens
            </TabsTrigger>
            <TabsTrigger value="alertas" className="py-2">
              Alertas
            </TabsTrigger>
          </TabsList>
          <TabsContent value="atividades" className="mt-6">
            <HistoricoAtividades idosoId={idoso.id} />
          </TabsContent>
          <TabsContent value="medicamentos" className="mt-6">
            <AgendaMedicamentos medicamentos={idoso.medicamentos || []} />
          </TabsContent>
          <TabsContent value="mensagens" className="mt-6">
            <MensagensIdoso
              idosoId={idoso.id}
              acompanhanteId={acompanhanteVinculado?.id}
              isIdoso={true}
              audioRef={audioRef}
            />
          </TabsContent>
          <TabsContent value="alertas" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Alertas Recentes</CardTitle>
                <CardDescription>Alertas e notificações do sistema</CardDescription>
              </CardHeader>
              <CardContent>
                {alertas.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                    <p className="text-muted-foreground">Nenhum alerta registrado ainda.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {alertas.map((alerta) => {
                      let icon = <AlertTriangle className="h-5 w-5 text-red-500" />
                      let bgColor = "bg-red-50"

                      if (alerta.tipo === "medicamento") {
                        icon = <Pill className="h-5 w-5 text-amber-500" />
                        bgColor = "bg-amber-50"
                      } else if (alerta.tipo === "check-in") {
                        icon = <UserCheck className="h-5 w-5 text-green-500" />
                        bgColor = "bg-green-50"
                      } else if (alerta.tipo === "verificacao") {
                        icon = <Heart className="h-5 w-5 text-purple-500" />
                        bgColor = "bg-purple-50"
                      } else if (alerta.tipo === "notificacao") {
                        icon = <Bell className="h-5 w-5 text-blue-500" />
                        bgColor = "bg-blue-50"
                      }

                      return (
                        <div key={alerta.id} className={`flex items-start gap-3 rounded-lg border p-3 ${bgColor}`}>
                          {icon}
                          <div>
                            <p className="font-medium">{alerta.mensagem}</p>
                            <p className="text-sm text-muted-foreground">{new Date(alerta.data).toLocaleString()}</p>
                            {alerta.status === "resolvido" && (
                              <Badge variant="success" className="mt-2">
                                Resolvido
                              </Badge>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  // Renderiza a dashboard específica de acompanhante
  if (tipoUsuario === "acompanhante") {
    const acompanhante = usuario as Acompanhante
    const idososVinculados = idosos.filter((i) =>
      i.telefonesAcompanhantes.some((tel) => acompanhante.telefones.includes(tel)),
    )
    const idosoVinculado = idososVinculados.length > 0 ? idososVinculados[0] : null

    return (
      <div className="container mx-auto p-4 md:p-6">
        <header className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">{acompanhante.nome}</h1>
              <p className="text-muted-foreground">
                {acompanhante.idade} anos - {acompanhante.grauParentesco}
              </p>
            </div>
            <div className="mt-2 md:mt-0">
              <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                Dashboard do Acompanhante
              </Badge>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Idosos Vinculados</CardTitle>
              <CardDescription>Aqui você pode ver os idosos que você acompanha</CardDescription>
            </CardHeader>
            <CardContent>
              {idososVinculados.length === 0 ? (
                <p className="text-muted-foreground">Nenhum idoso vinculado a este acompanhante.</p>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {idososVinculados.map((idoso) => (
                    <Card
                      key={idoso.id}
                      className="overflow-hidden hover:border-primary hover:shadow-md transition-all"
                    >
                      <CardHeader className="bg-secondary p-4 pb-2">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>{idoso.nome.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base">{idoso.nome}</CardTitle>
                            <CardDescription>{idoso.idade} anos</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Plano:</span>
                            <span className="font-medium">{idoso.plano}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Medicamentos:</span>
                            <span className="font-medium">{idoso.rotinaMedicamentos ? "Sim" : "Não"}</span>
                          </div>
                          {/* Removido o botão "Ver Dashboard" conforme solicitado */}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Informações de Contato</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Endereço:</h3>
                  <p className="text-muted-foreground">{acompanhante.endereco}</p>
                </div>
                <div>
                  <h3 className="font-medium">Telefones:</h3>
                  <ul className="space-y-1">
                    {acompanhante.telefones.map((telefone, index) => (
                      <li key={index} className="text-muted-foreground">
                        {telefone}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium">WhatsApp:</h3>
                  <p className="text-muted-foreground">{acompanhante.temWhatsapp ? "Sim" : "Não"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="alertas" className="mt-6">
          <TabsList className="w-full grid grid-cols-1 md:grid-cols-3 h-auto">
            <TabsTrigger value="alertas" className="py-2">
              Alertas
            </TabsTrigger>
            <TabsTrigger value="mensagens" className="py-2">
              Mensagens
            </TabsTrigger>
            <TabsTrigger value="medicamentos" className="py-2">
              Medicamentos
            </TabsTrigger>
          </TabsList>
          <TabsContent value="alertas" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Alertas Recentes</CardTitle>
                <CardDescription>Alertas recentes dos idosos vinculados</CardDescription>
              </CardHeader>
              <CardContent>
                {alertas.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                    <p className="text-muted-foreground">Nenhum alerta registrado ainda.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {alertas.map((alerta) => {
                      let icon = <AlertTriangle className="h-5 w-5 text-red-500" />
                      let bgColor = "bg-red-50"

                      if (alerta.tipo === "medicamento") {
                        icon = <Pill className="h-5 w-5 text-amber-500" />
                        bgColor = "bg-amber-50"
                      } else if (alerta.tipo === "check-in") {
                        icon = <UserCheck className="h-5 w-5 text-green-500" />
                        bgColor = "bg-green-50"
                      } else if (alerta.tipo === "verificacao") {
                        icon = <Heart className="h-5 w-5 text-purple-500" />
                        bgColor = "bg-purple-50"
                      } else if (alerta.tipo === "notificacao") {
                        icon = <Bell className="h-5 w-5 text-blue-500" />
                        bgColor = "bg-blue-50"
                      }

                      return (
                        <div key={alerta.id} className={`flex items-start gap-3 rounded-lg border p-3 ${bgColor}`}>
                          {icon}
                          <div>
                            <p className="font-medium">
                              {alerta.idosoNome}: {alerta.mensagem}
                            </p>
                            <p className="text-sm text-muted-foreground">{new Date(alerta.data).toLocaleString()}</p>
                            {alerta.status === "resolvido" && (
                              <Badge variant="success" className="mt-2">
                                Resolvido
                              </Badge>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="mensagens" className="mt-6">
            <MensagensIdoso
              idosoId={idosoVinculado?.id || ""}
              acompanhanteId={acompanhante.id}
              isIdoso={false}
              audioRef={audioRef}
            />
          </TabsContent>
          <TabsContent value="medicamentos" className="mt-6">
            <AgendaMedicamentos
              medicamentos={idosoVinculado?.medicamentos || []}
              idosoNome={idosoVinculado?.nome || "Idoso"}
            />
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  return null
}

// Skeleton loader para a dashboard
function DashboardSkeleton() {
  return (
    <div className="container mx-auto p-6">
      <header className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <Skeleton className="h-8 w-48 rounded-md" />
            <Skeleton className="mt-1 h-4 w-32 rounded-md" />
          </div>
          <div className="mt-2 md:mt-0">
            <Skeleton className="h-6 w-32 rounded-md" />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="md:col-span-3">
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>

      <div className="mt-6">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="mt-6 h-64 w-full rounded-xl" />
      </div>
    </div>
  )
}
