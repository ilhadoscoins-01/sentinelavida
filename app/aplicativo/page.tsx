import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  Bell,
  Calendar,
  Clock,
  Heart,
  Home,
  MessageSquare,
  Phone,
  PieChart,
  Pill,
  User,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Aplicativo Sentinela Vida</h1>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Conheça a interface do nosso aplicativo e dashboard. Esta é uma demonstração de como você poderá acompanhar
            seu familiar idoso em tempo real.
          </p>
        </div>
      </section>

      {/* Dashboard Demo */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="border rounded-xl overflow-hidden shadow-lg bg-background">
            <div className="p-4 bg-muted border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                <span className="font-bold">Sentinela Vida</span>
              </div>
              <div className="flex items-center gap-4">
                <Bell className="h-5 w-5" />
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <span className="hidden sm:inline">Maria Silva</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 min-h-[600px]">
              {/* Sidebar */}
              <div className="col-span-12 md:col-span-3 lg:col-span-2 border-r p-4 flex flex-col gap-4">
                <div className="flex items-center gap-2 p-2 bg-primary/10 rounded-md">
                  <Home className="h-5 w-5 text-primary" />
                  <span>Aplicativo</span>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer">
                  <User className="h-5 w-5" />
                  <span>Perfil</span>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer">
                  <Calendar className="h-5 w-5" />
                  <span>Agenda</span>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer">
                  <MessageSquare className="h-5 w-5" />
                  <span>Mensagens</span>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer">
                  <PieChart className="h-5 w-5" />
                  <span>Relatórios</span>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer">
                  <Phone className="h-5 w-5" />
                  <span>Contatos</span>
                </div>
              </div>

              {/* Main Content */}
              <div className="col-span-12 md:col-span-9 lg:col-span-10 p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Olá, Maria!</h2>
                  <p className="text-muted-foreground">
                    Aqui está o status atual do seu familiar: José Silva, 78 anos.
                  </p>
                </div>

                {/* Status Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <div className="mr-2 h-4 w-4 rounded-full bg-green-500"></div>
                        <span className="font-bold">Tudo bem</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Última atualização: há 10 minutos</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Atividade</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="font-bold">Normal</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Movimento detectado há 5 minutos</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Medicação</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <Pill className="mr-2 h-4 w-4 text-amber-500" />
                        <span className="font-bold">Pendente</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Próxima dose: 15:00h (Pressão)</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Alertas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <AlertTriangle className="mr-2 h-4 w-4 text-primary" />
                        <span className="font-bold">1 Alerta</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Temperatura ambiente alta</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="cameras">
                  <TabsList className="mb-4">
                    <TabsTrigger value="cameras">Câmeras</TabsTrigger>
                    <TabsTrigger value="atividades">Atividades</TabsTrigger>
                    <TabsTrigger value="acoes">Ações Rápidas</TabsTrigger>
                  </TabsList>

                  <TabsContent value="cameras">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Sala</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="aspect-video bg-muted rounded-md overflow-hidden relative">
                            <Image
                              src="/placeholder.svg?height=300&width=500"
                              alt="Câmera da Sala"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              Ao vivo
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Cozinha</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="aspect-video bg-muted rounded-md overflow-hidden relative">
                            <Image
                              src="/placeholder.svg?height=300&width=500"
                              alt="Câmera da Cozinha"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              Ao vivo
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Entrada</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="aspect-video bg-muted rounded-md overflow-hidden relative">
                            <Image
                              src="/placeholder.svg?height=300&width=500"
                              alt="Câmera da Entrada"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              Ao vivo
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Corredor</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="aspect-video bg-muted rounded-md overflow-hidden relative">
                            <Image
                              src="/placeholder.svg?height=300&width=500"
                              alt="Câmera do Corredor"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              Ao vivo
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="atividades">
                    <Card>
                      <CardHeader>
                        <CardTitle>Histórico de Atividades</CardTitle>
                        <CardDescription>Últimas 24 horas de atividades registradas</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            {
                              time: "14:30",
                              activity: "Movimento detectado na cozinha",
                              icon: <Home className="h-4 w-4" />,
                            },
                            { time: "13:15", activity: "Medicação tomada", icon: <Pill className="h-4 w-4" /> },
                            { time: "12:45", activity: "Almoço registrado", icon: <Clock className="h-4 w-4" /> },
                            {
                              time: "10:30",
                              activity: "Check-in diário realizado",
                              icon: <User className="h-4 w-4" />,
                            },
                            {
                              time: "09:15",
                              activity: "Movimento detectado na sala",
                              icon: <Home className="h-4 w-4" />,
                            },
                            {
                              time: "08:00",
                              activity: "Café da manhã registrado",
                              icon: <Clock className="h-4 w-4" />,
                            },
                            { time: "07:30", activity: "Medicação tomada", icon: <Pill className="h-4 w-4" /> },
                          ].map((item, index) => (
                            <div key={index} className="flex items-start">
                              <div className="mr-2 mt-0.5 bg-muted p-1 rounded-full">{item.icon}</div>
                              <div>
                                <div className="font-medium">{item.activity}</div>
                                <div className="text-xs text-muted-foreground">{item.time}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="acoes">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <Button size="lg" variant="destructive" className="h-auto py-8 flex flex-col gap-2">
                        <AlertTriangle className="h-8 w-8" />
                        <span>Botão de Pânico</span>
                      </Button>

                      <Button size="lg" variant="outline" className="h-auto py-8 flex flex-col gap-2">
                        <User className="h-8 w-8" />
                        <span>Estou bem hoje</span>
                      </Button>

                      <Button size="lg" variant="outline" className="h-auto py-8 flex flex-col gap-2">
                        <Pill className="h-8 w-8" />
                        <span>Solicitar remédio</span>
                      </Button>

                      <Button size="lg" variant="outline" className="h-auto py-8 flex flex-col gap-2">
                        <Heart className="h-8 w-8" />
                        <span>Verificação de saúde</span>
                      </Button>

                      <Button size="lg" variant="outline" className="h-auto py-8 flex flex-col gap-2">
                        <Phone className="h-8 w-8" />
                        <span>Falar com meu neto</span>
                      </Button>

                      <Button size="lg" variant="outline" className="h-auto py-8 flex flex-col gap-2">
                        <MessageSquare className="h-8 w-8" />
                        <span>Falar com a central</span>
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Esta é apenas uma demonstração do nosso dashboard. O aplicativo real possui ainda mais funcionalidades e é
              personalizado de acordo com as necessidades do seu familiar idoso.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/planos">Conheça nossos planos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Pronto para começar?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Escolha o plano ideal para o seu familiar idoso e comece a proporcionar mais segurança e tranquilidade para
            toda a família.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="rounded-full">
              <Link href="/planos">Ver planos</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full text-gray-900 border-white hover:bg-white hover:text-primary"
            >
              <Link href="/contato">Falar com um consultor</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
