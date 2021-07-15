export interface Mileage {
    number: number;
    unit: string;
  }

export interface Car {
    stockNumber: number;
    manufacturerName: string;
    modelName: string;
    color: string;
    mileage: Mileage;
    fuelType: string;
    pictureUrl: string;
    error?: unknown;
}

export interface CarsApiResponse {
  cars: Car[];
  totalPageCount: number;
  totalCarsCount: number;
}

export interface CarByStockNumberApiResponse {
  car: Car;
}
