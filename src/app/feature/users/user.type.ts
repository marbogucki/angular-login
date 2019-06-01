export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserDetails extends User {
  age: number;
  position: string;
}
