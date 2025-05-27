'use client';

import { fetchAddressByCep } from "@/services/cepService";
import React, { useState } from "react";
import { useAddressStore } from "../stores/useAddressStore";
import { useToastStore } from "../stores/useToast";

export default function CreateContactModal() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [cep, setCep] = useState('');
  const { addContact } = useAddressStore();
  const [loading, setLoading] = useState(false);

  const { onMessage } = useToastStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await fetchAddressByCep(cep);
    if (result.type === 'error') {
      onMessage({ message: result.message, type: 'error' });
      setLoading(false);
      return;
    }
    addContact(user, displayName, result.address);
    onMessage({ message: 'Contato adicionado com sucesso!', type: 'success' });
    setUser('');
    setDisplayName('');
    setCep('');
    setLoading(false);
    setOpen(false);
  };

  return (
    <>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded px-6 py-2 shadow transition mb-2"
        onClick={() => setOpen(true)}
      >
        + Novo contato
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 w-full max-w-md relative animate-fade-in">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl font-bold"
              onClick={() => setOpen(false)}
              aria-label="Fechar"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200 text-center">Novo contato</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md w-full">
              <input
                className="border p-2 rounded"
                placeholder="Usuário"
                value={user}
                onChange={e => setUser(e.target.value)}
                required
              />
              <input
                className="border p-2 rounded"
                placeholder="Nome de exibição"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                required
              />
              <input
                className="border p-2 rounded"
                placeholder="CEP"
                value={cep}
                onChange={e => setCep(e.target.value)}
                required
                type="text"
                pattern="\d{5}-?\d{3}"
                title="Formato: 12345-678 ou 12345678"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white rounded p-2 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Buscando...' : 'Adicionar contato'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
