'use client';

import { useMemo, useState } from 'react';
import { useAddressStore } from '../stores/useAddressStore';
import { useToastStore } from '../stores/useToast';
import ContactCard from './ContactCard';

export default function AddressList() {
  const { contacts, removeContact, editDisplayName } = useAddressStore();
  const { onMessage } = useToastStore();
  const [filter, setFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');

  // Unique cities and states for filter dropdowns
  const cities = Array.from(new Set(contacts.map(c => c.address.city))).sort();
  const states = Array.from(new Set(contacts.map(c => c.address.state))).sort();

  function handleDeleteContact(id: string) {
    removeContact(id);
    onMessage({ message: 'Contato excluído com sucesso!', type: 'success' });
  }

  function handleEditDisplayName(id: string, newName: string) {
    editDisplayName(id, newName);
    onMessage({ message: 'Nome de exibição atualizado com sucesso!', type: 'info' });
  }


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
            <ContactCard
              key={c.id}
              contact={c}
              onEdit={handleEditDisplayName}
              onDelete={handleDeleteContact}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
