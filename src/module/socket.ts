import CONSTANTS from './constants';
import API from './api';
import { debug } from './lib/lib';
import { setSocket } from '../main';

export const SOCKET_HANDLERS = {
  // TODO ADD SOCKET HANLDER
};

export let chatPortraitSocket;

export function registerSocket() {
  debug('Registered chatPortraitSocket');
  if (chatPortraitSocket) {
    return chatPortraitSocket;
  }
  //@ts-ignore
  chatPortraitSocket = socketlib.registerModule(CONSTANTS.MODULE_NAME);

  // TODO add some socket method ?
  setSocket(chatPortraitSocket);
  return chatPortraitSocket;
}
