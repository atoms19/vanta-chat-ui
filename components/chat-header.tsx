"use client"

export function ChatHeader() {
  return (
    <header className="m-auto flex max-w-96 flex-col gap-5 text-center">
      <h1 className="text-2xl font-semibold leading-none tracking-tight">Vanta Chat UI</h1>
      <p className="text-muted-foreground text-sm">
        simple and lightweight chat for ollama local models
      </p>
    </header>
  )
}