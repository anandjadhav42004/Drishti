import React, { createContext, useContext, useState, ReactNode } from 'react';

type ToastType = 'info' | 'success' | 'warning' | 'error';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ModalConfig {
  title: string;
  content: ReactNode;
}

interface GlobalStateContextType {
  toasts: Toast[];
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: number) => void;
  
  isLockdown: boolean;
  setLockdown: (status: boolean) => void;
  
  modal: ModalConfig | null;
  openModal: (title: string, content: ReactNode) => void;
  closeModal: () => void;

  isNotificationsOpen: boolean;
  setNotificationsOpen: (status: boolean) => void;
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

export function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isLockdown, setLockdown] = useState(false);
  const [modal, setModal] = useState<ModalConfig | null>(null);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);

  const addToast = (message: string, type: ToastType = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openModal = (title: string, content: ReactNode) => {
    setModal({ title, content });
  };

  const closeModal = () => {
    setModal(null);
  };

  return (
    <GlobalStateContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        isLockdown,
        setLockdown,
        modal,
        openModal,
        closeModal,
        isNotificationsOpen,
        setNotificationsOpen
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
}
