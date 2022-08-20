import {ipcRenderer} from 'electron';

export async function loadImages() {
  return await ipcRenderer.invoke('loadImages');
}
