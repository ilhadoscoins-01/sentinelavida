import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Lightbulb, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function SobrePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h1 className="text-4xl font-bold tracking-tight mb-4">Sobre a Sentinela Vida</h1>
              <p className="text-lg mb-6">
                Somos uma empresa de tecnologia assistiva dedicada a proporcionar segurança, independência e qualidade
                de vida para idosos que moram sozinhos.
              </p>
              <p className="text-lg mb-6">
                Nossa missão é evitar mortes solitárias com cuidado real, utilizando tecnologia de ponta aliada a um
                atendimento humanizado.
              </p>
              <Button asChild size="lg" className="rounded-full">
                <Link href="/contato">Fale conosco</Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Equipe Sentinela Vida"
                width={500}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Nossa História</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Como nasceu a Sentinela Vida e nossa jornada até aqui.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg mb-4">
                A Sentinela Vida nasceu da experiência pessoal de nossos fundadores, que enfrentaram o desafio de cuidar
                de seus pais idosos à distância.
              </p>
              <p className="text-lg mb-4">
                Em 2020, após a perda de um ente querido que morava sozinho e não conseguiu pedir socorro a tempo,
                decidimos criar uma solução que pudesse evitar que outras famílias passassem pela mesma dor.
              </p>
              <p className="text-lg mb-4">
                Unindo profissionais de tecnologia, saúde e assistência social, desenvolvemos um sistema de
                monitoramento inteligente que respeita a privacidade e autonomia dos idosos, ao mesmo tempo em que
                proporciona segurança e tranquilidade para seus familiares.
              </p>
              <p className="text-lg">
                Hoje, a Sentinela Vida atende centenas de famílias em Marília/SP e região, com planos de expansão para
                todo o Brasil nos próximos anos.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="História da Sentinela Vida"
                width={500}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-16 bg-[#f8f8f8]">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Missão, Visão e Valores</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Os princípios que norteiam nosso trabalho.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Missão</h3>
                <p>
                  Evitar mortes solitárias com cuidado real, proporcionando segurança e qualidade de vida para idosos
                  que moram sozinhos, através de tecnologia assistiva e atendimento humanizado.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Lightbulb className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Visão</h3>
                <p>
                  Ser referência nacional em tecnologia assistiva para idosos, expandindo nossos serviços para todo o
                  Brasil e impactando positivamente a vida de milhares de famílias nos próximos 5 anos.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Valores</h3>
                <ul className="text-left">
                  <li className="mb-2">
                    • <span className="font-semibold">Empatia:</span> Colocamos-nos no lugar das famílias e dos idosos.
                  </li>
                  <li className="mb-2">
                    • <span className="font-semibold">Inovação:</span> Buscamos constantemente melhorar nossa
                    tecnologia.
                  </li>
                  <li className="mb-2">
                    • <span className="font-semibold">Cuidado Humanizado:</span> Tratamos cada idoso com dignidade e
                    respeito.
                  </li>
                  <li>
                    • <span className="font-semibold">Confiabilidade:</span> Nossos serviços são seguros e confiáveis.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Nossa Equipe</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Profissionais dedicados a cuidar do bem-estar dos idosos.
            </p>
          </div>

          <div className="flex justify-center gap-6">
            {[
              { name: "Vinícius Lodi", role: "Co-Fundador & CEO", image: "https://i.imgur.com/uL5065x.jpeg?height=300&width=300" },
              { name: "Kayk Ferreira", role: "Co-Fundador & Diretor de Operações", image: "https://i.imgur.com/1FfKhOS.png?height=300&width=300" },
            ].map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-4 overflow-hidden rounded-full">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={150}
                    height={150}
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Faça parte da família Sentinela Vida</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Conheça nossos planos e escolha o que melhor se adapta às necessidades do seu familiar idoso.
          </p>
          <Button asChild size="lg" variant="secondary" className="rounded-full">
            <Link href="/planos">Conheça nossos planos</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
