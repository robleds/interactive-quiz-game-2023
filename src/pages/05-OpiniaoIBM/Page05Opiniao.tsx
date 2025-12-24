import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import { Box, Button, Input, Slide, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';
// Firebase
import { get, getDatabase, query, ref, set } from 'firebase/database';

import Meta from '@/components/Meta';
import RestartTimer from '@/components/RestartTimer';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import fullscreen from '@/utils/fullscreen';

import clickSound from './../../components/Assets/click.mp3';
import keySound from './../../components/Assets/key.mp3';

const useStyles = makeStyles({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: 'linear-gradient(90deg, rgba(120,41,129,1) 30%, rgba(87,146,185,1) 100%)',
  },
  textareaLabel: {
    fontFamily: 'Din Bold',
    fontSize: '33px',
    textTransform: 'uppercase',
    color: '#28c0dc',
    margin: 0,
  },
  textareaText: {
    fontFamily: 'Din Medium',
    fontSize: '33px',
    lineHeight: '45px',
    textTransform: 'uppercase',
    color: '#fff',
    paddingBottom: '30px',
    margin: 0,
  },
  textareaAlert: {
    fontFamily: 'Din Bold',
    fontSize: '33px',
    color: '#ffdd17',
    paddingBottom: '5px',
    margin: 0,
  },
  textArea: {
    fontFamily: 'Din Regular',
    fontSize: '33px',
    backgroundColor: '#fff',
    color: '#222',
    padding: '10px 25px',
    minWidth: '85%',
    lineHeight: '30px',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '88%',
    margin: '0 0 4% 2%',
  },
  inputLabel: {
    fontFamily: 'Din Bold',
    fontSize: '33px',
    textTransform: 'uppercase',
    color: '#28c0dc',
    paddingBottom: '10px',
    margin: 0,
  },
  inputText: {
    fontFamily: 'Din Regular',
    fontSize: '33px',
    backgroundColor: '#fff',
    color: '#222',
    padding: '10px 25px',
    minWidth: '500px',
  },
  button: {
    fontSize: '33px',
  },
});

interface participation {
  id: string;
  timestemp_start: string;
  timestemp_answer: string;
  timestemp_quiz: string;
  timestemp_end: string;
  bundle: string;
  quizAnswers: string[];
  answer: string;
  ibm: number;
  total: number;
}

function Page4() {
  const classes = useStyles();
  const navigate = useNavigate();
  const audioClickRef = React.useRef(new Audio(clickSound));
  const audioKeyRef = React.useRef(new Audio(keySound));
  const [isLoading, setIsLoading] = useState(false);
  const [isOpening, setIsOpening] = useState(true);
  const [isValidatedForm, setValidatedForm] = useState(false);
  const [textOpinion, setTextOpinion] = useState('');
  const [textIBM, setTextIBM] = useState('');
  const [isValidatedIBM, setValidatedIBM] = useState(false);
  const [isIBMLoading, setValidatedIBMLoading] = useState(false);
  // const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [listIBM, setListIBM] = useState<number[]>([]);
  const [listIBMTotal, setListIBMTotal] = useState<number[]>([]);

  async function writeUserData(request: participation) {
    const db = await getDatabase();
    const requestId = request.id;
    await set(ref(db, 'participations/' + requestId), request);
  }

  const handleSubmit = async () => {
    audioClickRef.current.play();
    setIsLoading(true);
    fullscreen();
    if (textOpinion.length === 0 && textIBM.length === 0) {
      setIsOpening(false);
      return setTimeout(() => navigate('/video-valoriza'), 400);
    }
    const dateNow = new Date();
    const userId = `ibm${textIBM}-${dateNow.getTime()}`;
    const indiceOfIbm = listIBM.indexOf(Number(textIBM));
    const participation: participation = {
      id: userId,
      timestemp_start: new Date().toISOString(),
      timestemp_answer: '',
      timestemp_quiz: '',
      timestemp_end: '',
      bundle: 'oba.csonline.game.participation',
      quizAnswers: [],
      answer: textOpinion,
      ibm: Number(textIBM),
      total: listIBMTotal[indiceOfIbm] || 0,
    };
    await localStorage.removeItem(participation.bundle);
    await writeUserData(participation);
    await localStorage.setItem(participation.bundle, JSON.stringify(participation));
    setIsOpening(false);
    setTimeout(() => {
      if (textIBM.length > 0) {
        navigate('/opiniao-sucesso');
      } else {
        navigate('/video-valoriza');
      }
    }, 400);
  };

  const handleIBMVerify = () => {
    if (textIBM.length > 0) {
      setValidatedIBMLoading(true);
      handleValidadeIBM();
    }
  };

  const handleValidadeIBM = () => {
    if (listIBM.indexOf(Number(textIBM)) > -1) {
      setValidatedIBM(true);
    } else if (textIBM === '000') {
      setValidatedIBM(true);
    } else {
      setValidatedIBM(false);
    }
    setTimeout(() => setValidatedIBMLoading(false), 600);
  };

  const handleValidationState = () => {
    setValidatedForm(textOpinion.length > 4 && isValidatedIBM);
  };

  const handleLoadDatabase = () => {
    const db = getDatabase();
    const recentPostsRef = query(ref(db, 'imb2'));
    get(recentPostsRef).then((snapshot) => {
      const arrIbmData: number[] = [];
      const arrTotalData: number[] = [];
      snapshot.forEach((childSnapshot) => {
        arrIbmData.push(childSnapshot.val().IBM);
        arrTotalData.push(childSnapshot.val().Total);
      });
      if (arrIbmData.length > 0) {
        setListIBM(arrIbmData);
      }
      if (arrTotalData.length > 0) {
        setListIBMTotal(arrTotalData);
      }
    });
  };

  const handleResize = () => {
    // const isKeyboardOpen = window.innerHeight < window.outerHeight;
    // setIsKeyboardOpen(isKeyboardOpen);
  };

  useEffect(() => {
    audioKeyRef.current.play();
    handleValidationState();
  }, [textOpinion]);

  useEffect(() => {
    audioKeyRef.current.play();
    handleIBMVerify();
  }, [textIBM]);

  useEffect(() => {
    handleValidationState();
  }, [isValidatedIBM]);

  useEffect(() => {
    handleLoadDatabase();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Meta title="Queremos sua opinião" />
      <FullSizeCenteredFlexBox className={classes.container}>
        <Box sx={{ width: '86%', mt: '7%' }}>
          <Slide
            direction="down"
            in={isOpening}
            mountOnEnter
            unmountOnExit
            timeout={{ enter: 200, exit: 250 }}
          >
            <Typography paragraph={true} className={classes.textareaLabel}>
              Queremos sua opinião
            </Typography>
          </Slide>
          <Slide
            direction="down"
            in={isOpening}
            mountOnEnter
            unmountOnExit
            timeout={{ enter: 250, exit: 250 }}
          >
            <Typography paragraph={true} className={classes.textareaText}>
              Além do que o valoriza já oferece, quais novos
              <br />
              benefícios você gostaria de ver no programa?
            </Typography>
          </Slide>
          <Slide
            direction="down"
            in={isOpening}
            mountOnEnter
            unmountOnExit
            timeout={{ enter: 300, exit: 250 }}
          >
            <Typography paragraph={true} className={classes.textareaAlert}>
              Sua resposta vale 20 pontos!
            </Typography>
          </Slide>
          <Slide
            direction="down"
            in={isOpening}
            mountOnEnter
            unmountOnExit
            timeout={{ enter: 350, exit: 250 }}
          >
            <Input
              multiline={true}
              rows="5"
              value={textOpinion}
              onChange={(event) => setTextOpinion(event.target.value)}
              className={`text-area-input ${classes.textArea}`}
              placeholder="Digite aqui..."
              inputProps={{
                returnKeyType: 'next',
              }}
            />
          </Slide>
        </Box>

        <Box className={classes.inputContainer}>
          <Box>
            <Slide
              direction="down"
              in={isOpening}
              mountOnEnter
              unmountOnExit
              timeout={{ enter: 400, exit: 250 }}
            >
              <Typography paragraph={true} className={classes.inputLabel}>
                Informe o seu IBM
              </Typography>
            </Slide>
            <FlexBox>
              <Slide
                direction="down"
                in={isOpening}
                mountOnEnter
                unmountOnExit
                timeout={{ enter: 450, exit: 250 }}
              >
                <Input
                  value={textIBM}
                  onChange={(event) => setTextIBM(event.target.value)}
                  className={classes.inputText}
                  placeholder="Digite aqui o seu IBM..."
                  type="number"
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                  }}
                  endAdornment={
                    isIBMLoading ? (
                      <CircularProgress /> // is loading?
                    ) : textIBM.length > 0 ? ( // is IBM filled?
                      isValidatedIBM ? (
                        <CheckCircleIcon /> // is valid?
                      ) : (
                        <DoNotDisturbAltIcon />
                      ) // isn't valid.
                    ) : null // isn't loading.
                  }
                />
              </Slide>
            </FlexBox>
          </Box>
          <Slide
            direction="left"
            in={isOpening}
            mountOnEnter
            unmountOnExit
            timeout={{ enter: 250, exit: 250 }}
          >
            <Button
              disabled={isLoading}
              className={`initial-button ${classes.button}`}
              onClick={handleSubmit}
            >
              Avançar
              {!isLoading && (
                <ArrowForwardIosIcon className="arrow-secondary-button" sx={{ ml: '17px' }} />
              )}
              {isLoading && <CircularProgress sx={{ ml: '17px' }} color="inherit" />}
            </Button>
          </Slide>
        </Box>
      </FullSizeCenteredFlexBox>
      <RestartTimer delay={150} page={'/abertura'} />
    </>
  );
}

export default Page4;
