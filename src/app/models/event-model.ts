export class EventModel {
  Title: string;
  StartTime: Date;
  EndTime: Date;
  UserId: string;

  public constructor(
    title: string,
    startTime: Date,
    endTime: Date,
    userId: string
  ) {
    this.Title = title;
    this.StartTime = startTime;
    this.EndTime = endTime;
    this.UserId = userId;
  }
}
