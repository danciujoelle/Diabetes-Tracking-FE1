export class InsulinLogModel {
  InsulinIntake: number;
  WhenWasInjected: string;
  Notes: string;
  UserId: string;

  public constructor(
    insulinIntake: number,
    whenWasInjected: string,
    notes: string,
    userId: string
  ) {
    this.InsulinIntake = insulinIntake;
    this.WhenWasInjected = whenWasInjected;
    this.Notes = notes;
    this.UserId = userId;
  }
}
