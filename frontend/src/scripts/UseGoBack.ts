import { useRouter } from "next/navigation";
import { useEffect } from "react";


export const UseGoBack = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('tokens');
    if (!token) {
        router.push('/auth/login');
    }
  }, [router]);
};