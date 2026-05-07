export interface UserData {
  id: number;
  email: string;
  password: string;
}

export interface IUserRepository {
  save(user: { email: string; password: string }): Promise<UserData>;
  findByEmail(email: string): Promise<UserData | null>;
}