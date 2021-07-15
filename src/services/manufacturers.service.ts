import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../constants';
import { Manufacturer, ManufacturerApiReponse } from '../models';

async function getManufacturers(): Promise<Manufacturer[]> {
  const response = await axios.get<null, AxiosResponse<ManufacturerApiReponse>>(`${BASE_URL}/manufacturers`);
  return response.data.manufacturers;
}

export const manufacturersService = {
  getManufacturers,
};
