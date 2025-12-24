import { useEffect, useRef, useState } from 'react';

// import Confetti from 'react-confetti';
import { CircularProgress } from '@mui/material';

import { makeStyles } from '@material-ui/core/styles';

import Meta from '@/components/Meta';
import RestartTimer from '@/components/RestartTimer';
import SkipButton from '@/components/SkipButton';
import { FullSizeCenteredFlexBox } from '@/components/styled';

import MainVideo from '/assets/04_Interface_CSOnline_Novidades_Final_v02_3.mp4';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
  },
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  video: {
    bottom: 0,
    position: 'absolute',
    width: 670,
    height: 580,
    right: 0,
  },
});

function Page10() {
  const classes = useStyles();
  const [videoLoading, setVideoLoading] = useState(true);
  // const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const [numberOfPieces, setNumberOfPieces] = useState(0);

  const handleOnLoadStartVideo = () => {
    setVideoLoading(false);
    setTimeout(() => setNumberOfPieces(200), 15000);
    // setTimeout(() => setNumberOfPieces(1), 20000);
  };

  useEffect(() => {
    // setTimeout(() => setNumberOfPieces(200), 15000);
    // setTimeout(() => setNumberOfPieces(0), 20000);
  }, []);

  return (
    <>
      <Meta title="Concluído!" />
      {/* <Confetti
        width={windowSize.current[0]}
        height={windowSize.current[1]}
        numberOfPieces={numberOfPieces}
      /> */}
      <FullSizeCenteredFlexBox className="video-container">
        <video
          className="fullScreenVideo"
          onLoadStart={handleOnLoadStartVideo}
          onLoadedData={handleOnLoadStartVideo}
          onLoadedMetadata={handleOnLoadStartVideo}
          autoPlay
          preload="auto"
          muted
        >
          <source src={MainVideo} type="video/mp4" />
        </video>
        {videoLoading && (
          <FullSizeCenteredFlexBox className={classes.spinnerContainer}>
            <CircularProgress color="inherit" />
          </FullSizeCenteredFlexBox>
        )}
      </FullSizeCenteredFlexBox>
      <RestartTimer delay={150} page="/abertura" />
      {numberOfPieces && <SkipButton text="Encerrar" next={'/abertura'} color={'#792b7e'} />}
    </>
  );
}

export default Page10;
