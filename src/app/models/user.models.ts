import {Role} from "./role.enum";

export class User {
  id: string|undefined;
  username: string = "";
  password: string = "";
  name: string = "";
  token: string = "";
  role: Role = Role.USER;
  profileImage?: string | null;
}
