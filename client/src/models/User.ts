export class User {
  userId: number;
  login: string;
  token: string;
  name: string;
  role: string;
  avatar: string;
  teamId: number;
  permissions: number;

  constructor(
    userId: number,
    login: string,
    token: string,
    name: string,
    role: string,
    avatar: string,
    teamId: number,
    permissions: number
  ) {
    this.userId = userId;
    this.login = login;
    this.token = token;
    this.name = name;
    this.role = role;
    this.avatar = avatar;
    this.teamId = teamId;
    this.permissions = permissions;
  }
}
