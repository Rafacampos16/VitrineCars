import { manufacturers } from "@/constant";
import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;

  const headers = {
      'x-rapidapi-key': 'f51b1bee4bmshac7aef88ad24b25p13a19bjsnd00583f0dd6d',
      'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com',
  };

  // Construa a URL dinamicamente com base nos filtros
  const queryParams = new URLSearchParams();
  if (manufacturer) queryParams.append('make', manufacturer);
  if (model) queryParams.append('model', model);
  if (year) queryParams.append('year', year.toString());
  if (fuel) queryParams.append('fuel_type', fuel);

  const response = await fetch(
      `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?${queryParams.toString()}`,
      { headers }
  );

  const result = await response.json();

  return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age
  
    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
  
    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  
    return rentalRatePerDay.toFixed(0);
  };

  export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    const url = new URL('https://cdn.imagin.studio/getimage');
    const { make, model, year } = car;
  
    url.searchParams.append('customer','hrjavascript-mastery');
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(" ")[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    // url.searchParams.append('zoomLevel', zoomLevel);
    url.searchParams.append('angle', `${angle}`);
  
    return `${url}`;
  } 

export const updateSearchParams = (type: string, value: string) => {
  
      const searchParams = new URLSearchParams(window.location.search);
  
        searchParams.set(type, value);
        
      const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

      return newPathname;
}