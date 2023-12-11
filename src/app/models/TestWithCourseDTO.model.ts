export class TestWithCourseDTO {

  testId: string;
  testName: string;
  testDescription: string;
  courseId: number | null;
  courseTitle: string | null;
  courseimage: string | null;

  constructor(
    testId: string,
    testName: string,
    testDescription: string,
    courseId: number | null,
    courseTitle: string | null,
    courseimage: string | null,

  ) {
    this.testId = testId;
    this.testName = testName;
    this.testDescription = testDescription;
    this.courseId = courseId;
    this.courseTitle = courseTitle;
    this.courseimage = courseimage
  }
}
