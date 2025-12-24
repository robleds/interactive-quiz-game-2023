import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Grow, Slide } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { makeStyles } from '@material-ui/core/styles';

import Meta from '@/components/Meta';
import RestartTimer from '@/components/RestartTimer';
// import RestartTimer from '@/components/RestartTimer';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import fullscreen from '@/utils/fullscreen';

import clickSound from './../../components/Assets/click.mp3';

const useStyles = makeStyles({
  container: {
    backgroundColor: '#782778',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: 'Din Bold',
    fontSize: '90px',
    textTransform: 'uppercase',
    margin: '12% 0 0 7%',
  },
  subtitle: {
    fontFamily: 'Din Medium',
    fontSize: '40px',
    color: '#ffdd17',
    paddingBottom: '25px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '95%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    margin: '0 0% 4% 0',
  },
  button: {
    fontSize: '40px',
    padding: '10px 90px 11px 90px !important',
  },
});

function Page3() {
  const classes = useStyles();
  const navigate = useNavigate();
  const audioRef = React.useRef(new Audio(clickSound));
  const [isOpening, setIsOpening] = useState(true);
  const [isShaking, setShaking] = useState(false);
  const handleRelease = () => {
    audioRef.current.play();
    setIsOpening(false);
    setTimeout(() => navigate('/opiniao-ibm'), 400);
    fullscreen();
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      setShaking((currentValue) => !currentValue);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <Meta title="Vamos Construir juntos um novo valoriza?" />
      <FullSizeCenteredFlexBox className={classes.container}>
        <Grow
          in={isOpening}
          style={{ transformOrigin: '0 0 0' }}
          timeout={{ enter: 500, exit: 300 }}
        >
          <Typography variant="h3" className={classes.title}>
            Vamos Construir
            <br />
            juntos um novo
            <br />
            valoriza?
          </Typography>
        </Grow>
        <div className={classes.buttonContainer}>
          <Slide
            direction="left"
            in={isOpening}
            mountOnEnter
            unmountOnExit
            timeout={{ enter: 350, exit: 250 }}
          >
            <Typography variant="h4" className={classes.subtitle}>
              Queremos sua opinião!
            </Typography>
          </Slide>
          <Slide
            direction="left"
            in={isOpening}
            mountOnEnter
            unmountOnExit
            timeout={{ enter: 500, exit: 200 }}
          >
            <Button
              className={`initial-button ${classes.button} ${isShaking ? 'fade' : null}`}
              onClick={handleRelease}
            >
              Sim
            </Button>
          </Slide>
        </div>
      </FullSizeCenteredFlexBox>
      <RestartTimer delay={150} page={'/abertura'} />
    </>
  );
}

export default Page3;
