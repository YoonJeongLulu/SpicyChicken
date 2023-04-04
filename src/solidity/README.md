### 컨트랙트 로컬 환경 다루는법

Ganache gui cli 설치

ganache에 truffle-config.js를 넣어서 truffle 프로젝트 연동

truffle compile

truffle migrate --reset

### 컨트랙트 함수 호출법

truffle console

```
let instance = await SpicyChicken.deployed()
let accounts = await web3.eth.getAccounts()
instance.getBalance()
instance.getIsOngoing()
instance.getRound()
instance.buyEggs(accounts[1], {value : web3.utils.toWei(String(1),'ether')})
```
