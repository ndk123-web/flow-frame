class ClientModel {
  id: string;
  name: string;
  request: number;
  type: string = "client";

  constructor(id: string, name: string, request: number) {
    this.id = id;
    this.name = name;
    this.request = request;
  }
}
