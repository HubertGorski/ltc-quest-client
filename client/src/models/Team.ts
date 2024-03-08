export class Team {
  teamId: number;
  name: string;
  color: string;
  logo: string;
  points: number;
  size: number;

  constructor(
    teamId: number,
    name: string,
    color: string,
    logo: string,
    points: number = 0,
    size: number = 0
  ) {
    this.teamId = teamId;
    this.name = name;
    this.color = color;
    this.logo = logo;
    this.points = points;
    this.size = size;
  }
}
