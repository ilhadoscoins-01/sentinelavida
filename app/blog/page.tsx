import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BlogPage() {
  const posts = [
    {
      title: "Como identificar sinais de solidão em idosos",
      excerpt:
        "A solidão pode afetar significativamente a saúde mental e física dos idosos. Aprenda a identificar os sinais e como ajudar.",
      date: "10 de Abril, 2023",
      author: "Dra. Ana Oliveira",
      image: "/placeholder.svg?height=300&width=600",
      slug: "como-identificar-sinais-de-solidao-em-idosos",
    },
    {
      title: "Tecnologia a favor da terceira idade: benefícios e desafios",
      excerpt:
        "Como a tecnologia pode melhorar a qualidade de vida dos idosos e quais são os desafios para sua adoção.",
      date: "25 de Março, 2023",
      author: "Pedro Santos",
      image: "/placeholder.svg?height=300&width=600",
      slug: "tecnologia-a-favor-da-terceira-idade",
    },
    {
      title: "Prevenção de quedas: dicas para adaptar a casa do idoso",
      excerpt:
        "Quedas são uma das principais causas de acidentes com idosos. Saiba como adaptar o ambiente para preveni-las.",
      date: "15 de Março, 2023",
      author: "Dr. Carlos Silva",
      image: "/placeholder.svg?height=300&width=600",
      slug: "prevencao-de-quedas-dicas-para-adaptar-a-casa",
    },
    {
      title: "A importância do check-in diário com idosos que moram sozinhos",
      excerpt:
        "Estabelecer uma rotina de comunicação com idosos que moram sozinhos é fundamental para sua segurança e bem-estar.",
      date: "5 de Março, 2023",
      author: "Márcia Souza",
      image: "/placeholder.svg?height=300&width=600",
      slug: "importancia-do-check-in-diario-com-idosos",
    },
    {
      title: "Sinais de alerta: quando é hora de buscar ajuda médica para o idoso",
      excerpt:
        "Alguns sintomas em idosos podem indicar problemas de saúde sérios. Saiba quando é hora de buscar ajuda médica.",
      date: "20 de Fevereiro, 2023",
      author: "Dra. Ana Oliveira",
      image: "/placeholder.svg?height=300&width=600",
      slug: "sinais-de-alerta-quando-buscar-ajuda-medica",
    },
    {
      title: "Como manter a independência na terceira idade com segurança",
      excerpt:
        "É possível conciliar independência e segurança na terceira idade. Confira dicas para ajudar seu familiar idoso.",
      date: "10 de Fevereiro, 2023",
      author: "Pedro Santos",
      image: "/placeholder.svg?height=300&width=600",
      slug: "como-manter-independencia-na-terceira-idade",
    },
  ]

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Blog Sentinela Vida</h1>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Artigos, dicas e informações sobre cuidados com idosos, tecnologia assistiva e qualidade de vida na terceira
            idade.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 relative min-h-[300px]">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Artigo em destaque"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6">
                <CardHeader className="p-0 pb-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span>15 de Abril, 2023</span>
                    </div>
                    <div className="flex items-center">
                      <User className="mr-1 h-4 w-4" />
                      <span>Dr. Carlos Silva</span>
                    </div>
                  </div>
                  <CardTitle className="text-2xl md:text-3xl">
                    Como a tecnologia está revolucionando o cuidado com idosos
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 pb-4">
                  <p className="text-muted-foreground">
                    Descubra como os avanços tecnológicos estão transformando a maneira como cuidamos dos idosos,
                    proporcionando mais segurança, independência e qualidade de vida para eles e tranquilidade para seus
                    familiares.
                  </p>
                </CardContent>
                <CardFooter className="p-0">
                  <Button asChild className="rounded-full">
                    <Link href="/blog/como-a-tecnologia-esta-revolucionando-o-cuidado-com-idosos">
                      Ler artigo completo
                    </Link>
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 bg-[#f8f8f8]">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Artigos Recentes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Confira nossos artigos mais recentes sobre cuidados com idosos, tecnologia assistiva e qualidade de vida
              na terceira idade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <Card key={index} className="border-0 shadow-md overflow-hidden flex flex-col">
                <div className="relative h-48">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="mr-1 h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground text-sm">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" size="sm" className="rounded-full">
                    <Link href={`/blog/${post.slug}`}>Ler mais</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button variant="outline" size="lg" className="rounded-full">
              Ver mais artigos
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="bg-primary/5 rounded-xl p-6 md:p-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-2/3">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Receba nossos artigos</h2>
                <p className="text-muted-foreground mb-4">
                  Inscreva-se em nossa newsletter e receba dicas, artigos e novidades sobre cuidados com idosos
                  diretamente no seu e-mail.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    className="px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-primary flex-1"
                  />
                  <Button className="rounded-full">Inscrever-se</Button>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Newsletter"
                  width={200}
                  height={200}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Cuidar também é um ato de amor</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Conheça nossos planos de monitoramento inteligente para idosos e proporcione mais segurança e tranquilidade
            para toda a família.
          </p>
          <Button asChild size="lg" variant="secondary" className="rounded-full">
            <Link href="/planos">Conheça nossos planos</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
