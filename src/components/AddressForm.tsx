'use client';

import React, { useState } from 'react';
import { useAddressStore } from '../stores/useAddressStore';

export default function AddressForm() {
  const [user, setUser] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [cep, setCep] = useState('');
  const { addContact, loading, error, clearError } = useAddressStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addContact(user, displayName, cep);
  };

  return (
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
      />
      <button
        type="submit"
        className="bg-blue-600 text-white rounded p-2 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Buscando...' : 'Adicionar contato'}
      </button>
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded" onClick={clearError}>
          {error}
        </div>
      )}
    </form>
  );
}
