import { makeAutoObservable } from 'mobx';
import { mainConfig } from '../config';

type configType = {
  chainId: number;
  contractAddress: string;
  scanLink: string;
};

const configStore = makeAutoObservable({
  config: mainConfig,

  setConfig(e: configType) {
    this.config = e;
  },
});

export default configStore;
