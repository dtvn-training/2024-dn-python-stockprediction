import { memo, SVGProps } from "react";

const Union1Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    preserveAspectRatio="none"
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17 3.66667C9.6362 3.66667 3.66667 9.6362 3.66667 17C3.66667 20.4985 5.01344 23.6831 7.21999 26.0629C7.3033 25.7873 7.41409 25.5165 7.55863 25.2581C8.04862 24.382 8.66674 23.5719 9.40015 22.8556C10.1362 22.1367 10.9666 21.5334 11.8622 21.0568C10.4981 19.751 9.64527 17.9261 9.64527 15.8889C9.64527 11.8634 12.9753 8.66667 17 8.66667C21.0247 8.66667 24.3547 11.8634 24.3547 15.8889C24.3547 17.9261 23.5019 19.751 22.1378 21.0568C23.0334 21.5334 23.8638 22.1367 24.5999 22.8556C25.3333 23.5719 25.9514 24.382 26.4414 25.2581C26.5859 25.5165 26.6967 25.7873 26.78 26.0629C28.9866 23.6831 30.3333 20.4985 30.3333 17C30.3333 9.6362 24.3638 3.66667 17 3.66667ZM23.5685 28.6061C23.6332 28.2732 23.6657 27.9607 23.6666 27.6838C23.6682 27.2263 23.5844 26.9787 23.5322 26.8853C23.1979 26.2876 22.775 25.7327 22.2708 25.2403C20.8794 23.8813 18.9842 23.1111 17 23.1111C15.0158 23.1111 13.1206 23.8813 11.7292 25.2403C11.225 25.7327 10.8021 26.2876 10.4678 26.8853C10.4156 26.9787 10.3318 27.2263 10.3334 27.6838C10.3343 27.9607 10.3668 28.2732 10.4315 28.6061C12.3692 29.7055 14.6092 30.3333 17 30.3333C19.3908 30.3333 21.6308 29.7055 23.5685 28.6061ZM17 19.7778C19.2582 19.7778 21.0214 17.9998 21.0214 15.8889C21.0214 13.7779 19.2582 12 17 12C14.7418 12 12.9786 13.7779 12.9786 15.8889C12.9786 17.9998 14.7418 19.7778 17 19.7778ZM0.333333 17C0.333333 7.79525 7.79525 0.333333 17 0.333333C26.2047 0.333333 33.6667 7.79525 33.6667 17C33.6667 22.9288 30.5698 28.133 25.9133 31.0853C23.3345 32.7202 20.2752 33.6667 17 33.6667C13.7248 33.6667 10.6655 32.7202 8.08669 31.0853C3.43023 28.1331 0.333333 22.9288 0.333333 17Z"
      fill="black"
    />
  </svg>
);
const Memo = memo(Union1Icon);
export { Memo as Union1Icon };