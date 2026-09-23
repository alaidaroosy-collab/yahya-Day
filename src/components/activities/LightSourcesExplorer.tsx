import React, { useState } from "react";
import { audioManager } from "../../utils/audioPlayer";
import { rewardsManager } from "../../utils/rewardsManager";
import confetti from "canvas-confetti";
import {
  Sun,
  Sparkles,
  CheckCircle2,
  Volume2,
  Lightbulb,
  HelpCircle,
  Trophy,
  ArrowRight,
  RotateCcw
} from "lucide-react";

export interface LightItem {
  id: string;
  nameEn: string;
  nameAr: string;
  icon: string;
  isSource: boolean; // true = Light Source, false = Reflector
  simpleWhyEn: string;
  simpleWhyAr: string;
}

const initialItems: LightItem[] = [
  {
    id: "sun",
    nameEn: "The Sun",
    nameAr: "قرص الشمس",
    icon: "☀️",
    isSource: true,
    simpleWhyEn: "Makes its own super bright light!",
    simpleWhyAr: "تصنع ضوءها الخاص القوي!",
  },
  {
    id: "mirror",
    nameEn: "Bathroom Mirror",
    nameAr: "المرآة",
    icon: "🪞",
    isSource: false,
    simpleWhyEn: "Does NOT make light. It bounces light into our eyes.",
    simpleWhyAr: "لا تصنع الضوء، بل تعكس الضوء الساقط عليها.",
  },
  {
    id: "torch",
    nameEn: "Electric Torch",
    nameAr: "المصباح اليدوي",
    icon: "🔦",
    isSource: true,
    simpleWhyEn: "Makes light using its battery power!",
    simpleWhyAr: "يصنع الضوء باستخدام طاقة البطارية!",
  },
  {
    id: "moon",
    nameEn: "The Moon",
    nameAr: "القمر في السماء",
    icon: "🌙",
    isSource: false,
    simpleWhyEn: "Does NOT make light. It is a giant rock that bounces sunlight.",
    simpleWhyAr: "لا يصنع الضوء، بل صخرة عملاقة تعكس ضوء الشمس.",
  },
  {
    id: "candle",
    nameEn: "Candle Flame",
    nameAr: "لهب الشمعة",
    icon: "🕯️",
    isSource: true,
    simpleWhyEn: "Makes light and warmth with its flame!",
    simpleWhyAr: "يصنع الضوء والدفء بلهبه المشتعل!",
  },
  {
    id: "reflector",
    nameEn: "Bicycle Reflector",
    nameAr: "عاكس الدراجة",
    icon: "🛑",
    isSource: false,
    simpleWhyEn: "Does NOT make light. It shines only when car lights hit it.",
    simpleWhyAr: "لا يصنع الضوء، بل يلمع فقط عندما تصيبه أضواء السيارات.",
  },
];

interface LightSourcesExplorerProps {
  onComplete?: () => void;
}

export const LightSourcesExplorer: React.FC<LightSourcesExplorerProps> = ({
  onComplete,
}) => {
  const [items] = useState<LightItem[]>(initialItems);
  const [selectedItemId, setSelectedItemId] = useState<string>("sun");
  // Classified map: itemId -> "source" | "reflector"
  const [classifications, setClassifications] = useState<Record<string, "source" | "reflector">>({});
  const [feedback, setFeedback] = useState<{
    textEn: string;
    textAr: string;
    isCorrect: boolean;
  } | null>(null);

  const selectedItem = items.find((i) => i.id === selectedItemId) || items[0];

  const classifiedCount = Object.keys(classifications).length;
  const isAllClassified = classifiedCount === items.length;

  const handleClassify = (type: "source" | "reflector") => {
    const isCorrect = (type === "source" && selectedItem.isSource) ||
                      (type === "reflector" && !selectedItem.isSource);

    if (isCorrect) {
      audioManager.playSuccessChime();
      rewardsManager.addStars(10);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });

      const newMap = { ...classifications, [selectedItem.id]: type };
      setClassifications(newMap);

      setFeedback({
        textEn: `Brilliant, Zahra! ${selectedItem.nameEn} is a ${
          selectedItem.isSource ? "Light Source" : "Reflector"
        }! ${selectedItem.simpleWhyEn}`,
        textAr: `أحسنتِ يا زهرة! ${selectedItem.nameAr}: ${selectedItem.simpleWhyAr}`,
        isCorrect: true,
      });

      audioManager.speak(
        `Correct! ${selectedItem.nameEn} is a ${
          selectedItem.isSource ? "Light Source" : "Reflector"
        }. ${selectedItem.simpleWhyEn}`,
        "en"
      );

      // Auto-advance to next unclassified item
      const nextUnclassified = items.find((it) => !newMap[it.id] && it.id !== selectedItem.id);
      if (nextUnclassified) {
        setTimeout(() => {
          setSelectedItemId(nextUnclassified.id);
          setFeedback(null);
        }, 1600);
      } else if (Object.keys(newMap).length === items.length) {
        if (onComplete) onComplete();
      }
    } else {
      audioManager.playGentleIncorrect();
      setFeedback({
        textEn: `Not quite! Does ${selectedItem.nameEn} make its own light, or does it bounce light?`,
        textAr: `فكري يا زهرة: هل ${selectedItem.nameAr} يصنع ضوءه بنفسه، أم يعكس الضوء فقط؟`,
        isCorrect: false,
      });
      audioManager.speak(
        `Think carefully! Does ${selectedItem.nameEn} make its own light?`,
        "en"
      );
    }
  };

  return (
    <div className="bg-white rounded-3xl border-3 border-amber-300 shadow-lg p-5 sm:p-7 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-amber-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-300">
                Visual Classification Lab
              </span>
              <span className="text-xs text-slate-500 font-arabic font-bold">
                تصنيف: مصادر الضوء أم أسطح عاكسة؟
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black font-kid text-slate-900">
              Light Source or Reflector? (مستكشف مصادر الضوء والأسطح العاكسة)
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs font-mono font-bold">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>
            {classifiedCount} of {items.length} Sorted
          </span>
        </div>
      </div>

      {/* Main 2-Column Split: Left = Items, Right = 2 Clear Buckets */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Items to pick (5 cols) */}
        <div className="md:col-span-5 space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider font-bold text-slate-500 block">
            1. Select an item to test (اختاري عنصراً):
          </span>

          <div className="grid grid-cols-2 gap-2.5">
            {items.map((item) => {
              const isSelected = selectedItemId === item.id;
              const classification = classifications[item.id];

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedItemId(item.id);
                    setFeedback(null);
                  }}
                  className={`p-3 rounded-2xl border-2 text-left transition flex flex-col justify-between relative shadow-2xs ${
                    isSelected
                      ? "bg-amber-50 border-amber-500 ring-3 ring-amber-200 shadow-sm"
                      : classification
                      ? "bg-emerald-50/70 border-emerald-300"
                      : "bg-white hover:bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-2xl">{item.icon}</span>
                    {classification && (
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                        {classification === "source" ? "Source 💡" : "Reflector 🪞"}
                      </span>
                    )}
                  </div>
                  <div className="mt-2">
                    <h5 className="text-xs font-black font-kid text-slate-900 leading-tight">
                      {item.nameEn}
                    </h5>
                    <span className="text-[10px] text-slate-500 font-arabic block truncate">
                      {item.nameAr}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: The 2 Target Classification Buttons (7 cols) */}
        <div className="md:col-span-7 space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider font-bold text-slate-500 block">
            2. Is "{selectedItem.nameEn}" a Source or a Reflector?
          </span>

          {/* Active Target Preview Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 flex items-center gap-3">
            <span className="text-4xl p-2 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              {selectedItem.icon}
            </span>
            <div>
              <h4 className="text-base font-black font-kid text-slate-900">
                {selectedItem.nameEn}
              </h4>
              <p className="text-xs text-slate-500 font-arabic">
                {selectedItem.nameAr}
              </p>
            </div>
          </div>

          {/* The Two Big Visual Buckets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* TARGET A: LIGHT SOURCE */}
            <button
              onClick={() => handleClassify("source")}
              className="p-5 rounded-3xl border-3 border-amber-400 bg-gradient-to-b from-amber-50 to-yellow-100 hover:from-amber-100 hover:to-yellow-200 text-amber-950 transition-all transform hover:scale-102 active:scale-98 shadow-sm flex flex-col items-center text-center space-y-2 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md group-hover:rotate-6 transition-transform">
                <span className="text-3xl">💡</span>
              </div>
              <div>
                <h4 className="text-base font-black font-kid text-amber-950">
                  Light Source
                </h4>
                <span className="text-xs font-arabic font-bold text-amber-800 block">
                  مصدر ضوء حقيقي
                </span>
                <p className="text-[11px] text-amber-700 font-kid mt-1">
                  "Makes its own light!"
                </p>
              </div>
            </button>

            {/* TARGET B: REFLECTOR */}
            <button
              onClick={() => handleClassify("reflector")}
              className="p-5 rounded-3xl border-3 border-blue-400 bg-gradient-to-b from-blue-50 to-sky-100 hover:from-blue-100 hover:to-sky-200 text-blue-950 transition-all transform hover:scale-102 active:scale-98 shadow-sm flex flex-col items-center text-center space-y-2 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md group-hover:-rotate-6 transition-transform">
                <span className="text-3xl">🪞</span>
              </div>
              <div>
                <h4 className="text-base font-black font-kid text-blue-950">
                  Reflector
                </h4>
                <span className="text-xs font-arabic font-bold text-blue-800 block">
                  سطح عاكس للضوء
                </span>
                <p className="text-[11px] text-blue-700 font-kid mt-1">
                  "Bounces light from other sources!"
                </p>
              </div>
            </button>
          </div>

          {/* Real-time Feedback Banner */}
          {feedback && (
            <div
              className={`p-4 rounded-2xl text-xs sm:text-sm font-kid font-bold flex items-center justify-between gap-3 border animate-fade-in ${
                feedback.isCorrect
                  ? "bg-emerald-100 text-emerald-950 border-emerald-300"
                  : "bg-rose-100 text-rose-950 border-rose-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{feedback.isCorrect ? "🌟" : "💡"}</span>
                <div>
                  <span className="block">{feedback.textEn}</span>
                  <span className="font-normal font-arabic">{feedback.textAr}</span>
                </div>
              </div>
              <button
                onClick={() => audioManager.speak(feedback.textEn, "en")}
                className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-slate-700"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          )}

          {isAllClassified && (
            <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-1">
              <span className="text-xl">🏆</span>
              <h4 className="text-sm font-black font-kid text-emerald-950">
                All Items Classified Correctly! أحسنتِ يا زهرة
              </h4>
              <p className="text-xs text-emerald-800 font-arabic">
                أنتِ الآن خبيرة في التمييز بين مصادر الضوء والأسطح العاكسة!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
