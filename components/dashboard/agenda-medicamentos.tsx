import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"

interface Medicamento {
  nome: string
  horario: string
  frequencia?: string
}

interface AgendaMedicamentosProps {
  medicamentos: Medicamento[]
  idosoNome?: string
}

export function AgendaMedicamentos({ medicamentos, idosoNome }: AgendaMedicamentosProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agenda de Medicamentos</CardTitle>
        <CardDescription>
          {idosoNome ? `Medicamentos que ${idosoNome} deve tomar durante o dia` : "Seus medicamentos para hoje"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {medicamentos.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <Clock className="h-10 w-10 text-muted-foreground mb-2 opacity-50" />
            <p className="text-muted-foreground">Nenhum medicamento cadastrado.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {medicamentos.map((medicamento, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-secondary p-2">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{medicamento.nome}</p>
                    <p className="text-sm text-muted-foreground">
                      {medicamento.horario}
                      {medicamento.frequencia && ` (${medicamento.frequencia})`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
