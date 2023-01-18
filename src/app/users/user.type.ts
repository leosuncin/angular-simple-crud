export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface Paginate {
  _page: number;
  _limit?: number;
}
interface Sort {
  _sort: keyof User;
  /**
   * @default 'asc'
   */
  _order: 'asc' | 'desc';
}
interface Slice {
  _start: number;
  _end: number;
  _limit?: number;
}

type PropertyMatching<
  Obj extends object,
  Type = string | number | boolean
> = keyof {
  [P in keyof Obj as Obj[P] extends Type ? P : never]: P;
};

type Operator = Record<
  `${PropertyMatching<User, number>}_${'gte' | 'lte'}`,
  number
> &
  Record<`${PropertyMatching<User>}_ne`, User[PropertyMatching<User>]> &
  Record<`${PropertyMatching<User, string>}_like`, string>;

export type FindByParams = Partial<Paginate | Sort | Slice | Operator>;
