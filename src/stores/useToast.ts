import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';

export type ToastType = "success" | "error" | "info" | "warning"

type IOpts = {
  message: string;
  type: ToastType;
  timeoutSeg?: number;
};




type IProps = {
  message?: string;
  type: ToastType;
  onMessage(config: IOpts): void;
  onClose(): void;
};

let timeout: NodeJS.Timeout;

export const toastStore = createStore<IProps>(set => ({
  type: 'success',
  onMessage: (config: IOpts) => {
    set({
      message: config.message,
      type: config.type,
    });

    timeout = setTimeout(
      () => {
        set({ message: undefined });
      },
      1000 * (config.timeoutSeg || 5),
    );
  },
  onClose: () => {
    clearTimeout(timeout);
    set({ message: undefined });
  },
}));

export function useToastStore() {
  return useStore(toastStore);
}
