export interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  status: boolean;
}

export type NewUser = Omit<User, 'id' | 'created_at' | 'updated_at' | 'status'>;

export type UserUpdate = Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>;

export type UserSelect = Partial<User>;


