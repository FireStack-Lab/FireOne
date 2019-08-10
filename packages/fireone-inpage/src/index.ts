// import { Harmony } from '@harmony-js/core';

// const harmony = new Harmony();
// (<any>window).harmony = harmony;

import { Communication } from '@fireone/api';
import { HarmonyWallet } from './provider';

const comm = new Communication();

class Harmony {
  public wallet: HarmonyWallet;
  private comm: Communication;

  constructor(c: Communication) {
    this.comm = c;

    this.wallet = new HarmonyWallet(this.comm);
  }
}
const harmony = new Harmony(comm);
(<any>window).harmony = harmony;
