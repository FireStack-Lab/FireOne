import { browser, Response } from '@fireone/utils';
import { Wallet } from '@harmony-js/account';
import { WalletErrorCodes } from './types';
// import { BackgroundMessageController } from '../types';

// import { BaseController } from './base';

export class WalletController {
  private wallet: Wallet;
  private methods: any[];

  constructor(wallet?: Wallet) {
    // super(BackgroundMessageController.WALLET_CONTROLLER);
    this.wallet = wallet || new Wallet();
    this.methods = [];
    this.setMethod('sendMessage', this.sendMessage.bind(this));
    this.setMethod('generateMnemonics', this.generateMnemonics.bind(this));
    this.setMethod('getAccounts', this.getAccounts.bind(this));
  }
  public sendMessage(message: any) {
    return browser.runtime.sendMessage(message);
  }
  public async generateMnemonics() {
    try {
      //  return Response.resolve(this.wallet.newMnemonic());
      return Response.resolve(this.wallet.newMnemonic());
    } catch (e) {
      return Response.reject(WalletErrorCodes.GENERIC_ERROR, e.message);
    }
  }
  public async getAccounts() {
    try {
      // return Response.resolve(this.wallet.accounts);
      return Response.resolve(['1', 2]);
    } catch (e) {
      return Response.reject(WalletErrorCodes.GENERIC_ERROR, e.message);
    }
  }
  public getMethod(method: string) {
    const found = this.methods.find((func: any) => func.name === method);
    if (!found) {
      throw new Error(`cannot find method: ${method}`);
    }
    return found.call;
  }

  protected setMethod(name: string, call: any) {
    this.methods.push({ name, call });
  }
}
