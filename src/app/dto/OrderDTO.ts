import { CarDTO } from "./CarDTO";
import { UserDTO } from "./UserDTO";
import { DriverDTO } from "./DriverDTO";
import { RouteDTO } from "./RouteDTO";

export interface OrderDTO{
  id: number;
  price: number;
  timeToArrival: number;
  car: CarDTO;
  customer: UserDTO;
  driver: DriverDTO;
  route: RouteDTO;
}
