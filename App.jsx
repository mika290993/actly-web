// App.jsx — компонент приложения Actly

import React, { useState, useEffect } from "react";
import "./index.css";

const tasks = {
  emotions: [
    "Изобрази радость без слов, только мимикой и жестами.",
    "Покажи грусть, будто ты потерял что-то важное.",
    "Сыграй сильную злость, но без слов.",
    "Изобрази страх перед чем-то невидимым.",
    "Передай чувство облегчения после тяжёлого дня.",
    "Сыграй удивление при получении неожиданного подарка.",
    "Покажи растерянность, как будто ты проснулся в чужом месте.",
    "Изобрази любовь, не используя объятий или поцелуев.",
    "Покажи отвращение, будто ешь неприятную еду.",
    "Передай вдохновение, словно только что родилась великая идея.",
    "Сыграй вину за поступок, о котором жалеешь.",
    "Покажи чувство гордости за кого-то близкого.",
    "Изобрази тревогу в ожидании важной встречи.",
    "Покажи чувство одиночества в толпе.",
    "Сыграй облегчение после примирения с другом.",
    "Изобрази неловкость при случайном прикосновении.",
    "Покажи волнение перед выступлением на сцене.",
    "Сыграй подавленность, будто весь мир отвернулся.",
    "Покажи восторг от исполнения мечты.",
    "Изобрази раздражение, когда тебя перебивают.",
    "Сыграй благодарность человеку, который помог.",
    "Покажи нежность, глядя на что-то любимое.",
    "Изобрази чувство влюблённости с первого взгляда.",
    "Сыграй волнение на первом свидании.",
    "Покажи эмоциональное истощение.",
    "Сыграй искреннюю радость за чужую победу.",
    "Покажи злость, которую пытаешься скрыть.",
    "Изобрази волнение во время признания в любви.",
    "Сыграй сомнение перед трудным решением.",
    "Покажи уверенность, входя в незнакомую аудиторию.",
    "Изобрази зависть, стараясь не выдать её.",
    "Сыграй тоску по ушедшему времени.",
    "Покажи радость от долгожданной встречи.",
    "Сыграй страх потерять близкого.",
    "Изобрази удовлетворение от проделанной работы.",
    "Покажи злорадство, но сдержанно.",
    "Сыграй ревность, наблюдая за любимым человеком.",
    "Покажи восхищение кем-то великим.",
    "Изобрази панику в экстренной ситуации.",
    "Сыграй равнодушие, даже если внутри бушуют эмоции.",
    "Покажи радость от простого момента.",
    "Сыграй страх перед важным решением.",
    "Изобрази удивление, будто услышал невероятную новость.",
    "Покажи досаду из-за неудачи.",
    "Сыграй ностальгию по детству.",
    "Изобрази уважение к старшему.",
    "Сыграй чувство вины за обман.",
    "Покажи эмоциональную защиту от внешнего мира.",
    "Сыграй облегчение после долгой дороги.",
    "Изобрази внутреннюю борьбу.",
    "Покажи восторг от неожиданного поворота.",
    "Сыграй спокойствие перед бурей.",
    "Изобрази радость от признания.",
    "Покажи горечь расставания.",
    "Сыграй чувство свободы.",
    "Покажи сожаление о сказанном слове.",
    "Изобрази удовольствие от любимой музыки.",
    "Сыграй эмоциональное освобождение.",
    "Покажи благодарность миру.",
    "Сыграй глубокое внутреннее принятие.",
    "Изобрази момент внутреннего прозрения."
  ],
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
