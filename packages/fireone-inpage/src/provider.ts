import { Communication } from '@fireone/api';

export class HarmonyWallet {
  private comm: Communication;
  constructor(comm: Communication) {
    this.comm = comm;
    // comm.request();
  }
  public async generateMnemonics() {
    this.comm.request('DappCommunicationController', 'generateMnemonics', []);
  }
}
