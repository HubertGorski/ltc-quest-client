export class User {
  userId: number;
  login: string;
  token: string;
  name: string;
  role: string;
  permissions: number[];
  avatar: string;
  teamName: string;
  teamLogo: string;
  totalTasks: number;
  completedTasks: number;

  constructor(
    userId: number,
    login: string,
    token: string,
    name: string,
    role: string,
    permissions: number[],
    avatar: string,
    teamName: string,
    teamLogo: string,
    totalTasks: number,
    completedTasks: number
  ) {
    this.userId = userId;
    this.login = login;
    this.token = token;
    this.name = name;
    this.role = role;
    this.permissions = permissions;
    this.avatar = avatar;
    this.teamName = teamName;
    this.teamLogo = teamLogo;
    this.totalTasks = totalTasks;
    this.completedTasks = completedTasks;
  }
}
