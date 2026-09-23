import React, { useState, useEffect } from "react";
import { audioManager } from "../../utils/audioPlayer";
import { rewardsManager } from "../../utils/rewardsManager";
import confetti from "canvas-confetti";
import {
  GitCommit,
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Volume2,
  Flame,
  CloudRain,
  Sun,
  Layers
} from "lucide-react";

export type JourneyProcessType = "rock_cycle" | "shadow_sequence";

interface ProcessStep {
  stepNumber: number;
  titleEn: string;
  titleAr: string;
  conditionEn: string;
  conditionAr: string;
  resultEn: string;
  resultAr: string;
  badge: string;
  icon: string;
  color: string;
}

const rockCycleSteps: ProcessStep[] = [
  {
    stepNumber: 1,
    titleEn: "Magma & Volcanic Eruption",
    titleAr: "الصهارة والنشاط البركاني",
    conditionEn: "Deep beneath Earth's crust, intense heat melts rock into red-hot liquid magma.",
    conditionAr: "في أعماق باطن الأرض، تؤدي الحرارة الشديدة إلى صهر الصخور متحولة إلى صهارة سائلة متوهجة.",
    resultEn: "Liquid rock rises through volcanoes or cools slowly deep underground.",
    resultAr: "تصعد الصهارة عبر البراكين كلابة سطحية أو تبرد ببطء في الأعماق.",
    badge: "Origin",
    icon: "🌋",
    color: "#dc2626"
  },
  {
    stepNumber: 2,
    titleEn: "Cooling into Igneous Rock",
    titleAr: "التبريد والتبلور إلى صخر ناري",
    conditionEn: "Molten rock cools down. Slow cooling creates large interlocking crystals (Granite); fast cooling creates Basalt.",
    conditionAr: "تبرد الصهارة السائلة. التبريد البطيء ينتج بلورات كبيرة متشابكة (جرانيت)، والسريع ينتج بازلت.",
    resultEn: "Formation of tough, durable Igneous Rocks.",
    resultAr: "تشكل الصخور النارية الصلبة غير المسامية.",
    badge: "Igneous",
    icon: "🪨",
    color: "#475569"
  },
  {
    stepNumber: 3,
    titleEn: "Weathering, Rain & Erosion",
    titleAr: "التجوية والأمطار والتعرية",
    conditionEn: "Sun, wind, ice, and rushing rivers break mountain rocks into small grains, gravel, and sand.",
    conditionAr: "تقوم الشمس والرياح والجليد ومياه الأنهار بتفتيت صخور الجبال إلى حبيبات رمل وحصى دقيقة.",
    resultEn: "Loose sediments are washed down into lakes and oceans.",
    resultAr: "تنجرف الرواسب المفككة مع مياه الأنهار وتستقر في قيعان البحار والبحيرات.",
    badge: "Erosion",
    icon: "🌊",
    color: "#0284c7"
  },
  {
    stepNumber: 4,
    titleEn: "Compaction & Cementation",
    titleAr: "التراكم والانضغاط (الصخور الرسوبية)",
    conditionEn: "Heavy layers of sand and shells build up over millions of years, squashing lower layers together.",
    conditionAr: "تتراكم طبقات الرواسب والأصداف عبر ملايين السنين، فتضغط الطبقات العليا على السفلى بقوة.",
    resultEn: "Formation of Sedimentary Rocks (Sandstone, Limestone, Chalk).",
    resultAr: "تشكل الصخور الرسوبية ذات الطبقات الواضحة والمسام.",
    badge: "Sedimentary",
    icon: "📜",
    color: "#d97706"
  },
  {
    stepNumber: 5,
    titleEn: "Heat, Pressure & Metamorphism",
    titleAr: "الحرارة والضغط والتحول",
    conditionEn: "Tectonic movements push rocks deep underground where intense baking heat and crushing pressure change their minerals.",
    conditionAr: "تدفع حركات الصفائح الصخور للأعماق حيث تُعيد الحرارة الهائلة والضغط الشديد ترتيب البلورات.",
    resultEn: "Formation of Metamorphic Rocks (Limestone turns to Marble; Shale turns to Slate).",
    resultAr: "تشكل الصخور المتحولة (يتحول الحجر الجيري إلى رخام، والصلصال إلى أردواز).",
    badge: "Metamorphic",
    icon: "💎",
    color: "#7c3aed"
  }
];

const shadowSequenceSteps: ProcessStep[] = [
  {
    stepNumber: 1,
    titleEn: "Torch Held Very Close to Puppet",
    titleAr: "المصباح قريب جداً من المجسم",
    conditionEn: "Light source is brought near the opaque object.",
    conditionAr: "يتم تقريب مصدر الضوء ليصبح قريباً من الجسم المعتم.",
    resultEn: "The object blocks a huge spread of light rays → A GIANT, oversized shadow appears on the wall.",
    resultAr: "يحجب الجسم حزمة عريضة من الأشعة ← يظهر ظل عملاق وضخم جداً على الشاشة.",
    badge: "Close",
    icon: "🔦",
    color: "#f59e0b"
  },
  {
    stepNumber: 2,
    titleEn: "Torch at Medium Distance",
    titleAr: "المصباح على مسافة متوسطة",
    conditionEn: "Torch is moved back to the center of the desk.",
    conditionAr: "يتم إرجاع المصباح للخلف لمسافة متوسطة.",
    resultEn: "Fewer rays are blocked → Shadow shrinks to medium natural size.",
    resultAr: "يقل انتشار الأشعة المحجوبة ← يتقلص الظل إلى حجم متوسط طبيعي.",
    badge: "Medium",
    icon: "📏",
    color: "#0284c7"
  },
  {
    stepNumber: 3,
    titleEn: "Torch Moved Far Away Across the Room",
    titleAr: "المصباح بعيد جداً عبر الغرفة",
    conditionEn: "Torch is positioned at the far end of the classroom.",
    conditionAr: "يتم وضع المصباح في الطرف البعيد من الغرفة.",
    resultEn: "Light rays arrive nearly parallel → The shadow becomes much SMALLER and sharper.",
    resultAr: "تصل أشعة الضوء شبه متوازية ← يصبح الظل أصغر حجماً وأكثر حدة في حوافه.",
    badge: "Far",
    icon: "🎯",
    color: "#10b981"
  }
];

interface JourneyCourseVizProps {
  processType?: JourneyProcessType;
  onComplete?: () => void;
}

export const JourneyCourseViz: React.FC<JourneyCourseVizProps> = ({
  processType = "rock_cycle",
  onComplete,
}) => {
  const steps = processType === "rock_cycle" ? rockCycleSteps : shadowSequenceSteps;
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set([0]));

  const currentStep = steps[currentStepIndex];

  const handleStepClick = (idx: number) => {
    setCurrentStepIndex(idx);
    setIsPlaying(false);
    audioManager.speak(steps[idx].titleEn, "en");

    const nextSet = new Set(completedSteps);
    nextSet.add(idx);
    setCompletedSteps(nextSet);

    if (nextSet.size === steps.length) {
      rewardsManager.addXP(25);
      confetti({
        particleCount: 35,
        spread: 55,
        origin: { y: 0.6 },
      });
      onComplete?.();
    }
  };

  const handleNext = () => {
    if (currentStepIndex + 1 < steps.length) {
      handleStepClick(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      handleStepClick(currentStepIndex - 1);
    }
  };

  // Auto-advance loop when playing
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (currentStepIndex + 1 < steps.length) {
        handleStepClick(currentStepIndex + 1);
      } else {
        setIsPlaying(false);
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, steps.length]);

  return (
    <div className="bg-white rounded-3xl border-2 border-indigo-200 shadow-md p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-indigo-100">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <GitCommit className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900 font-mono">
                Journey / CourseViz
              </span>
              <span className="text-xs text-slate-500 font-arabic">
                مسار وتتابع العمليات المتسلسلة
              </span>
            </div>
            <h4 className="text-base font-black text-slate-900 font-kid">
              {processType === "rock_cycle"
                ? "Geological Transformation Sequence: The Rock Cycle"
                : "Step-by-Step Distance Sequence: How Shadows Change"}
            </h4>
          </div>
        </div>

        {/* Play Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition flex items-center gap-1.5 ${
              isPlaying
                ? "bg-amber-500 text-white animate-pulse"
                : "bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200"
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? "Pause Journey" : "Auto Play"}</span>
          </button>
          <span className="text-xs font-mono font-bold text-slate-500">
            Step {currentStepIndex + 1} of {steps.length}
          </span>
        </div>
      </div>

      {/* Sequential Node Timeline Bar */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <div className="flex items-center justify-between relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-200 -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-4 h-1 bg-indigo-500 -translate-y-1/2 z-0 transition-all duration-500"
            style={{
              width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
            }}
          />

          {/* Step Milestone Nodes */}
          {steps.map((step, idx) => {
            const isCurrent = currentStepIndex === idx;
            const isVisited = completedSteps.has(idx);

            return (
              <button
                key={idx}
                onClick={() => handleStepClick(idx)}
                className="relative z-10 flex flex-col items-center group cursor-pointer"
              >
                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center font-bold text-sm shadow-md transition-all duration-300 ${
                    isCurrent
                      ? "bg-indigo-600 text-white ring-4 ring-indigo-200 scale-125"
                      : isVisited
                      ? "bg-white text-indigo-900 border-2 border-indigo-400 hover:scale-110"
                      : "bg-white text-slate-400 border-2 border-slate-200"
                  }`}
                >
                  <span className="text-base leading-none">{step.icon}</span>
                </div>
                <span
                  className={`text-[10px] sm:text-xs font-bold font-kid mt-1.5 hidden md:block max-w-[80px] text-center leading-tight ${
                    isCurrent ? "text-indigo-900 font-black" : "text-slate-500"
                  }`}
                >
                  {step.titleEn.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Deep Detail Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        {/* Cause / Condition */}
        <div className="p-5 rounded-2xl bg-indigo-50/70 border-2 border-indigo-200 space-y-2 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase font-mono px-2 py-0.5 rounded-md bg-indigo-200 text-indigo-900">
                Phase {currentStep.stepNumber}: Geological Cause / Condition
              </span>
              <button
                onClick={() => audioManager.speak(currentStep.conditionEn, "en")}
                className="p-1 text-slate-400 hover:text-indigo-600"
                title="Read Step Aloud"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <h5 className="text-lg font-black text-indigo-950 font-kid">
              {currentStep.titleEn}
            </h5>
            <p className="text-xs text-indigo-800 font-arabic font-semibold">
              {currentStep.titleAr}
            </p>
            <p className="text-sm text-slate-800 font-kid leading-relaxed pt-1">
              {currentStep.conditionEn}
            </p>
            <p className="text-xs text-slate-600 font-arabic leading-relaxed font-semibold">
              {currentStep.conditionAr}
            </p>
          </div>
        </div>

        {/* Transformation & Result */}
        <div className="p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-200 space-y-2 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase font-mono px-2 py-0.5 rounded-md bg-amber-200 text-amber-900">
              Transformation Result
            </span>
            <div className="p-3 rounded-xl bg-white border border-amber-200/80 space-y-1">
              <div className="flex items-center gap-1.5 font-black text-amber-950 text-xs font-kid">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>What is produced:</span>
              </div>
              <p className="text-sm font-black text-slate-900 font-kid">
                {currentStep.resultEn}
              </p>
              <p className="text-xs text-amber-900 font-arabic font-semibold">
                {currentStep.resultAr}
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 font-kid"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous Step</span>
            </button>
            <button
              onClick={handleNext}
              disabled={currentStepIndex === steps.length - 1}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 font-kid shadow-xs"
            >
              <span>Next Milestone</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
