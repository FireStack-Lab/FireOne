import uuid from 'uuid';
import { Deferred, Runtime, Response } from '@fireone/utils';
import {
  BackgroundMessageController,
  IBackgroundMessage,
  BackgroundMessageType,
} from '../types';

const REQUEST_TIMEOUT = 8000; // ms

// tslint:disable-next-line: interface-name
export interface IRequestInfo {
  timeout: any;
  deferred: Deferred;
}

export class BgCommunication {
  protected controller: BackgroundMessageController;
  protected disableTimeout = false;
  private port: Runtime.Port;
  private requests: Map<string, IRequestInfo> = new Map();

  constructor(port: Runtime.Port, controller: BackgroundMessageController) {
    if (port) {
      this.port = port;
      this.controller = controller;
      this.port.onMessage.addListener((message: IBackgroundMessage) => {
        if (
          message.id &&
          message.type === BackgroundMessageType.RESPONSE &&
          message.response &&
          this.requests.has(message.id)
        ) {
          const requestInfo: IRequestInfo = this.requests.get(message.id) || {
            timeout: REQUEST_TIMEOUT,
            deferred: new Deferred(),
          };
          clearTimeout(requestInfo.timeout);

          if (message.response.error) {
            requestInfo.deferred.reject(message.response);
          } else {
            requestInfo.deferred.resolve(message.response.data);
          }

          this.requests.delete(message.id);
        }
      });
    } else {
      throw new Error('The constructor is not initialized');
    }
  }

  public async callAction(action: any, params?: any, timeout?: number) {
    const message: IBackgroundMessage = {
      id: uuid.v4(),
      type: BackgroundMessageType.REQUEST,
      request: {
        controller: this.controller,
        action,
        params,
      },
    };

    const deferred = new Deferred();
    this.requests.set(message.id, {
      timeout: this.getRequestTimeout(message, deferred, timeout),
      deferred,
    });
    this.port.postMessage(message);
    return deferred.promise;
  }

  protected sanitizeMessageForErrorReporting(message: IBackgroundMessage) {
    return message;
  }

  private getRequestTimeout(
    message: IBackgroundMessage,
    deferred: Deferred,
    timeout?: number,
  ) {
    if (this.disableTimeout || timeout === 0) {
      return undefined;
    }

    return setTimeout(() => {
      this.requests.delete(message.id);
      deferred.reject(
        Response.reject(
          'REQUEST_TIMEOUT',
          `Background Request timed out. (controller: ${
            this.controller
          }, action: ${((message || { request: null }).request || {}).action})`,
          this.sanitizeMessageForErrorReporting(message),
        ),
      );
    }, timeout || REQUEST_TIMEOUT);
  }
}
