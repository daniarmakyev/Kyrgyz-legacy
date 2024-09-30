"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
  Word,
} from "../../../../helpers/types";
import ProgressBar from "@/components/progressBar/page";
import UseLifeCheker from "@/scripts/UseLifeCheker";
import { UseComparison } from "@/scripts/UseComparison";
import { UseRandom } from "@/scripts/UseRandom";
import { UseGetWordsByLevel } from "@/scripts/UseGetWordsByLevel";
import { UseGoBack } from "@/scripts/UseGoBack";
import { useTranslation } from "react-i18next";
import {
  fetchCurrentUser,
  updateCurrentUser,
} from "../../../../store/Users/Users.action";
import i18n from "./../../../../path/i18n";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const LevelPage = () => {
  const [trueComparison, setTrueComparison] = useState<number[]>([]);
  const [userComparison, setUserComparison] = useState<number[]>([]);
  const [randomedWords, setRandomedWords] = useState<Word[]>([]);
  const [progress, setProgress] = useState(0);

  const { words } = useAppSelector((state) => state.words);
  const { currentUser } = useAppSelector((state) => state.users);
  const [heart, setHeart] = useState(0);
  const router = useRouter();
  const { level } = useParams();
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  
  useEffect(() => {
    dispatch(fetchCurrentUser())
    if (currentUser) {
      i18n.changeLanguage(currentUser.lang);
    }
  }, []);
  

  UseGetWordsByLevel(level);

  const handleWordClick = (word: Word) => {
    setUserComparison((prev) =>
      prev.includes(word.wordId)
        ? prev.filter((id) => id !== word.wordId)
        : [...new Set([...prev, word.wordId])]
    );
  };

  useEffect(() => {
    if (currentUser) {
      setHeart(currentUser.lives);
      i18n.changeLanguage(currentUser.lang);
    }
    if (currentUser?.lang) {
      i18n.changeLanguage(currentUser.lang);
    }
  }, []);

  const handelCompare = async () => {
    if (UseComparison(userComparison, trueComparison)) {
      const newProgress = progress === 0 ? 25 : progress + 25;
      setProgress(newProgress);
    } else {
      setHeart((prevHeart) => {
        const updatedHeart = prevHeart - 1;
  
        dispatch(updateCurrentUser({ lives: updatedHeart }));
  
        if (updatedHeart <= 0) {
          console.log("У пользователя закончились жизни");
        }
  
        return updatedHeart;
      });
    }
  };
  

  const WordHover = (soundUrl?: string) => {
    if (soundUrl) {
      const audio = new Audio(soundUrl);
      audio.play().catch((error) => {
        console.error("Error playing sound:", error);
      });
    }
  };

  const getTranslation = (item: Word) => {
    switch (currentUser?.lang) {
      case "ru":
        return item.translationRu;
      case "en":
        return item.translationEn;
      case "hi":
        return item.translationHi;
      default:
        return item.translationEn;
    }
  };

  UseGoBack();

  UseLifeCheker(heart);

  useEffect(() => {
    if (words && words.length > 0) {
      setTrueComparison((prevState) => [...new Set([words[0].wordId])]);
      setRandomedWords(UseRandom(words));
      console.log(words);
    }
  }, [words]);

  return (
    <div className="bg-[#121F25] h-screen flex flex-col items-center self-center ms-auto me-auto">
      <ProgressBar progress={3} heart={heart} />
      {words && (
        <div className="flex gap-5 mt-auto">
          <span
            onClick={() => WordHover(`${BASE_URL}/${words[0].manSound}`)}
            key={words[0].id}
            className="cursor-pointer select-none"
          >
            {words[0].word}
          </span>
        </div>
      )}
      <div className="flex gap-3 flex-wrap max-w-96 items-center self-center ms-auto me-auto justify-center mt-40">
        {randomedWords.map((item) => (
          <p
            className={`cursor-pointer p-2 border-neutral-700 border-solid border-2 rounded-md transition-colors select-none ${
              userComparison.includes(item.wordId)
                ? "bg-[#DC2219] text-white"
                : "bg-[#121f25] text-white"
            }`}
            key={item.id}
            onClick={() => handleWordClick(item)}
          >
            {getTranslation(item)}
          </p>
        ))}
      </div>
      <button onClick={handelCompare} className="mt-auto mb-24 ">
        <span className="cursor-pointer">{t("check")}</span>
      </button>
    </div>
  );
};

export default LevelPage;
