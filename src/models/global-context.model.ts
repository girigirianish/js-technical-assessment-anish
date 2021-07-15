import { Car } from './cars-api-response.model';
import { CarsFilters } from './cars-filters.model';
import { Manufacturer } from './manufacturer-api-response.model';

export interface GlobalContextState {
    currentPage?: number;
    totalPageCount?: number;
    totalCarsCount?: number;
    cars?: Car[];
    filters?: CarsFilters;
    manufacturers?: Manufacturer[];
    colors?: string[];
    pageNumber?: number;
}

export interface GlobalProviderContext {
    state: GlobalContextState;
    dispatch: (stateWithChangedValues: GlobalContextState) => void;
}
