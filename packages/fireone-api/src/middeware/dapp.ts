import { Runtime, Response } from '@fireone/utils';
import { BaseCommunicationController } from './comm';
import { WalletPlugin } from '../plugins/wallet';

export class DappCommunicationController extends BaseCommunicationController {
  private walletPlugin: WalletPlugin;
  constructor(bgPort: Runtime.Port) {
    super('DappCommunicationController');
    this.walletPlugin = new WalletPlugin(bgPort);
    this.setMethod('generateMnemonics', this.generateMnemonics.bind(this));
  }
  get wallet() {
    return this.walletPlugin;
  }
  public async generateMnemonics() {
    const result = await this.walletPlugin.generateMnemonics();
    return Response.resolve(result);
  }
}
