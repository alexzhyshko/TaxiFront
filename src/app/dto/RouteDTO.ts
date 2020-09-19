import { CoordinatesDTO } from "./CoordinatesDTO";

export interface RouteDTO{
  departure: CoordinatesDTO;
  destination: CoordinatesDTO;
  distance: number;
  time: number;
}
