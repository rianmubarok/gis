export interface Subcategory {
    id: string;
    name: string;
    category_id?: string;
}

export interface Category {
    id: string;
    name: string;
    icon?: string;
    subcategories: Subcategory[];
}

export interface Location {
    id: string;
    name: string;
    latitude: number | string;
    longitude: number | string;
    description?: string;
    category_id?: string;
    subcategory_id?: string;
    condition?: string;
    address?: string;
    dusun?: string;
    contact?: string;
    color?: string;
}
