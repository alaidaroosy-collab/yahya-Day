import React, { useState } from "react";
import { audioManager } from "../../utils/audioPlayer";
import { rewardsManager } from "../../utils/rewardsManager";
import confetti from "canvas-confetti";
import {
  Sparkles,
  Volume2,
  CheckCircle2,
  HelpCircle,
  Pencil,
  RotateCcw,
  Trophy,
  ArrowRight,
  Eye,
  EyeOff
} from "lucide-react";

export interface SpellingWordItem {
  id: string;
  wordEn: string;
  wordAr: string;
  meaningEn: string;
  iconEmoji: string;
  sampleSentenceEn: string;
}

interface LessonSpellingReviewProps {
  subjectNameEn: string;
  subjectNameAr: string;
  words: SpellingWordItem[];
  onComplete?: () => void;
}

export const LessonSpellingReview: React.FC<LessonSpellingReviewProps> = ({
  subjectNameEn,
  subjectNameAr,
  words,
  onComplete,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [inputVal, setInputVal] = useState<string>("");
  const [completedWordIds, setCompletedWordIds] = useState<string[]>([]);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    isCorrect: boolean;
  } | null>(null);

  const activeWord = words[currentIdx] || words[0];
  const isFinishedAll = completedWordIds.length === words.length;

  const handleSpeak = (text: string) => {
    audioManager.speak(text, "en");
  };

  const checkSpelling = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) return;

    const cleanInput = inputVal.trim().toLowerCase();
    const target = activeWord.wordEn.trim().toLowerCase();

    if (cleanInput === target) {
      // Correct!
      audioManager.playSuccessChime();
      rewardsManager.addStars(10);
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });

      const newCompleted = Array.from(new Set([...completedWordIds, activeWord.id]));
      setCompletedWordIds(newCompleted);

      setStatusMessage({
        text: `Excellent! أحسنتِ يا زهرة! You spelled "${activeWord.wordEn}" correctly!`,
        isCorrect: true,
      });

      audioManager.speak(`Super! ${activeWord.wordEn}. Well done, Zahra!`, "en");

      setTimeout(() => {
        setInputVal("");
        setShowHint(false);
        setStatusMessage(null);

        if (newCompleted.length === words.length) {
          if (onComplete) onComplete();
        } else if (currentIdx + 1 < words.length) {
          setCurrentIdx((c) => c + 1);
        }
      }, 1800);
    } else {
      audioManager.playGentleIncorrect();
      setStatusMessage({
        text: `Keep trying! Listen to the word and check the hint below.`,
        isCorrect: false,
      });
    }
  };

  return (
    <div className="bg-white rounded-3xl border-3 border-amber-300 shadow-lg p-5 sm:p-7 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-amber-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
            <Pencil className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-amber-100 text-amber-950 px-2.5 py-0.5 rounded-full border border-amber-300">
                End of Lesson: Vocabulary & Spelling Mastery
              </span>
              <span className="text-xs text-slate-500 font-arabic font-bold">
                مراجعة وتدريب كتابة الكلمات
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black font-kid text-slate-900">
              Practice Writing the Top 5 Lesson Words (كتابة الكلمات)
            </h3>
          </div>
        </div>

        {/* Progress Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs font-mono font-bold">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>
            {completedWordIds.length} of {words.length} Words Mastered
          </span>
        </div>
      </div>

      {/* Word Progress Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {words.map((w, idx) => {
          const isDone = completedWordIds.includes(w.id);
          const isCurrent = currentIdx === idx && !isFinishedAll;

          return (
            <button
              key={w.id}
              onClick={() => {
                setCurrentIdx(idx);
                setInputVal("");
                setStatusMessage(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-kid font-bold transition flex items-center gap-1.5 shrink-0 ${
                isDone
                  ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                  : isCurrent
                  ? "bg-amber-500 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <span>{w.iconEmoji}</span>
              <span>{w.wordEn}</span>
              {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
            </button>
          );
        })}
      </div>

      {!isFinishedAll ? (
        <div className="p-6 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-6">
          {/* Card Presentation of Active Word */}
          <div className="bg-white rounded-2xl p-5 border-2 border-amber-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <span className="text-4xl p-2 rounded-2xl bg-amber-50 border border-amber-200">
                {activeWord.iconEmoji}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-2xl font-black font-kid text-slate-900">
                    {showHint ? activeWord.wordEn : activeWord.wordEn.replace(/[a-zA-Z]/g, "•")}
                  </h4>
                  <button
                    onClick={() => handleSpeak(activeWord.wordEn)}
                    className="p-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 transition"
                    title="Listen to pronunciation"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-600 font-arabic font-bold">
                  {activeWord.wordAr} — {activeWord.meaningEn}
                </p>
                <p className="text-xs text-slate-500 font-kid italic mt-1">
                  Example: "{activeWord.sampleSentenceEn}"
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowHint(!showHint)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-kid font-bold flex items-center gap-1 self-start sm:self-auto"
            >
              {showHint ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showHint ? "Hide Word" : "Show Word Hint"}</span>
            </button>
          </div>

          {/* Spelling Input Form */}
          <form onSubmit={checkSpelling} className="space-y-4">
            <div>
              <label className="text-xs font-mono font-bold text-slate-600 block mb-1">
                Type the word below to practice spelling (اكتبي الكلمة هنا بالإنجليزية):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder={`Type "${activeWord.wordEn}" here...`}
                  className="flex-1 p-3.5 rounded-2xl border-2 border-slate-300 focus:border-amber-500 font-mono text-base font-bold outline-hidden bg-white"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-kid font-black text-sm transition shadow-sm active:scale-95 flex items-center gap-1.5"
                >
                  <span>Check</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>

          {/* Feedback Message */}
          {statusMessage && (
            <div
              className={`p-3.5 rounded-2xl text-xs sm:text-sm font-kid font-bold flex items-center gap-2 border animate-fade-in ${
                statusMessage.isCorrect
                  ? "bg-emerald-100 text-emerald-950 border-emerald-300"
                  : "bg-rose-100 text-rose-950 border-rose-300"
              }`}
            >
              <span>{statusMessage.isCorrect ? "🌟" : "💡"}</span>
              <span>{statusMessage.text}</span>
            </div>
          )}
        </div>
      ) : (
        /* Finished Celebration */
        <div className="p-8 rounded-3xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
            <Trophy className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xl font-black font-kid text-emerald-950">
              Outstanding Spelling, Zahra! 🌟
            </h4>
            <p className="text-xs sm:text-sm text-emerald-800 font-arabic font-bold">
              لقد أتقنتِ كتابة وتهجئة جميع كلمات الدرس الخمس بنجاح تام!
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
            {words.map((w) => (
              <span
                key={w.id}
                className="px-3 py-1 rounded-xl bg-white border border-emerald-200 text-emerald-900 font-mono text-xs font-black shadow-2xs"
              >
                ✓ {w.wordEn}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
