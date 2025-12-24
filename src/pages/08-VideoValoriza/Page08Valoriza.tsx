import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ReplayIcon from '@mui/icons-material/Replay';
import { CircularProgress, Fade, Slide } from '@mui/material';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';

import { makeStyles } from '@material-ui/core/styles';

import Meta from '@/components/Meta';
import RestartTimer from '@/components/RestartTimer';
import SkipButton from '@/components/SkipButton';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import fullscreen from '@/utils/fullscreen';

import clickSound from './../../components/Assets/click.mp3';
import MainVideo from '/assets/02a_Interface_CSOnline_Valoriza_3.mp4';

const useStyles = makeStyles({
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  button1: {
    fontSize: '30px',
    marginBottom: '20px',
  },
  button2: {
    fontSize: '40px',
  },
});

function Page7() {
  const classes = useStyles();
  const navigate = useNavigate();
  const audioRef = React.useRef(new Audio(clickSound));
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);
  const [showElement, setShowElement] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const handleVideoEnded = () => {
    setShowElement(true);
  };
  const handleRelease = () => {
    audioRef.current.play();
    setVideoPlaying(false);
    setTimeout(() => navigate('/pre-quiz'), 400);
    fullscreen();
  };
  const handleOnLoadVideo = () => {
    setVideoLoading(false);
  };
  const handleRefresh = () => {
    setRefresh(false);
    setShowElement(false);
    setTimeout(() => {
      setRefresh(true);
    }, 100);
  };
  useEffect(() => {
    setTimeout(() => setShowElement(true), 11000);
  }, []);
  return (
    <>
      <Meta title="Vídeo" />
      <FullSizeCenteredFlexBox className="video-container">
        {refresh && (
          <Fade in={videoPlaying} mountOnEnter unmountOnExit timeout={{ enter: 500, exit: 250 }}>
            <CardMedia
              component="video"
              className="fullScreenVideo"
              image={MainVideo}
              onEnded={handleVideoEnded}
              // onClick={handleRelease}
              onLoadStart={handleOnLoadVideo}
              onLoadedData={handleOnLoadVideo}
              onLoadedMetadata={handleOnLoadVideo}
              autoPlay
              muted
            />
          </Fade>
        )}
        {videoLoading && (
          <FullSizeCenteredFlexBox className={classes.spinnerContainer}>
            <CircularProgress color="inherit" />
          </FullSizeCenteredFlexBox>
        )}
        <FullSizeCenteredFlexBox className="buttonContainer">
          {showElement && (
            <div className="buttonContainer__wrapper">
              <Slide
                direction="left"
                in={videoPlaying}
                mountOnEnter
                unmountOnExit
                timeout={{ enter: 250, exit: 250 }}
              >
                <Button className={`initial-button ${classes.button1}`} onClick={handleRefresh}>
                  <ReplayIcon className="arrow-secondary-button" sx={{ mr: '17px' }} /> Voltar ao
                  início
                </Button>
              </Slide>
              <Slide
                direction="left"
                in={videoPlaying}
                mountOnEnter
                unmountOnExit
                timeout={{ enter: 350, exit: 250 }}
              >
                <Button className={`initial-button ${classes.button2}`} onClick={handleRelease}>
                  Avançar
                  <ArrowForwardIosIcon className="arrow-secondary-button" sx={{ ml: '17px' }} />
                </Button>
              </Slide>
            </div>
          )}
        </FullSizeCenteredFlexBox>
      </FullSizeCenteredFlexBox>
      {showElement && <RestartTimer delay={150} page={'/abertura'} />}
      <SkipButton next={'/pre-quiz'} color="#792b7e" tiny />
    </>
  );
}

export default Page7;
