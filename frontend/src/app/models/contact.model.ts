export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  type: string;
  date: string;
  user: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  type: string;
}
