import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { CircularProgress, Fade, Slide } from '@mui/material';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';

import { makeStyles } from '@material-ui/core/styles';

import Meta from '@/components/Meta';
import RestartTimer from '@/components/RestartTimer';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import fullscreen from '@/utils/fullscreen';

import MainVideo from '/assets/02a_Interface_CSOnline_Valoriza_3.mp4';

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

function Page6() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);
  const [showElement, setShowElement] = useState(false);

  const handleVideoEnded = () => {
    setShowElement(true);
  };
  const handleRelease = () => {
    setVideoPlaying(false);
    setTimeout(() => navigate('/video-valoriza'), 400);
    fullscreen();
  };
  const handleOnLoadVideo = () => {
    setVideoLoading(false);
  };
  return (
    <>
      <Meta title="Vídeo" />
      <FullSizeCenteredFlexBox className="video-container">
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
    </>
  );
}

export default Page6;
