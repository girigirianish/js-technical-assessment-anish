import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../constants';
import {
  Car, CarByStockNumberApiResponse, CarsApiResponse, GetCarsParams,
} from '../models';

async function getCars(params: GetCarsParams): Promise<CarsApiResponse> {
  const response = await axios.get<null, AxiosResponse<CarsApiResponse>>(`${BASE_URL}/cars`, { params });
  return response.data;
}

async function getCarByStockNumber(stockNumber: number): Promise<Car> {
  const response = await axios.get<null, AxiosResponse<CarByStockNumberApiResponse>>(`${BASE_URL}/cars/${stockNumber}`);
  return response.data.car;
}

export const carService = {
  getCars,
  getCarByStockNumber,
};
