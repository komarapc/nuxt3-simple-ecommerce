import { UserProps } from "./user";

interface Rating {
  count?: number;
  rate?: number;
}
export interface ProductProps {
  id?: number;
  title?: string;
  description?: string;
  image?: string;
  price?: number;
  category?: string;
  rating?: Rating;
}

export interface CartProps {
  id?: string;
  quantity?: number;
  product?: ProductProps;
  user?: UserProps;
}
