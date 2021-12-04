export interface User {
  id: number;
  username: string;
  password: string;
  firstNam: string;
  lastName: string;
  email: string;
  phone: string;
  enabled?: Boolean;
  profile?: string;
}
