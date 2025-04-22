"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Pill, UserCheck, Heart, AlertTriangle } from "lucide-react"
import { getAtividades } from "@/lib/data"

interface HistoricoAtividadesProps {
  idosoId: string
}

type Atividade = {
  id: string
  tipo: string
  descricao: string
  data: string
  userId: string
}

export function HistoricoAtividades({ idosoId }: HistoricoAtividadesProps) {
  const [atividades, setAtividades] = useState<Atividade[]>([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    const carregarAtividades = async () => {
      try {
        const atividadesData = await getAtividades(idosoId)
        setAtividades(atividadesData)
      } catch (error) {
        console.error("Erro ao carregar atividades:", error)
      } finally {
        setCarregando(false)
      }
    }

    carregarAtividades()
  }, [idosoId])

  const getIconByTipo = (tipo: string) => {
    switch (tipo) {
      case "check-in":
        return <UserCheck className="h-4 w-4" />
      case "remedio":
        return <Pill className="h-4 w-4" />
      case "emergencia":
        return <AlertTriangle className="h-4 w-4" />
      case "verificacao":
        return <Heart className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getIconBackground = (tipo: string) => {
    switch (tipo) {
      case "check-in":
        return "bg-green-100"
      case "remedio":
        return "bg-blue-100"
      case "emergencia":
        return "bg-red-100"
      case "verificacao":
        return "bg-purple-100"
      default:
        return "bg-gray-100"
    }
  }

  const getIconColor = (tipo: string) => {
    switch (tipo) {
      case "check-in":
        return "text-green-600"
      case "remedio":
        return "text-blue-600"
      case "emergencia":
        return "text-red-600"
      case "verificacao":
        return "text-purple-600"
      default:
        return "text-gray-600"
    }
  }

  // Agrupar atividades por data
  const agruparAtividadesPorData = () => {
    const grupos: Record<string, Atividade[]> = {}

    atividades.forEach((atividade) => {
      const data = new Date(atividade.data)
      const hoje = new Date()
      const ontem = new Date(hoje)
      ontem.setDate(hoje.getDate() - 1)

      let dataFormatada = data.toLocaleDateString()

      // Verificar se é hoje ou ontem
      if (dataFormatada === hoje.toLocaleDateString()) {
        dataFormatada = "Hoje"
      } else if (dataFormatada === ontem.toLocaleDateString()) {
        dataFormatada = "Ontem"
      }

      if (!grupos[dataFormatada]) {
        grupos[dataFormatada] = []
      }

      grupos[dataFormatada].push(atividade)
    })

    return grupos
  }

  const atividadesAgrupadas = agruparAtividadesPorData()
  const datasOrdenadas = Object.keys(atividadesAgrupadas).sort((a, b) => {
    if (a === "Hoje") return -1
    if (b === "Hoje") return 1
    if (a === "Ontem") return -1
    if (b === "Ontem") return 1
    return 0
  })

  const formatarHorario = (dataString: string) => {
    const data = new Date(dataString)
    return data.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Atividades</CardTitle>
        <CardDescription>Atividades recentes registradas</CardDescription>
      </CardHeader>
      <CardContent>
        {carregando ? (
          <div className="flex justify-center p-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : atividades.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <p className="text-muted-foreground">Nenhuma atividade registrada.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {datasOrdenadas.map((data) => (
              <div key={data}>
                <h3 className="mb-2 font-semibold">{data}</h3>
                <div className="space-y-4">
                  {atividadesAgrupadas[data].map((atividade) => (
                    <div key={atividade.id} className="flex items-start">
                      <div className={`mr-3 mt-0.5 rounded-full p-1.5 ${getIconBackground(atividade.tipo)}`}>
                        <div className={getIconColor(atividade.tipo)}>{getIconByTipo(atividade.tipo)}</div>
                      </div>
                      <div>
                        <p className="font-medium">{atividade.descricao}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>{formatarHorario(atividade.data)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
