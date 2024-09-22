import React from "react";
import Image from "next/image";
const ProgressBar = ({ progress, heart }: { progress: number , heart: number}) => {
  return (
    <div className="max-w-3xl ms-auto me-auto pt-9">
      <div className="max-w-[90vw] flex justify-between ms-auto me-auto self-center items-center gap-2">
        <img
          src="https://d35aaqx5ub95lt.cloudfront.net/images/df223d5b9feb8017b323ed21103eb5ac.svg"
          alt=""
          className="max-h-5"
        />
        <div className="progress-bar w-[70vw] bg-neutral-400 rounded-lg relative max-h-5 h-5">
          <div
            className="absolute bg-red-400 z-10 h-full rounded-lg"
            style={{}}
          ></div>
        </div>
        <div className="flex items-center gap-1">
          <Image
            src={"/heart.png"}
            alt="heart"
            width={30}
            height={30}
            className="max-h-8"
          />
          <span className="text-[#DC2219] font-bold">{heart}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
