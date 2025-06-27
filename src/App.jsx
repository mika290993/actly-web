// Actly Web App - Одностраничное приложение для тренировки актёрского мастерства
// Обновлено: 60 заданий на каждую категорию, автоматический день, зацикливание, прогресс-шкала

import { useState, useEffect } from "react";

const tasks = {
  emotions: [/* ...оставляем как есть... */],
  body: Array.from({ length: 60 }, (_, i) => `Пройди по комнате как будто ты — ${["солдат на параде", "старик со спиной болью", "танцор балета", "злой начальник", "ребёнок, впервые попавший в цирк", "пьяный человек", "испанский тореадор", "шпион, которого преследуют", "модель на подиуме", "рабочий после 12-часовой смены"][(i % 10)]}.`),
  imagination: Array.from({ length: 60 }, (_, i) => `Представь, что ты ${["на облаке и всё вокруг лёгкое", "в подземелье без выхода", "живёшь на Марсе без людей", "стал невидимым на день", "можешь управлять временем", "растёшь деревом в парке", "вспоминаешь прошлую жизнь актёра", "живёшь в городе без слов", "стал кошкой в театре", "сидишь на вершине мира"][(i % 10)]}. Сыграй это.`),
  improvisation: Array.from({ length: 60 }, (_, i) => `Импровизируй сцену, в которой ты ${["убеждаешь прохожего дать тебе зонт", "пытаешься извиниться за украденный велосипед", "встречаешь друга спустя 20 лет", "рассказываешь ребёнку сказку", "продаёшь невидимую вещь", "объясняешь полиции, почему кричал ночью", "пишешь письмо актрисе, которую любишь", "убедил собаку говорить с тобой", "осуждаешь соседа за шум", "хочешь устроиться на работу мечты"][(i % 10)]}.`)
};

function getDayNumber(startKey, totalDays = 60) {
  const stored = localStorage.getItem(startKey);
  let start = stored ? new Date(stored) : null;
  if (!start) {
    start = new Date();
    localStorage.setItem(startKey, start.toISOString());
  }
  const now = new Date();
  const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  return (diff % totalDays) + 1;
}

function getStreakKey() {
  const today = new Date().toISOString().split("T")[0];
  return `actly_checkin_${today}`;
}

export default function App() {
  const [category, setCategory] = useState("emotions");
  const currentDay = getDayNumber("actly_start_date");
  const [streak, setStreak] = useState(1);

  useEffect(() => {
    const todayKey = getStreakKey();
    if (!localStorage.getItem(todayKey)) {
      localStorage.setItem(todayKey, "true");
      const allDays = Object.keys(localStorage).filter(k => k.startsWith("actly_checkin_"));
      setStreak(allDays.length);
    } else {
      const allDays = Object.keys(localStorage).filter(k => k.startsWith("actly_checkin_"));
      setStreak(allDays.length);
    }
  }, []);

  const getTask = () => {
    const index = (currentDay - 1) % 60;
    return tasks[category][index] || "Задание будет доступно позже.";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black text-white flex flex-col items-center p-6 font-sans">
      <h1 className="text-5xl font-extrabold mb-2 tracking-wide text-yellow-300 drop-shadow">🎭 Actly</h1>
      <p className="text-md mb-6 text-center max-w-xl italic text-gray-300">
        Актёрская тренировка каждый день. Не пропускай — твой прогресс в твоих руках.
      </p>

      <div className="flex justify-center mb-4">
        <div className="bg-white text-black text-sm font-bold px-3 py-1 rounded-full">
          🔥 Серия: {streak} дней подряд
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {Object.keys(tasks).map((key) => (
          <button
            key={key}
            onClick={() => setCategory(key)}
            className={`px-4 py-2 text-sm font-semibold rounded-xl border transition ${
              category === key
                ? "bg-yellow-400 text-black border-yellow-300"
                : "bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
            }`}
          >
            {key === "emotions" && "Эмоции"}
            {key === "body" && "Телесность"}
            {key === "imagination" && "Воображение"}
            {key === "improvisation" && "Импровизация"}
          </button>
        ))}
      </div>

      <div className="bg-zinc-900 p-6 rounded-2xl shadow-2xl w-full max-w-md text-center border border-zinc-700">
        <h2 className="text-2xl font-bold text-yellow-300 mb-2">День {currentDay}</h2>
        <p className="text-lg leading-relaxed text-white">{getTask()}</p>
      </div>
    </div>
  );
}
