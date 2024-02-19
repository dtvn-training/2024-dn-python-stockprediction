import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import resets from '../../_resets.module.css';
import classes from './InterfaceEssentialTrash_StyleF.module.css';
import { StyleFilledIcon } from './StyleFilledIcon.js';

interface Props {
  className?: string;
  classes?: {
    root?: string;
  };
  swap?: {
    icon?: ReactNode;
  };
}
/* @figmaId 2396:66 */
export const InterfaceEssentialTrash_StyleF: FC<Props> = memo(function InterfaceEssentialTrash_StyleF(props = {}) {
  return (
    <div className={`${resets.storybrainResets} ${props.classes?.root || ''} ${props.className || ''} ${classes.root}`}>
      <div className={classes.icon}>{props.swap?.icon || <StyleFilledIcon className={classes.icon2} />}</div>
    </div>
  );
});
