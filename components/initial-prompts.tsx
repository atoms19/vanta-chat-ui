"use client"

interface InitialPromptsProps {
  onPromptClick: (message: string) => void;
}

export function InitialPrompts({ onPromptClick }: InitialPromptsProps) {
  const initialPrompts = [
    {
      heading: "Explain a technical concept",
      message: "What is a vector database?",
    },
    {
      heading: "Summarize an article",
      message: "Summarize the following article for a 2nd grader: [URL]",
    },
    {
      heading: "Write a thank-you note",
      message: "Write a thank-you note to my interviewer.",
    },
    {
      heading: "Compare two subjects",
      message: "Compare the pros and cons of functional and object-oriented programming.",
    },
  ]

  return (
    <div className="mb-4 grid grid-cols-2 gap-2 px-4 sm:px-0">
      {initialPrompts.map((prompt, index) => (
        <button
          key={index}
          onClick={() => onPromptClick(prompt.message)}
          className="bg-background ring-ring/10 hover:bg-muted/50 flex h-full flex-col items-start justify-between rounded-lg border p-4 text-left text-sm transition-all hover:border-transparent hover:shadow-lg"
        >
          <p className="font-semibold">{prompt.heading}</p>
          <p className="text-muted-foreground">{prompt.message}</p>
        </button>
      ))}
    </div>
  )
}