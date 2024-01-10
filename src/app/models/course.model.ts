import { Status } from "./status.enum";

export class Course {
  id: string = '';
  title: string = '';
  duree: string = '';
  price: number = 0.0;
  lien: string = '';
  image?: File | null | undefined = undefined;
  createTime: Date = new Date();
  status: Status = Status.Available;


}
