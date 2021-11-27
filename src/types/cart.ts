export interface CartStateProps {
    checkout: CartCheckoutStateProps;
}

export interface CartPayloadStateProps {
    id?: string | number;
    type: string;
    product?: CartProductStateProps;
    quantity?: number;
    step?: number;
    address?: Address;
    code?: string;
    charge?: string;
    method?: string;
    card?: string;
}

export interface CartCheckoutStateProps {
    step: number;
    products: CartProductStateProps[];
    subtotal: number;
    total: number;
    discount: number;
    shipping: number;
    billing: Address | null;
    payment: CartPaymentStateProps;
}

export interface CartProductStateProps {
    itemId?: string | number;
    id: string | number;
    name: string;
    image: string;
    salePrice: number;
    offerPrice: number;
    color: string;
    size: string | number;
    quantity: number;
}

export type Address = {
    id?: string | number | undefined;
    name: string;
    destination: string;
    building: string;
    street: string;
    city: string;
    state: string;
    country: string;
    post: string | number;
    phone: string | number;
    isDefault: boolean;
};

export interface CartPaymentStateProps {
    type: string;
    method: string;
    card: string;
}
