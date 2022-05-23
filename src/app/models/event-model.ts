export class EventModel {
  Title: string;
  Description: string;
  StartTime: Date;
  EndTime: Date;
  UserId: string;

  public constructor(
    title: string,
    description: string,
    startTime: Date,
    endTime: Date,
    userId: string
  ) {
    this.Title = title;
    this.Description = description;
    this.StartTime = startTime;
    this.EndTime = endTime;
    this.UserId = userId;
  }
}
