import {
  browser,
  // Runtime,
  // IResponseData
} from '@fireone/utils';
import { Blockchain } from '@harmony-js/core';
// import { Messenger } from '@harmony-js/network';

import { BaseController } from './base';

export class BlockchainController extends BaseController {
  // private blockchain: Blockchain;
  // private messenger: Messenger;
  constructor(blockchain: Blockchain) {
    super('blockchain');
    // this.blockchain = blockchain;
    // this.messenger = this.blockchain.messenger;
  }
  public sendMessage(message: any) {
    // set method to call
    this.setMethod('sendMessage', this.sendMessage);
    return browser.runtime.sendMessage(message);
  }
}
