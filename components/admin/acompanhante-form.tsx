"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { X, Plus } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import type { Acompanhante } from "@/types/acompanhante"
import { saveAcompanhante } from "@/lib/data"

const formSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  idade: z.coerce.number().int().min(18, "Idade deve ser de pelo menos 18 anos"),
  grauParentesco: z.string().min(3, "Grau de parentesco deve ter no mínimo 3 caracteres"),
  endereco: z.string().min(5, "Endereço deve ter no mínimo 5 caracteres"),
  temWhatsapp: z.boolean(),
})

type AcompanhanteFormProps = {
  acompanhante?: Acompanhante | null
  onSuccess: () => void
}

export function AcompanhanteForm({ acompanhante, onSuccess }: AcompanhanteFormProps) {
  const [telefones, setTelefones] = useState<string[]>([])
  const [novoTelefone, setNovoTelefone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      idade: 18,
      grauParentesco: "",
      endereco: "",
      temWhatsapp: false,
    },
  })

  // Preencher o formulário se estiver editando um acompanhante
  useEffect(() => {
    if (acompanhante) {
      form.reset({
        nome: acompanhante.nome,
        idade: acompanhante.idade,
        grauParentesco: acompanhante.grauParentesco,
        endereco: acompanhante.endereco,
        temWhatsapp: acompanhante.temWhatsapp,
      })
      setTelefones(acompanhante.telefones || [])
    }
  }, [acompanhante, form])

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

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (telefones.length === 0) {
      toast({
        title: "Erro no formulário",
        description: "Adicione pelo menos um telefone de contato",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Gerar um ID único se for um novo acompanhante
      const acompanhanteId =
        acompanhante?.id || `acompanhante-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

      const acompanhanteData = {
        id: acompanhanteId,
        nome: data.nome,
        idade: data.idade,
        grauParentesco: data.grauParentesco,
        endereco: data.endereco,
        telefones,
        temWhatsapp: data.temWhatsapp,
        dataCadastro: acompanhante?.dataCadastro || new Date().toISOString(),
      }

      await saveAcompanhante(acompanhanteData)

      toast({
        title: acompanhante ? "Acompanhante atualizado" : "Acompanhante cadastrado",
        description: acompanhante
          ? "Os dados do acompanhante foram atualizados com sucesso"
          : "O acompanhante foi cadastrado com sucesso",
      })

      onSuccess()
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar os dados do acompanhante",
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
                  <Input placeholder="Nome do acompanhante" {...field} />
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
                  <Input type="number" min={18} placeholder="Idade" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="grauParentesco"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grau de parentesco</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Filho, Neto, Sobrinho" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          <Label>Telefone(s) de contato</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Digite o telefone"
              value={novoTelefone}
              onChange={(e) => setNovoTelefone(e.target.value)}
            />
            <Button type="button" onClick={addTelefone} className="whitespace-nowrap">
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

        <FormField
          control={form.control}
          name="temWhatsapp"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Tem WhatsApp?</FormLabel>
                <p className="text-sm text-muted-foreground">O acompanhante utiliza WhatsApp para contato?</p>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onSuccess} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : acompanhante ? "Atualizar" : "Cadastrar"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
