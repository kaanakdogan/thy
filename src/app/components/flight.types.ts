type AirportType = {
  name: string;
  code: string;
  city: {
    code: string;
    name: string;
  };
  country: {
    code: string;
    name: string;
  };
};

export type SubCategoryType = {
  brandCode: 'ecoFly' | 'extraFly' | 'primeFly';
  price: {
    amount: number;
    currency: string;
  };
  order: number;
  status: string;
  rights: string[];
};

export type CategoryType = {
  subcategories: SubCategoryType[];
};

export type FlightType = {
  originAirport: AirportType;
  destinationAirport: AirportType;
  arrivalDateTimeDisplay: string;
  departureDateTimeDisplay: string;
  flightDuration: string;
  fareCategories: {
    BUSINESS: CategoryType;
    ECONOMY: CategoryType;
  };
};
