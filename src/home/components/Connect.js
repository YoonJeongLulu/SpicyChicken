import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import { useAuthContext } from '../../providers/AuthProvider';
import { useEffect } from 'react';
import chainStore from '../../store/chainStore';

const ConnectButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  right: 48,
  top: 48,
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const SmallScreenConnectButton = styled(Button)(({ theme }) => ({
  display: 'none',
  marginTop: 12,
  marginBottom: 12,
  width: '95%',
  marginLeft: 'auto',
  marginRight: 'auto',
  [theme.breakpoints.down('md')]: {
    display: 'block',
  },
}));

export default function Connect({ responsive = true }) {
  const { address, loading, connect, disconnect } = useAuthContext();

  useEffect(() => {
    disconnect();
  }, [chainStore.chain]);

  return responsive ? (
    <ConnectButton color="secondary" variant="contained" disabled={loading} onClick={() => (address ? disconnect() : connect())}>
      {address ? 'Disconnect' : 'Connect'}
    </ConnectButton>
  ) : (
    <SmallScreenConnectButton color="secondary" variant="contained" disabled={loading} onClick={() => (address ? disconnect() : connect())}>
      {address ? 'Disconnect' : 'Connect'}
    </SmallScreenConnectButton>
  );
}
