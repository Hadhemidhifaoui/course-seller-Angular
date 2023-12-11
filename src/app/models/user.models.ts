import {Role} from "./role.enum";
import { Statut} from "./statut.enum";

export class User {
  id: string = "";
  username: string = "";

  name: string = "";
  statut?: Statut;
  phone: string = "";
  adresse: string = "";
  createTime?: Date;
  image?: string | null;
  token?: string = "";
  role: Role = Role.USER;
  password: string = "";

}
