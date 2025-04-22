/*"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Pencil, Trash, Eye, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { getAcompanhantes, removeAcompanhante } from "@/lib/data"
import type { Acompanhante } from "@/types/acompanhante"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { AcompanhanteForm } from "@/components/admin/acompanhante-form"

export default function AcompanhantesPage() {
  const [acompanhantes, setAcompanhantes] = useState<Acompanhante[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedAcompanhante, setSelectedAcompanhante] = useState<Acompanhante | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadAcompanhantes()
  }, [])

  const loadAcompanhantes = async () => {
    setIsLoading(true)
    try {
      const data = await getAcompanhantes()
      setAcompanhantes(data)
    } catch (error) {
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar a lista de acompanhantes",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (acompanhante: Acompanhante) => {
    setSelectedAcompanhante(acompanhante)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este acompanhante?")) {
      try {
        await removeAcompanhante(id)
        await loadAcompanhantes()
        toast({
          title: "Acompanhante removido",
          description: "O acompanhante foi removido com sucesso",
        })
      } catch (error) {
        toast({
          title: "Erro ao remover",
          description: "Não foi possível remover o acompanhante",
          variant: "destructive",
        })
      }
    }
  }

  const handleAddOrUpdate = () => {
    setIsDialogOpen(false)
    setSelectedAcompanhante(null)
    loadAcompanhantes()
  }

  // Filtrar acompanhantes com base no termo de pesquisa
  const acompanhantesFiltrados = acompanhantes.filter((acompanhante) =>
    acompanhante.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Acompanhantes Cadastrados</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="rounded-md flex items-center gap-2"
              style={{ backgroundColor: "#E50914", color: "#FAFAFA" }}
              className="hover:bg-[#B2060F]"
            >
              <Plus className="h-4 w-4" /> Cadastrar Acompanhante
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedAcompanhante ? "Editar Acompanhante" : "Cadastrar Novo Acompanhante"}</DialogTitle>
              <DialogDescription>
                Preencha os dados do acompanhante para{" "}
                {selectedAcompanhante ? "atualizar o cadastro" : "cadastrá-lo no sistema"}.
              </DialogDescription>
            </DialogHeader>
            <AcompanhanteForm acompanhante={selectedAcompanhante} onSuccess={handleAddOrUpdate} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Lista de Acompanhantes</CardTitle>
              <CardDescription>Gerencie os acompanhantes cadastrados no sistema Sentinela Vida</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-secondary px-3 py-1 rounded-md text-sm font-medium">
                Acompanhantes cadastrados: {acompanhantes.length}
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
          ) : acompanhantesFiltrados.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <p className="mb-4 text-muted-foreground">
                {searchTerm ? "Nenhum acompanhante encontrado com esse nome." : "Nenhum acompanhante cadastrado."}
              </p>
              {!searchTerm && (
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(true)}
                  className="rounded-md"
                  style={{ borderColor: "#E50914", color: "#E50914" }}
                >
                  Cadastrar Acompanhante
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
                    <TableHead>Parentesco</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {acompanhantesFiltrados.map((acompanhante) => (
                    <TableRow key={acompanhante.id}>
                      <TableCell className="font-medium">{acompanhante.nome}</TableCell>
                      <TableCell className="font-mono text-xs">{acompanhante.id}</TableCell>
                      <TableCell>{acompanhante.idade} anos</TableCell>
                      <TableCell>{acompanhante.grauParentesco}</TableCell>
                      <TableCell>{acompanhante.telefones[0]}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/aplicativo/${acompanhante.id}`} passHref>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Ver</span>
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleEdit(acompanhante)}
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 hover:text-red-600"
                            onClick={() => handleDelete(acompanhante.id)}
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
*/
