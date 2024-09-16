"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../helpers/types";
import { fetchWordByLevel } from "../../../../store/Words/Words.action";
import UseLifeCheker from "@/hooks/LifeCheker";
import { UseComparison } from "@/hooks/UseComparison";

const LevelPage = () => {
  const [heart, setHeart] = useState(5);
  const [trueComparison, setTrueComparison] = useState<number[]>([]);
  const [userComparison, setUserComparison] = useState<number[]>([]);
  
  const params = useParams();
  const { id } = params;
  UseLifeCheker(heart);
  const dispatch = useAppDispatch();
  const { words } = useAppSelector((state) => state.words);

  useEffect(() => {
    if (id) {
      dispatch(fetchWordByLevel(id + ""));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (words && words.length > 0) {
      setTrueComparison(prevState => [
        ...new Set([...prevState, words[0].wordId]),
      ]);
    }
  }, [words]); 

  console.log(trueComparison);

  return (
    <div className="bg-[#121F25] h-screen">
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
            <span className="text-[#DC2219] font-bold">5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelPage;
