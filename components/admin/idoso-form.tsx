"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Plus } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import type { Idoso } from "@/types/idoso"
import { saveIdoso } from "@/lib/data"

const planos = ["Essencial", "Amparo", "Vida+"]
const frequencias = ["Uma vez ao dia", "12 em 12 horas", "8 em 8 horas", "6 em 6 horas", "4 em 4 horas"]

const formSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  idade: z.coerce.number().int().min(60, "Idade deve ser de pelo menos 60 anos"),
  rotinaMedicamentos: z.boolean(),
  endereco: z.string().min(5, "Endereço deve ter no mínimo 5 caracteres"),
  possuiChave: z.enum(["sim", "nao"]),
  plano: z.enum(["Essencial", "Amparo", "Vida+"]),
})

type IdosoFormProps = {
  idoso?: Idoso | null
  onSuccess: () => void
}

export function IdosoForm({ idoso, onSuccess }: IdosoFormProps) {
  const [medicamentos, setMedicamentos] = useState<{ nome: string; horario: string; frequencia: string }[]>([])
  const [novoMedicamento, setNovoMedicamento] = useState({ nome: "", horario: "", frequencia: "Uma vez ao dia" })
  const [telefones, setTelefones] = useState<string[]>([])
  const [novoTelefone, setNovoTelefone] = useState("")
  const [telefonesAcompanhantes, setTelefonesAcompanhantes] = useState<string[]>([])
  const [novoTelefoneAcompanhante, setNovoTelefoneAcompanhante] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      idade: 60,
      rotinaMedicamentos: false,
      endereco: "",
      possuiChave: "nao",
      plano: "Essencial",
    },
  })

  // Preencher o formulário se estiver editando um idoso
  useEffect(() => {
    if (idoso) {
      form.reset({
        nome: idoso.nome,
        idade: idoso.idade,
        rotinaMedicamentos: idoso.rotinaMedicamentos,
        endereco: idoso.endereco,
        possuiChave: idoso.possuiChave ? "sim" : "nao",
        plano: idoso.plano,
      })
      setTelefones(idoso.telefones || [])
      setTelefonesAcompanhantes(idoso.telefonesAcompanhantes || [])
      setMedicamentos(idoso.medicamentos || [])
    }
  }, [idoso, form])

  // Função para calcular os horários com base na frequência
  const calcularHorarios = (horarioBase: string, frequencia: string): { horario: string }[] => {
    if (frequencia === "Uma vez ao dia") {
      return [{ horario: horarioBase }]
    }

    const [horaStr, minutoStr] = horarioBase.split(":")
    let hora = Number.parseInt(horaStr)
    const minuto = Number.parseInt(minutoStr)
    const horarios = [{ horario: `${hora.toString().padStart(2, "0")}:${minutoStr}` }]

    let intervalo = 0
    switch (frequencia) {
      case "12 em 12 horas":
        intervalo = 12
        break
      case "8 em 8 horas":
        intervalo = 8
        break
      case "6 em 6 horas":
        intervalo = 6
        break
      case "4 em 4 horas":
        intervalo = 4
        break
      default:
        return horarios
    }

    // Adicionar horários adicionais com base no intervalo
    for (let i = 1; i < 24 / intervalo; i++) {
      hora = (hora + intervalo) % 24
      horarios.push({ horario: `${hora.toString().padStart(2, "0")}:${minutoStr}` })
    }

    return horarios
  }

  // Gerenciamento de medicamentos
  const addMedicamento = () => {
    if (novoMedicamento.nome.trim() && novoMedicamento.horario.trim()) {
      // Adicionar medicamento com frequência
      const novoMed = {
        nome: novoMedicamento.nome,
        horario: novoMedicamento.horario,
        frequencia: novoMedicamento.frequencia,
      }

      setMedicamentos([...medicamentos, novoMed])
      setNovoMedicamento({ nome: "", horario: "", frequencia: "Uma vez ao dia" })
    }
  }

  const removeMedicamento = (index: number) => {
    setMedicamentos(medicamentos.filter((_, i) => i !== index))
  }

  // Gerenciamento de telefones
  const addTelefone = () => {
    if (novoTelefone.trim() && !telefones.includes(novoTelefone)) {
      setTelefones([...telefones, novoTelefone])
      setNovoTelefone("")
    }
  }

  const removeTelefone = (index: number) => {
    setTelefones(telefones.filter((_, i) => i !== index))
  }

  // Gerenciamento de telefones de acompanhantes
  const addTelefoneAcompanhante = () => {
    if (novoTelefoneAcompanhante.trim() && !telefonesAcompanhantes.includes(novoTelefoneAcompanhante)) {
      setTelefonesAcompanhantes([...telefonesAcompanhantes, novoTelefoneAcompanhante])
      setNovoTelefoneAcompanhante("")
    }
  }

  const removeTelefoneAcompanhante = (index: number) => {
    setTelefonesAcompanhantes(telefonesAcompanhantes.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (telefones.length === 0) {
      toast({
        title: "Erro no formulário",
        description: "Adicione pelo menos um telefone de contato",
        variant: "destructive",
      })
      return
    }

    if (data.rotinaMedicamentos && medicamentos.length === 0) {
      toast({
        title: "Erro no formulário",
        description: "Adicione pelo menos um medicamento",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Gerar um ID único se for um novo idoso
      const idosoId = idoso?.id || `idoso-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

      const idosoData = {
        id: idosoId,
        nome: data.nome,
        idade: data.idade,
        rotinaMedicamentos: data.rotinaMedicamentos,
        medicamentos: data.rotinaMedicamentos ? medicamentos : [],
        endereco: data.endereco,
        telefones,
        telefonesAcompanhantes,
        possuiChave: data.possuiChave === "sim",
        plano: data.plano,
        dataCadastro: idoso?.dataCadastro || new Date().toISOString(),
      }

      await saveIdoso(idosoData)

      toast({
        title: idoso ? "Idoso atualizado" : "Idoso cadastrado",
        description: idoso ? "Os dados do idoso foram atualizados com sucesso" : "O idoso foi cadastrado com sucesso",
      })

      onSuccess()
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar os dados do idoso",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome completo</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do idoso" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="idade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Idade</FormLabel>
                <FormControl>
                  <Input type="number" min={60} placeholder="Idade" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="endereco"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço completo</FormLabel>
              <FormControl>
                <Input placeholder="Endereço completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <Label>Telefone(s) de contato do idoso</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Digite o telefone"
              value={novoTelefone}
              onChange={(e) => setNovoTelefone(e.target.value)}
            />
            <Button
              type="button"
              onClick={addTelefone}
              className="whitespace-nowrap"
              style={{ backgroundColor: "#E50914", color: "#FAFAFA" }}
            >
              <Plus className="mr-2 h-4 w-4" /> Adicionar
            </Button>
          </div>

          {telefones.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {telefones.map((telefone, index) => (
                <div key={index} className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1">
                  <span className="text-sm">{telefone}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeTelefone(index)}
                    className="h-5 w-5 p-0 text-muted-foreground"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remover</span>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Label>Telefone(s) de contato de acompanhantes</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Digite o telefone do acompanhante"
              value={novoTelefoneAcompanhante}
              onChange={(e) => setNovoTelefoneAcompanhante(e.target.value)}
            />
            <Button
              type="button"
              onClick={addTelefoneAcompanhante}
              className="whitespace-nowrap"
              style={{ backgroundColor: "#E50914", color: "#FAFAFA" }}
            >
              <Plus className="mr-2 h-4 w-4" /> Adicionar
            </Button>
          </div>

          {telefonesAcompanhantes.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {telefonesAcompanhantes.map((telefone, index) => (
                <div key={index} className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1">
                  <span className="text-sm">{telefone}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeTelefoneAcompanhante(index)}
                    className="h-5 w-5 p-0 text-muted-foreground"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remover</span>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <FormField
          control={form.control}
          name="rotinaMedicamentos"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Rotina de Medicamentos</FormLabel>
                <p className="text-sm text-muted-foreground">O idoso precisa de acompanhamento para medicamentos?</p>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {form.watch("rotinaMedicamentos") && (
          <div className="space-y-4 rounded-lg border p-4">
            <Label>Medicamentos</Label>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Input
                placeholder="Nome do medicamento"
                value={novoMedicamento.nome}
                onChange={(e) => setNovoMedicamento({ ...novoMedicamento, nome: e.target.value })}
              />
              <Input
                placeholder="Horário (ex: 08:00)"
                value={novoMedicamento.horario}
                onChange={(e) => setNovoMedicamento({ ...novoMedicamento, horario: e.target.value })}
              />
              <Select
                value={novoMedicamento.frequencia}
                onValueChange={(value) => setNovoMedicamento({ ...novoMedicamento, frequencia: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Frequência" />
                </SelectTrigger>
                <SelectContent>
                  {frequencias.map((freq) => (
                    <SelectItem key={freq} value={freq}>
                      {freq}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              type="button"
              onClick={addMedicamento}
              className="w-full"
              style={{ backgroundColor: "#E50914", color: "#FAFAFA" }}
            >
              <Plus className="mr-2 h-4 w-4" /> Adicionar Medicamento
            </Button>

            {medicamentos.length > 0 && (
              <div className="mt-4 space-y-2">
                {medicamentos.map((med, index) => (
                  <div key={index} className="flex items-center justify-between rounded-md bg-secondary p-2">
                    <div>
                      <span className="font-medium">{med.nome}</span>
                      <span className="ml-2 text-sm text-muted-foreground">
                        ({med.horario}) - {med.frequencia || "Uma vez ao dia"}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeMedicamento(index)}
                      className="h-8 w-8 p-0 text-muted-foreground"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remover</span>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <FormField
          control={form.control}
          name="possuiChave"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Idoso forneceu uma cópia da chave da residência?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="sim" />
                    </FormControl>
                    <FormLabel className="font-normal">Sim</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="nao" />
                    </FormControl>
                    <FormLabel className="font-normal">Não</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="plano"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plano</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o plano" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {planos.map((plano) => (
                    <SelectItem key={plano} value={plano}>
                      {plano}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onSuccess} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            style={{ backgroundColor: "#E50914", color: "#FAFAFA" }}
            className="hover:bg-[#B2060F]"
          >
            {isSubmitting ? "Salvando..." : idoso ? "Atualizar" : "Cadastrar"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
