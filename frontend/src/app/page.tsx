"use client";
import Image from "next/image";
import styles from "./mainPage.module.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../helpers/types";
import { fetchCurrentUser } from "../../store/Users/Users.action";
import LevelButton from "@/components/levelButton/page";
import { useBackgroundColorObserver } from "@/scripts/useBackgroundColorObserver";
import { UseGoBack } from "@/scripts/UseGoBack";

export default function Home() {
  UseGoBack();
  const levelsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const [bgColor, setBgColor] = useState("#FC4E4D");
  const [gradientValue, setGradientValue] = useState(95);
  const [bgSize, setBgSize] = useState("50px");
  const [heart, setHeart] = useState(" ");
  const { currentUser, loading } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();



  useEffect(() => {
    const token = localStorage.getItem("tokens");
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setHeart(`${currentUser.lives}`);
    }
  }, [currentUser]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 650) {
        setBgSize("70px");
      } else {
        setBgSize("50px");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 800) {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        const newGradientValue = Math.max(0, 95 - (scrollTop / maxScroll) * 55);
        setGradientValue(newGradientValue);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useBackgroundColorObserver(setBgColor);

  return (
    <div
      className={styles.main}
      style={{
        backgroundPosition: "left",
        backgroundSize: bgSize,
        backgroundRepeat: "repeat-y",
        backgroundImage: `
          linear-gradient(to top, rgba(18, 31, 37, 0) 0%, rgba(18, 31, 37, 1) ${gradientValue}%),
          url(./palas.png)
        `,
      }}
    >
      <div
        className={styles.mainInner}
        style={{
          backgroundPosition: "right",
          backgroundSize: bgSize,
          backgroundRepeat: "repeat-y",
          backgroundImage: `
            linear-gradient(to top, rgba(18, 31, 37, 0) 0%, rgba(18, 31, 37, 1) ${gradientValue}%),
            url(./palasR.png)
          `,
        }}
      >
        <div
          className={`flex ps-3 pr-3 pt-4 justify-between max-w-7xl fixed top-0 z-20  ${styles.header}`}
        >
          <div className="">
            <Image
              src={"/flag.png"}
              alt="flag"
              className="rounded-lg"
              width={60}
              height={60}
              priority
            />
          </div>
          <div className="flex align-middle self-center items-center gap-2">
            <Image src={"/heart.png"} alt="heart" width={35} height={30}  />
            <span>{loading ? " " : heart}</span>
          </div>
        </div>
        <div
          className={`fixed ${styles.topMenu} z-20`}
          style={{ backgroundColor: bgColor }}
        ></div>
        <div className="flex justify-center flex-col items-center pt-44 gap-y-7 ">
          <LevelButton numbers={levelsArray} />
        </div>
      </div>
    </div>
  );
}
