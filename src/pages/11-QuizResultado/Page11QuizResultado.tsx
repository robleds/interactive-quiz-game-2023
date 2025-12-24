import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Button, List, ListItem, Typography } from '@mui/material';

import { makeStyles } from '@material-ui/core/styles';

import Meta from '@/components/Meta';
import QuizHeader from '@/components/QuizHeader';
import RestartTimer from '@/components/RestartTimer';
import { FullSizeCenteredFlexBox } from '@/components/styled';

import clickSound from './../../components/Assets/click.mp3';
import selo1 from './assets/selo1.png';
import selo2 from './assets/selo2.png';
import selo3 from './assets/selo3.png';

const DefaultAnswers = [
  {
    image_url: selo1,
    text: 'Mau atendimento',
  },
  {
    image_url: selo2,
    text: 'Abastecer produto não solicitado',
  },
  {
    image_url: selo3,
    text: 'Abastecer volume acima do solicitado',
  },
];

const useStyles = makeStyles({
  title: {
    fontFamily: 'Din Medium',
    fontSize: '18px',
    color: '#7d8082',
    textTransform: 'uppercase',
    textAlign: 'center',
    margin: '0 0 30px 0',
  },
  answer: {
    fontFamily: 'Din Bold',
    fontSize: '23px',
    color: '#782981',
    textTransform: 'uppercase',
    textAlign: 'center',
    margin: '50px 0 0 0',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '33px',
    padding: 0,
  },
  listItem: {
    position: 'relative',
    width: '370px',
  },
  listImage: {
    position: 'absolute',
    width: '50px',
    top: '3px',
    left: '-28px',
  },
  listText: {
    backgroundColor: '#e84256',
    color: '#fff',
    fontFamily: 'Din Bold',
    fontSize: '16px',
    textTransform: 'uppercase',
    textAlign: 'center',
    margin: 0,
    width: '100%',
    padding: '8px 0',
    borderRadius: '10px',
  },
  button: {
    fontSize: '33px',
    marginTop: '20px',
  },
});

const rightAnswers = [3, 4, 5];

function Page9() {
  const classes = useStyles();
  const [textResult, setTextResult] = useState('Carregando...');
  const audioRef = React.useRef(new Audio(clickSound));
  useEffect(() => {
    new Promise((resolve, reject) => {
      try {
        const localData: any = localStorage.getItem('oba.csonline.game.participation');
        const valor = JSON.parse(localData);
        let count = 0;
        if (valor && 'quizAnswers' in valor) {
          valor.quizAnswers.forEach((element: number) => {
            if (rightAnswers.indexOf(element) !== -1) {
              count++;
            }
          });
        }
        if (count > 0) {
          const prefix = 'Você acertou';
          const sufix = ['opção', 'opções'];
          setTextResult(`${prefix} ${count} ${sufix[count === 1 ? 0 : 1]}`);
        } else {
          setTextResult('Você não acertou nenhuma');
        }
        resolve(valor);
      } catch (erro) {
        reject(erro);
      }
    });
  }, []);
  return (
    <>
      <Meta title="Resposta Quiz!" />
      <FullSizeCenteredFlexBox className="bg-quiz">
        <QuizHeader title="Resultado" />
        <Box sx={{ textAlign: 'center' }}>
          <Box className="white-card" sx={{ padding: '35px 69px' }}>
            <Typography paragraph={true} className={classes.title}>
              De acordo com nossos consumidores,
              <br />
              Essas são as situações que mais impactam
              <br />a experiência de abasteciemnto.
            </Typography>

            <List className={classes.list}>
              {DefaultAnswers.map((item, index) => {
                return (
                  <ListItem key={index} disablePadding className={classes.listItem}>
                    <img src={item.image_url} className={classes.listImage} />
                    <Typography paragraph={true} className={classes.listText}>
                      {item.text}
                    </Typography>
                  </ListItem>
                );
              })}
            </List>
            <Typography paragraph={true} className={classes.answer}>
              {textResult}
            </Typography>
          </Box>
          <Button
            className={`initial-button ${classes.button}`}
            to={`/modal`}
            component={Link}
            onClick={() => audioRef.current.play()}
          >
            Avançar
            <ArrowForwardIosIcon className="arrow-secondary-button" sx={{ ml: '17px' }} />
          </Button>
        </Box>
      </FullSizeCenteredFlexBox>
      <RestartTimer delay={150} page="/abertura" />
    </>
  );
}

export default Page9;
