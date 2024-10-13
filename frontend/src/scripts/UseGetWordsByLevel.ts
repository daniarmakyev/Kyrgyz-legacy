import { useEffect } from "react";
import { fetchWordByLevel } from "../../store/Words/Words.action";
import { useAppDispatch } from "../../helpers/types";
import { decodeId } from "./decoder";

export const UseGetWordsByLevel: any = (level: string) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (level) {
        const id = decodeId(level.toString())
      dispatch(fetchWordByLevel(id + ""));  
    }else{
      console.log(level);
      
    }
  }, [level, dispatch]);
}