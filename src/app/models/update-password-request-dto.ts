export class UpdatePasswordRequestDto {
  UserId: string;
  NewPassword: string;

  public constructor(userId: string, newPassword: string) {
    this.UserId = userId;
    this.NewPassword = newPassword;
  }
}
