"use client"

export function ChatHeader() {
  return (
    <header className="m-auto flex max-w-96 flex-col gap-5 text-center">
      <h1 className="text-2xl font-semibold leading-none tracking-tight">AWA chatbot</h1>
      <p className="text-muted-foreground text-sm">
        Atomic waves personal Assistant capable of using tools and MCPs to make his workflow better, knows him inside out
      </p>
    </header>
  )
}