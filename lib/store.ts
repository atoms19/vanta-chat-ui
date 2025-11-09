import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface ChatHistoryItem {
  name: string;
  messages: string;
}

interface AppState {
  history: ChatHistoryItem[];
  currentChat: string;
  selectedModel: string;
  models: string[];
  systemPrompt: string;
  isSidebarOpen: boolean;
}

interface AppActions {
  setHistory: (history: ChatHistoryItem[]) => void;
  setCurrentChat: (chat: string) => void;
  setSelectedModel: (model: string) => void;
  setModels: (models: string[]) => void;
  setSystemPrompt: (prompt: string) => void;
  toggleSidebar: () => void;
  addHistoryItem: (item: ChatHistoryItem) => void;
  updateHistoryItem: (index: number, item: ChatHistoryItem) => void;
  deleteHistoryItem: (index: number) => void;
  renameHistoryItem: (index: number, newName: string) => void;
}

export const useStore = create<AppState & AppActions>()(
  persist(
    immer((set) => ({
      history: [],
      currentChat: "",
      selectedModel: "",
      models: [],
      systemPrompt: "You are a helpful assistant.",
      isSidebarOpen: true,
      setHistory: (history) => set({ history }),
      setCurrentChat: (chat) => set({ currentChat: chat }),
      setSelectedModel: (model) => set({ selectedModel: model }),
      setModels: (models) => set({ models }),
      setSystemPrompt: (prompt) => set({ systemPrompt: prompt }),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      addHistoryItem: (item) => set((state) => {
        state.history.push(item)
      }),
      updateHistoryItem: (index, item) => set((state) => {
        state.history[index] = item
      }),
      deleteHistoryItem: (index) => set((state) => {
        state.history.splice(index, 1)
      }),
      renameHistoryItem: (index, newName) => set((state) => {
        state.history[index].name = newName
      }),
    })),
    {
      name: 'chat-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
)
