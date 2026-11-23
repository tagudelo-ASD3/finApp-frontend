import { Category } from '../app/core/models/movement.model';

export const CATEGORIES_MOCK: Category[] = [
  { id: 'groceries', name: 'Mercado', icon: 'cart', type: 'expense' },
  { id: 'home', name: 'Hogar', icon: 'house', type: 'expense' },
  { id: 'transport', name: 'Transporte', icon: 'bus', type: 'expense' },
  { id: 'dining', name: 'Comida fuera', icon: 'utensils', type: 'expense' },
  { id: 'subscriptions', name: 'Suscripciones', icon: 'play', type: 'expense' },
  { id: 'health', name: 'Salud', icon: 'heart', type: 'expense' },
  { id: 'leisure', name: 'Ocio', icon: 'ticket', type: 'expense' },
  { id: 'other', name: 'Otros', icon: 'more', type: 'expense' },
  { id: 'income', name: 'Ingreso', icon: 'income', type: 'income' },
];
