export type MovementType = 'expense' | 'income';

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

export type MovementTypeFilter = 'all' | MovementType;

export interface MovementDayGroup {
  date: string;
  total: number;
  items: Movement[];
}
