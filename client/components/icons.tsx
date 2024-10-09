import Image from "next/image";
import React from "react";
import EthIcon from "@/assets/images/eth.svg";
import WethIcon from "@/assets/images/weth.svg";
import BsIcon from "@/assets/images/bs.svg";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  width: number;
  height: number;
}

const Icons = {
  weth: ({ width, height, ...props }: IconProps) => (
    <Image alt="Icon" src={WethIcon} width={width} height={height} {...props} />
  ),
  eth: ({ width, height, ...props }: IconProps) => (
    <Image alt="Icon" src={EthIcon} width={width} height={height} {...props} />
  ),
  bs: ({ width, height, ...props }: IconProps) => (
    <Image alt="Icon" src={BsIcon} width={width} height={height} {...props} />
  ),
  spinner: ({ width, height, className }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
};

export default Icons;
