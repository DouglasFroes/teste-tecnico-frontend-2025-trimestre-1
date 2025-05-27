import cep from 'cep-promise';
import { Address } from '../stores/useAddressStore';

export async function fetchAddressByCep(cepValue: string): Promise<Address> {
  const address = await cep(cepValue);
  return {
    cep: address.cep,
    state: address.state,
    city: address.city,
    neighborhood: address.neighborhood,
    street: address.street,
  };
}
