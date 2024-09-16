import React from "react";
import ButtonInner from "./buttonInner/page";

interface LevelButtonProps {
  numbers: number[];
}

const LevelButton: React.FC<LevelButtonProps> = ({ numbers }) => {
  const getMarginClass = (index: number): string => {
    const mod = index % 5;
    switch (mod) {
      case 0:
        return "ms-0";
      case 1:
        return "ms-24 -mt-10";
      case 2:
        return "ms-44";
      case 3:
        return "ms-24";
      case 4:
        return "me-0";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col items-start gap-11">
      {numbers.map((number, index) => (
        <div key={index} className={getMarginClass(index)}>
          <ButtonInner number={number} />
        </div>
      ))}
    </div>
  );
};

export default LevelButton;
