import { memo, SVGProps } from 'react';

const Star1Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M7.13589 1.48359C7.52162 0.821322 8.47838 0.821321 8.86411 1.48359L10.3645 4.05954C10.5058 4.30214 10.7425 4.47417 11.0169 4.53359L13.9304 5.1645C14.6795 5.3267 14.9752 6.23663 14.4645 6.80814L12.4783 9.03107C12.2912 9.24043 12.2008 9.51877 12.229 9.7981L12.5293 12.764C12.6065 13.5265 11.8325 14.0889 11.1312 13.7798L8.40325 12.5777C8.14634 12.4645 7.85366 12.4645 7.59675 12.5777L4.86883 13.7798C4.16749 14.0889 3.39346 13.5265 3.47067 12.764L3.77096 9.7981C3.79924 9.51878 3.7088 9.24043 3.52174 9.03107L1.5355 6.80814C1.02484 6.23663 1.3205 5.3267 2.06955 5.1645L4.98306 4.53359C5.25745 4.47417 5.49423 4.30214 5.63553 4.05954L7.13589 1.48359Z'
      stroke='#FCFBFB'
      strokeWidth={2}
    />
  </svg>
);
const Memo = memo(Star1Icon);
export { Memo as Star1Icon };
