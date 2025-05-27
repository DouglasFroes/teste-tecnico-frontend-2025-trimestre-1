'use client';

import { ToastType, useToastStore } from "@/stores/useToast";

const typeStyles: Record<ToastType, string> = {
  success: "bg-green-100 border-green-400 text-green-800",
  error: "bg-red-100 border-red-400 text-red-800",
  info: "bg-blue-100 border-blue-400 text-blue-800",
  warning: "bg-yellow-100 border-yellow-400 text-yellow-800",
};

export default function Toast() {
  // Garante que só tipos válidos são usados
  const { message, type, onClose } = useToastStore();
  const style = typeStyles[type] ?? typeStyles.info;

  if (!message) return null;

  return (
    <div
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded shadow-lg border flex items-center gap-2 animate-fade-in ${style}`}
      role="alert"
    >
      <span className="font-medium">{message}</span>
      {onClose && (
        <button
          className="ml-2 text-lg text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 font-bold px-2"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>
      )}
    </div>
  );
}
