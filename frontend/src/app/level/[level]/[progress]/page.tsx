"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../helpers/types";
import ProgressBar from "@/components/progressBar/page";
import UseLifeCheker from "@/scripts/UseLifeCheker";
import { UseGoBack } from "@/scripts/UseGoBack";
import { fetchCurrentUser } from "../../../../../store/Users/Users.action";
import i18n from "../../../../../path/i18n";
import { decodeId, encodeId } from "@/scripts/decoder";
import LevelInner from "@/components/levelInner/page";
import { fetchWordByLevel } from "../../../../../store/Words/Words.action";

const LevelPage = () => {
  const { level } = useParams();
  const lives: string | null = null;
  const { words } = useAppSelector((item) => item.words);
  const [progressBar, setProgress] = useState<number>(0);
  const [heart, setHeart] = useState<number>(lives ? parseInt(lives) : 0);
  const { currentUser } = useAppSelector((state) => state.users);
  const { progress } = useParams();
  const token = localStorage.getItem("tokens");
  const dispatch = useAppDispatch();

  if (token) {
    useEffect(() => {
      if (level) {
        const id = decodeId(level.toString());
        dispatch(fetchWordByLevel(id + ""));
      } else {
        console.log(level);
      }
    }, [level, dispatch]);
 

  useEffect(() => {
    const lives = localStorage.getItem("lives");
    setHeart(lives ? parseInt(lives) : 0);

    dispatch(fetchCurrentUser());
    if (currentUser && progress !== undefined) {
      i18n.changeLanguage(currentUser.lang);
      const decodeProgress = decodeId(progress.toString());
      setProgress(Number(decodeProgress));
    }
  }, []);
}
  UseGoBack();
  UseLifeCheker(heart);

  return (
    <div className="bg-[#121F25] h-screen flex flex-col items-center">
      <ProgressBar progress={progressBar} heart={heart} />
      {words && (
        <LevelInner
          words={words}
          level={level.toString()}
          progressBar={progressBar}
          setProgress={setProgress}
          setHeart={setHeart}
          heart={heart}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default LevelPage;
