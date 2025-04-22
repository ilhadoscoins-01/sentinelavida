import { Button } from "@/components/ui/button"
import { Clock, MapPin, Shield, Smartphone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import TestimonialCard from "@/components/testimonial-card"
import HeroSection from "@/components/hero-section"
import BenefitCard from "@/components/benefit-card"

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />

      {/* Benefícios */}
      <section className="py-16 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Benefícios do Sentinela Vida</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tecnologia que cuida com o coração. Conheça as vantagens do nosso sistema de monitoramento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <BenefitCard
              icon={<Clock className="h-10 w-10 text-primary" />}
              title="Monitoramento 24h"
              description="Acompanhamento contínuo, todos os dias, para garantir a segurança do seu familiar."
            />
            <BenefitCard
              icon={<Shield className="h-10 w-10 text-primary" />}
              title="Equipe de resposta rápida"
              description="Profissionais treinados prontos para agir em caso de emergência."
            />
            <BenefitCard
              icon={<Smartphone className="h-10 w-10 text-primary" />}
              title="Aplicativo para familiares"
              description="Acompanhe em tempo real a situação do seu familiar idoso pelo celular."
            />
            <BenefitCard
              icon={<MapPin className="h-10 w-10 text-primary" />}
              title="Botão de emergência"
              description="Com geolocalização para atendimento imediato onde quer que esteja."
            />
          </div>

          <div className="flex justify-center mt-10">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/planos">Conheça nossos planos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Chamada emocional */}
      <section className="py-20 bg-[#f8f8f8]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <Image
                src="https://i.imgur.com/fD67VDL.png?height=400&width=500"
                alt="Idoso sorrindo com familiar"
                width={500}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Não espere o pior para agir</h2>
              <p className="text-lg mb-6">
                A tecnologia agora trabalha pela sua família. Com o Sentinela Vida, você pode ter a tranquilidade de
                saber que seu familiar idoso está sendo cuidado, mesmo quando você não pode estar presente.
              </p>
              <p className="text-lg mb-6">
                <span className="font-semibold text-primary">Cuidar também é um ato de amor.</span> Permita que nosso
                sistema de monitoramento inteligente ajude você nessa missão.
              </p>
              <Button asChild size="lg" className="rounded-full">
                <Link href="/como-funciona">Saiba como funciona</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">O que dizem nossos clientes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Histórias reais de famílias que confiam no Sentinela Vida para cuidar de seus entes queridos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard
              name="Maria Silva"
              role="Filha de Dona Antônia, 78 anos"
              content="O Sentinela Vida me deu a tranquilidade que eu precisava. Minha mãe mora sozinha e agora posso acompanhar sua rotina mesmo morando em outra cidade."
              avatarSrc="/placeholder.svg?height=100&width=100"
            />
            <TestimonialCard
              name="Carlos Mendes"
              role="Neto de Sr. José, 82 anos"
              content="Meu avô teve uma queda e o sistema de emergência do Sentinela Vida acionou a equipe rapidamente. Isso salvou a vida dele. Sou eternamente grato."
              avatarSrc="/placeholder.svg?height=100&width=100"
            />
            <TestimonialCard
              name="Juliana Costa"
              role="Filha de Sr. Roberto, 75 anos"
              content="A interface do aplicativo é muito intuitiva. Consigo verificar se meu pai tomou os remédios e se está tudo bem com ele. Isso me dá muita paz."
              avatarSrc="/placeholder.svg?height=100&width=100"
            />
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-primary text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Eles cuidaram de você. Agora é sua vez de cuidar deles.
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Não deixe para amanhã a segurança que seu familiar idoso precisa hoje. Conheça nossos planos e escolha o que
            melhor se adapta às suas necessidades.
          </p>
          <Button asChild size="lg" variant="secondary" className="rounded-full">
            <Link href="/planos">Quero conhecer os planos</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
