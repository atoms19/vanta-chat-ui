import { Button } from "@/components/ui/button";
import { File, MessageSquare, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { RenameChatDialog } from "./rename-chat-dialog";
import { useStore } from "@/lib/store";

export const HistorySidebar = ({ onSelectChat, onNewChat }) => {
  const history = useStore((state) => state.history);
  const deleteHistoryItem = useStore((state) => state.deleteHistoryItem);
  const renameHistoryItem = useStore((state) => state.renameHistoryItem);

  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [chatToRename, setChatToRename] = useState(null);

  const handleRenameClick = (chat) => {
    setChatToRename(chat);
    setIsRenameDialogOpen(true);
  };

  const handleRename = (newName) => {
    renameHistoryItem(chatToRename.index, newName);
  };

  return (
    <aside className="bg-background flex h-full w-64 flex-col border-r p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Chat History</h2>
        <Button variant="ghost" size="icon" className="rounded-full" onClick={onNewChat}>
          <Plus size={16} />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {history.map((chat, index) => (
          <div key={index} className="group flex items-center justify-between rounded-lg p-2 hover:bg-muted">
            <div className="flex items-center gap-2" onClick={() => onSelectChat(chat.messages)}>
              <MessageSquare size={16} />
              <span>{chat.name}</span>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100">
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => handleRenameClick({ index, name: chat.name })}>
                <File size={16} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => deleteHistoryItem(index)}>
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      {chatToRename && (
        <RenameChatDialog
          isOpen={isRenameDialogOpen}
          onClose={() => setIsRenameDialogOpen(false)}
          onRename={handleRename}
          chatName={chatToRename.name}
        />
      )}
    </aside>
  );
};