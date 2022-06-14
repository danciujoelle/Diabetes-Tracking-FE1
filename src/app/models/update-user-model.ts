export class UpdateUserModel {
  UserId: string;
  FirstName: string;
  LastName: string;
  Email: string;
  DateOfBirth: Date;
  Username: string;
  Password: string;
  HasDiabetes: boolean;
  DiabetesType: string;

  public constructor(
    userId: string,
    firstName: string,
    lastName: string,
    email: string,
    dateOfBirth: Date,
    username: string,
    password: string,
    hasDiabetes: boolean,
    diabetesType: string
  ) {
    this.UserId = userId;
    this.FirstName = firstName;
    this.LastName = lastName;
    this.Email = email;
    this.DateOfBirth = dateOfBirth;
    this.Username = username;
    this.Password = password;
    this.HasDiabetes = hasDiabetes;
    this.DiabetesType = diabetesType;
  }
}
