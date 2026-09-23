import React, { useState } from "react";
import { audioManager } from "../../utils/audioPlayer";
import { rewardsManager } from "../../utils/rewardsManager";
import confetti from "canvas-confetti";
import {
  Sparkles,
  Volume2,
  CheckCircle2,
  HelpCircle,
  Plus,
  Minus,
  RotateCcw,
  Trophy,
  ArrowRight,
  Layers,
  Hash
} from "lucide-react";

interface MathPlaceValueExplorerProps {
  onComplete?: () => void;
}

export const MathPlaceValueExplorer: React.FC<MathPlaceValueExplorerProps> = ({
  onComplete,
}) => {
  // 4-digit number: Thousands, Hundreds, Tens, Ones
  const [thousands, setThousands] = useState<number>(3);
  const [hundreds, setHundreds] = useState<number>(4);
  const [tens, setTens] = useState<number>(5);
  const [ones, setOnes] = useState<number>(2);

  // Active Tab / Mode
  const [activeTab, setActiveTab] = useState<"builder" | "comparison" | "quiz">("builder");

  // Comparison State
  const [numA] = useState<{ th: number; h: number; t: number; o: number }>({
    th: 4,
    h: 5,
    t: 2,
    o: 0,
  });
  const [numB] = useState<{ th: number; h: number; t: number; o: number }>({
    th: 4,
    h: 2,
    t: 5,
    o: 0,
  });
  const [comparisonAnswer, setComparisonAnswer] = useState<">" | "<" | "=" | null>(null);
  const [comparisonFeedback, setComparisonFeedback] = useState<string | null>(null);

  // Quiz State
  const [quizStep, setQuizStep] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  const totalNumber = thousands * 1000 + hundreds * 100 + tens * 10 + ones;

  const speakNumber = () => {
    const textEn = `${thousands} thousand, ${hundreds} hundred and ${tens * 10 + ones}`;
    const textAr = `${thousands} آلاف و ${hundreds} مائة و ${tens * 10 + ones}`;
    audioManager.speak(`${totalNumber}. ${textEn}`, "en", true, textAr);
  };

  const handleUpdate = (place: "th" | "h" | "t" | "o", delta: number) => {
    if (place === "th") setThousands((v) => Math.max(0, Math.min(9, v + delta)));
    if (place === "h") setHundreds((v) => Math.max(0, Math.min(9, v + delta)));
    if (place === "t") setTens((v) => Math.max(0, Math.min(9, v + delta)));
    if (place === "o") setOnes((v) => Math.max(0, Math.min(9, v + delta)));
  };

  const handleComparisonCheck = (choice: ">" | "<" | "=") => {
    setComparisonAnswer(choice);
    if (choice === ">") {
      audioManager.playSuccessChime();
      rewardsManager.addStars(10);
      setComparisonFeedback(
        "Correct! أحسنتِ يا زهرة! 4,520 is greater than 4,250 because both have 4 thousands, but 5 hundreds is bigger than 2 hundreds!"
      );
      audioManager.speak(
        "Brilliant! 4,520 is greater than 4,250 because 5 hundreds is greater than 2 hundreds.",
        "en"
      );
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
      if (onComplete) onComplete();
    } else {
      audioManager.playGentleIncorrect();
      setComparisonFeedback(
        "Look closely at the Hundreds digit: 5 hundreds is greater than 2 hundreds. Try again!"
      );
    }
  };

  const quizQuestions = [
    {
      qEn: "In the number 6,742, what is the value of the digit 7?",
      qAr: "في العدد 6,742، ما هي القيمة المكانية للرقم 7؟",
      options: [
        { textEn: "70 (7 tens)", isCorrect: false },
        { textEn: "700 (7 hundreds)", isCorrect: true },
        { textEn: "7,000 (7 thousands)", isCorrect: false },
      ],
      explanation: "Digit 7 is in the hundreds column, so its value is 700.",
    },
    {
      qEn: "What is 3,000 + 400 + 50 + 8 in standard form?",
      qAr: "ما هو العدد بالصيغة القياسية: 3,000 + 400 + 50 + 8؟",
      options: [
        { textEn: "3,458", isCorrect: true },
        { textEn: "3,548", isCorrect: false },
        { textEn: "34,058", isCorrect: false },
      ],
      explanation: "3 thousands + 4 hundreds + 5 tens + 8 ones = 3,458.",
    },
  ];

  const handleQuizAnswer = (optIdx: number) => {
    setSelectedQuizOption(optIdx);
    const q = quizQuestions[quizStep];
    const isCorrect = q.options[optIdx].isCorrect;

    if (isCorrect) {
      audioManager.playSuccessChime();
      rewardsManager.addStars(10);
      setQuizScore((s) => s + 1);
      setQuizFeedback(`Correct! ${q.explanation}`);
      audioManager.speak(`Super! ${q.explanation}`, "en");
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    } else {
      audioManager.playGentleIncorrect();
      setQuizFeedback(`Try again! Hint: ${q.explanation}`);
    }
  };

  return (
    <div className="bg-white rounded-3xl border-3 border-indigo-200 shadow-lg p-5 sm:p-7 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-indigo-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
            <span className="text-2xl">📐</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-indigo-100 text-indigo-900 px-2.5 py-0.5 rounded-full border border-indigo-200">
                Oxford Primary Maths 3 — Page 4
              </span>
              <span className="text-xs text-slate-500 font-arabic font-bold">
                القيمة المكانية والأعداد حتى 10,000
              </span>
            </div>
            <h3 className="text-xl font-black font-kid text-slate-900">
              Interactive Place Value Studio (مختبر القيمة المكانية)
            </h3>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveTab("builder")}
            className={`px-3 py-1.5 rounded-xl text-xs font-kid font-bold transition flex items-center gap-1.5 ${
              activeTab === "builder"
                ? "bg-white text-indigo-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Block Builder</span>
          </button>
          <button
            onClick={() => setActiveTab("comparison")}
            className={`px-3 py-1.5 rounded-xl text-xs font-kid font-bold transition flex items-center gap-1.5 ${
              activeTab === "comparison"
                ? "bg-white text-indigo-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Hash className="w-3.5 h-3.5" />
            <span>Compare Numbers</span>
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-3 py-1.5 rounded-xl text-xs font-kid font-bold transition flex items-center gap-1.5 ${
              activeTab === "quiz"
                ? "bg-white text-indigo-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Practice Quiz</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: VISUAL BLOCK BUILDER & EXPANDED NOTATION          */}
      {/* ======================================================== */}
      {activeTab === "builder" && (
        <div className="space-y-6">
          {/* Main Number Banner */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white shadow-md flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-200 block">
                Constructed 4-Digit Number (العدد المتكوّن)
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-amber-300">
                  {totalNumber.toLocaleString()}
                </span>
                <span className="text-sm text-indigo-200 font-arabic">
                  ({thousands} آلاف و {hundreds} مائة و {tens} عشرات و {ones} آحاد)
                </span>
              </div>
            </div>

            <button
              onClick={speakNumber}
              className="px-4 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-kid text-xs font-bold transition flex items-center gap-2 shadow-xs active:scale-95"
            >
              <Volume2 className="w-4 h-4 text-amber-300" />
              <span>Listen to Number (استمعي للعدد)</span>
            </button>
          </div>

          {/* Expanded Form Display */}
          <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-center font-mono text-sm sm:text-base font-bold text-indigo-950 flex items-center justify-center gap-2 flex-wrap">
            <span className="text-xs font-kid text-indigo-700 font-black">
              Expanded Form (الصيغة التحليلية):
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-amber-100 text-amber-900">
              {thousands * 1000}
            </span>
            <span>+</span>
            <span className="px-2 py-0.5 rounded-lg bg-blue-100 text-blue-900">
              {hundreds * 100}
            </span>
            <span>+</span>
            <span className="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-900">
              {tens * 10}
            </span>
            <span>+</span>
            <span className="px-2 py-0.5 rounded-lg bg-purple-100 text-purple-900">
              {ones}
            </span>
            <span>=</span>
            <span className="px-3 py-0.5 rounded-xl bg-indigo-600 text-white font-black">
              {totalNumber}
            </span>
          </div>

          {/* 4 Place Value Columns: Thousands, Hundreds, Tens, Ones */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            {/* THOUSANDS */}
            <div className="p-4 rounded-2xl border-2 border-amber-300 bg-amber-50/70 flex flex-col justify-between space-y-3 shadow-2xs">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-amber-800 uppercase">
                    Thousands (Th)
                  </span>
                  <span className="text-base">🧊</span>
                </div>
                <h4 className="text-xl font-black font-mono text-amber-950">
                  {thousands} × 1,000
                </h4>
                <p className="text-[11px] text-amber-700 font-arabic font-bold">
                  الآلاف = {thousands * 1000}
                </p>
              </div>

              {/* Visual Mini Cubes */}
              <div className="h-14 bg-white/80 rounded-xl p-1.5 border border-amber-200 flex items-center justify-center gap-1 flex-wrap overflow-hidden">
                {Array.from({ length: thousands }).map((_, i) => (
                  <span key={i} className="text-base" title="1,000 Cube">
                    🧊
                  </span>
                ))}
                {thousands === 0 && (
                  <span className="text-xs text-slate-400 font-mono">0 Cubes</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdate("th", -1)}
                  disabled={thousands <= 0}
                  className="flex-1 py-1.5 rounded-xl bg-white hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold flex items-center justify-center disabled:opacity-30"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleUpdate("th", 1)}
                  disabled={thousands >= 9}
                  className="flex-1 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold flex items-center justify-center disabled:opacity-30 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* HUNDREDS */}
            <div className="p-4 rounded-2xl border-2 border-blue-300 bg-blue-50/70 flex flex-col justify-between space-y-3 shadow-2xs">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-blue-800 uppercase">
                    Hundreds (H)
                  </span>
                  <span className="text-base">🟩</span>
                </div>
                <h4 className="text-xl font-black font-mono text-blue-950">
                  {hundreds} × 100
                </h4>
                <p className="text-[11px] text-blue-700 font-arabic font-bold">
                  المئات = {hundreds * 100}
                </p>
              </div>

              {/* Visual Flats */}
              <div className="h-14 bg-white/80 rounded-xl p-1.5 border border-blue-200 flex items-center justify-center gap-1 flex-wrap overflow-hidden">
                {Array.from({ length: hundreds }).map((_, i) => (
                  <span key={i} className="text-sm" title="100 Flat">
                    🟩
                  </span>
                ))}
                {hundreds === 0 && (
                  <span className="text-xs text-slate-400 font-mono">0 Flats</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdate("h", -1)}
                  disabled={hundreds <= 0}
                  className="flex-1 py-1.5 rounded-xl bg-white hover:bg-blue-100 border border-blue-300 text-blue-900 font-bold flex items-center justify-center disabled:opacity-30"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleUpdate("h", 1)}
                  disabled={hundreds >= 9}
                  className="flex-1 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center disabled:opacity-30 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* TENS */}
            <div className="p-4 rounded-2xl border-2 border-emerald-300 bg-emerald-50/70 flex flex-col justify-between space-y-3 shadow-2xs">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-emerald-800 uppercase">
                    Tens (T)
                  </span>
                  <span className="text-base">🟢</span>
                </div>
                <h4 className="text-xl font-black font-mono text-emerald-950">
                  {tens} × 10
                </h4>
                <p className="text-[11px] text-emerald-700 font-arabic font-bold">
                  العشرات = {tens * 10}
                </p>
              </div>

              {/* Visual Rods */}
              <div className="h-14 bg-white/80 rounded-xl p-1.5 border border-emerald-200 flex items-center justify-center gap-1 flex-wrap overflow-hidden">
                {Array.from({ length: tens }).map((_, i) => (
                  <span key={i} className="text-xs" title="10 Rod">
                    🟢
                  </span>
                ))}
                {tens === 0 && (
                  <span className="text-xs text-slate-400 font-mono">0 Rods</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdate("t", -1)}
                  disabled={tens <= 0}
                  className="flex-1 py-1.5 rounded-xl bg-white hover:bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold flex items-center justify-center disabled:opacity-30"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleUpdate("t", 1)}
                  disabled={tens >= 9}
                  className="flex-1 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center disabled:opacity-30 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* ONES */}
            <div className="p-4 rounded-2xl border-2 border-purple-300 bg-purple-50/70 flex flex-col justify-between space-y-3 shadow-2xs">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-purple-800 uppercase">
                    Ones (O)
                  </span>
                  <span className="text-base">🟣</span>
                </div>
                <h4 className="text-xl font-black font-mono text-purple-950">
                  {ones} × 1
                </h4>
                <p className="text-[11px] text-purple-700 font-arabic font-bold">
                  الآحاد = {ones}
                </p>
              </div>

              {/* Visual Units */}
              <div className="h-14 bg-white/80 rounded-xl p-1.5 border border-purple-200 flex items-center justify-center gap-1 flex-wrap overflow-hidden">
                {Array.from({ length: ones }).map((_, i) => (
                  <span key={i} className="text-xs" title="1 Unit">
                    🟣
                  </span>
                ))}
                {ones === 0 && (
                  <span className="text-xs text-slate-400 font-mono">0 Ones</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdate("o", -1)}
                  disabled={ones <= 0}
                  className="flex-1 py-1.5 rounded-xl bg-white hover:bg-purple-100 border border-purple-300 text-purple-900 font-bold flex items-center justify-center disabled:opacity-30"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleUpdate("o", 1)}
                  disabled={ones >= 9}
                  className="flex-1 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold flex items-center justify-center disabled:opacity-30 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: COMPARISON CHALLENGE (Comparing 4-digit numbers)  */}
      {/* ======================================================== */}
      {activeTab === "comparison" && (
        <div className="p-6 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-5">
          <div className="text-center space-y-1">
            <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
              Comparing 4-Digit Numbers Challenge (مقارنة الأعداد)
            </span>
            <h4 className="text-lg font-black font-kid text-slate-900">
              Which symbol belongs in the circle?
            </h4>
            <p className="text-xs text-slate-600 font-arabic">
              قارني بين العددين بالنظر إلى منزلة الآلاف ثم منزلة المئات:
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 sm:gap-8 py-4">
            {/* Number A */}
            <div className="p-4 rounded-2xl bg-white border-2 border-indigo-300 shadow-sm text-center">
              <span className="text-2xl sm:text-3xl font-black font-mono text-indigo-950">
                4,520
              </span>
              <p className="text-[11px] text-slate-500 font-mono mt-1">
                4 Th, 5 H, 2 T, 0 O
              </p>
            </div>

            {/* Symbol Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleComparisonCheck(">")}
                className={`w-12 h-12 rounded-2xl font-mono text-2xl font-black transition border-2 shadow-xs ${
                  comparisonAnswer === ">"
                    ? "bg-emerald-500 text-white border-emerald-600 ring-2 ring-emerald-300"
                    : "bg-white hover:bg-slate-100 text-slate-800 border-slate-300"
                }`}
              >
                &gt;
              </button>
              <button
                onClick={() => handleComparisonCheck("<")}
                className={`w-12 h-12 rounded-2xl font-mono text-2xl font-black transition border-2 shadow-xs ${
                  comparisonAnswer === "<"
                    ? "bg-rose-500 text-white border-rose-600"
                    : "bg-white hover:bg-slate-100 text-slate-800 border-slate-300"
                }`}
              >
                &lt;
              </button>
              <button
                onClick={() => handleComparisonCheck("=")}
                className={`w-12 h-12 rounded-2xl font-mono text-2xl font-black transition border-2 shadow-xs ${
                  comparisonAnswer === "="
                    ? "bg-rose-500 text-white border-rose-600"
                    : "bg-white hover:bg-slate-100 text-slate-800 border-slate-300"
                }`}
              >
                =
              </button>
            </div>

            {/* Number B */}
            <div className="p-4 rounded-2xl bg-white border-2 border-indigo-300 shadow-sm text-center">
              <span className="text-2xl sm:text-3xl font-black font-mono text-indigo-950">
                4,250
              </span>
              <p className="text-[11px] text-slate-500 font-mono mt-1">
                4 Th, 2 H, 5 T, 0 O
              </p>
            </div>
          </div>

          {comparisonFeedback && (
            <div
              className={`p-4 rounded-2xl text-xs sm:text-sm font-kid font-bold flex items-center justify-between gap-3 border animate-fade-in ${
                comparisonAnswer === ">"
                  ? "bg-emerald-100 text-emerald-950 border-emerald-300"
                  : "bg-amber-100 text-amber-950 border-amber-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{comparisonAnswer === ">" ? "🌟" : "💡"}</span>
                <span>{comparisonFeedback}</span>
              </div>
              <button
                onClick={() => audioManager.speak(comparisonFeedback, "en")}
                className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-slate-700"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: PRACTICE QUIZ                                     */}
      {/* ======================================================== */}
      {activeTab === "quiz" && (
        <div className="p-6 rounded-3xl bg-indigo-50/60 border-2 border-indigo-200 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-indigo-100">
            <span className="text-xs font-mono font-bold text-indigo-900">
              Question {quizStep + 1} of {quizQuestions.length}
            </span>
            <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
              Score: {quizScore} ⭐
            </span>
          </div>

          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-black font-kid text-slate-900">
              {quizQuestions[quizStep].qEn}
            </h4>
            <p className="text-xs text-slate-600 font-arabic font-bold">
              {quizQuestions[quizStep].qAr}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {quizQuestions[quizStep].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleQuizAnswer(idx)}
                className={`p-3.5 rounded-2xl border-2 text-left font-kid text-xs font-bold transition shadow-xs flex items-center justify-between ${
                  selectedQuizOption === idx
                    ? opt.isCorrect
                      ? "bg-emerald-500 text-white border-emerald-600"
                      : "bg-rose-500 text-white border-rose-600"
                    : "bg-white hover:bg-indigo-50 text-slate-800 border-slate-200"
                }`}
              >
                <span>{opt.textEn}</span>
                {selectedQuizOption === idx && (
                  <span>{opt.isCorrect ? "✓" : "✗"}</span>
                )}
              </button>
            ))}
          </div>

          {quizFeedback && (
            <div className="p-3 rounded-xl bg-white border border-indigo-200 text-xs font-kid text-indigo-950 flex items-center justify-between">
              <span>{quizFeedback}</span>
              {quizStep + 1 < quizQuestions.length && (
                <button
                  onClick={() => {
                    setQuizStep((s) => s + 1);
                    setSelectedQuizOption(null);
                    setQuizFeedback(null);
                  }}
                  className="px-3 py-1 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center gap-1"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
