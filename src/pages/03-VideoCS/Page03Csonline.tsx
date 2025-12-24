import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
import MainlVideo from '/assets/03_Interface_CSOnline_Cena_03_CSTour_3.mp4';

const useStyles = makeStyles({
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  button1: {
    fontSize: '22px',
    marginBottom: 15,
  },
  button2: {
    fontSize: '30px',
  },
});

function Page2() {
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
    setTimeout(() => navigate('/pre-opiniao'), 400);
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
  return (
    <>
      <Meta title="Vídeo" />
      <FullSizeCenteredFlexBox className="video-container">
        {refresh && (
          <Fade in={videoPlaying} mountOnEnter unmountOnExit timeout={{ enter: 500, exit: 250 }}>
            <CardMedia
              component="video"
              className="fullScreenVideo"
              image={MainlVideo}
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
      {refresh && <RestartTimer delay={150} page="/abertura" />}
      <SkipButton next={'/pre-opiniao'} tiny color="#792b7e" />
    </>
  );
}

export default Page2;
