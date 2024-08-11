import { signal, WritableSignal } from "@angular/core";
import { Product } from "../model/product.model";

export const productSignal: WritableSignal<Product> = signal<Product>({} as Product);
