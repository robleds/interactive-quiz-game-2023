import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CircularProgress, Slide } from '@mui/material';
import Button from '@mui/material/Button';

import { makeStyles } from '@material-ui/core/styles';

import Meta from '@/components/Meta';
import RestartTimer from '@/components/RestartTimer';
import SkipButton from '@/components/SkipButton';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import fullscreen from '@/utils/fullscreen';

import clickSound from './../../components/Assets/click.mp3';
import MainVideo from '/assets/02_Interface_CSOnline_Cena_02_2.mp4';

const useStyles = makeStyles({
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  button: {
    fontSize: '30px',
    margin: '0 5% 4% 0',
  },
});

function Page1() {
  const classes = useStyles();
  const navigate = useNavigate();
  const audioRef = React.useRef(new Audio(clickSound));
  const [showElement, setShowElement] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);
  useEffect(() => {
    registerCheckinTotem();
  }, []);
  const handleRelease = () => {
    audioRef.current.play();
    setVideoPlaying(false);
    setTimeout(() => navigate('/video-csonline'), 400);
    fullscreen();
  };
  const handleOnLoadVideo = () => {
    setVideoLoading(false);
    setTimeout(() => setShowElement(true), 7000);
  };
  const registerCheckinTotem = async () => {
    const data = { id: 13 };
    const response = await fetch('https://api4.convencaoraizen2023.com.br/checkintotem/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    try {
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Meta title="Vídeo" />
      <FullSizeCenteredFlexBox className="video-container">
        <video
          className="fullScreenVideo"
          onLoadStart={handleOnLoadVideo}
          onLoadedData={handleOnLoadVideo}
          onLoadedMetadata={handleOnLoadVideo}
          autoPlay
          preload="auto"
          muted
          loop
        >
          <source src={MainVideo} type="video/mp4" />
        </video>
        {videoLoading && (
          <FullSizeCenteredFlexBox className={classes.spinnerContainer}>
            <CircularProgress color="inherit" />
          </FullSizeCenteredFlexBox>
        )}
        <FullSizeCenteredFlexBox className="buttonContainer">
          {showElement && (
            <Slide
              direction="left"
              in={videoPlaying}
              mountOnEnter
              unmountOnExit
              timeout={{ enter: 250, exit: 250 }}
            >
              <Button className={`initial-button ${classes.button}`} onClick={handleRelease}>
                Avançar
              </Button>
            </Slide>
          )}
        </FullSizeCenteredFlexBox>
      </FullSizeCenteredFlexBox>
      <RestartTimer delay={150} page="/abertura" />
      <SkipButton next={'/video-csonline'} />
    </>
  );
}

export default Page1;
