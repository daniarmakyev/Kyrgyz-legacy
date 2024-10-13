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
import { UseGetWordsByLevel } from "@/scripts/UseGetWordsByLevel";

export const WordHover = (soundUrl?: string) => {
  if (soundUrl) {
    const audio = new Audio(soundUrl);
    audio.play().catch((error) => {
      console.error("Error playing sound:", error);
    });
  }
};

const LevelPage = () => {
  const { level } = useParams();
  const lives = localStorage.getItem("lives");
  const { words } = useAppSelector((item) => item.words);
  UseGetWordsByLevel(level);
  const [progressBar, setProgress] = useState<number>(0);
  const [heart, setHeart] = useState<number>(lives ? parseInt(lives) : 0);
  const { currentUser } = useAppSelector((state) => state.users);
  const { progress } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
    if (currentUser && lives && progress !== undefined) {
      i18n.changeLanguage(currentUser.lang);
      setHeart(parseInt(lives));
      const decodeProgress = decodeId(progress.toString());
      setProgress(Number(decodeProgress));
    }
  }, []);

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
          heart={heart}
          setHeart={setHeart}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default LevelPage;
