import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Clock, Home, Smartphone, UserCheck, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ComoFuncionaPage() {
  const steps = [
    {
      icon: <Home className="h-10 w-10 text-primary" />,
      title: "Instalação dos Equipamentos",
      description:
        "Nossa equipe técnica vai até a residência do idoso para instalar o botão de emergência, câmeras e sensores de movimento, conforme o plano escolhido.",
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Central 24h Ativa",
      description:
        "Nossa central de monitoramento funciona 24 horas por dia, 7 dias por semana, acompanhando os alertas e sinais enviados pelos equipamentos.",
    },
    {
      icon: <Smartphone className="h-10 w-10 text-primary" />,
      title: "Ações via Aplicativo",
      description:
        "Os familiares podem acompanhar em tempo real a situação do idoso através do nosso aplicativo, recebendo notificações e podendo interagir com o sistema.",
    },
    {
      icon: <AlertCircle className="h-10 w-10 text-primary" />,
      title: "Resposta Emergencial",
      description:
        "Em caso de emergência, nossa equipe de resposta rápida é acionada, podendo enviar uma motolância até o local em poucos minutos.",
    },
    {
      icon: <UserCheck className="h-10 w-10 text-primary" />,
      title: "Visitas Periódicas",
      description:
        "Conforme o plano escolhido, realizamos visitas periódicas para verificar o funcionamento dos equipamentos e o bem-estar do idoso.",
    },
  ]

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Como Funciona</h1>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Conheça o passo a passo do nosso sistema de monitoramento inteligente para idosos. Tecnologia e cuidado
            humano trabalhando juntos pela segurança de quem você ama.
          </p>
        </div>
      </section>

      {/* Etapas */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-12">
            {steps.map((step, index) => (
              <Card key={index} className="border-0 shadow-md overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-secondary p-6 flex items-center justify-center md:w-1/4">
                      <div className="flex flex-col items-center text-center">
                        <div className="bg-background rounded-full p-4 mb-4">{step.icon}</div>
                        <span className="text-4xl font-bold">{index + 1}</span>
                      </div>
                    </div>
                    <div className="p-6 md:w-3/4">
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Equipamentos */}
      <section className="py-16 bg-[#f8f8f8]">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Nossos Equipamentos</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tecnologia de ponta para garantir a segurança e o bem-estar dos idosos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Botão de Emergência"
                  width={300}
                  height={300}
                  className="rounded-lg object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Botão de Emergência</h3>
              <p className="text-muted-foreground max-w-md">
                Pode ser usado como pingente ou pulseira. Ao ser pressionado, aciona imediatamente nossa central de
                monitoramento.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Câmeras de Monitoramento"
                  width={300}
                  height={300}
                  className="rounded-lg object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Câmeras de Monitoramento</h3>
              <p className="text-muted-foreground max-w-md">
                Instaladas em pontos estratégicos da casa, respeitando a privacidade do idoso. Podem ser acessadas pelos
                familiares através do aplicativo.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Sensores de Movimento"
                  width={300}
                  height={300}
                  className="rounded-lg object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Sensores de Movimento</h3>
              <p className="text-muted-foreground max-w-md">
                Detectam a movimentação do idoso pela casa. Em caso de inatividade prolongada, um alerta é enviado para
                a central e para os familiares.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Aplicativo Sentinela Vida"
                  width={300}
                  height={300}
                  className="rounded-lg object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Aplicativo Sentinela Vida</h3>
              <p className="text-muted-foreground max-w-md">
                Disponível para Android e iOS. Permite que os familiares acompanhem em tempo real a situação do idoso e
                recebam notificações importantes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Aplicativo */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Aplicativo Sentinela Vida</h2>
              <p className="text-lg mb-6">
                Nosso aplicativo foi desenvolvido pensando na facilidade de uso tanto para os idosos quanto para os
                familiares. Com ele, você pode:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-primary/10 p-1 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span>Acompanhar em tempo real a situação do idoso</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-primary/10 p-1 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span>Receber notificações de alertas e emergências</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-primary/10 p-1 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span>Visualizar as câmeras de monitoramento</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-primary/10 p-1 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span>Verificar o histórico de atividades e alertas</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-primary/10 p-1 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span>Comunicar-se diretamente com a central de monitoramento</span>
                </li>
              </ul>
              <Button asChild size="lg" className="rounded-full">
                <Link href="/aplicativo">Ver demonstração do aplicativo</Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/placeholder.svg?height=600&width=400"
                alt="Aplicativo Sentinela Vida"
                width={400}
                height={600}
                className="rounded-lg object-cover"
              />
            </div>
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
