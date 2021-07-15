import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../constants';
import { ColorsApiResponse } from '../models';

async function getColors(): Promise<string[]> {
  const response = await axios.get<null, AxiosResponse<ColorsApiResponse>>(`${BASE_URL}/colors`);
  return response.data.colors;
}

export const colorsService = {
  getColors,
};
