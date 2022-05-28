export class GlucoseLogModel {
  GlucoseLevel: number;
  WhenWasLogged: string;
  Notes: string;
  UserId: string;

  public constructor(
    glucoseLevel: number,
    whenWasLogged: string,
    notes: string,
    userId: string
  ) {
    this.GlucoseLevel = glucoseLevel;
    this.WhenWasLogged = whenWasLogged;
    this.Notes = notes;
    this.UserId = userId;
  }
}
