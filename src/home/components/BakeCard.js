/* eslint-disable react-hooks/exhaustive-deps */
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/system';
import { useLocation } from 'react-router-dom';
import Web3 from 'web3';

import PriceInput from './PriceInput';
import { useContractContext } from '../../providers/ContractProvider';
import { useAuthContext } from '../../providers/AuthProvider';
import { useEffect, useState } from 'react';
import configStore from '../../store/configStore';

const CardWrapper = styled(Card)({
  background: 'rgb(251 241 225)',
  marginBottom: 24,
});

const ButtonContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    '> div': {
      marginLeft: 0,
      marginRight: 0,
    },
  },
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function BakeCard() {
  const { contract, wrongNetwork, getBnbBalance, fromWei, toWei, web3 } = useContractContext();
  const { address, chainId } = useAuthContext();
  const [contractBNB, setContractBNB] = useState(0);
  const [walletBalance, setWalletBalance] = useState({
    bnb: 0,
    beans: 0,
    rewards: 0,
  });
  const [bakeBNB, setBakeBNB] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isOnGoing, setIsOnGoing] = useState(false);
  const query = useQuery();

  const fetchContractBNBBalance = () => {
    if (!web3 || wrongNetwork) {
      setContractBNB(0);
      return;
    }
    getBnbBalance(configStore.config.contractAddress).then((amount) => {
      setContractBNB(fromWei(amount));
    });
  };

  const fetchWalletBalance = async () => {
    if (!web3 || wrongNetwork || !address) {
      setWalletBalance({
        bnb: 0,
        beans: 0,
        rewards: 0,
      });
      return;
    }

    try {
      const [bnbAmount, beansAmount, rewardsAmount, onGoing] = await Promise.all([
        getBnbBalance(address),
        contract.methods
          .getMyMiners(address)
          .call()
          .catch((err) => {
            // console.error("myminers", err);
            return 0;
          }),
        contract.methods
          .beanRewards(address)
          .call()
          .catch((err) => {
            // console.error("beanrewards", err);
            return 0;
          }),
        contract.methods
          .getIsOngoing()
          .call()
          .catch((err) => {
            return false;
          }),
      ]);
      setWalletBalance({
        bnb: fromWei(`${bnbAmount}`),
        beans: beansAmount,
        rewards: fromWei(`${rewardsAmount}`),
      });
      setIsOnGoing(onGoing);
    } catch (err) {
      // console.error(err);
      setWalletBalance({
        bnb: 0,
        beans: 0,
        rewards: 0,
      });
    }
  };

  const onUpdateBakeBNB = (value) => {
    setBakeBNB(value);
  };

  const getRef = () => {
    const ref = Web3.utils.isAddress(query.get('ref')) ? query.get('ref') : '0x0000000000000000000000000000000000000000';
    return ref;
  };

  const bake = async () => {
    setLoading(true);

    const ref = getRef();

    try {
      await contract.methods.buyEggs(ref).send({
        from: address,
        value: toWei(`${bakeBNB}`),
      });
    } catch (err) {
      // console.error(err);
    }
    fetchWalletBalance();
    fetchContractBNBBalance();
    setLoading(false);
  };

  const reBake = async () => {
    setLoading(true);

    const ref = getRef();

    try {
      await contract.methods.hatchEggs(ref).send({
        from: address,
      });
    } catch (err) {
      // console.error(err);
    }
    setLoading(false);
  };

  const eatBeans = async () => {
    setLoading(true);

    try {
      await contract.methods.sellEggs().send({
        from: address,
      });
    } catch (err) {
      // console.error(err);
    }
    fetchWalletBalance();
    fetchContractBNBBalance();
    setLoading(false);
  };

  useEffect(() => {
    fetchContractBNBBalance();
  }, [web3, chainId]);

  useEffect(() => {
    fetchWalletBalance();
  }, [address, web3, chainId]);

  return (
    <CardWrapper>
      {loading && <LinearProgress color="secondary" />}
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center" mt={3}>
          <Typography variant="body1">Contract</Typography>
          <Typography variant="h5">{contractBNB} BNB</Typography>
        </Grid>
        <Grid container justifyContent="space-between" alignItems="center" mt={3}>
          <Typography variant="body1">Wallet</Typography>
          <Typography variant="h5">{walletBalance.bnb} BNB</Typography>
        </Grid>
        <Grid container justifyContent="space-between" alignItems="center" mt={3}>
          <Typography variant="body1">Your Chickens</Typography>
          <Typography variant="h5">{walletBalance.beans} Chickens</Typography>
        </Grid>
        <Box paddingTop={4} paddingBottom={3}>
          <Box>
            <PriceInput max={+walletBalance.bnb} value={bakeBNB} onChange={(value) => onUpdateBakeBNB(value)} />
          </Box>
          <Box marginTop={3} marginBottom={3}>
            <Button variant="contained" fullWidth disabled={wrongNetwork || !address || +bakeBNB === 0 || loading} onClick={bake}>
              Raise Chickens
            </Button>
          </Box>
          <Divider />
          <Grid container justifyContent="space-between" alignItems="center" mt={3}>
            <Typography variant="body1" fontWeight="bolder">
              Your Rewards
            </Typography>
            <Typography variant="h5" fontWeight="bolder">
              {walletBalance.rewards} BNB
            </Typography>
          </Grid>
          <ButtonContainer container>
            <Grid item flexGrow={1} marginRight={1} marginTop={3}>
              <Button variant="contained" color="secondary" fullWidth disabled={wrongNetwork || !address || loading} onClick={reBake}>
                RE-Raise
              </Button>
            </Grid>
            <Grid flexGrow={1} marginLeft={1} item marginTop={3}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                disabled={wrongNetwork || !address || loading || !isOnGoing}
                onClick={eatBeans}
              >
                Cook Chickens
              </Button>
            </Grid>
          </ButtonContainer>
        </Box>
      </CardContent>
    </CardWrapper>
  );
}
