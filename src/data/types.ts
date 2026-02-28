// All possible brands in your dataset
export type ShoeBrand =
  | "Nike"
  | "New Balance";


// All possible primary color labels found in your data
export type ShoePrimaryColor =
  | "dark_gray"
  | "light_gray"
  | "gray"
  | "black"
  | "white"
  | "blue"
  | "red"
  | "green"
  | "yellow"
  | "orange"
  | "purple"
  | "pink"
  | "teal";


// export Type for one shoe item
export interface ShoeType {
  title: string;
  price: string;
  image_url: string;
  product_url: string;
  brand: ShoeBrand;
  primary_color: ShoePrimaryColor;
  primary_color_hex: string; // hex color string
}


// export Type for full dataset array
export type Shoes = ShoeType[];