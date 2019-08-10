export class Deferred {
  promise: Promise<any>;
  resolve!: (value?: any | PromiseLike<any>) => void;
  reject!: (reason?: any) => void;
  then?: any;

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
    this.then = this.promise.then.bind(this.promise);
  }
}
