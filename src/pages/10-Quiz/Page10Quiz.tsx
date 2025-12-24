import React from 'react';

import { Box } from '@mui/material';

import Meta from '@/components/Meta';
import Quiz from '@/components/Quiz';
import QuizHeader from '@/components/QuizHeader';
import RestartTimer from '@/components/RestartTimer';
import { FullSizeCenteredFlexBox } from '@/components/styled';

// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

function Page8() {
  // const navigate = useNavigate();
  // const [myData, setMyData] = useState('');
  // useEffect(() => {
  //   console.log('init');
  //   const data = localStorage.getItem('oba.csonline.game.participation');
  //   if (data) {
  //     setMyData(data);
  //     console.log('data', data);
  //   }
  // }, []);
  // useEffect(() => {
  //   console.log('myData', myData);
  //   if (!myData) {
  //     navigate('/pre-opiniao');
  //   }
  // }, [myData]);
  return (
    <>
      <Meta title="Quiz!" />
      <FullSizeCenteredFlexBox className="bg-quiz">
        <QuizHeader title="O que faz seu consumidor não voltar ao posto?" />
        <Box>
          <Quiz />
        </Box>
      </FullSizeCenteredFlexBox>
      <RestartTimer delay={150} page="/abertura" />
    </>
  );
}

export default Page8;
