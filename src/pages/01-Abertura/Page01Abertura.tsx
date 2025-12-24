import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CircularProgress } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';

import { makeStyles } from '@material-ui/core/styles';

import Meta from '@/components/Meta';
import SkipButton from '@/components/SkipButton';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import fullscreen from '@/utils/fullscreen';

import clickSound from './../../components/Assets/click.mp3';
import MainVideo from '/assets/01_Interface_CSOnline_Cena_01_Loop_4.mp4';

const useStyles = makeStyles({
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});

function Welcome() {
  const navigate = useNavigate();
  const classes = useStyles();
  const audioRef = React.useRef(new Audio(clickSound));
  const [videoLoading, setVideoLoading] = useState(true);
  const handleRelease = () => {
    audioRef.current.play();
    setTimeout(() => navigate('/intro'), 600);
    fullscreen();
  };
  const handleOnLoadVideo = () => {
    setVideoLoading(false);
  };
  return (
    <>
      <Meta title="Bem Vindo" />
      <FullSizeCenteredFlexBox className="video-container">
        <video
          className="fullScreenVideo"
          onLoadStart={handleOnLoadVideo}
          onLoadedData={handleOnLoadVideo}
          onLoadedMetadata={handleOnLoadVideo}
          onClick={handleRelease}
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
      </FullSizeCenteredFlexBox>
      <SkipButton next={'/intro'} />
    </>
  );
}

export default Welcome;
