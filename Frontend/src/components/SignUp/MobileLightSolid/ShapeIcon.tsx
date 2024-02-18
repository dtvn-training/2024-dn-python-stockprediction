import { memo, SVGProps } from 'react';

const ShapeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 16 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M3 0C1.34315 0 0 1.34315 0 3V21C0 22.6569 1.34315 24 3 24H13C14.6569 24 16 22.6569 16 21V3C16 1.34315 14.6569 0 13 0H3ZM8 20C8.55229 20 9 19.5523 9 19C9 18.4477 8.55229 18 8 18C7.44772 18 7 18.4477 7 19C7 19.5523 7.44772 20 8 20Z'
      fill='#121319'
    />
  </svg>
);
const Memo = memo(ShapeIcon);
export { Memo as ShapeIcon };
