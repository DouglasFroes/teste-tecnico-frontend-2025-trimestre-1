import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

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
  address: Address;
};

export type AddressStore = {
  contacts: Contact[];
  addContact: (user: string, displayName: string, address: Address) => void
  removeContact: (id: string) => void;
  editDisplayName: (id: string, newName: string) => void;
};


export const useAddressStore = create(
  persist<AddressStore>(
    (set,) => ({
      contacts: [],
      addContact: (user, displayName, address) => {
        const newContact: Contact = {
          id: new Date().getTime().toString(),
          user,
          displayName,
          address
        };
        set((state) => ({
          contacts: [...state.contacts, newContact]
        }));
      },
      removeContact: (id) => {
        set((state) => ({
          contacts: state.contacts.filter((c) => c.id !== id)
        }));
      },
      editDisplayName: (id, newName) => {
        set((state) => ({
          contacts: state.contacts.map((c) =>
            c.id === id ? { ...c, displayName: newName } : c
          )
        }));
      }
    }),
    {
      name: 'address-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)