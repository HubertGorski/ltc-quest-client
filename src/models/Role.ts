export class Role {
  id: number;
  name: string;
  permissions: number[];

  constructor(id: number, name: string, permissions: number[]) {
    this.id = id;
    this.name = name;
    this.permissions = permissions;
  }
}
