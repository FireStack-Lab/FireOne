import { Runtime } from '@fireone/utils';
import { BgCommunication } from '../communications/bg';
import {
  BackgroundMessageController,
  //   IBackgroundMessage,
  //   BackgroundMessageType,
} from '../types';

export class WalletPlugin extends BgCommunication {
  constructor(port: Runtime.Port) {
    super(port, BackgroundMessageController.WALLET_CONTROLLER);
  }
  public generateMnemonics(): Promise<string> {
    return this.callAction('generateMnemonics');
  }

  public get accounts() {
    return this.callAction('accounts');
  }
}
