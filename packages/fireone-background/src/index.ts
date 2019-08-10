import {
  // BaseController,
  WalletController,
  BackgroundMessageController,
  IBackgroundMessage,
  BackgroundMessageType,
  ConnectionPort,
} from '@fireone/api';

// import uuid from 'uuid';

import { browser, Runtime, Response, IResponseData } from '@fireone/utils';

const generateResponse = (
  message: IBackgroundMessage,
  response: IResponseData,
) => {
  return { ...message, type: BackgroundMessageType.RESPONSE, response };
};

const walletController = new WalletController();

interface Controllers {
  [key: string]: any;
}

const controllers: Controllers = {};

controllers[
  `${BackgroundMessageController.WALLET_CONTROLLER}`
] = walletController;

browser.runtime.onConnect.addListener((port: Runtime.Port) => {
  if (port.name === ConnectionPort.BACKGROUND) {
    // const connectionId = uuid.v4();

    let portDisconnected = false;
    port.onDisconnect.addListener(() => {
      portDisconnected = true;
    });
    // console.log('bg port connected');
    port.onMessage.addListener(async (message: IBackgroundMessage) => {
      // console.log('bg port', {message, sender: port.sender});
      // TODO: extra check the message (sender.id)
      console.log({
        message,
        controller: controllers[message.request.controller],
        sender: port.sender,
        method: typeof controllers[message.request.controller].getMethod(
          message.request.action,
        ),
      });
      if (
        message.id &&
        message.type === BackgroundMessageType.REQUEST &&
        message.request &&
        controllers[message.request.controller] &&
        typeof controllers[message.request.controller].getMethod(
          message.request.action,
        ) === 'function'
      ) {
        try {
          const response = await controllers[
            message.request.controller
          ].getMethod(message.request.action)(
            port.sender,
            ...(message.request.params || []),
          );
          if (!portDisconnected) {
            port.postMessage(generateResponse(message, response));
            // console.log('bg port', 'response', response);
          }
        } catch (error) {
          if (!portDisconnected) {
            port.postMessage(
              generateResponse(
                message,
                Response.reject('GENERIC_ERROR', error),
              ),
            );
          }
        }
      } else {
        port.postMessage(
          generateResponse(message, Response.reject('INVALID_REQUEST')),
        );
      }
    });
  }
});
