import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

export default function PlanosPage() {
  const plans = [
    {
      name: "Essencial",
      price: "R$89",
      description: "Monitoramento básico para idosos independentes",
      features: [
        "Botão de emergência",
        "Aplicativo para familiares",
        "Monitoramento 24h",
        "Relatório mensal",
        "1 visita mensal da equipe",
      ],
      cta: "Quero este plano",
      popular: false,
    },
    {
      name: "Amparo",
      price: "R$149",
      description: "Monitoramento completo com suporte avançado",
      features: [
        "Todos os benefícios do Essencial",
        "Câmeras de monitoramento (2)",
        "Sensores de movimento",
        "Relatório diário",
        "2 visitas mensais da equipe",
        "Suporte prioritário",
      ],
      cta: "Quero este plano",
      popular: true,
    },
    {
      name: "Vida+",
      price: "R$229",
      description: "Solução completa para cuidado integral",
      features: [
        "Todos os benefícios do Amparo",
        "Câmeras de monitoramento (4)",
        "Sensores em todos os cômodos",
        "Monitoramento de sinais vitais",
        "4 visitas mensais da equipe",
        "Atendimento VIP",
        "Suporte VIP",
      ],
      cta: "Quero este plano",
      popular: false,
    },
  ]

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Nossos Planos</h1>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Escolha o plano ideal para garantir a segurança e o bem-estar do seu familiar idoso. Todos os planos incluem
            monitoramento 24h e suporte da nossa equipe especializada.
          </p>
        </div>
      </section>

      {/* Planos */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`border-2 ${plan.popular ? "border-primary shadow-lg relative" : "border-border"}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg">
                    Mais Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    size="lg"
                    className={`w-full rounded-full ${plan.popular ? "" : "bg-primary hover:bg-primary/90"}`}
                  >
                    <Link href="/contato">{plan.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Todos os planos incluem uma pequena taxa de instalação dos equipamentos e os planos podem ser cancelados a qualquer momento mediante os termos contratuais. Consulte
              disponibilidade para sua região.
            </p>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/contato">Precisa de ajuda para escolher? Fale conosco</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Perguntas Frequentes */}
      <section className="py-16 bg-[#f8f8f8]">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Perguntas Frequentes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Tire suas dúvidas sobre nossos planos e serviços.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                question: "Qual a área de cobertura do Sentinela Vida?",
                answer:
                  "Atualmente, atendemos Marília/SP e região em um raio de até 10km. Estamos em expansão para outras cidades do estado de São Paulo.",
              },
              {
                question: "Como funciona o botão de emergência?",
                answer:
                  "O botão de emergência pode ser usado como um pingente ou pulseira. Ao ser pressionado, nossa central de monitoramento é acionada imediatamente e entra em contato com o idoso e com os familiares cadastrados.",
              },
              {
                question: "É necessário ter internet na casa do idoso?",
                answer:
                  "Sim, é necessário ter conexão com internet para o funcionamento completo do sistema. Caso não tenha, podemos incluir um plano de internet no pacote.",
              },
              {
                question: "Posso mudar de plano depois?",
                answer:
                  "Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento, de acordo com as necessidades contratuais e do seu familiar idoso.",
              },
              {
                question: "Como é feita a instalação dos equipamentos?",
                answer:
                  "Nossa equipe técnica vai até a residência do idoso para fazer a instalação e configuração de todos os equipamentos, além de ensinar como utilizá-los.",
              },
              {
                question: "O que acontece em caso de emergência?",
                answer:
                  "Nossa central de monitoramento aciona imediatamente o protocolo de emergência, que inclui contato com o idoso, familiares e, se necessário, serviços de emergência como SAMU ou Bombeiros.",
              },
            ].map((faq, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-bold">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Pronto para garantir a segurança do seu familiar?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Não deixe para amanhã a tranquilidade que você e sua família merecem hoje. Assine um de nossos planos e
            comece a cuidar melhor de quem você ama.
          </p>
          <Button asChild size="lg" variant="secondary" className="rounded-full">
            <Link href="/contato">Falar com um consultor</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
