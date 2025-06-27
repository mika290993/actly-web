// Actly Web App - Одностраничное приложение для тренировки актёрского мастерства
// Стек: React + Vite + TailwindCSS
// Сохраняет прогресс в LocalStorage, открывает задания по порядку

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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
      <p className="text-lg mb-6 text-center max-w-xl">Твоя ежедневная актёрская тренировка. Выполняй задания и развивай сценическое мастерство шаг за шагом!</p>

      <Tabs defaultValue="emotions" value={category} onValueChange={setCategory}>
        <TabsList className="grid grid-cols-4 gap-2 mb-4">
          <TabsTrigger value="emotions">Эмоции</TabsTrigger>
          <TabsTrigger value="body">Телесность</TabsTrigger>
          <TabsTrigger value="imagination">Воображение</TabsTrigger>
          <TabsTrigger value="improvisation">Импровизация</TabsTrigger>
        </TabsList>
        {Object.keys(tasks).map((key) => (
          <TabsContent key={key} value={key}>
            <Card className="bg-gray-900 text-white shadow-xl w-[340px]">
              <CardContent className="p-6 flex flex-col gap-4">
                <h2 className="text-xl font-semibold">День {currentDay}</h2>
                <p>{getTask()}</p>
                <Button onClick={nextDay} disabled={currentDay >= 30}>
                  {currentDay < 30 ? "Следующий день" : "Все задания выполнены"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
