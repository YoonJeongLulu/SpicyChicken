import { makeAutoObservable } from 'mobx';

const chainStore = makeAutoObservable({
  chain: 'main',

  setChain(e: string) {
    this.chain = e;
  },
});

export default chainStore;
