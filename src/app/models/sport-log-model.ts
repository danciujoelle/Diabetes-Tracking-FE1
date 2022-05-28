export class SportLogModel {
  Duration: number;
  TypeOfActivity: string;
  Notes: string;
  UserId: string;

  public constructor(
    duration: number,
    typeOfActivity: string,
    notes: string,
    userId: string
  ) {
    this.Duration = duration;
    this.TypeOfActivity = typeOfActivity;
    this.Notes = notes;
    this.UserId = userId;
  }
}
