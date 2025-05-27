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
    <li className="border rounded-xl p-4 flex flex-col gap-2 bg-white dark:bg-gray-800 shadow transition hover:shadow-lg">
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
      <div className="flex flex-wrap gap-2 items-center">
        <span className="font-bold text-blue-700 dark:text-blue-200">CEP:</span>
        <span className="text-gray-800 dark:text-gray-100">{contact.address.cep}</span>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <span className="font-bold text-blue-700 dark:text-blue-200">Endereço:</span>
        <span className="text-gray-800 dark:text-gray-100">{contact.address.street}, {contact.address.neighborhood}, {contact.address.city} - {contact.address.state}</span>
      </div>
      <button
        className="bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1 mt-2 self-end text-xs"
        onClick={() => onDelete(contact.id)}
      >Excluir</button>
    </li>
  );
}
