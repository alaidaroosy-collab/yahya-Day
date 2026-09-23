import React, { useState, useEffect, useRef, useCallback } from "react";
import { QuizQuestion } from "../../types/curriculum";
import { audioManager } from "../../utils/audioPlayer";
import { rewardsManager } from "../../utils/rewardsManager";
import confetti from "canvas-confetti";
import {
  Gamepad2,
  Trophy,
  RotateCcw,
  Sparkles,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Volume2
} from "lucide-react";

interface LearningSnakeProps {
  questions: QuizQuestion[];
  lessonTitle: string;
  onComplete?: () => void;
}

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
interface Position {
  x: number;
  y: number;
}

interface FoodOption {
  optionId: string;
  wordEn: string;
  wordAr: string;
  isCorrect: boolean;
  position: Position;
  color: string;
}

const GRID_SIZE = 12;
const INITIAL_SPEED = 230; // ms

export const LearningSnake: React.FC<LearningSnakeProps> = ({
  questions,
  lessonTitle,
  onComplete,
}) => {
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [snake, setSnake] = useState<Position[]>([
    { x: 5, y: 6 },
    { x: 4, y: 6 },
    { x: 3, y: 6 },
  ]);
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [nextDirection, setNextDirection] = useState<Direction>("RIGHT");
  const [foodItems, setFoodItems] = useState<FoodOption[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameState, setGameState] = useState<"ready" | "playing" | "answered_correct" | "game_over" | "completed">("ready");
  const [solvedWord, setSolvedWord] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ title: string; explanation: string; isCorrect: boolean } | null>(null);

  const currentQ = questions[currentQIndex] || questions[0];

  // Helper to get random empty cell
  const getEmptyCells = useCallback(
    (currentSnake: Position[], count: number): Position[] => {
      const occupied = new Set(currentSnake.map((s) => `${s.x},${s.y}`));
      const empty: Position[] = [];

      for (let x = 1; x < GRID_SIZE - 1; x++) {
        for (let y = 1; y < GRID_SIZE - 1; y++) {
          if (!occupied.has(`${x},${y}`)) {
            empty.push({ x, y });
          }
        }
      }

      // Shuffle empty and take count
      const shuffled = [...empty].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count);
    },
    []
  );

  // Spawn whole words for the current question
  const spawnFoodsForQuestion = useCallback(
    (q: QuizQuestion, currentSnake: Position[]) => {
      const positions = getEmptyCells(currentSnake, q.options.length);
      const colors = ["#F59E0B", "#10B981", "#3B82F6", "#8B5CF6"];

      const items: FoodOption[] = q.options.map((opt, idx) => ({
        optionId: opt.id,
        // Extract the key whole word from the option text
        wordEn: opt.textEn.split(" ")[0] || opt.textEn,
        wordAr: opt.textAr.split(" ")[0] || opt.textAr,
        isCorrect: opt.id === q.correctOptionId,
        position: positions[idx] || { x: idx + 2, y: idx + 2 },
        color: colors[idx % colors.length],
      }));

      setFoodItems(items);
    },
    [getEmptyCells]
  );

  // Initialize or reset game
  const startGame = () => {
    setScore(0);
    setCurrentQIndex(0);
    setSolvedWord(null);
    setFeedback(null);
    const initialSnake = [
      { x: 5, y: 6 },
      { x: 4, y: 6 },
      { x: 3, y: 6 },
    ];
    setSnake(initialSnake);
    setDirection("RIGHT");
    setNextDirection("RIGHT");
    setGameState("playing");
    spawnFoodsForQuestion(questions[0], initialSnake);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== "playing") return;

      if (e.key === "ArrowUp" && direction !== "DOWN") {
        setNextDirection("UP");
        e.preventDefault();
      } else if (e.key === "ArrowDown" && direction !== "UP") {
        setNextDirection("DOWN");
        e.preventDefault();
      } else if (e.key === "ArrowLeft" && direction !== "RIGHT") {
        setNextDirection("LEFT");
        e.preventDefault();
      } else if (e.key === "ArrowRight" && direction !== "LEFT") {
        setNextDirection("RIGHT");
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, gameState]);

  // Handle when a word is eaten by snake OR directly selected
  const handleEatWord = useCallback(
    (food: FoodOption) => {
      audioManager.stop();
      if (food.isCorrect) {
        // Correct Word!
        setSolvedWord(food.wordEn);
        setScore((prev) => prev + 25);
        rewardsManager.addStars(10);
        audioManager.playSuccessChime();

        setFeedback({
          title: "Brilliant! أحسنتِ يا زهرة",
          explanation: currentQ.explanationEn || "You selected the correct word to complete the sentence!",
          isCorrect: true,
        });

        // Speak the full completed sentence
        const completedSentence = currentQ.questionEn.includes("______") || currentQ.questionEn.includes("_____")
          ? currentQ.questionEn.replace(/_{3,}/g, food.wordEn)
          : `${currentQ.questionEn} ${food.wordEn}`;
        audioManager.speak(completedSentence, "en");

        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.6 },
        });

        setGameState("answered_correct");

        // Advance to next question after short delay
        setTimeout(() => {
          if (currentQIndex + 1 < questions.length) {
            const nextIdx = currentQIndex + 1;
            setCurrentQIndex(nextIdx);
            setSolvedWord(null);
            setFeedback(null);
            const resetSnake = [
              { x: 5, y: 6 },
              { x: 4, y: 6 },
              { x: 3, y: 6 },
            ];
            setSnake(resetSnake);
            setDirection("RIGHT");
            setNextDirection("RIGHT");
            setGameState("playing");
            spawnFoodsForQuestion(questions[nextIdx], resetSnake);
          } else {
            setGameState("completed");
            rewardsManager.awardBadge("word_explorer");
            if (onComplete) onComplete();
          }
        }, 3200);
      } else {
        // Wrong Word
        audioManager.playGentleIncorrect();
        setFeedback({
          title: "Try Another Word (جربي كلمة ثانية)",
          explanation: "That word does not fit this sentence. Keep guiding the snake!",
          isCorrect: false,
        });
      }
    },
    [currentQ, currentQIndex, questions, spawnFoodsForQuestion, onComplete]
  );

  // Main game loop ticker
  useEffect(() => {
    if (gameState !== "playing") return;

    const interval = setInterval(() => {
      setDirection(nextDirection);

      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead: Position = { ...head };

        if (nextDirection === "UP") newHead.y -= 1;
        if (nextDirection === "DOWN") newHead.y += 1;
        if (nextDirection === "LEFT") newHead.x -= 1;
        if (nextDirection === "RIGHT") newHead.x += 1;

        // Wrap around walls for friendly play
        if (newHead.x < 0) newHead.x = GRID_SIZE - 1;
        if (newHead.x >= GRID_SIZE) newHead.x = 0;
        if (newHead.y < 0) newHead.y = GRID_SIZE - 1;
        if (newHead.y >= GRID_SIZE) newHead.y = 0;

        // Check if head hit food word
        const hitFood = foodItems.find(
          (f) => f.position.x === newHead.x && f.position.y === newHead.y
        );

        if (hitFood) {
          handleEatWord(hitFood);
          return [newHead, ...prevSnake];
        }

        return [newHead, ...prevSnake.slice(0, -1)];
      });
    }, INITIAL_SPEED);

    return () => clearInterval(interval);
  }, [gameState, nextDirection, foodItems, handleEatWord]);

  // Construct the sentence to display: if solvedWord is present, fill it right into the blank!
  const renderSentenceWithBlank = () => {
    const rawQuestion = currentQ.questionEn;
    const hasBlank = /_{3,}/.test(rawQuestion);

    if (hasBlank) {
      const parts = rawQuestion.split(/_{3,}/);
      return (
        <span className="leading-relaxed">
          {parts[0]}
          {solvedWord ? (
            <span className="px-3 py-0.5 rounded-lg bg-emerald-500 text-white font-black animate-bounce inline-block shadow-md mx-1 border-2 border-emerald-300">
              {solvedWord}
            </span>
          ) : (
            <span className="px-4 py-0.5 rounded-lg bg-amber-100 text-amber-900 border-2 border-dashed border-amber-400 font-mono font-black inline-block mx-1">
              ______
            </span>
          )}
          {parts[1]}
        </span>
      );
    }

    return (
      <span className="leading-relaxed">
        {rawQuestion}{" "}
        {solvedWord && (
          <span className="px-3 py-0.5 rounded-lg bg-emerald-500 text-white font-black inline-block shadow-md mx-1 border-2 border-emerald-300">
            {solvedWord}
          </span>
        )}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-3xl border-3 border-emerald-300 shadow-md p-5 sm:p-7 space-y-4">
      {/* Top Header: Story Words Game Title & Score */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-emerald-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
            <span className="text-2xl">🐍</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-950 font-mono">
                Vocabulary Challenge Game
              </span>
              <span className="text-xs text-slate-500 font-arabic font-bold">
                تحدي تكملة الجمل بالكلمات الصحيحة
              </span>
            </div>
            <h4 className="text-lg sm:text-xl font-black text-slate-900 font-kid">
              Starry Words Game: Complete the Sentence
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs font-mono font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Score: {score} XP</span>
          </div>
          <div className="text-xs font-mono text-slate-500 font-bold">
            Question {currentQIndex + 1} of {questions.length}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* PROMINENT LIVE QUESTION WITH THE BLANK LINE FILL-IN! */}
      {/* ======================================================== */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-300 shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 uppercase">
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          <span>Active Sentence to Complete (أكملي الفراغ بالكلمة المناسبة):</span>
        </div>

        <h3 className="text-lg sm:text-xl font-black text-slate-900 font-kid">
          {renderSentenceWithBlank()}
        </h3>

        <p className="text-xs text-slate-600 font-arabic font-bold">
          💡 {currentQ.questionAr}
        </p>

        {/* Real-time Feedback Banner directly under the sentence! */}
        {feedback && (
          <div
            className={`p-3 rounded-xl text-xs font-kid flex items-center justify-between gap-2 border animate-fade-in ${
              feedback.isCorrect
                ? "bg-emerald-100/90 border-emerald-400 text-emerald-950"
                : "bg-rose-50 border-rose-300 text-rose-900"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{feedback.isCorrect ? "🌟" : "💡"}</span>
              <div>
                <span className="font-black block">{feedback.title}</span>
                <span className="font-normal">{feedback.explanation}</span>
              </div>
            </div>
            <button
              onClick={() => audioManager.speak(feedback.explanation, "en")}
              className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-emerald-800"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Main Game Arena & Choices */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Snake Grid Canvas (7 cols) */}
        <div className="md:col-span-7 relative bg-slate-950 rounded-3xl p-3 shadow-inner overflow-hidden aspect-square max-w-[380px] mx-auto w-full border-4 border-slate-900">
          <div
            className="w-full h-full grid relative"
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
              gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
            }}
          >
            {/* Grid Cells */}
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
              <div key={i} className="border border-slate-900/60 rounded-xs" />
            ))}

            {/* Snake Body */}
            {snake.map((segment, idx) => {
              const isHead = idx === 0;
              return (
                <div
                  key={`snake-${idx}`}
                  className={`absolute transition-all duration-100 rounded-lg flex items-center justify-center ${
                    isHead
                      ? "bg-emerald-400 ring-2 ring-emerald-200 shadow-md z-20"
                      : "bg-emerald-600 z-10 opacity-90"
                  }`}
                  style={{
                    width: `${100 / GRID_SIZE}%`,
                    height: `${100 / GRID_SIZE}%`,
                    left: `${(segment.x * 100) / GRID_SIZE}%`,
                    top: `${(segment.y * 100) / GRID_SIZE}%`,
                  }}
                >
                  {isHead && <span className="text-[10px] leading-none">👀</span>}
                </div>
              );
            })}

            {/* WHOLE WORDS on Grid */}
            {foodItems.map((food) => (
              <div
                key={food.optionId}
                onClick={() => handleEatWord(food)}
                className="absolute transition-transform duration-200 transform hover:scale-115 rounded-xl flex items-center justify-center font-black text-white shadow-lg animate-pulse z-15 p-0.5 cursor-pointer"
                style={{
                  width: `${(100 / GRID_SIZE) * 1.8}%`,
                  height: `${100 / GRID_SIZE}%`,
                  left: `${(food.position.x * 100) / GRID_SIZE}%`,
                  top: `${(food.position.y * 100) / GRID_SIZE}%`,
                  backgroundColor: food.color,
                }}
                title={food.wordEn}
              >
                <span className="text-[11px] font-kid leading-none truncate px-1">
                  {food.wordEn}
                </span>
              </div>
            ))}
          </div>

          {/* Ready Overlay */}
          {gameState === "ready" && (
            <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-3 z-30">
              <span className="text-4xl">🐍</span>
              <h5 className="text-lg font-black text-white font-kid">
                Start the Sentence Game!
              </h5>
              <p className="text-xs text-slate-300 max-w-xs font-kid">
                Guide the snake to collect the correct whole word that completes the sentence!
              </p>
              <button
                onClick={startGame}
                className="px-6 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm shadow-md transition transform active:scale-95 font-kid"
              >
                Start Game (ابدأ اللعب)
              </button>
            </div>
          )}

          {/* Completed Overlay */}
          {gameState === "completed" && (
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-3 z-30 animate-fade-in">
              <span className="text-5xl">🏆</span>
              <h5 className="text-xl font-black text-amber-300 font-kid">
                Sentence Mastered!
              </h5>
              <p className="text-sm text-slate-200 font-kid">
                You scored {score} XP and completed all the sentences!
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={startGame}
                  className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold font-kid flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Play Again</span>
                </button>
                {onComplete && (
                  <button
                    onClick={onComplete}
                    className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black font-kid shadow-md flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Done & Continue</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Word Options Buttons & D-Pad (5 cols) */}
        <div className="md:col-span-5 space-y-3">
          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
            Select or Guide Snake to the Word:
          </span>

          {/* Clickable Word Pills */}
          <div className="grid grid-cols-2 gap-2">
            {foodItems.map((food) => (
              <button
                key={food.optionId}
                onClick={() => handleEatWord(food)}
                className="p-3 rounded-2xl border-2 text-center transition flex flex-col items-center justify-center bg-slate-50 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 active:scale-95 shadow-2xs"
              >
                <span className="text-sm font-black text-slate-900 font-kid">
                  {food.wordEn}
                </span>
                <span className="text-[11px] text-slate-400 font-arabic">
                  {food.wordAr}
                </span>
              </button>
            ))}
          </div>

          {/* D-Pad Arrows for easy control */}
          <div className="pt-2 flex flex-col items-center justify-center">
            <button
              onClick={() => direction !== "DOWN" && setNextDirection("UP")}
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center shadow-xs"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 my-1">
              <button
                onClick={() => direction !== "RIGHT" && setNextDirection("LEFT")}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center shadow-xs"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-mono text-slate-400">Move</span>
              <button
                onClick={() => direction !== "LEFT" && setNextDirection("RIGHT")}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center shadow-xs"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={() => direction !== "UP" && setNextDirection("DOWN")}
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center shadow-xs"
            >
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
