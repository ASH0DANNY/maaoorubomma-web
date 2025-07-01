export interface Address {
    id: string;
    name: string;
    houseNumber: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    isDefault?: boolean;
}
