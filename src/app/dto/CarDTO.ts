import { CoordinatesDTO } from "./CoordinatesDTO";

export interface CarDTO{
  id: number;
  manufacturer: string;
  model: string;
  passengerCount: number;
  plate: string;
  priceMultiplier: number;
  category: string;
  coordinates: CoordinatesDTO;
}
