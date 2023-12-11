import { Course } from "./course.model";
import { User } from "./user.models";

export class Purchase {
  id: string = "";
  userId: string  = "";
  courseId: string = "";
  title: string = "";
  price: number | undefined;
  purchaseTime: Date = new Date();

  userDetails?: User;
  // Nouveau champ pour les détails du cours
  courseDetails?: Course

  constructor(userId?: string, courseId?: string, title: string = "", price?: number) {

    this.title = title;
    this.price = price;
  }
}
