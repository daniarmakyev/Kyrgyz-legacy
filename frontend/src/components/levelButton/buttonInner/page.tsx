import { useRouter } from "next/navigation";
import React from "react";

interface ButtonInnerProps {
  number: number;
}

const ButtonInner: React.FC<ButtonInnerProps> = ({ number }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/level/${number}`);
  };

  let color = "";
  let border = "";

  if (number <= 5) {
    color = "#FC4E4D";
    border = "#bc2121";
  } else if (number <= 10) {
    color = "#02CD9C";
    border = "#08A47C";

  } else {
    color = "#1CAFF6";
    border = "#188CC5";
  }

  return (
    <button
      onClick={handleClick}
      className={`btn${number} p-1 relative rounded-full  border-b-8 transform transition-all duration-200 ease-in-out hover:pt-0 hover:mt-1 z-10`}
      style={{
        backgroundColor: `${color}`,
        borderBottom: `8px solid ${border}`,
        borderLeft: `2px solid ${border}`,
        borderRight: `2px solid ${border}`,
        borderTop: "none",
      }}
    >
      <svg
        width="56"
        height="46"
        viewBox="0 0 56 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-20"
      >
      </svg>
      <img
        src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/bfa591f6854b4de08e1656b3e8ca084f.svg"
        alt="subimo"
        className="absolute top-2 left-3 w-11"
      />
    </button>
  );
};

export default ButtonInner;
