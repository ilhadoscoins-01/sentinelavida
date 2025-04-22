import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ContactForm from "@/components/contact-form"

export default function ContatoPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Entre em Contato</h1>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Estamos à disposição para tirar suas dúvidas, ouvir suas sugestões e ajudar você a escolher o melhor plano
            para seu familiar idoso.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-6">Informações de Contato</h2>

              <div className="space-y-6">
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6 flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Telefone</h3>
                      <p className="text-muted-foreground">(14) 3433-5500</p>
                      <p className="text-muted-foreground">WhatsApp: (14) 99123-4567</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardContent className="p-6 flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">E-mail</h3>
                      <p className="text-muted-foreground">contato@sentinelavida.com.br</p>
                      <p className="text-muted-foreground">suporte@sentinelavida.com.br</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardContent className="p-6 flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Endereço</h3>
                      <p className="text-muted-foreground">Av. República, 1234</p>
                      <p className="text-muted-foreground">Centro, Marília/SP - CEP 17500-000</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardContent className="p-6 flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Horário de Atendimento</h3>
                      <p className="text-muted-foreground">Segunda a Sexta: 8h às 18h</p>
                      <p className="text-muted-foreground">Sábado: 9h às 13h</p>
                      <p className="text-muted-foreground">Central de Monitoramento: 24h</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Área de Atuação</h3>
                <div className="rounded-lg overflow-hidden border shadow-md">
                  <Image
                    src="https://i.imgur.com/aqD5pkQ.png?height=400&width=600"
                    alt="Mapa de Marília/SP"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Atendemos Marília/SP e região em um raio de até 10km.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-6">Envie uma Mensagem</h2>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <ContactForm />
                </CardContent>
              </Card>

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Atendimento via WhatsApp</h3>
                <p className="text-muted-foreground mb-4">
                  Prefere um atendimento mais rápido? Fale conosco pelo WhatsApp e receba atendimento imediato da nossa
                  equipe.
                </p>
                <Button asChild size="lg" className="rounded-full bg-green-600 hover:bg-green-700">
                  <Link href="https://wa.me/5514991234567" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Falar pelo WhatsApp
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#f8f8f8]">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Perguntas Frequentes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tire suas dúvidas sobre nossos serviços e como podemos ajudar você.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                question: "Quanto tempo leva para instalar o sistema?",
                answer:
                  "A instalação do sistema Sentinela Vida é rápida e leva em média 2 a 3 horas, dependendo do plano escolhido e da quantidade de equipamentos a serem instalados.",
              },
              {
                question: "Vocês oferecem suporte técnico?",
                answer:
                  "Sim, oferecemos suporte técnico 24 horas por dia, 7 dias por semana, para todos os nossos clientes, independentemente do plano escolhido.",
              },
              {
                question: "É possível testar o sistema antes de contratar?",
                answer:
                  "Sim, oferecemos uma demonstração gratuita do sistema em nossa sede ou, se preferir, podemos agendar uma visita à sua residência para demonstrar como funciona.",
              },
              {
                question: "Qual o prazo mínimo de contrato?",
                answer:
                  "O prazo mínimo de contrato é de 3 meses, mas oferecemos descontos especiais para contratos anuais.",
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
          <h2 className="text-3xl font-bold tracking-tight mb-4">Pronto para começar?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Escolha o plano ideal para o seu familiar idoso e comece a proporcionar mais segurança e tranquilidade para
            toda a família.
          </p>
          <Button asChild size="lg" variant="secondary" className="rounded-full">
            <Link href="/planos">Conheça nossos planos</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
