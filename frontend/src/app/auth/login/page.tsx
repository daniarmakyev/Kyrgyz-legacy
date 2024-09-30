"use client";
import { useState, useEffect } from "react";
import style from "../auth.module.css";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../../../helpers/types";
import { loginUser } from "../../../../store/Users/Users.action";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { error, loading ,user} = useAppSelector((state) => state.users);
  const router = useRouter()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: string[] = [];
    if (!email) {
      newErrors.push("Email is required");
    }
    if (password.length < 8) {
      newErrors.push("Password must be at least 8 characters");
    }
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = {
        email,
        password,
      };
      
      dispatch(loginUser(formData));
      
  };

  useEffect(() => {
    if (error) {
      setErrors((prevErrors) => [...prevErrors, error]);
      console.error("Login Error:", error); 
    }
    if (user) {

      router.push('/');
    }
  }, [error,user]);

  return (
    <div className={style.auth}>
      <h3 className="mb-4 font-semibold">Login</h3>
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
        <button type="submit" disabled={loading} className={style.authBtn}>
          Sign In
        </button>
        <Link href={"/auth/"} className="ms-auto me-auto">Don't have an account?</Link>
        {errors.length > 0 && (
          <div className="error-container">
            <ul className="absolute left-10">
              {errors.map((error, index) => (
                <li className="mb-1 text-red-500 font-bold ms-auto" key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
