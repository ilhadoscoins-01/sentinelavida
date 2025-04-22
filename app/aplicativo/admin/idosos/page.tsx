"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Pencil, Trash, Eye, Search, BellOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { getIdosos, removeIdoso, apagarAlertasIdoso } from "@/lib/data"
import type { Idoso } from "@/types/idoso"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { IdosoForm } from "@/components/admin/idoso-form"
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

export default function IdososPage() {
  const [idosos, setIdosos] = useState<Idoso[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedIdoso, setSelectedIdoso] = useState<Idoso | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadIdosos()
  }, [])

  const loadIdosos = async () => {
    setIsLoading(true)
    try {
      const data = await getIdosos()
      setIdosos(data)
    } catch (error) {
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar a lista de idosos",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (idoso: Idoso) => {
    setSelectedIdoso(idoso)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este idoso?")) {
      try {
        await removeIdoso(id)
        await loadIdosos()
        toast({
          title: "Idoso removido",
          description: "O idoso foi removido com sucesso",
        })
      } catch (error) {
        toast({
          title: "Erro ao remover",
          description: "Não foi possível remover o idoso",
          variant: "destructive",
        })
      }
    }
  }

  const handleApagarAlertas = async (idosoId: string, idosoNome: string) => {
    try {
      await apagarAlertasIdoso(idosoId)
      toast({
        title: "Alertas apagados",
        description: `Todos os alertas de ${idosoNome} foram apagados com sucesso`,
      })
    } catch (error) {
      toast({
        title: "Erro ao apagar alertas",
        description: "Não foi possível apagar os alertas",
        variant: "destructive",
      })
    }
  }

  const handleAddOrUpdate = () => {
    setIsDialogOpen(false)
    setSelectedIdoso(null)
    loadIdosos()
  }

  // Filtrar idosos com base no termo de pesquisa
  const idososFiltrados = idosos.filter((idoso) => idoso.nome.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Idosos Cadastrados</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="rounded-md flex items-center gap-2"
              style={{ backgroundColor: "#E50914", color: "#FAFAFA" }}
              className="hover:bg-[#B2060F]"
            >
              <Plus className="h-4 w-4" /> Cadastrar Idoso
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedIdoso ? "Editar Idoso" : "Cadastrar Novo Idoso"}</DialogTitle>
              <DialogDescription>
                Preencha os dados do idoso para {selectedIdoso ? "atualizar o cadastro" : "cadastrá-lo no sistema"}.
              </DialogDescription>
            </DialogHeader>
            <IdosoForm idoso={selectedIdoso} onSuccess={handleAddOrUpdate} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Lista de Idosos</CardTitle>
              <CardDescription>Gerencie os idosos cadastrados no sistema Sentinela Vida</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-secondary px-3 py-1 rounded-md text-sm font-medium">
                Idosos cadastrados: {idosos.length}
              </div>
            </div>
          </div>
          <div className="mt-2 relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Pesquisar por nome..."
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
          ) : idososFiltrados.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <p className="mb-4 text-muted-foreground">
                {searchTerm ? "Nenhum idoso encontrado com esse nome." : "Nenhum idoso cadastrado."}
              </p>
              {!searchTerm && (
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(true)}
                  className="rounded-md"
                  style={{ borderColor: "#E50914", color: "#E50914" }}
                >
                  Cadastrar Idoso
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>ID Único</TableHead>
                    <TableHead>Idade</TableHead>
                    <TableHead>Plano</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {idososFiltrados.map((idoso) => (
                    <TableRow key={idoso.id}>
                      <TableCell className="font-medium">{idoso.nome}</TableCell>
                      <TableCell className="font-mono text-xs">{idoso.id}</TableCell>
                      <TableCell>{idoso.idade} anos</TableCell>
                      <TableCell>
                        <span
                          className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                            idoso.plano === "Essencial"
                              ? "bg-blue-100 text-blue-800"
                              : idoso.plano === "Amparo"
                                ? "bg-green-100 text-green-800"
                                : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {idoso.plano}
                        </span>
                      </TableCell>
                      <TableCell>{idoso.telefones[0]}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/aplicativo/${idoso.id}`} passHref>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Ver</span>
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleEdit(idoso)}>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0 text-amber-500 hover:bg-amber-50 hover:text-amber-600"
                              >
                                <BellOff className="h-4 w-4" />
                                <span className="sr-only">Apagar Alertas</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Apagar Alertas</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja apagar todos os alertas de {idoso.nome}? Esta ação não pode ser
                                  desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleApagarAlertas(idoso.id, idoso.nome)}
                                  style={{ backgroundColor: "#E50914", color: "#FAFAFA" }}
                                  className="hover:bg-[#B2060F]"
                                >
                                  Apagar Alertas
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 hover:text-red-600"
                            onClick={() => handleDelete(idoso.id)}
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Excluir</span>
                          </Button>
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
