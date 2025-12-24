import CategoryIcon from '@mui/icons-material/Category';
import FlagIcon from '@mui/icons-material/Flag';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import QuizIcon from '@mui/icons-material/Quiz';
import ReplayIcon from '@mui/icons-material/Replay';

import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.Page_00]: {
    component: asyncComponentLoader(() => import('@/pages/Setup')),
    path: '/',
    title: 'Setup',
    icon: PhonelinkSetupIcon,
  },
  [Pages.Page_01]: {
    component: asyncComponentLoader(() => import('@/pages/01-Abertura')),
    path: '/abertura',
    title: 'Abertura',
    icon: FlagIcon,
  },
  [Pages.Page_02]: {
    component: asyncComponentLoader(() => import('@/pages/02-Intro')),
    path: '/intro',
    title: 'Introdução',
    icon: OndemandVideoIcon,
  },
  [Pages.Page_03]: {
    component: asyncComponentLoader(() => import('@/pages/03-VideoCS')),
    path: '/video-csonline',
    title: 'CS Online',
    icon: OndemandVideoIcon,
  },
  [Pages.Page_04]: {
    component: asyncComponentLoader(() => import('@/pages/04-PreOpiniao')),
    path: '/pre-opiniao',
    title: 'Pré Opinião',
    icon: CategoryIcon,
  },
  [Pages.Page_05]: {
    component: asyncComponentLoader(() => import('@/pages/05-OpiniaoIBM')),
    path: '/opiniao-ibm',
    title: 'Opinião',
    icon: CategoryIcon,
  },
  [Pages.Page_06]: {
    component: asyncComponentLoader(() => import('@/pages/06-OpiniaoSucesso')),
    path: '/opiniao-sucesso',
    title: 'Sucesso',
    icon: CategoryIcon,
  },
  [Pages.Page_07]: {
    component: asyncComponentLoader(() => import('@/pages/07-PreVideoValoriza')),
    path: '/pre-valoriza',
    title: 'Pré Valoriza',
    icon: OndemandVideoIcon,
  },
  [Pages.Page_08]: {
    component: asyncComponentLoader(() => import('@/pages/08-VideoValoriza')),
    path: '/video-valoriza',
    title: 'Valoriza',
    icon: OndemandVideoIcon,
  },
  [Pages.Page_09]: {
    component: asyncComponentLoader(() => import('@/pages/09-PreQuiz')),
    path: '/pre-quiz',
    title: 'Pre Quiz',
    icon: CategoryIcon,
  },
  [Pages.Page_10]: {
    component: asyncComponentLoader(() => import('@/pages/10-Quiz')),
    path: '/quiz',
    title: 'Quiz',
    icon: QuizIcon,
  },
  [Pages.Page_11]: {
    component: asyncComponentLoader(() => import('@/pages/11-QuizResultado')),
    path: '/quiz-result',
    title: 'Resposta Quiz',
    icon: CategoryIcon,
  },
  [Pages.Page_12]: {
    component: asyncComponentLoader(() => import('@/pages/12-Modal')),
    path: '/modal',
    title: 'Você Sabia',
    icon: CategoryIcon,
  },
  [Pages.Page_13]: {
    component: asyncComponentLoader(() => import('@/pages/13-Novidades')),
    path: '/novidades',
    title: 'Novidades',
    icon: CategoryIcon,
  },
  [Pages.Page_14]: {
    component: asyncComponentLoader(() => import('@/pages/14-Obrigado')),
    path: '/obrigado',
    title: 'Obrigado',
    icon: ReplayIcon,
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
};

export default routes;
