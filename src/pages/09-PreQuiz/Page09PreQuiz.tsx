import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';

import { makeStyles } from '@material-ui/core/styles';

import Meta from '@/components/Meta';
import RestartTimer from '@/components/RestartTimer';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import fullscreen from '@/utils/fullscreen';

import clickSound from './../../components/Assets/click.mp3';
import MainVideo from '/assets/04_Interface_CSOnline_Consumidor_2.mp4';

const useStyles = makeStyles({
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  button1: {
    fontSize: '30px',
  },
  button2: {
    fontSize: '40px',
  },
});

function PagePreQuiz() {
  const classes = useStyles();
  const navigate = useNavigate();
  const audioRef = React.useRef(new Audio(clickSound));
  const [isShaking, setShaking] = useState(false);
  const [isButtonOpened, setIsButtonOpened] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setShaking((currentValue) => !currentValue);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const handleRelease = () => {
    audioRef.current.play();
    setVideoPlaying(false);
    setTimeout(() => navigate('/quiz'), 400);
    fullscreen();
  };
  const handleOnLoadVideo = () => {
    setVideoLoading(false);
    setTimeout(() => setIsButtonOpened(true), 5000);
  };

  return (
    <>
      <Meta title="PreQuiz" />
      <FullSizeCenteredFlexBox className="video-container">
        <Fade in={videoPlaying} mountOnEnter unmountOnExit timeout={{ enter: 500, exit: 250 }}>
          <CardMedia
            component="video"
            className="fullScreenVideo"
            image={MainVideo}
            onLoadStart={handleOnLoadVideo}
            onLoadedData={handleOnLoadVideo}
            onLoadedMetadata={handleOnLoadVideo}
            autoPlay
            muted
          />
        </Fade>
        {videoLoading && (
          <FullSizeCenteredFlexBox className={classes.spinnerContainer}>
            <CircularProgress color="inherit" />
          </FullSizeCenteredFlexBox>
        )}
        <FullSizeCenteredFlexBox className="buttonContainer">
          <div className="buttonContainer__wrapper">
            <Slide
              direction="left"
              in={isButtonOpened}
              mountOnEnter
              unmountOnExit
              timeout={{ enter: 250, exit: 250 }}
            >
              <Button
                className={`initial-button ${classes.button2} ${isShaking ? 'fade' : null}`}
                onClick={handleRelease}
              >
                Avançar
                <ArrowForwardIosIcon className="arrow-secondary-button" sx={{ ml: '17px' }} />
              </Button>
            </Slide>
          </div>
        </FullSizeCenteredFlexBox>
      </FullSizeCenteredFlexBox>
      <RestartTimer delay={150} page={'/abertura'} />
    </>
  );
}

export default PagePreQuiz;
