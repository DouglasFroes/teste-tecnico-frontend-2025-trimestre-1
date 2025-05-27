import cep from 'cep-promise';
import { Address } from '../stores/useAddressStore';

function isValidCep(cepValue: string): boolean {
  const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
  return cepRegex.test(cepValue);
}

type IResponse =
  | { type: 'error'; message: string; address?: never }
  | { type: 'success'; address: Address; message?: never };

export async function fetchAddressByCep(cepValue: string): Promise<IResponse> {
  const isValid = isValidCep(cepValue);

  if (!isValid) {
    return {
      message: 'CEP inválido. Use o formato XXXXX-XXX.',
      type: 'error',
    };
  }

  try {
    const address = await cep(cepValue);
    return {
      type: 'success',
      address: {
        cep: address.cep,
        state: address.state,
        city: address.city,
        neighborhood: address.neighborhood,
        street: address.street,
      },
    };
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : 'Erro ao buscar o CEP. Verifique se o CEP está correto.',
      type: 'error',
    };
  }
}


