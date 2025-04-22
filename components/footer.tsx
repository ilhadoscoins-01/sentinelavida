import { Heart } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Heart className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Sentinela Vida</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Tecnologia assistiva que oferece planos de monitoramento inteligente para idosos que moram sozinhos com
              autonomia.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div className="md:col-span-1">
            <h3 className="font-bold mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-sm text-muted-foreground hover:text-primary">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/planos" className="text-sm text-muted-foreground hover:text-primary">
                  Planos
                </Link>
              </li>
              <li>
                <Link href="/como-funciona" className="text-sm text-muted-foreground hover:text-primary">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link href="/aplicativo" className="text-sm text-muted-foreground hover:text-primary">
                  Aplicativo
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-sm text-muted-foreground hover:text-primary">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="font-bold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                <span className="font-medium">Telefone:</span> (14) 3433-5500
              </li>
              <li className="text-sm text-muted-foreground">
                <span className="font-medium">WhatsApp:</span> (14) 99123-4567
              </li>
              <li className="text-sm text-muted-foreground">
                <span className="font-medium">E-mail:</span> contato@sentinelavida.com
              </li>
              <li className="text-sm text-muted-foreground">
                <span className="font-medium">Empresa</span> 100% digital
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="font-bold mb-4">Horário de Atendimento</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                <span className="font-medium">Segunda a Sexta:</span> 8h às 18h
              </li>
              <li className="text-sm text-muted-foreground">
                <span className="font-medium">Sábado:</span> 9h às 13h
              </li>
              <li className="text-sm text-muted-foreground">
                <span className="font-medium">Central de Monitoramento:</span> 24h
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Sentinela Vida. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4">
            <Link href="/termos" className="text-xs text-muted-foreground hover:text-primary">
              Termos de Uso
            </Link>
            <Link href="/privacidade" className="text-xs text-muted-foreground hover:text-primary">
              Política de Privacidade
            </Link>
            <Link href="/cookies" className="text-xs text-muted-foreground hover:text-primary">
              Política de Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
