"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Sidebar } from "@/components/admin/sidebar"

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    // Verificar se o usuário está autenticado
    const auth = localStorage.getItem("sentinela_auth")
    if (auth) {
      setIsAuthenticated(true)
    } else if (pathname !== "/aplicativo/admin") {
      router.push("/aplicativo/admin")
    }
    setIsLoading(false)
  }, [pathname, router])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!isAuthenticated && pathname !== "/aplicativo/admin") {
    return null
  }

  // Se estiver na página de login, não mostrar o layout administrativo
  if (pathname === "/aplicativo/admin") {
    return <>{children}</>
  }

  // Modificar o layout para garantir responsividade

  return (
    <div className="flex h-screen flex-col md:flex-row overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-[#FAFAFA] p-4 md:p-6">{children}</main>
    </div>
  )
}
