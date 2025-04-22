"use client"

import type { Idoso } from "@/types/idoso"
import type { Acompanhante } from "@/types/acompanhante"
import type { Alerta } from "@/types/alerta"

// Simulação de banco de dados usando localStorage
const IDOSOS_KEY = "sentinela_idosos"
const ACOMPANHANTES_KEY = "sentinela_acompanhantes"
// Chave para armazenar atividades no localStorage
const ATIVIDADES_KEY = "sentinela_atividades"
// Chave para armazenar alertas no localStorage
const ALERTAS_KEY = "sentinela_alertas"

// Dados de exemplo para inicialização
const dadosIniciais = {
  idosos: [
    {
      id: "idoso-1",
      nome: "Maria Silva",
      idade: 78,
      rotinaMedicamentos: true,
      medicamentos: [
        { nome: "Pressão Alta", horario: "08:00", frequencia: "12h" },
        { nome: "Diabetes", horario: "12:00", frequencia: "24h" },
        { nome: "Colesterol", horario: "18:00", frequencia: "24h" },
      ],
      endereco: "Rua das Flores, 123 - Centro, Marília/SP",
      telefones: ["(14) 3433-1234", "(14) 99123-4567"],
      telefonesAcompanhantes: ["(14) 99876-5432", "(14) 99765-4321"],
      possuiChave: true,
      plano: "Amparo",
      dataCadastro: "2023-09-15T10:30:00",
    },
    {
      id: "idoso-2",
      nome: "José Santos",
      idade: 82,
      rotinaMedicamentos: true,
      medicamentos: [
        { nome: "Coração", horario: "07:00", frequencia: "8h" },
        { nome: "Artrite", horario: "13:00", frequencia: "24h" },
      ],
      endereco: "Av. República, 456 - Jardim São Paulo, Marília/SP",
      telefones: ["(14) 3433-5678"],
      telefonesAcompanhantes: ["(14) 99876-1234"],
      possuiChave: false,
      plano: "Vida+",
      dataCadastro: "2023-08-20T14:15:00",
    },
  ],
  acompanhantes: [
    {
      id: "acompanhante-1",
      nome: "Carlos Silva",
      idade: 45,
      grauParentesco: "Filho",
      endereco: "Rua dos Ipês, 789 - Jardim Europa, Marília/SP",
      telefones: ["(14) 99876-5432"],
      temWhatsapp: true,
      dataCadastro: "2023-09-15T10:30:00",
    },
    {
      id: "acompanhante-2",
      nome: "Ana Oliveira",
      idade: 38,
      grauParentesco: "Neta",
      endereco: "Av. Brasil, 123 - Centro, São Paulo/SP",
      telefones: ["(11) 99876-1234"],
      temWhatsapp: true,
      dataCadastro: "2023-08-20T14:15:00",
    },
  ],
  alertas: [
    {
      id: "alerta-1",
      idosoId: "idoso-1",
      idosoNome: "Maria Silva",
      tipo: "emergencia",
      mensagem: "Botão de emergência acionado",
      data: new Date().toISOString(),
      status: "nao_resolvido",
    },
    {
      id: "alerta-2",
      idosoId: "idoso-2",
      idosoNome: "José Santos",
      tipo: "medicamento",
      mensagem: "Medicamento não tomado: Pressão Alta - 08:00",
      data: new Date(Date.now() - 3600000).toISOString(), // 1 hora atrás
      status: "em_andamento",
    },
  ],
}

// Inicializar dados se não existirem
const inicializarDados = () => {
  if (typeof window === "undefined") return

  if (!localStorage.getItem(IDOSOS_KEY)) {
    localStorage.setItem(IDOSOS_KEY, JSON.stringify(dadosIniciais.idosos))
  }

  if (!localStorage.getItem(ACOMPANHANTES_KEY)) {
    localStorage.setItem(ACOMPANHANTES_KEY, JSON.stringify(dadosIniciais.acompanhantes))
  }
}

// Inicializar dados de atividades se não existirem
const inicializarAtividades = () => {
  if (typeof window === "undefined") return

  if (!localStorage.getItem(ATIVIDADES_KEY)) {
    localStorage.setItem(ATIVIDADES_KEY, JSON.stringify([]))
  }
}

// Inicializar dados de alertas se não existirem
const inicializarAlertas = () => {
  if (typeof window === "undefined") return

  if (!localStorage.getItem(ALERTAS_KEY)) {
    localStorage.setItem(ALERTAS_KEY, JSON.stringify(dadosIniciais.alertas))
  }
}

// Funções para obter dados
export const getIdosos = async (): Promise<Idoso[]> => {
  inicializarDados()

  return new Promise((resolve) => {
    setTimeout(() => {
      const idososJSON = localStorage.getItem(IDOSOS_KEY)
      resolve(idososJSON ? JSON.parse(idososJSON) : [])
    }, 500) // Simulando um delay de rede
  })
}

export const getAcompanhantes = async (): Promise<Acompanhante[]> => {
  inicializarDados()

  return new Promise((resolve) => {
    setTimeout(() => {
      const acompanhantesJSON = localStorage.getItem(ACOMPANHANTES_KEY)
      resolve(acompanhantesJSON ? JSON.parse(acompanhantesJSON) : [])
    }, 500) // Simulando um delay de rede
  })
}

export const getUsuarioPorId = async (id: string): Promise<Idoso | Acompanhante | null> => {
  inicializarDados()

  return new Promise((resolve) => {
    setTimeout(async () => {
      const idosos = await getIdosos()
      const acompanhantes = await getAcompanhantes()

      const idoso = idosos.find((i) => i.id === id)
      if (idoso) return resolve(idoso)

      const acompanhante = acompanhantes.find((a) => a.id === id)
      if (acompanhante) return resolve(acompanhante)

      resolve(null)
    }, 500) // Simulando um delay de rede
  })
}

// Funções para salvar dados
export const saveIdoso = async (idoso: Idoso): Promise<void> => {
  inicializarDados()

  return new Promise((resolve) => {
    setTimeout(async () => {
      const idosos = await getIdosos()
      const index = idosos.findIndex((i) => i.id === idoso.id)

      if (index >= 0) {
        idosos[index] = idoso
      } else {
        idosos.push(idoso)
      }

      localStorage.setItem(IDOSOS_KEY, JSON.stringify(idosos))
      resolve()
    }, 500) // Simulando um delay de rede
  })
}

export const saveAcompanhante = async (acompanhante: Acompanhante): Promise<void> => {
  inicializarDados()

  return new Promise((resolve) => {
    setTimeout(async () => {
      const acompanhantes = await getAcompanhantes()
      const index = acompanhantes.findIndex((a) => a.id === acompanhante.id)

      if (index >= 0) {
        acompanhantes[index] = acompanhante
      } else {
        acompanhantes.push(acompanhante)
      }

      localStorage.setItem(ACOMPANHANTES_KEY, JSON.stringify(acompanhantes))
      resolve()
    }, 500) // Simulando um delay de rede
  })
}

export const removeIdoso = async (id: string): Promise<void> => {
  inicializarDados()

  return new Promise((resolve) => {
    setTimeout(async () => {
      const idosos = await getIdosos()
      const idososFiltrados = idosos.filter((i) => i.id !== id)
      localStorage.setItem(IDOSOS_KEY, JSON.stringify(idososFiltrados))
      resolve()
    }, 500) // Simulando um delay de rede
  })
}

export const removeAcompanhante = async (id: string): Promise<void> => {
  inicializarDados()

  return new Promise((resolve) => {
    setTimeout(async () => {
      const acompanhantes = await getAcompanhantes()
      const acompanhantesFiltrados = acompanhantes.filter((a) => a.id !== id)
      localStorage.setItem(ACOMPANHANTES_KEY, JSON.stringify(acompanhantesFiltrados))
      resolve()
    }, 500) // Simulando um delay de rede
  })
}

// Registrar uma nova atividade
export const registrarAtividade = async (userId: string, tipo: string, descricao: string): Promise<void> => {
  inicializarAtividades()

  return new Promise((resolve) => {
    setTimeout(async () => {
      const atividades = await getAtividades()

      const novaAtividade = {
        id: `atividade-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        userId,
        tipo,
        descricao,
        data: new Date().toISOString(),
      }

      atividades.push(novaAtividade)
      localStorage.setItem(ATIVIDADES_KEY, JSON.stringify(atividades))
      resolve()
    }, 300)
  })
}

// Obter todas as atividades
export const getAtividades = async (userId?: string): Promise<any[]> => {
  inicializarAtividades()

  return new Promise((resolve) => {
    setTimeout(() => {
      const atividadesJSON = localStorage.getItem(ATIVIDADES_KEY)
      const atividades = atividadesJSON ? JSON.parse(atividadesJSON) : []

      // Se um userId for fornecido, filtrar apenas as atividades desse usuário
      const atividadesFiltradas = userId ? atividades.filter((a: any) => a.userId === userId) : atividades

      // Ordenar por data (mais recente primeiro)
      atividadesFiltradas.sort((a: any, b: any) => new Date(b.data).getTime() - new Date(a.data).getTime())

      resolve(atividadesFiltradas)
    }, 300)
  })
}

// Funções para gerenciar alertas
export const getAlertas = async (idosoId?: string): Promise<Alerta[]> => {
  inicializarAlertas()

  return new Promise((resolve) => {
    setTimeout(() => {
      const alertasJSON = localStorage.getItem(ALERTAS_KEY)
      const alertas = alertasJSON ? JSON.parse(alertasJSON) : []

      // Se um idosoId for fornecido, filtrar apenas os alertas desse idoso
      const alertasFiltrados = idosoId ? alertas.filter((a: Alerta) => a.idosoId === idosoId) : alertas

      // Ordenar por data (mais recente primeiro)
      alertasFiltrados.sort((a: Alerta, b: Alerta) => new Date(b.data).getTime() - new Date(a.data).getTime())

      resolve(alertasFiltrados)
    }, 300)
  })
}

export const criarAlerta = async (
  idosoId: string,
  tipo: string,
  mensagem: string,
  status = "nao_resolvido",
): Promise<Alerta> => {
  inicializarAlertas()

  return new Promise(async (resolve) => {
    // Obter o nome do idoso
    const idosos = await getIdosos()
    const idoso = idosos.find((i) => i.id === idosoId)
    const idosoNome = idoso ? idoso.nome : "Idoso não identificado"

    const novoAlerta: Alerta = {
      id: `alerta-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      idosoId,
      idosoNome,
      tipo,
      mensagem,
      data: new Date().toISOString(),
      status,
    }

    setTimeout(async () => {
      const alertas = await getAlertas()
      alertas.push(novoAlerta)
      localStorage.setItem(ALERTAS_KEY, JSON.stringify(alertas))

      // Aqui seria o lugar para enviar notificações push
      // Em um sistema real, chamaríamos uma API para enviar notificações
      // Exemplo: await enviarNotificacaoPush(novoAlerta)

      resolve(novoAlerta)
    }, 300)
  })
}

export const atualizarStatusAlerta = async (alertaId: string, novoStatus: string): Promise<Alerta | null> => {
  inicializarAlertas()

  return new Promise((resolve) => {
    setTimeout(async () => {
      const alertas = await getAlertas()
      const index = alertas.findIndex((a: Alerta) => a.id === alertaId)

      if (index >= 0) {
        alertas[index].status = novoStatus
        localStorage.setItem(ALERTAS_KEY, JSON.stringify(alertas))
        resolve(alertas[index])
      } else {
        resolve(null)
      }
    }, 300)
  })
}

export const limparTodosAlertas = async (): Promise<void> => {
  inicializarAlertas()

  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem(ALERTAS_KEY, JSON.stringify([]))
      resolve()
    }, 300)
  })
}

// Nova função para apagar todos os alertas de um idoso específico
export const apagarAlertasIdoso = async (idosoId: string): Promise<void> => {
  inicializarAlertas()

  return new Promise((resolve) => {
    setTimeout(async () => {
      const alertas = await getAlertas()
      const alertasFiltrados = alertas.filter((a: Alerta) => a.idosoId !== idosoId)
      localStorage.setItem(ALERTAS_KEY, JSON.stringify(alertasFiltrados))
      resolve()
    }, 300)
  })
}

export const getContadorAlertas = async (): Promise<{
  emergencia: number
  medicamento: number
  resolvidos: number
  total: number
}> => {
  inicializarAlertas()

  return new Promise((resolve) => {
    setTimeout(async () => {
      const alertas = await getAlertas()

      const contador = {
        emergencia: alertas.filter((a: Alerta) => a.tipo === "emergencia" && a.status !== "resolvido").length,
        medicamento: alertas.filter((a: Alerta) => a.tipo === "medicamento" && a.status !== "resolvido").length,
        resolvidos: alertas.filter((a: Alerta) => a.status === "resolvido").length,
        total: alertas.length,
      }

      resolve(contador)
    }, 300)
  })
}

// Função para calcular a agenda de medicamentos com base na frequência
export const calcularAgendaMedicamentos = (medicamentos: any[]): any[] => {
  if (!medicamentos || medicamentos.length === 0) return []

  const hoje = new Date()
  const agendaCalculada = []

  for (const medicamento of medicamentos) {
    if (!medicamento.frequencia) continue

    const [hora, minuto] = medicamento.horario.split(":").map(Number)
    const horarioBase = new Date(hoje)
    horarioBase.setHours(hora, minuto, 0, 0)

    // Adicionar o horário base
    agendaCalculada.push({
      ...medicamento,
      dataHora: new Date(horarioBase).toISOString(),
    })

    // Calcular horários adicionais com base na frequência
    if (medicamento.frequencia === "8h") {
      // 3 doses por dia: horário base + 8h + 16h
      for (let i = 1; i <= 2; i++) {
        const novoHorario = new Date(horarioBase)
        novoHorario.setHours(horarioBase.getHours() + 8 * i)
        agendaCalculada.push({
          ...medicamento,
          dataHora: novoHorario.toISOString(),
        })
      }
    } else if (medicamento.frequencia === "12h") {
      // 2 doses por dia: horário base + 12h
      const novoHorario = new Date(horarioBase)
      novoHorario.setHours(horarioBase.getHours() + 12)
      agendaCalculada.push({
        ...medicamento,
        dataHora: novoHorario.toISOString(),
      })
    }
    // Para frequência "24h", já temos o horário base
  }

  // Ordenar por data/hora
  agendaCalculada.sort((a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime())

  return agendaCalculada
}

// Função para verificar se é hora de enviar notificações de medicamentos
export const verificarNotificacoesMedicamentos = async (): Promise<void> => {
  const idosos = await getIdosos()
  const agora = new Date()

  for (const idoso of idosos) {
    if (!idoso.medicamentos || idoso.medicamentos.length === 0) continue

    const agenda = calcularAgendaMedicamentos(idoso.medicamentos)

    for (const item of agenda) {
      const horarioMedicamento = new Date(item.dataHora)
      const diferencaMinutos = Math.abs(agora.getTime() - horarioMedicamento.getTime()) / (1000 * 60)

      // Verificar se está dentro da janela de 5 minutos para notificação
      if (diferencaMinutos <= 5 && horarioMedicamento > agora) {
        // Criar alerta para o medicamento
        await criarAlerta(
          idoso.id,
          "medicamento",
          `Hora de tomar ${item.nome} - ${new Date(item.dataHora).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
        )

        // Em um sistema real, enviaríamos notificações push aqui
        // Exemplo: await enviarNotificacaoPush({
        //   titulo: "Lembrete de Medicamento",
        //   mensagem: `Hora de tomar ${item.nome}`,
        //   idosoId: idoso.id
        // })
      }
    }
  }
}

// Função para simular o envio de notificações push (em um sistema real, usaríamos FCM)
export const enviarNotificacaoPush = async (dados: {
  titulo: string
  mensagem: string
  tipo?: string
}): Promise<void> => {
  // Em um sistema real, esta função enviaria a notificação para o Firebase Cloud Messaging
  console.log("Enviando notificação push:", dados)

  // Verificar se o navegador suporta notificações
  if ("Notification" in window) {
    // Verificar permissão
    if (Notification.permission === "granted") {
      // Criar e mostrar a notificação
      new Notification(dados.titulo, {
        body: dados.mensagem,
        icon: "/logo.png",
      })
    } else if (Notification.permission !== "denied") {
      // Solicitar permissão
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(dados.titulo, {
            body: dados.mensagem,
            icon: "/logo.png",
          })
        }
      })
    }
  }

  // Simular o envio para um serviço de backend
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 300)
  })
}

// Adicionar arquivos de som para as notificações
export const sons = {
  checkIn: "/sounds/check-in.mp3",
  remedio: "/sounds/remedio.mp3",
  emergencia: "/sounds/emergencia.mp3",
  verificacao: "/sounds/verificacao.mp3",
  mensagem: "/sounds/mensagem.mp3",
  chamada: "/sounds/chamada.mp3",
}
