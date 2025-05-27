'use client';

import { useMemo, useState } from 'react';
import { useAddressStore } from '../stores/useAddressStore';
import { useToastStore } from '../stores/useToast';

export default function AddressList() {
  const { contacts, removeContact, editDisplayName } = useAddressStore();
  const { onMessage } = useToastStore();
  const [editId, setEditId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [filter, setFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');

  // Unique cities and states for filter dropdowns
  const cities = Array.from(new Set(contacts.map(c => c.address.city))).sort();
  const states = Array.from(new Set(contacts.map(c => c.address.state))).sort();


  const data = useMemo(() => {
    return contacts.filter(c =>
      (!filter || c.displayName.toLowerCase().includes(filter.toLowerCase())) &&
      (!cityFilter || c.address.city === cityFilter) &&
      (!stateFilter || c.address.state === stateFilter)
    );
  }, [contacts, filter, cityFilter, stateFilter]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2 mb-4 items-end bg-blue-50 dark:bg-gray-800 p-3 rounded-lg shadow-sm">
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-blue-900 dark:text-blue-200 mb-1" htmlFor="filter-nome">Nome</label>
          <input
            id="filter-nome"
            className="border border-blue-200 dark:border-gray-700 p-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-900 min-w-[180px]"
            placeholder="Buscar por nome de exibição"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-blue-900 dark:text-blue-200 mb-1" htmlFor="filter-cidade">Cidade</label>
          <select
            id="filter-cidade"
            className="border border-blue-200 dark:border-gray-700 p-2 rounded text-sm bg-white dark:bg-gray-900 min-w-[140px]"
            value={cityFilter}
            onChange={e => setCityFilter(e.target.value)}
          >
            <option value="">Todas as cidades</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-blue-900 dark:text-blue-200 mb-1" htmlFor="filter-estado">Estado</label>
          <select
            id="filter-estado"
            className="border border-blue-200 dark:border-gray-700 p-2 rounded text-sm bg-white dark:bg-gray-900 min-w-[120px]"
            value={stateFilter}
            onChange={e => setStateFilter(e.target.value)}
          >
            <option value="">Todos os estados</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
      </div>
      {data.length === 0 ? (
        <div className="mt-8 text-center text-gray-500">Nenhum contato encontrado.</div>
      ) : (
        <ul className="space-y-4">
          {data.map((c) => (
            <li key={c.id} className="border rounded-xl p-4 flex flex-col gap-2 bg-white dark:bg-gray-800 shadow transition hover:shadow-lg">
              <div className="flex flex-wrap gap-2 items-center justify-between">
                <span className="font-bold text-blue-700 dark:text-blue-200">Usuário:</span>
                <span className="text-gray-800 dark:text-gray-100">{c.user}</span>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="font-bold text-blue-700 dark:text-blue-200">Nome:</span>
                {editId === c.id ? (
                  <>
                    <input
                      className="border p-1 rounded text-sm"
                      value={newName}
                      onChange={e => setNewName(e.target.value)}
                    />
                    <button
                      className="bg-green-500 text-white rounded px-2 py-1 ml-2 text-xs"
                      onClick={() => {
                        editDisplayName(c.id, newName);
                        setEditId(null);
                      }}
                    >Salvar</button>
                    <button
                      className="ml-2 text-gray-500 text-xs"
                      onClick={() => setEditId(null)}
                    >Cancelar</button>
                  </>
                ) : (
                  <>
                    <span className="text-gray-800 dark:text-gray-100">{c.displayName}</span>
                    <button
                      className="ml-2 text-blue-600 underline text-xs"
                      onClick={() => {
                        setEditId(c.id);
                        setNewName(c.displayName);
                      }}
                    >Editar</button>
                  </>
                )}
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="font-bold text-blue-700 dark:text-blue-200">CEP:</span>
                <span className="text-gray-800 dark:text-gray-100">{c.cep}</span>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="font-bold text-blue-700 dark:text-blue-200">Endereço:</span>
                <span className="text-gray-800 dark:text-gray-100">{c.address.street}, {c.address.neighborhood}, {c.address.city} - {c.address.state}</span>
              </div>
              <button
                className="bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1 mt-2 self-end text-xs"
                onClick={() => {
                  removeContact(c.id);
                  onMessage({ message: 'Contato excluído com sucesso!', type: 'success' });
                }}
              >Excluir</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
