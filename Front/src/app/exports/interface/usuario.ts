export interface Usuario {
  id?: number;
  login: string;
  prestador: boolean;
  password: string | null;
  username: string;
}
