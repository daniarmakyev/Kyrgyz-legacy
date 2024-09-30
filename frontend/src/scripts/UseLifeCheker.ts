import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useLifeChecker = (heart: number) => {
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (heart < 1) {
        router.push('/');
      }
    }, 500); 

    return () => clearTimeout(timeoutId);
  }, [heart, router]);
};

export default useLifeChecker;
