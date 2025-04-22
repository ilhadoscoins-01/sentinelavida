"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Heart, Users, AlertTriangle, User, Home, LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { toast } from "@/components/ui/use-toast"

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("sentinela_auth")
    toast({
      title: "Logout realizado",
      description: "Você saiu do sistema com sucesso",
    })
    router.push("/aplicativo/admin")
  }

  const menuItems = [
    {
      title: "Idosos",
      href: "/aplicativo/admin/idosos",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Acompanhantes",
      href: "/aplicativo/admin/acompanhantes",
      icon: <User className="h-5 w-5" />,
    },
    {
      title: "Alertas",
      href: "/aplicativo/admin/alertas",
      icon: <AlertTriangle className="h-5 w-5" />,
    },
    {
      title: "Aplicativo",
      href: "/",
      icon: <Home className="h-5 w-5" />,
      external: true,
    },
  ]

  const isActive = (path: string) => pathname === path

  const SidebarContent = () => (
    <>
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/aplicativo/admin/idosos" className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">Sentinela Admin</span>
        </Link>
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <nav className="flex-1 px-3 py-4">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href) ? "bg-primary text-white" : "text-gray-700 hover:bg-secondary"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </Link>
            ))}
          </div>
        </nav>
        <div className="border-t p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Sair
          </Button>
        </div>
      </div>
    </>
  )

  // Versão desktop
  return (
    <>
      {/* Versão desktop */}
      <div className="hidden md:flex h-full w-64 flex-col border-r bg-white">
        <SidebarContent />
      </div>

      {/* Versão mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b flex items-center justify-between p-4">
        <Link href="/aplicativo/admin/idosos" className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">Sentinela Admin</span>
        </Link>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Espaçador para compensar o header fixo no mobile */}
      <div className="h-16 md:hidden" />
    </>
  )
}
