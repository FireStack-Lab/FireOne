import { Response } from '@fireone/utils';

export class BaseCommunicationController {
  protected controllerName: string;
  protected methods: any[];

  constructor(controllerName: string) {
    this.controllerName = controllerName;
    this.methods = [];
  }

  public async _onMessage(event: MessageEvent) {
    // We only accept messages from ourselves
    if (event.source !== window) {
      return;
    }
    console.log(event);

    if (
      event.isTrusted &&
      event.data &&
      event.data.type === 'REQUEST' &&
      event.data.controller === this.controllerName &&
      event.data.method &&
      event.data.method !== 'listen' &&
      event.data.id &&
      typeof this.getMethod(event.data.method.replace(/^_/, '')) === 'function'
    ) {
      try {
        const response = await this.getMethod(
          event.data.method.replace(/^_/, ''),
        )(...event.data.params);

        window.postMessage(
          {
            ...event.data,
            type: 'RESPONSE',
            response,
          },
          document.location.href,
        );
      } catch (e) {
        window.postMessage(
          {
            ...event.data,
            type: 'RESPONSE',
            response: Response.reject(
              e.code || 'GENERIC_ERROR',
              e.message,
              e.data,
            ),
          },
          document.location.href,
        );
      }
    }
  }

  public listen() {
    // console.log('BaseCommunicationController', 'listen');
    window.addEventListener('message', this._onMessage.bind(this));
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
