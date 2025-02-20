"use client";

import Image from "next/image";
import { useState } from "react";

type HeaderCellProps = {
  label: string;
  left?: boolean;
  sortable?: boolean;
  onClick?: (sortedUp: boolean) => void;
};

type BodyCellProps = {
  label: string | number;
  left?: boolean;
  onClick?: () => void;
};

export const HeaderCell = ({
  label,
  left,
  sortable,
  onClick,
}: HeaderCellProps) => {
  const [sortedUp, setSortedUp] = useState<boolean>(false);

  const handleClick = () => {
    if (onClick) {
      setSortedUp(!sortedUp);
      onClick(!sortedUp);
    }
  };

  return (
    <div
      className="relative flex py-2.5 px-2 items-center border-b border-gray-200 select-none"
      style={{
        justifyContent: left ? "left" : "center",
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={handleClick}
    >
      <p className="text-center text-primary-blue text-lg font-bold">{label}</p>
      {sortable && (
        <Image
          className="absolute right-2 transition-transform duration-100"
          style={{
            transform: sortedUp ? "rotate(180deg)" : undefined,
          }}
          src="/images/icons/arrow-sort.svg"
          width={15}
          height={8}
          alt="arrow-sort"
        />
      )}
    </div>
  );
};

export const BodyCell = ({ label, left, onClick }: BodyCellProps) => (
  <div
    className="flex py-2.5 px-2 items-center border-b border-gray-200"
    style={{
      justifyContent: left ? "left" : "center",
      cursor: onClick ? "pointer" : "default",
    }}
    onClick={onClick}
  >
    <p className="text-center text-base overflow-hidden whitespace-nowrap overflow-ellipsis">
      {label}
    </p>
  </div>
);
