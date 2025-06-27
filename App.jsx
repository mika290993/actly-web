import { useState, useEffect } from "react";

const tasks = {
  emotions: [
    "Изобрази радость без слов в течение 1 минуты.",
    "Покажи страх только глазами.",
    "Сыграй сцену прощания с любимым человеком."
  ],
  body: [
    "Пройди по комнате как будто ты король/королева.",
    "Сделай пантомиму: сильный ветер против тебя.",
    "Изобрази старика в движении, без звуков."
  ],
  imagination: [
    "Представь, что ты на Луне. Покажи это телом.",
    "Ты — животное, проснувшееся человеком.",
    "Играй, как будто в комнате внезапно стало жарко."
  ],
  improvisation: [
    "Ответь на воображаемый звонок — каждый раз новый персонаж.",
    "Придумай диалог с лампой, как с любимым другом.",
    "Начни монолог на тему: «Я не виноват…»"
  ]
};

export default function App() {
  const [category, setCategory] = useState("emotions");
  const [currentDay, setCurrentDay] = useState(1);

  useEffect(() => {
    const savedDay = localStorage.getItem("actly_day_" + category);
    setCurrentDay(savedDay ? parseInt(savedDay) : 1);
  }, [category]);

  const nextDay = () => {
    if (currentDay < 30) {
      const newDay = currentDay + 1;
      setCurrentDay(newDay);
      localStorage.setItem("actly_day_" + category, newDay);
    }
  };

  const getTask = () => {
    const index = currentDay - 1;
    return tasks[category][index] || "Задание будет доступно позже.";
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-2">🎭 Actly</h1>
      <p className="text-lg mb-6 text-center max-w-xl">
        Твоя ежедневная актёрская тренировка. Выполняй задания и развивай сценическое мастерство шаг за шагом!
      </p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {Object.keys(tasks).map((key) => (
          <button
            key={key}
            onClick={() => setCategory(key)}
            className={`px-4 py-2 rounded ${
              category === key ? "bg-red-600" : "bg-gray-700"
            }`}
          >
            {key === "emotions" && "Эмоции"}
            {key === "body" && "Телесность"}
            {key === "imagination" && "Воображение"}
            {key === "improvisation" && "Импровизация"}
          </button>
        ))}
      </div>

      <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-xl font-semibold mb-2">День {currentDay}</h2>
        <p className="mb-4">{getTask()}</p>
        <button
          onClick={nextDay}
          disabled={currentDay >= 30}
          className="bg-red-600 px-4 py-2 rounded disabled:opacity-50"
        >
          {currentDay < 30 ? "Следующий день" : "Все задания выполнены"}
        </button>
      </div>
    </div>
  );
}
