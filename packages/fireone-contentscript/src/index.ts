import extensionizer from 'extensionizer';
import { DappCommunicationController, ConnectionPort } from '@fireone/api';
import { browser } from '@fireone/utils';

const injectionSite = document.head || document.documentElement;
const container = document.createElement('script');

interface ExtendedGlobalEventHandlers extends GlobalEventHandlers {
  parentNode?: any;
}

container.src = extensionizer.extension.getURL('inPage.js');

container.onload = function() {
  // tslint:disable-next-line: no-this-assignment
  const globalEvent: ExtendedGlobalEventHandlers = this;
  globalEvent.parentNode.removeChild(globalEvent);
};

injectionSite.insertBefore(container, injectionSite.children[0]);
const bgPort = browser.runtime.connect({
  name: ConnectionPort.BACKGROUND,
} as any);
new DappCommunicationController(bgPort).listen();
