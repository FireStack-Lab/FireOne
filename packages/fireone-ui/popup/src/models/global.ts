import { Subscription } from 'dva';

import { browser } from 'webextension-polyfill-ts';

import { ConnectionPort, WalletPlugin } from '@fireone/api';

const backgroundCommPort = browser.runtime.connect({ name: ConnectionPort.BACKGROUND } as any);

const wallet = new WalletPlugin(backgroundCommPort);

export interface GlobalModelType {
  namespace: 'global';
  state: any;
  effects: any;
  reducers: any;
  subscriptions: { setup: Subscription };
}

const GlobalModel = {
  namespace: 'global',
  state: {},
  effects: {},
  reducers: {},
  subscriptions: {
    setup(): void {
      wallet.generateMnemonics();
      browser.runtime.onMessage.addListener((message: any, sender) => {
        console.log(message);
      });
    },
  },
};

export default GlobalModel;
