"use client"

import type React from "react"

import { useEffect, useState } from "react"

export const motion = (props: any) => {
  return props.children
}

export default function MotionWrapper({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return <>{children}</>
}
