"use client";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../helpers/types";
import { registerUser } from "../../../store/Users/Users.action";
import style from "./auth.module.css";
import Link from "next/link";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [lang, setLang] = useState("ru");
  const [errors, setErrors] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.users);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const newErrors: string[] = [];
    if (password.length < 8) {
      newErrors.push("Password must be at least 8 characters");
    }
    if (!/[a-zA-Z]/.test(password)) {
      newErrors.push("Password must have at least one letter");
    }
    if (!/\d/.test(password)) {
      newErrors.push("Password must have at least one number");
    }
    if (password !== passwordConfirm) {
      newErrors.push("Passwords do not match");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = {
      email,
      password,
      passwordConfirm,
      lang,
    };

    dispatch(registerUser({ data: formData }));
  };

  useEffect(() => {
    if (error) {
      setErrors((prevErrors) => [...prevErrors, error]);
    }
  }, [error]);

  return (
    <div className={style.auth}>
      <h3 className="mb-4 font-semibold">Registration</h3>
      <form onSubmit={handleSubmit} className={style.formochka}>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>
        <div>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            placeholder="Confirm Password"
          />
        </div>
        <div>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            required
            className="text-neutral-500"
          >
            <option value="" disabled>
              Select a language
            </option>
            <option value="ru">Русский</option>
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
          </select>
        </div>
        <button type="submit" disabled={loading} className={style.authBtn}>
          Register
        </button>
        <Link href={"/auth/login"} >Already have an account? </Link>
        {errors.length > 0 && (
    <div className="error-container">
        <ul className="absolute">
            {errors.map((error, index) => (
                <li className="mb-1 text-red-500 font-bold" key={index}>{error}</li>
            ))}
        </ul>
    </div>
)}
      </form>
    </div>
  );
};

export default AuthPage;
