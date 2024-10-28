import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/Store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export type StatesType = {
  error: null | string;
  loading: boolean;
  user?: null | User;
  currentUser?:null | User;
};

export type RegisterValues = {
    email: string;
    password: string;
    passwordConfirm: string;
    lang:string;
    [key: string]: string;
  };

export interface Word {
    length: number;
    id: number;
    wordId: number;
    word: string;
    translationRu: string;
    translationEn: string;
    translationHi: string;
    level: number;
  }
  

  export interface StatesTypeWords {
    error: string | null;
    loading: boolean;
    words: Word[] | null;
  }
export interface LoginValues {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN'; 
  level: number;
  lives: number;
  lang: 'ru' | 'en' | 'hi'; 
  refreshToken: string;
  createdAt: string;
  updatedAt: string;
}