import { Movement } from '../app/core/models/movement.model';
import { dayOfThisMonth, daysAgo } from './mock-dates';

export const MOVEMENTS_MOCK: Movement[] = [
  { id: 'm01', type: 'expense', amount: 86400, description: 'Mercado Éxito', accountId: 'nequi', categoryId: 'groceries', date: daysAgo(0, 19, 42), source: 'auto' },
  { id: 'm02', type: 'income', amount: 3200000, description: 'Salario', accountId: 'bancolombia', categoryId: 'income', date: daysAgo(1, 8, 5), source: 'auto' },
  { id: 'm03', type: 'expense', amount: 18000, description: 'Almuerzo', accountId: 'cash', categoryId: 'dining', date: daysAgo(1, 13, 10), source: 'manual' },
  { id: 'm04', type: 'expense', amount: 47050, description: 'Uber', accountId: 'visa', categoryId: 'transport', date: dayOfThisMonth(14, 21), source: 'auto' },
  { id: 'm05', type: 'expense', amount: 50000, description: 'Concierto', accountId: 'nequi', categoryId: 'leisure', date: dayOfThisMonth(13, 20), source: 'auto' },
  { id: 'm06', type: 'expense', amount: 40000, description: 'Regalo cumpleaños', accountId: 'daviplata', categoryId: 'other', date: dayOfThisMonth(12, 17), source: 'auto' },
  { id: 'm07', type: 'expense', amount: 70000, description: 'Rappi', accountId: 'nequi', categoryId: 'dining', date: dayOfThisMonth(11, 20), source: 'auto' },
  { id: 'm08', type: 'expense', amount: 60000, description: 'Gasolina', accountId: 'bancolombia', categoryId: 'transport', date: dayOfThisMonth(10, 7), source: 'auto' },
  { id: 'm09', type: 'expense', amount: 38900, description: 'Netflix', accountId: 'visa', categoryId: 'subscriptions', date: dayOfThisMonth(9, 6), source: 'auto' },
  { id: 'm10', type: 'income', amount: 50000, description: 'Transferencia de Ana', accountId: 'daviplata', categoryId: 'income', date: dayOfThisMonth(8, 18), source: 'auto' },
  { id: 'm11', type: 'expense', amount: 2950, description: 'Bus', accountId: 'cash', categoryId: 'transport', date: dayOfThisMonth(8, 7), source: 'manual' },
  { id: 'm12', type: 'expense', amount: 24500, description: 'Farmacia', accountId: 'nequi', categoryId: 'health', date: dayOfThisMonth(7, 16), source: 'auto' },
  { id: 'm13', type: 'expense', amount: 98000, description: 'Crepes & Waffles', accountId: 'visa', categoryId: 'dining', date: dayOfThisMonth(7, 20), source: 'auto' },
  { id: 'm14', type: 'expense', amount: 133600, description: 'Carulla', accountId: 'bancolombia', categoryId: 'groceries', date: dayOfThisMonth(6, 11), source: 'auto' },
  { id: 'm15', type: 'expense', amount: 900000, description: 'Arriendo', accountId: 'bancolombia', categoryId: 'home', date: dayOfThisMonth(5, 9), source: 'auto' },
  { id: 'm16', type: 'expense', amount: 45000, description: 'Cine', accountId: 'daviplata', categoryId: 'leisure', date: dayOfThisMonth(4, 19), source: 'auto' },
  { id: 'm17', type: 'expense', amount: 200000, description: 'Mercado D1', accountId: 'cash', categoryId: 'groceries', date: dayOfThisMonth(3, 10), source: 'manual' },
  { id: 'm18', type: 'expense', amount: 100000, description: 'Gasolina', accountId: 'visa', categoryId: 'transport', date: dayOfThisMonth(2, 8), source: 'auto' },
];
