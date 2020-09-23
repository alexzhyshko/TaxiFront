import {OrderDTO} from "../OrderDTO";

export interface UserOrdersResponse{
  orders: Array<OrderDTO>;
  numberOfPages: number;
}
