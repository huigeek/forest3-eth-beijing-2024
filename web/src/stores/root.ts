import { Web3Store } from "./web3";

export class RootStore {
  web3Store: Web3Store;

  constructor() {
    this.web3Store = new Web3Store();
  }
}
