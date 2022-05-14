export class UserModel {
    FirstName: string;
    LastName: string;
    Email: string;
    DateOfBirth: Date;
    Username: string;
    Password: string;

    public constructor(firstName: string, lastName: string, email: string, dateOfBirth: Date, username: string, password: string) {
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Email = email;
        this.DateOfBirth = dateOfBirth;
        this.Username = username;
        this.Password = password;
    }
}