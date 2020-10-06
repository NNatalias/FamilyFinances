export interface Purchase {
  id?: string;
  category: string;
  date: Date;
  products?: [string];
  nameOfShop?: string;
  sum: string;
}
