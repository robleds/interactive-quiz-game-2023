import { useEffect, useRef, useState } from 'react';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';

import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Box, Typography } from '@mui/material';

import { makeStyles } from '@material-ui/core/styles';

import Meta from '@/components/Meta';
import RestartTimer from '@/components/RestartTimer';
import { FullSizeCenteredFlexBox } from '@/components/styled';

import qrCode from './assets/qrcode.jpg';
import stores from './assets/store.jpg';

const useStyles = makeStyles({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f8f8',
    rowGap: '50px',
  },
  b1: {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: '8px',
    display: 'flex',
    width: '100%',
    margin: '0 auto',
    maxWidth: '77%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8% 0',
  },
  b2: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#782778',
    padding: '20px 0',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '77%',
  },
  starIco: {
    position: 'absolute',
    backgroundColor: '#28bfd8',
    padding: '3px 5px 0',
    borderRadius: '50%',
  },
  ico: {
    fontSize: '36px',
    lineHeight: '1',
    color: '#fff',
  },
  title: {
    fontFamily: 'Din Bold',
    fontSize: '90px',
    textTransform: 'uppercase',
    color: '#782778',
  },
  subtitle: {
    fontFamily: 'Din Bold',
    fontSize: '30px',
    textTransform: 'uppercase',
    color: '#fec613',
  },
  text: {
    fontFamily: 'Din Medium',
    fontSize: '20px',
    lineHeight: '1.2',
    color: '#fff',
  },
  qrImage: {
    display: 'block',
    marginRight: '70px',
    marginLeft: '70px',
    width: '200px',
    height: '200px',
  },
  storeImage: {
    width: '65%',
  },
});

function Page11() {
  const navigate = useNavigate();
  const classes = useStyles();
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const [numberOfPieces, setNumberOfPieces] = useState(200);
  useEffect(() => {
    setTimeout(() => setNumberOfPieces(0), 3000);
  }, []);
  return (
    <>
      <Meta title="Concluído!" />
      <Confetti
        width={windowSize.current[0]}
        height={windowSize.current[1]}
        numberOfPieces={numberOfPieces}
      />
      <FullSizeCenteredFlexBox className={classes.container}>
        <Box className={classes.b1}>
          <Box className={classes.starIco} sx={{ left: '50%', top: '-23px', ml: '-23px' }}>
            <StarOutlineIcon className={classes.ico} onClick={() => navigate('/abertura')} />
          </Box>
          <Typography variant="h2" className={classes.title}>
            Obrigado ;)
          </Typography>
        </Box>
        <Box className={classes.b2}>
          <Box className={classes.starIco} sx={{ left: '-26px', top: '49px' }}>
            <StarOutlineIcon className={classes.ico} />
          </Box>
          <img src={qrCode} className={classes.qrImage} alt="QRCode" />
          <Box>
            <Typography variant="h3" className={classes.subtitle}>
              Aproveite para fazer o<br />
              download do app csonline
            </Typography>
            <Typography paragraph={true} className={classes.text}>
              Mais uma opção de acesso ao seu principal
              <br />
              canal de relacionamento com a Raízen.
            </Typography>
            <img src={stores} className={classes.storeImage} alt="Stores" />
          </Box>
        </Box>
      </FullSizeCenteredFlexBox>
      <RestartTimer delay={150} page="/abertura" />
    </>
  );
}

export default Page11;
