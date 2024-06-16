import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const CategorieActivite = {
  'Art': 'Art',
  'Bois': 'Bois',
  'Textile': 'Textile',
  'Ameublement': 'Ameublement',
  'Bâtiment': 'Bâtiment',
  'Transport': 'Transport',
  'Services aux particuliers': 'Services-aux-particuliers',
  'Autres': 'Autres',
}
