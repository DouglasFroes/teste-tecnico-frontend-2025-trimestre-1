import { create } from 'zustand';
import { fetchAddressByCep } from '../services/cepService';

export type Address = {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
};

export type Contact = {
  id: string;
  user: string;
  displayName: string;
  cep: string;
  address: Address;
};

export type AddressStore = {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
  addContact: (user: string, displayName: string, cepValue: string) => Promise<void>;
  removeContact: (id: string) => void;
  editDisplayName: (id: string, newName: string) => void;
  clearError: () => void;
};

function getPersistedContacts(): Contact[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem('contacts');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function persistContacts(contacts: Contact[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

export const useAddressStore = create<AddressStore>((set, get) => ({
  contacts: getPersistedContacts(),
  loading: false,
  error: null,
  addContact: async (user, displayName, cepValue) => {
    set({ loading: true, error: null });
    try {
      const address = await fetchAddressByCep(cepValue);
      const newContact: Contact = {
        id: Math.random().toString(36).slice(2),
        user,
        displayName,
        cep: cepValue,
        address,
      };
      const updated = [...get().contacts, newContact];
      persistContacts(updated);
      set({ contacts: updated, loading: false });
    } catch (e) {
      if (e instanceof Error) {
        set({ error: e.message || 'Erro ao buscar endereço', loading: false });
      } else {
        set({ error: 'Erro ao buscar endereço', loading: false });
      }
    }
  },
  removeContact: (id) => {
    const updated = get().contacts.filter((c) => c.id !== id);
    persistContacts(updated);
    set({ contacts: updated });
  },
  editDisplayName: (id, newName) => {
    const updated = get().contacts.map((c) =>
      c.id === id ? { ...c, displayName: newName } : c
    );
    persistContacts(updated);
    set({ contacts: updated });
  },
  clearError: () => set({ error: null }),
}));
