import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 xl:py-20 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Eles cuidaram de você. Agora é sua vez de cuidar deles.
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Tecnologia assistiva que oferece planos de monitoramento inteligente para idosos que moram sozinhos com
                autonomia.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/planos">Conheça os Planos</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link href="/como-funciona">Como Funciona</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="https://i.imgur.com/hpknWTT.jpeg?height=550&width=550"
              width={550}
              height={550}
              alt="Idoso com familiar"
              className="mx-auto aspect-square rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
