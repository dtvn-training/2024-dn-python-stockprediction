import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import { Star1Icon } from './Star1Icon.js';
import classes from './Star.module.css';

interface Props {
  className?: string;
}
/* @figmaId 2356:1779 */
export const Star: FC<Props> = memo(function Star(props = {}) {
  return (
    <div className={`${resets.storybrainResets} ${classes.root}`}>
      <div className={classes.star1}>
        <Star1Icon className={classes.icon} />
      </div>
    </div>
  );
});
