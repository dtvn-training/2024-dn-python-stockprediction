import { memo, SVGProps } from 'react';

const YourImageIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <g clipPath='url(#clip0_2455_351)'>
      <circle cx={20.1} cy={12.2} r={9.6} fill='#D8D8E4' />
      <circle cx={20.1} cy={46.6} r={20} fill='#D8D8E4' />
    </g>
    <rect width={40} height={40} rx={20} stroke='#F4F4FA' />
    <defs>
      <clipPath id='clip0_2455_351'>
        <rect width={40} height={40} rx={20} fill='white' />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(YourImageIcon);
export { Memo as YourImageIcon };
