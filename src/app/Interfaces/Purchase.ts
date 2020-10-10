export interface Purchase {
  owner: string;
  id?: string;
  category: string;
  date: Date;
  products?: [string];
  nameOfShop?: string;
  sum: string;
}
