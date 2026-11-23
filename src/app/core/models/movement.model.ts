export type MovementType = 'expense' | 'income';

/** auto = read from a bank notification or SMS, manual = typed by the user. */
export type MovementSource = 'auto' | 'manual';

export interface Movement {
  id: string;
  type: MovementType;
  amount: number;
  description: string;
  accountId: string;
  categoryId: string;
  date: string;
  source: MovementSource;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  type: MovementType;
}

export type NewMovement = Omit<Movement, 'id' | 'source'>;

/** Filter of the movement list by type. */
export type MovementTypeFilter = 'all' | Movement['type'];

/** Movements of one day, as grouped in the movement list. */
export interface MovementDayGroup {
  date: string;
  total: number;
  items: Movement[];
}
