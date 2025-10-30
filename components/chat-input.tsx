import { Tooltip, TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { AutoResizeTextarea } from "./autoresize-textarea";
import { Button } from "./ui/button";
import { Paperclip, Send } from "lucide-react";

export default function ChatInput({handleSubmit,handleKeyDown})=>(<form
          onSubmit={handleSubmit}
          className="bg-background ring-ring/10 relative mx-6 mb-6 rounded-2xl border shadow-lg"
        >
          <AutoResizeTextarea
            onKeyDown={handleKeyDown}
            onChange={(v) => setInput(v)}
            value={input}
            placeholder="Enter a message"
            className="placeholder:text-muted-foreground flex-1 resize-none bg-transparent px-4 py-3 text-sm focus:outline-none"
          />

          <div className="flex items-center justify-between border-t p-2">
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Paperclip size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={12}>Attach file</TooltipContent>
              </Tooltip>
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full enabled:bg-gradient-to-br enabled:from-[#bbaaff] enabled:to-[#8f80ff] enabled:text-white"
                  disabled={!input.trim()}
                >
                  <Send size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={12}>Submit</TooltipContent>
            </Tooltip>
          </div>
        </form>
)
