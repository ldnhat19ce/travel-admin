import { signal } from "@angular/core";
import { Category } from "../model/category.model";

export const categories = signal<Category[]>([]);
