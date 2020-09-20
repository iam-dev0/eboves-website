export class OrderRequest {
  readonly shippingInfo: ShippingInfo;

  constructor(
    readonly source: string,
    readonly shippingMethod: string,
    readonly cart: CartItem[],
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: string,
    city: string
  ) {
    this.shippingInfo = {
      name: `${firstName} ${lastName}`,
      email,
      phone,
      address,
      city,
    };
  }
}

interface ShippingInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

interface CartItem {
  id: number;
  quantity: number;
}
