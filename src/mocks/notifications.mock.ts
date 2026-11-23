import { AppNotification } from '../app/core/models/notification.model';
import { daysAgo } from './mock-dates';

export const NOTIFICATIONS_MOCK: AppNotification[] = [
  {
    id: 'n1',
    kind: 'detected',
    title: 'Movimiento registrado desde Nequi',
    message: 'Compra por $ 86.400 en Mercado Éxito. Toca para cambiar la categoría.',
    date: daysAgo(0, 19, 43),
    read: false,
  },
  {
    id: 'n2',
    kind: 'payment',
    title: 'Se acerca el pago de tu Tarjeta Visa',
    message: 'La cuota de $ 450.000 vence pronto. Págala a tiempo y evita intereses de mora.',
    date: daysAgo(0, 8, 0),
    read: false,
  },
  {
    id: 'n3',
    kind: 'budget',
    title: 'Pasaste el límite de Comida fuera',
    message: 'Llevas $ 186.000 de $ 150.000 este mes.',
    date: daysAgo(1, 20, 15),
    read: false,
  },
  {
    id: 'n4',
    kind: 'tip',
    title: 'Puedes ahorrar en intereses',
    message: 'Si abonas $ 70.000 extra a tu Tarjeta Visa este mes, ahorras cerca de $ 128.000.',
    date: daysAgo(3, 9, 30),
    read: true,
  },
];
