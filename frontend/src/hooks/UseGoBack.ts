import { useRouter } from "next/navigation";
import { useEffect } from "react";


export const UseGoBack = () => {
    const router = useRouter();
  
    useEffect(() => {
      // Проверяем, что код выполняется только на клиенте
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth');
      }
    }, [router]);
  };