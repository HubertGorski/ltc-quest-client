export class User {
  userId: number;
  login: string;
  token: string;
  name: string;
  roleName: string;
  permissions: number[];
  avatar: string;
  teamName: string;
  teamLogo: string;
  teamColor: string;
  totalTasks: number;
  completedTasks: number;

  constructor(
    userId: number,
    login: string,
    token: string,
    name: string,
    roleName: string,
    permissions: number[],
    avatar: string,
    teamName: string,
    teamLogo: string,
    teamColor: string,
    totalTasks: number,
    completedTasks: number
  ) {
    this.userId = userId;
    this.login = login;
    this.token = token;
    this.name = name;
    this.roleName = roleName;
    this.permissions = permissions;
    this.avatar = avatar;
    this.teamName = teamName;
    this.teamLogo = teamLogo;
    this.teamColor = teamColor;
    this.totalTasks = totalTasks;
    this.completedTasks = completedTasks;
  }
}
