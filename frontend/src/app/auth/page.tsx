"use client"
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../helpers/types";
import { registerUser } from "../../../store/Users/Users.action";
import style from "./auth.module.css";

const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [lang, setLang] = useState('ru');
    const [errors, setErrors] = useState<string[]>([]);
    const dispatch = useAppDispatch();
    const { error, loading } = useAppSelector(state => state.users);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors([]);

        const newErrors: string[] = [];
        if (password.length < 8) {
            newErrors.push('Пароль должен содержать минимум 8 символов');
        }
        if (password !== passwordConfirm) {
            newErrors.push('Пароли не совпадают');
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
            setErrors(prevErrors => [...prevErrors, error]);
        }
    }, [error]);

    return (
        <div className={style.auth}>
            <h3>Регистрация</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Пароль:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Подтверждение пароля:</label>
                    <input
                        type="password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Язык:</label>
                    <select value={lang} onChange={(e) => setLang(e.target.value)} required>
                        <option value="ru">Русский</option>
                        <option value="en">English</option>
                        <option value="hi">हिंदी</option>
                    </select>
                </div>
                <button type="submit" disabled={loading}>Зарегистрироваться</button>

                {errors.length > 0 && (
                    <div>
                        <ul>
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </form>
        </div>
    );
};

export default AuthPage;
