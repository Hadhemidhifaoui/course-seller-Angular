export class Purchase {
  id: number | undefined;
  userId: string | undefined;
  courseId: number | undefined;
  title: string = "";
  price: number | undefined;
  purchaseTime: Date = new Date();

  constructor(userId?: string, courseId?: number, title: string = "", price?: number) {
    this.userId = userId;
    this.courseId = courseId;
    this.title = title;
    this.price = price;
  }
}
