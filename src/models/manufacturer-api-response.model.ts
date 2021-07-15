export interface CarModelDetail {
    name: string;
}

export interface Manufacturer {
    name: string;
    models: CarModelDetail[];
}

export interface ManufacturerApiReponse {
    manufacturers: Manufacturer[]
}
