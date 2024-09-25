"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, Word } from "../../../../helpers/types";
import ProgressBar from "@/components/progressBar/page";
import UseLifeCheker from "@/hooks/UseLifeCheker";
import { UseComparison } from "@/hooks/UseComparison";
import { UseRandom } from "@/hooks/UseRandom";
import { UseGetWordsByLevel } from "@/hooks/UseGetWordsByLevel";
import { UseGoBack } from "@/hooks/UseGoBack";
import { useTranslation } from 'react-i18next';
import { fetchCurrentUser } from "../../../../store/Users/Users.action";
import i18n from './../../../../path/i18n';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const LevelPage = () => {
  const [heart, setHeart] = useState(5);
  const [trueComparison, setTrueComparison] = useState<number[]>([]);
  const [userComparison, setUserComparison] = useState<number[]>([]);
  const [randomedWords, setRandomedWords] = useState<Word[]>([]);
  const { words } = useAppSelector((state) => state.words);
  const { currentUser } = useAppSelector((state) => state.users);
  const { level } = useParams();
  const dispatch = useAppDispatch();

  UseLifeCheker(heart);
  UseGetWordsByLevel(level);

  const { t } = useTranslation(); 

  const handleWordClick = (word: Word) => {
    setUserComparison((prev) =>
      prev.includes(word.wordId)
        ? prev.filter((id) => id !== word.wordId)
        : [...new Set([...prev, word.wordId])]
    );
  };

  const WordHover = (soundUrl?: string) => {
    if (soundUrl) {
      const audio = new Audio(soundUrl);
      audio.play().catch((error) => {
        console.error("Error playing sound:", error);
      });
    }
  };

  useEffect(() => {
    if (words && words.length > 0) {
      setTrueComparison((prevState) => [...new Set([words[0].wordId])]);
      setRandomedWords(UseRandom(words));
      console.log(words);
    }
  }, [words]);

  const handelCompare = () => {
    if (UseComparison(userComparison, trueComparison)) {
      console.log("nice");
    } else {
      setHeart(heart - 1);
    }
  };

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  
  useEffect(() => {
    console.log('Current user:', currentUser); // Проверка значения currentUser
    if (currentUser && currentUser.lang) {
      console.log('Changing language to:', currentUser.lang);
      i18n.changeLanguage(currentUser.lang); 
    }
  }, [currentUser]); 
  

  UseGoBack();
  
  return (
    <div className="bg-[#121F25] h-screen flex flex-col items-center self-center ms-auto me-auto">
      <ProgressBar progress={3} heart={heart} />
      {words && (
        <div className="flex gap-5 mt-auto">
          <span
            onClick={() => WordHover(`${BASE_URL}/${words[0].manSound}`)}
            key={words[0].id}
            className="cursor-pointer"
          >
            {words[0].word}
          </span>
        </div>
      )}
      <div className="flex gap-3 flex-wrap max-w-96 items-center self-center ms-auto me-auto justify-center mt-40">
        {randomedWords.map((item) => (
          <p
            className={`cursor-pointer p-2 border-neutral-700 border-solid border-2 rounded-md ${
              userComparison.includes(item.wordId)
                ? "bg-[#DC2219] text-white"
                : "bg-[#121f25] text-white"
            }`}
            key={item.id}
            onClick={() => handleWordClick(item)}
          >
            {item.translationEn}
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
