import { FC } from 'react';
import { PathRouteProps } from 'react-router-dom';

import type { SvgIconProps } from '@mui/material/SvgIcon';

enum Pages {
  Page_00,
  Page_01,
  Page_02,
  Page_03,
  Page_04,
  Page_05,
  Page_06,
  Page_07,
  Page_08,
  Page_09,
  Page_10,
  Page_11,
  Page_12,
  Page_13,
  Page_14,
  NotFound,
}

type PathRouteCustomProps = {
  title?: string;
  component: FC;
  icon?: FC<SvgIconProps>;
};

type Routes = Record<Pages, PathRouteProps & PathRouteCustomProps>;

export type { Routes };
export { Pages };
