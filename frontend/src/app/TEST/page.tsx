"use client"
import { useRef } from 'react';

const AddWord: React.FC = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData(formRef.current!);

        try {
            const response = await fetch('http://localhost:8080/api/words/addWord', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const newWord = await response.json();
                console.log('Слово добавлено:', newWord);
                alert('Слово успешно добавлено!');
            } else {
                const errorData = await response.json();
                console.error('Ошибка:', errorData);
                alert('Ошибка при добавлении слова: ' + errorData.error);
            }
        } catch (error) {
            const errorMessage = (error as Error).message; // Явное приведение типа
            console.error('Ошибка сети:', error);
            alert('Ошибка сети: ' + errorMessage);
        }
    };

    return (
        <div className='bg-black'>
            <h1>Добавить слово</h1>
            <form ref={formRef} onSubmit={handleSubmit}>
                <input type="number" name="wordId" placeholder="Word ID" required />
                <input type="text" name="word" placeholder="Слово" required />
                <input type="text" name="translationRu" placeholder="Перевод (RU)" required />
                <input type="text" name="translationEn" placeholder="Перевод (EN)" required />
                <input type="text" name="translationHi" placeholder="Перевод (HI)" />
                <input type="number" name="level" placeholder="Уровень" required />

                <button type="submit">Добавить слово</button>
            </form>
        </div>
    );
};

export default AddWord;
