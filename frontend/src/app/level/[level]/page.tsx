"use client";
import { useParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, Word } from "../../../../helpers/types";
import { fetchWordByLevel } from "../../../../store/Words/Words.action";
import ProgressBar from "@/components/progressBar/page";
import { UseComparison } from "@/hooks/UseComparison";
import { UseGetWordsByLevel } from "@/hooks/UsegetWordsByLevel";
import UseLifeCheker from "@/hooks/UseLifeCheker";

const LevelPage = () => {
  const [heart, setHeart] = useState(5);
  const [trueComparison, setTrueComparison] = useState<number[]>([]);
  const [userComparison, setUserComparison] = useState<number[]>([]);
  const { words } = useAppSelector((state) => state.words);

  const { level } = useParams();
  UseLifeCheker(heart);
  UseGetWordsByLevel(level);

  const handleWordClick = (word: Word) => {
    if(userComparison.includes(word.wordId)){
      setUserComparison((prevNumbers) => prevNumbers.filter((num) => num !== word.wordId));
    }else {
      setUserComparison((prevState) => [
        ...new Set([...prevState, word.wordId]),
      ]);
    }
  };

  useEffect(() => {
    if (words && words.length > 0) {
      setTrueComparison((prevState) => [
        ...new Set([
          ...prevState, 
          words[0].wordId,
          words[6].wordId    
        ]),
      ]);
    }
  }, [words]);
  

  const handelCompare = () => {
    if(UseComparison(userComparison, trueComparison)){
      console.log('nice');
    }else{
      setHeart(heart - 1)
      
    }
  }

  return (
    <div className="bg-[#121F25] h-screen flex flex-col  items-center self-center ms-auto me-auto">
      <ProgressBar progress={3} heart={heart}/>
      {words && (
        <div className=" flex gap-5 mt-auto">
          <p key={words[0].id}>{words[0].word}</p>
          <p key={words[6].id}>{words[6].word}</p>
        </div>
      )}
    <div className="flex gap-3 flex-wrap max-w-96 items-center self-center ms-auto me-auto justify-center mt-40">
    {words?.map((item) => (
          <p
            className={`cursor-pointer ${
              userComparison.includes(item.wordId)
                ? "bg-green-500 text-white" 
                : "bg-gray-200 text-black" 
            }`}
            key={item.id}
            onClick={() => handleWordClick(item)}
          >
            {item.translationEn}
          </p>
        ))}
    </div>
      <button onClick={handelCompare} className="mt-auto mb-24">Check</button>
    </div>
  );
};

export default LevelPage;
