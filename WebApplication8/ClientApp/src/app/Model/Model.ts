export class Customer {
  Id: number ;
  firstName: string; 
  lastName: string;
  email: string;
  address: string;
  phone: string;
  birthDate: Date;
  addressNumber?: number;
  regionId?: number;
  postalCode: string; 
  lookupRegion: Lookup;
  order: Array<Order>;
}

export interface Lookup {

  id: number;
  name: string;
}


export class PagingInfo {
  ItemsPerPage: number;
  TotalRecords: number;
  CurrentPage: number;
  TotalPages: number;
  PageData: any[];

  PagingInfo() {
    
  }

  GetTotalPages() {
    if (this.ItemsPerPage != 0)
      this.TotalPages = Math.round(this.TotalRecords / this.ItemsPerPage);
    else
      this.TotalPages = 0;

    return this.TotalPages;
  }

}

export interface Order {
  id: number;
  quantity: number;

}

export class Address
{
  address: string;
  
  regionId?: number;
  postalCode: string; 
  addressNumber ?: number;

}

export class Session {
  user: Customer;
  Token: string;
}

