// import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import CardMedia from '@mui/material/CardMedia';
import Fade from '@mui/material/Fade';

// import { makeStyles } from '@material-ui/core/styles';
import Meta from '@/components/Meta';
import Modal from '@/components/Modal';
import RestartTimer from '@/components/RestartTimer';
import { FullSizeCenteredFlexBox } from '@/components/styled';

import Media from './assets/page-modal-mock.png';

// const useStyles = makeStyles({});

function Page10() {
  // const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setTimeout(() => setShowModal(true), 1000);
  }, []);
  return (
    <>
      <Meta title="Concluído!" />
      {showModal && <Modal />}
      <FullSizeCenteredFlexBox
        flexDirection="column"
        sx={{ justifyContent: 'flex-start', backgroundColor: '#f3f8f8' }}
      >
        <Fade in={true}>
          <CardMedia className="fullScreenVideo" image={Media} />
        </Fade>
      </FullSizeCenteredFlexBox>
      <RestartTimer delay={150} page="/abertura" />
    </>
  );
}

export default Page10;
