export interface OrderDTO{
  id: number;
  price: number;
  timeToArrival: number;
  car: CarDTO;
  customer: UserDTO;
  driver: DriverDTO;
  route: RouteDTO;
}
