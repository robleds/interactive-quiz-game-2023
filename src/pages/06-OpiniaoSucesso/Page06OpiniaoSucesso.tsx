import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ReplayIcon from '@mui/icons-material/Replay';
import { Box, Button, Slide, Typography } from '@mui/material';

import { makeStyles } from '@material-ui/core/styles';

import Meta from '@/components/Meta';
import RestartTimer from '@/components/RestartTimer';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import fullscreen from '@/utils/fullscreen';

import clickSound from './../../components/Assets/click.mp3';
import submitSound from './../../components/Assets/submit.mp3';

const useStyles = makeStyles({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: 'linear-gradient(90deg, rgba(120,41,129,1) 30%, rgba(87,146,185,1) 100%)',
  },
  title: {
    fontFamily: 'Din Bold',
    fontSize: '70px',
    textTransform: 'uppercase',
    color: '#28c0dc',
    paddingBottom: '80px',
    margin: 0,
  },
  text: {
    fontFamily: 'Din Bold',
    fontSize: '50px',
    textTransform: 'uppercase',
    color: '#fff',
    paddingBottom: '30px',
    margin: 0,
  },
  alert: {
    display: 'inline-block',
    fontFamily: 'Din Bold',
    fontSize: '70px',
    color: '#000',
    padding: '5px 25px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    margin: 0,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '88%',
    margin: '0 0 4% 2%',
    position: 'absolute',
    bottom: 0,
  },
  button1: {
    fontSize: '20px',
    marginBottom: 20,
  },
  button2: {
    fontSize: '37px',
  },
});

function Page5() {
  const classes = useStyles();
  const navigate = useNavigate();
  const audioClickRef = React.useRef(new Audio(clickSound));
  const audioSubmitRef = React.useRef(new Audio(submitSound));
  const [ibmTotal, setIbmTotal] = useState(-1);
  const [isOpening, setIsOpening] = useState(true);
  const handleSucess = () => {
    audioClickRef.current.play();
    setIsOpening(false);
    setTimeout(() => navigate('/video-valoriza'), 400);
    fullscreen();
  };
  async function loadUserData() {
    const strLocalStorageRetrived = localStorage.getItem('oba.csonline.game.participation');
    const localUserData = await JSON.parse(strLocalStorageRetrived || '');
    if (localUserData) {
      const total = localUserData?.total || 0;
      const valorFormatado = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      setIbmTotal(valorFormatado);
    }
  }
  useEffect(() => {
    audioSubmitRef.current.play();
    loadUserData();
  }, []);
  return (
    <>
      <Meta title="Parabéns" />
      <FullSizeCenteredFlexBox className={classes.container}>
        <Box sx={{ width: '86%', mt: '3%' }}>
          <Slide
            direction="down"
            in={isOpening}
            mountOnEnter
            unmountOnExit
            timeout={{ enter: 250, exit: 250 }}
          >
            <Typography paragraph={true} className={classes.title}>
              {` `}
            </Typography>
          </Slide>
          <Slide
            direction="down"
            in={isOpening}
            mountOnEnter
            unmountOnExit
            timeout={{ enter: 300, exit: 250 }}
          >
            <Typography paragraph={true} className={classes.text}>
              Em 2022 você resgatou
              <br />
              <span className={classes.alert}>{ibmTotal}</span>
              <br />
              em benefícios através
              <br />
              do valoriza!
            </Typography>
          </Slide>
        </Box>

        <Box className={classes.buttonContainer}>
          <Slide
            direction="left"
            in={isOpening}
            mountOnEnter
            unmountOnExit
            timeout={{ enter: 300, exit: 250 }}
          >
            <Button
              className={`initial-button ${classes.button1}`}
              onClick={() => navigate('/intro')}
            >
              <ReplayIcon className="arrow-secondary-button" sx={{ mr: '17px' }} /> Voltar ao início
            </Button>
          </Slide>
          <Slide
            direction="left"
            in={isOpening}
            mountOnEnter
            unmountOnExit
            timeout={{ enter: 400, exit: 250 }}
          >
            <Button className={`initial-button ${classes.button2}`} onClick={handleSucess}>
              Avançar
              <ArrowForwardIosIcon className="arrow-secondary-button" sx={{ ml: '17px' }} />
            </Button>
          </Slide>
        </Box>
      </FullSizeCenteredFlexBox>
      <RestartTimer delay={150} page={'/abertura'} />
    </>
  );
}

export default Page5;
