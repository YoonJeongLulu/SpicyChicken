import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Connect from './components/Connect';
import Header from './components/Header';
import BakeCard from './components/BakeCard';
import NutritionFacts from './components/NutritionFacts';
import ReferralLink from './components/ReferralLink';
import Description from './components/Description';
import { useAuthContext } from '../providers/AuthProvider';
import Footer from './components/Footer';
import { useEffect } from 'react';
import configStore from '../store/configStore';
import chainStore from '../store/chainStore';
import { mainConfig, testConfig } from '../config';

const Wrapper = styled('div')(({ theme }) => ({
  maxWidth: 400,
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
  },
}));

export default function Home(props) {
  const { address } = useAuthContext();

  props.chain && props.chain !== chainStore.chain && chainStore.setChain(props.chain);

  useEffect(() => {
    props.chain && props.chain === 'main' ? configStore.setConfig(mainConfig) : configStore.setConfig(testConfig);
  }, [props.chain]);

  return (
    <Box paddingY={6} paddingX={2}>
      <Wrapper>
        <Connect />
        <Header />
        <BakeCard />
        <NutritionFacts />
        <Description />
        <ReferralLink address={address} />
        <Footer />
      </Wrapper>
    </Box>
  );
}
