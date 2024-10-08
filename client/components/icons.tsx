import Image from "next/image";
import React from "react";
import EthIcon from "@/assets/images/eth.svg";
import BsIcon from "@/assets/images/bs.svg";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  width: number;
  height: number;
}

const Icons = {
  eth: ({ width, height, ...props }: IconProps) => (
    <Image alt="Icon" src={EthIcon} width={width} height={height} {...props} />
  ),
  bs: ({ width, height, ...props }: IconProps) => (
    <Image alt="Icon" src={BsIcon} width={width} height={height} {...props} />
  ),
};

export default Icons;
