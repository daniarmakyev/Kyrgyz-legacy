import { useEffect } from "react";

export const useBackgroundColorObserver = (setBgColor: (color: string) => void) => {
  useEffect(() => {
    const btn4Element = document.querySelector(".btn4");
    const btn9Element = document.querySelector(".btn9");
    const btn14Element = document.querySelector(".btn14");

    if (btn4Element && btn9Element && btn14Element) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains("btn4")) {
              setBgColor("#FC4E4D");
            } else if (entry.target.classList.contains("btn9")) {
              setBgColor("#02CD9C");
            } else if (entry.target.classList.contains("btn14")) {
              setBgColor("#1CAFF6");
            }
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(btn4Element);
      observer.observe(btn9Element);
      observer.observe(btn14Element);

      return () => {
        observer.disconnect();
      };
    }
  }, [setBgColor]);
};
