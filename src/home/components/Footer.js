import Grid from '@mui/material/Grid';

import configStore from '../../store/configStore';
import { ReactComponent as ESIcon } from '../assets/ESIcon.svg';
import { ReactComponent as TGIcon } from '../assets/TGIcon.svg';
import { ReactComponent as TWIcon } from '../assets/TWIcon.svg';

export default function Footer() {
  return (
    <Grid container justifyContent="center" spacing={2} marginTop={4}>
      <Grid item>
        <a href={configStore.config.scanLink} target="__blank">
          <ESIcon width={48} height={48} />
        </a>
      </Grid>
      {/* <Grid item>
        <a href="https://t.me/BakedBeansMiner" target="__blank">
          <TGIcon width={48} height={48} />
        </a>
      </Grid> */}
      <Grid item>
        <a href="https://twitter.com/spicychicken_io" target="__blank">
          <TWIcon width={48} height={48} />
        </a>
      </Grid>
    </Grid>
  );
}
