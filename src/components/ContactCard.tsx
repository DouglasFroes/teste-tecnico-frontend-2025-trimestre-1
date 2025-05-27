import { useState } from 'react';
import { Contact } from '../stores/useAddressStore';

interface ContactCardProps {
  contact: Contact;
  onEdit: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
}

export default function ContactCard({ contact, onEdit, onDelete }: ContactCardProps) {
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(contact.displayName);

  return (
    <li className="border rounded-xl p-4 flex flex-col gap-3 bg-white dark:bg-gray-800 shadow transition hover:shadow-lg">
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <span className="font-bold text-blue-700 dark:text-blue-200">Usuário:</span>
        <span className="text-gray-800 dark:text-gray-100">{contact.user}</span>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <span className="font-bold text-blue-700 dark:text-blue-200">Nome:</span>
        {editMode ? (
          <>
            <input
              className="border p-1 rounded text-sm"
              value={newName}
              onChange={e => setNewName(e.target.value)}
            />
            <button
              className="bg-green-500 text-white rounded px-2 py-1 ml-2 text-xs"
              onClick={() => {
                onEdit(contact.id, newName);
                setEditMode(false);
              }}
            >Salvar</button>
            <button
              className="ml-2 text-gray-500 text-xs"
              onClick={() => setEditMode(false)}
            >Cancelar</button>
          </>
        ) : (
          <>
            <span className="text-gray-800 dark:text-gray-100">{contact.displayName}</span>
            <button
              className="ml-2 text-blue-600 underline text-xs"
              onClick={() => {
                setEditMode(true);
                setNewName(contact.displayName);
              }}
            >Editar</button>
          </>
        )}
      </div>
      <section className="mt-2 p-4 rounded-xl bg-gradient-to-br from-blue-100/60 to-blue-200/40 dark:from-gray-900 dark:to-gray-800 border border-blue-100 dark:border-gray-700 flex flex-col gap-2 shadow-inner">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-blue-800 dark:text-blue-100 text-base tracking-wide">Endereço</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs text-blue-700 dark:text-blue-200">CEP:</span>
            <span className="text-gray-800 dark:text-gray-100 font-mono text-sm">{contact.address.cep}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs text-blue-700 dark:text-blue-200">Logradouro:</span>
            <span className="text-gray-800 dark:text-gray-100">{contact.address.street}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs text-blue-700 dark:text-blue-200">Bairro:</span>
            <span className="text-gray-800 dark:text-gray-100">{contact.address.neighborhood}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs text-blue-700 dark:text-blue-200">Cidade:</span>
            <span className="text-gray-800 dark:text-gray-100">{contact.address.city}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs text-blue-700 dark:text-blue-200">Estado:</span>
            <span className="text-gray-800 dark:text-gray-100">{contact.address.state}</span>
          </div>
        </div>
      </section>
      <div className="flex justify-end gap-2 mt-2">
        <button
          className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white rounded-full px-4 py-2 text-xs font-semibold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
          onClick={e => {
            e.stopPropagation();
            onDelete(contact.id);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          Excluir
        </button>
      </div>
    </li>
  );
}
