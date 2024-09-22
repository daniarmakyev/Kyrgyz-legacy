"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LifeCheker = (heart: number) => {
  const router = useRouter();

  useEffect(() => {
    if (heart < 1) {
      router.push('/');
    }
  }, [heart, router]);
};

export default LifeCheker;
