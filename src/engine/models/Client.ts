import type { NodeInstance } from "../contracts";

// for the NodeRegistry we will store the instance of the ClientModel
class ClientModel implements NodeInstance {
  id: string;
  name: string;
  // request: number;
  type: string = "client";
  dataToPassToNextNode: any = {};
  currentDataToPassToNextNode: any = {};

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    // this.request = request;
  }

  // value: means object
  addDataToPassToNextNode(key: string, value: { [key: string]: any } | any[]) {
    this.dataToPassToNextNode[key] = value;
  }

  getDataToPassToNextNode(key: string) {
    return this.dataToPassToNextNode[key] ?? null;
  }

  // it means it will be object key as string and value can be anything, or it can be an array of any type
  addCurrentDataToPassToNextNode(data: { [key: string]: any } | any[]) {
    this.currentDataToPassToNextNode = data;
  }

  getCurrentDataToPassToNextNode() {
    return this.currentDataToPassToNextNode ?? null;
  }
}

export default ClientModel;
