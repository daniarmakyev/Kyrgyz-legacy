import { useEffect } from "react";
import { fetchWordByLevel } from "../../store/Words/Words.action";
import { useAppDispatch } from "../../helpers/types";

export const UseGetWordsByLevel: any = (id: number) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (id) {
      dispatch(fetchWordByLevel(id + ""));
    }
  }, [id, dispatch]);
}