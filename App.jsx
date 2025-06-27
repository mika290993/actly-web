// App.jsx — компонент приложения Actly

import React, { useState, useEffect } from "react";
import "./index.css";

const tasks = {
  emotions: [...],
  body: [...],
  imagination: [...],
  improvisation: [...]
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

function App() {
  const [category, setCategory] = useState("emotions");
  const currentDay = getDayNumber("actly_start_date");
  const [streak, setStreak] = useState(1);

  useEffect(() => {
    const todayKey = getStreakKey();
    if (!localStorage.getItem(todayKey)) {
      localStorage.setItem(todayKey, "true");
    }
    const allDays = Object.keys(localStorage).filter(k => k.startsWith("actly_checkin_"));
    setStreak(allDays.length);
  }, []);

  const getTask = () => {
    const index = (currentDay - 1) % 60;
    return tasks[category][index] || "Задание будет доступно позже.";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#000] text-white flex flex-col items-center px-6 py-10 font-sans">
      <h1 className="text-6xl font-bold tracking-tight text-center text-white drop-shadow mb-4">
        <span className="text-yellow-400">Actly</span> 🎭
      </h1>
      <p className="text-lg text-gray-400 text-center max-w-xl mb-6">
        Твоя сцена каждый день. Выбирай категорию — и открывай новый актёрский вызов.
      </p>

      <div className="mb-5">
        <div className="bg-white/10 backdrop-blur-md text-yellow-300 font-medium px-4 py-2 rounded-full shadow border border-yellow-500/20">
          🔥 Серия: <span className="font-bold">{streak}</span> дней подряд
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {Object.keys(tasks).map((key) => (
          <button
            key={key}
            onClick={() => setCategory(key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold tracking-wide border transition duration-200 ${
              category === key
                ? "bg-yellow-400 text-black border-yellow-400 shadow-md"
                : "bg-white/10 text-white border-white/20 hover:bg-white/20"
            }`}
          >
            {key === "emotions" && "Эмоции"}
            {key === "body" && "Телесность"}
            {key === "imagination" && "Воображение"}
            {key === "improvisation" && "Импровизация"}
          </button>
        ))}
      </div>

      <div className="bg-zinc-900/70 backdrop-blur-md border border-zinc-700/50 p-6 rounded-3xl shadow-xl max-w-lg w-full text-center">
        <h2 className="text-2xl font-semibold text-yellow-300 mb-2">День {currentDay}</h2>
        <p className="text-lg text-white/90 leading-relaxed whitespace-pre-wrap">{getTask()}</p>
      </div>
    </div>
  );
}

export default App;
