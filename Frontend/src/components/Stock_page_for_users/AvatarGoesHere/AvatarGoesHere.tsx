import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import classes from './AvatarGoesHere.module.css';
import { YourImageIcon } from './YourImageIcon.js';

interface Props {
  className?: string;
  classes?: {
    root?: string;
  };
}
/* @figmaId 2368:204 */
export const AvatarGoesHere: FC<Props> = memo(function AvatarGoesHere(props = {}) {
  return (
    <div className={`${resets.storybrainResets} ${props.classes?.root || ''} ${props.className || ''} ${classes.root}`}>
      <div className={classes.yourImage}>
        <YourImageIcon className={classes.icon} />
      </div>
    </div>
  );
});
