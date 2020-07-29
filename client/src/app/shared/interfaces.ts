export interface Organization {
  name: String,
  email: String,
  password: String
}
export interface Auditor {
  email: String,
  password: String
}
export interface Client {
  dossierNumber: number,
  name: string,
  age?: number,
  language?: string,
  married?: boolean,
  partner?: string,
  phone?: string,
  address?: string,
  imageSrc?: string,
  haveChildren?: boolean,
  listChild?: string,
  user?: string,
  _id:string
}
export interface Message {
  message: String;
  message1: string
}
export interface Filter {
  start?: number
  end?: number,
  dossierNumber?: number,
  name?: string
}

