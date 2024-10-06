"use client";
import ProgressBar from '@/components/progressBar/page';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react'
import { WordHover } from '../page';
import { UseGetWordsByLevel } from '@/scripts/UseGetWordsByLevel';
import { UseGoBack } from '@/scripts/UseGoBack';
import UseLifeCheker from '@/scripts/UseLifeCheker';
import i18n from "../../../../../path/i18n";
import { useParams, useRouter } from 'next/navigation';
import { Word, useAppSelector, useAppDispatch } from '../../../../../helpers/types';
import { fetchCurrentUser, updateCurrentUser } from '../../../../../store/Users/Users.action';
import { useTranslation } from 'next-i18next';
import { UseComparison } from '@/scripts/UseComparison';
const progressBar = () => {
    const lives = localStorage.getItem("lives");
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    const [trueComparison, setTrueComparison] = useState<number[]>([]);
    const [userComparison, setUserComparison] = useState<number[]>([]);
    const [randomedWords, setRandomedWords] = useState<Word[]>([]);
    const [progress, setProgress] = useState<number>(0);
    const [heart, setHeart] = useState<number | null>(lives ? parseInt(lives) : null);
    
  
    const { words } = useAppSelector((state) => state.words);
    const { currentUser } = useAppSelector((state) => state.users);
    const router = useRouter();
    const { level } = useParams();
    const dispatch = useAppDispatch();
  
    const { t } = useTranslation();
  
    useEffect(() => {
      dispatch(fetchCurrentUser());
      if (currentUser && lives) {
        i18n.changeLanguage(currentUser.lang);
        setHeart(parseInt(lives));
      }
    }, []);
  
    UseGetWordsByLevel(Number(level));

  
    const handleWordClick = (word: Word) => {
      setUserComparison((prev) =>
        prev.includes(word.wordId)
          ? prev.filter((id) => id !== word.wordId)
          : [...new Set([...prev, word.wordId])]
      );
    };
  
    useEffect(() => {
      if (currentUser && lives) {
        i18n.changeLanguage(currentUser.lang);
      }
    }, []);
  
    const handelCompare = async () => {
      if (UseComparison(userComparison, trueComparison)) {
        const newProgress = progress === 0 ? 25 : progress + 25;
        setProgress(newProgress);
      } else {
        setHeart((prevHeart) => {
          const updatedHeart = prevHeart! - 1;
          dispatch(updateCurrentUser({ lives: updatedHeart }));
          localStorage.setItem("lives", updatedHeart.toString());
  
          if (updatedHeart <= 0) {
            console.log("У пользователя закончились жизни");
          }
  
          return updatedHeart;
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
    UseLifeCheker(heart!);
  
    return (
        <div className="bg-[#121F25] h-screen flex flex-col items-center self-center ms-auto me-auto">
          <ProgressBar progress={3} heart={parseInt(lives!)} />
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
                {getTranslation(item)}
              </p>
            ))}
          </div>
          <button onClick={handelCompare} className="mt-auto mb-24 ">
            <span className="cursor-pointer">{t("check")}</span>
          </button>
        </div>
      );
}

export default progressBar