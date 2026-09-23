import React, { useState } from "react";
import { audioManager } from "../../utils/audioPlayer";
import { rewardsManager } from "../../utils/rewardsManager";
import confetti from "canvas-confetti";
import {
  Crosshair,
  Sparkles,
  CheckCircle2,
  Volume2,
  HelpCircle,
  Trophy,
  Target,
  ArrowRight,
  Bot
} from "lucide-react";

export type PointerDiagramType = "reflection_optics" | "rock_microstructure";

interface TargetPoint {
  id: string;
  nameEn: string;
  nameAr: string;
  xPercent: number; // 0 to 100
  yPercent: number;
  descriptionEn: string;
  descriptionAr: string;
  aiInsightEn: string;
  aiInsightAr: string;
  tolerance: number; // distance threshold in percent
}

interface AIPointerExplorerProps {
  diagramType?: PointerDiagramType;
  onComplete?: () => void;
}

const reflectionTargets: TargetPoint[] = [
  {
    id: "incident-ray",
    nameEn: "Incident Ray (الشعاع الساقط)",
    nameAr: "الشعاع الساقط",
    xPercent: 28,
    yPercent: 32,
    tolerance: 15,
    descriptionEn: "The incoming ray of light traveling from the light source towards the shiny mirror.",
    descriptionAr: "شعاع الضوء القادم من مصدر الضوء (المصباح) المتجه نحو سطح المرآة العاكسة.",
    aiInsightEn: "AI Tutor: Notice the arrow pointing towards the mirror! This is where light begins its bounce.",
    aiInsightAr: "معلم الذكاء الاصطناعي: لاحظ السهم المتجه نحو المرآة! هنا تبدأ رحلة ارتداد الضوء."
  },
  {
    id: "normal-line",
    nameEn: "Normal Line (العمود المُقام)",
    nameAr: "العمود المقام",
    xPercent: 50,
    yPercent: 35,
    tolerance: 12,
    descriptionEn: "An imaginary reference line drawn perpendicular (at a 90° right angle) to the mirror surface.",
    descriptionAr: "خط مرجعي وهمي عمودي بزاوية قائمة (90 درجة) تماماً على سطح المرآة عند نقطة السقوط.",
    aiInsightEn: "AI Tutor: We measure both the incident angle and reflected angle from this central normal line!",
    aiInsightAr: "معلم الذكاء الاصطناعي: نقيس كلاً من زاوية السقوط وزاوية الانعكاس بالاعتماد على هذا الخط العمودي!"
  },
  {
    id: "reflected-ray",
    nameEn: "Reflected Ray (الشعاع المنعكس)",
    nameAr: "الشعاع المنعكس",
    xPercent: 72,
    yPercent: 32,
    tolerance: 15,
    descriptionEn: "The ray of light bouncing off the mirror surface at the exact same angle.",
    descriptionAr: "شعاع الضوء المرتد عن سطح المرآة بنفس الزاوية متجهاً إلى أعيننا أو الهدف.",
    aiInsightEn: "AI Tutor: Angle of reflection always equals the angle of incidence on flat plane mirrors!",
    aiInsightAr: "معلم الذكاء الاصطناعي: زاوية الانعكاس تساوي دائماً زاوية السقوط على السطح الأملس!"
  },
  {
    id: "mirror-surface",
    nameEn: "Flat Mirror Surface (السطح العاكس)",
    nameAr: "السطح العاكس",
    xPercent: 50,
    yPercent: 72,
    tolerance: 14,
    descriptionEn: "The smooth, flat silvered boundary where light cannot pass through and must bounce.",
    descriptionAr: "السطح المستوي الأملس المصقول الذي لا ينفذ الضوء عبره بل يرتد عنه بانتظام.",
    aiInsightEn: "AI Tutor: Smooth surfaces create clear mirror reflections; rough surfaces scatter light!",
    aiInsightAr: "معلم الذكاء الاصطناعي: الأسطح المصقولة تعكس الضوء بانتظام فتظهر صورتنا، بينما الخشنة تشتته!"
  }
];

const rockTargets: TargetPoint[] = [
  {
    id: "interlocking-crystals",
    nameEn: "Interlocking Crystals (بلورات متشابكة)",
    nameAr: "بلورات متشابكة في الجرانيت",
    xPercent: 30,
    yPercent: 40,
    tolerance: 15,
    descriptionEn: "Crystals that fit together like jigsaw puzzle pieces with zero gaps, typical of igneous rocks like Granite.",
    descriptionAr: "بلورات معدنية صلبة تتشابك كقطع الأحجية دون أي فراغات هوائية، وهي ميزة الصخور النارية كالجرانيت.",
    aiInsightEn: "AI Tutor: Because crystals interlock tightly, granite is extremely hard and non-porous!",
    aiInsightAr: "معلم الذكاء الاصطناعي: تشابك البلورات يجعل صخر الجرانيت شديد الصلابة ولا يمتص الماء!"
  },
  {
    id: "rounded-grains",
    nameEn: "Rounded Grains (حبيبات رملية مستديرة)",
    nameAr: "حبيبات مستديرة في الحجر الرملي",
    xPercent: 68,
    yPercent: 35,
    tolerance: 15,
    descriptionEn: "Small rounded fragments cemented together, leaving microscopic pore spaces that let water soak in.",
    descriptionAr: "حبيبات رملية صغيرة مستديرة الحواف متراصة تاركة فراغات مسامية تسمح للماء بالنفاذ.",
    aiInsightEn: "AI Tutor: Rocks with rounded grains like sandstone are porous and softer to scratch!",
    aiInsightAr: "معلم الذكاء الاصطناعي: الحجر الرملي المسامي يمتص الماء ويسهل خدشه أكثر من الصخور النارية!"
  },
  {
    id: "pore-spaces",
    nameEn: "Pores & Air Gaps (المسام والفراغات)",
    nameAr: "المسام والشقوق الدقيقة",
    xPercent: 52,
    yPercent: 65,
    tolerance: 15,
    descriptionEn: "Microscopic voids between grains where air and moisture are trapped in sedimentary rocks.",
    descriptionAr: "فراغات هوائية دقيقة بين الحبيبات تحبس الهواء والماء وتجعل الصخر قابلاً لامتصاص السوائل.",
    aiInsightEn: "AI Tutor: When we drop water onto chalk or sandstone, it vanishes into these pores!",
    aiInsightAr: "معلم الذكاء الاصطناعي: عند وضع قطرات ماء على الطباشير تمتصها هذه المسام على الفور!"
  }
];

export const AIPointerExplorer: React.FC<AIPointerExplorerProps> = ({
  diagramType = "reflection_optics",
  onComplete,
}) => {
  const targets = diagramType === "reflection_optics" ? reflectionTargets : rockTargets;

  const [activeTarget, setActiveTarget] = useState<TargetPoint | null>(targets[0]);
  const [missionIndex, setMissionIndex] = useState<number>(0);
  const [discoveredIds, setDiscoveredIds] = useState<Set<string>>(new Set([targets[0].id]));
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number }>({
    x: targets[0].xPercent,
    y: targets[0].yPercent,
  });

  const currentMission = targets[missionIndex] || targets[0];
  const isMissionComplete = discoveredIds.size === targets.length;

  const handleDiagramClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPointerPos({ x, y });

    // Find nearest target within tolerance
    let nearest: TargetPoint | null = null;
    let minDistance = 999;

    for (const tgt of targets) {
      const dist = Math.hypot(tgt.xPercent - x, tgt.yPercent - y);
      if (dist <= tgt.tolerance && dist < minDistance) {
        nearest = tgt;
        minDistance = dist;
      }
    }

    if (nearest) {
      const foundTarget: TargetPoint = nearest;
      setActiveTarget(foundTarget);
      audioManager.speak(foundTarget.nameEn, "en");

      // Check mission
      if (foundTarget.id === currentMission.id && !discoveredIds.has(foundTarget.id)) {
        const nextSet = new Set(discoveredIds);
        nextSet.add(foundTarget.id);
        setDiscoveredIds(nextSet);
        rewardsManager.addXP(20);

        confetti({
          particleCount: 25,
          spread: 50,
          origin: { y: 0.6 },
        });

        if (missionIndex + 1 < targets.length) {
          setMissionIndex(missionIndex + 1);
        } else {
          onComplete?.();
        }
      }
    }
  };

  const handleSelectTargetButton = (tgt: TargetPoint) => {
    setActiveTarget(tgt);
    setPointerPos({ x: tgt.xPercent, y: tgt.yPercent });
    audioManager.speak(tgt.nameEn, "en");

    if (!discoveredIds.has(tgt.id)) {
      const nextSet = new Set(discoveredIds);
      nextSet.add(tgt.id);
      setDiscoveredIds(nextSet);
      rewardsManager.addXP(15);
    }
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-purple-200 shadow-md p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-purple-100">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
            <Crosshair className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 font-mono">
                AI Pointer Identification
              </span>
              <span className="text-xs text-slate-500 font-arabic">
                مؤشر الاستهداف والتشخيص الذكي
              </span>
            </div>
            <h4 className="text-base font-black text-slate-900 font-kid">
              {diagramType === "reflection_optics"
                ? "Identify Optical Reflection Parts (أجزاء مسار انعكاس الضوء)"
                : "Identify Rock Structure & Grain Parts (فحص بلورات وحبيبات الصخر)"}
            </h4>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-purple-900 bg-purple-50 border border-purple-200 px-3 py-1.5 rounded-xl">
            Identified: {discoveredIds.size} / {targets.length} Parts
          </span>
        </div>
      </div>

      {/* Target Mission Callout */}
      {!isMissionComplete ? (
        <div className="p-3.5 rounded-2xl bg-purple-50/80 border-2 border-purple-200 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center text-xs font-black">
              🎯
            </div>
            <div>
              <span className="text-[11px] font-black text-purple-900 uppercase font-mono block">
                Target Mission (المهمة الحالية):
              </span>
              <span className="text-sm font-black text-slate-900 font-kid">
                Point the AI Crosshair at: <span className="text-purple-700 underline">{currentMission.nameEn}</span>
              </span>
            </div>
          </div>

          <button
            onClick={() => handleSelectTargetButton(currentMission)}
            className="px-3 py-1.5 rounded-xl bg-purple-200 hover:bg-purple-300 text-purple-900 text-xs font-bold font-cambridge transition"
          >
            Show Hint & Aim
          </button>
        </div>
      ) : (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 flex items-center justify-between flex-wrap gap-2 animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-black text-emerald-900 font-kid">
              All Diagram Parts Successfully Identified with AI Pointer!
            </span>
          </div>
          {onComplete && (
            <button
              onClick={onComplete}
              className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-black flex items-center gap-1"
            >
              <span>Continue Flow</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Interactive Diagram Canvas & AI Pointer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Diagram Area (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div
            onClick={handleDiagramClick}
            className="relative w-full aspect-[4/3] bg-slate-950 rounded-3xl overflow-hidden border-4 border-slate-800 cursor-crosshair select-none shadow-inner group"
          >
            {/* Visual Diagram Layer: SVG Optical Ray or Rock Grain */}
            {diagramType === "reflection_optics" ? (
              <svg className="w-full h-full" viewBox="0 0 400 300">
                {/* Background Grid */}
                <defs>
                  <pattern id="optics-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                  </pattern>
                  <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#818cf8" />
                  </linearGradient>
                  <linearGradient id="reflectedGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#f43f5e" />
                  </linearGradient>
                </defs>
                <rect width="400" height="300" fill="url(#optics-grid)" />

                {/* Mirror Surface at bottom */}
                <rect x="50" y="210" width="300" height="16" rx="4" fill="#64748b" />
                <rect x="52" y="212" width="296" height="4" rx="2" fill="#94a3b8" />
                <line x1="50" y1="226" x2="350" y2="226" stroke="#475569" strokeWidth="3" strokeDasharray="6,6" />
                <text x="200" y="245" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="sans-serif">
                  Flat Plane Mirror (مرآة مستوية)
                </text>

                {/* Normal Line (Perpendicular dashed) */}
                <line x1="200" y1="50" x2="200" y2="210" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="6,6" />
                <text x="200" y="42" fill="#fbbf24" fontSize="12" textAnchor="middle" fontWeight="bold">
                  Normal Line (90°)
                </text>

                {/* Angle Arc */}
                <path d="M 175 190 A 25 25 0 0 1 198 185" fill="none" stroke="#38bdf8" strokeWidth="2" />
                <path d="M 202 185 A 25 25 0 0 1 225 190" fill="none" stroke="#f43f5e" strokeWidth="2" />

                {/* Light Source / Torch */}
                <circle cx="80" cy="90" r="14" fill="#38bdf8" opacity="0.9" />
                <text x="80" y="70" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">
                  Torch / Light Source
                </text>

                {/* Incident Ray */}
                <line x1="80" y1="90" x2="200" y2="210" stroke="url(#laserGrad)" strokeWidth="4" />
                <polygon points="140,150 148,145 146,155" fill="#38bdf8" />

                {/* Reflected Ray */}
                <line x1="200" y1="210" x2="320" y2="90" stroke="url(#reflectedGrad)" strokeWidth="4" />
                <polygon points="260,150 268,145 266,155" fill="#f43f5e" />

                {/* Target Sensor */}
                <circle cx="320" cy="90" r="14" fill="#f43f5e" opacity="0.8" />
                <text x="320" y="70" fill="#f43f5e" fontSize="10" textAnchor="middle" fontWeight="bold">
                  Observer Eye / Target
                </text>
              </svg>
            ) : (
              // Rock Microstructure Canvas
              <svg className="w-full h-full" viewBox="0 0 400 300">
                <rect width="400" height="300" fill="#1e1b4b" />
                {/* Granite Section on Left */}
                <rect x="20" y="40" width="170" height="220" rx="16" fill="#334155" stroke="#64748b" strokeWidth="2" />
                <text x="105" y="70" fill="#f8fafc" fontSize="12" textAnchor="middle" fontWeight="bold">
                  Granite (Igneous)
                </text>
                <text x="105" y="86" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  Interlocking Crystals (No Pores)
                </text>
                {/* Interlocking crystals visual */}
                <polygon points="50,110 80,100 90,130 65,145 45,130" fill="#f59e0b" opacity="0.85" stroke="#fff" strokeWidth="1" />
                <polygon points="80,100 130,95 140,125 90,130" fill="#94a3b8" opacity="0.9" stroke="#fff" strokeWidth="1" />
                <polygon points="90,130 140,125 150,165 110,175 65,145" fill="#ec4899" opacity="0.85" stroke="#fff" strokeWidth="1" />
                <polygon points="45,130 65,145 75,190 35,175" fill="#06b6d4" opacity="0.85" stroke="#fff" strokeWidth="1" />
                <polygon points="65,145 110,175 105,220 55,215 75,190" fill="#84cc16" opacity="0.85" stroke="#fff" strokeWidth="1" />

                {/* Sandstone Section on Right */}
                <rect x="210" y="40" width="170" height="220" rx="16" fill="#451a03" stroke="#92400e" strokeWidth="2" />
                <text x="295" y="70" fill="#fef3c7" fontSize="12" textAnchor="middle" fontWeight="bold">
                  Sandstone (Sedimentary)
                </text>
                <text x="295" y="86" fill="#fed7aa" fontSize="9" textAnchor="middle">
                  Rounded Grains & Pores
                </text>
                {/* Rounded sand grains */}
                {[
                  { cx: 240, cy: 120, r: 14 },
                  { cx: 275, cy: 115, r: 16 },
                  { cx: 315, cy: 125, r: 15 },
                  { cx: 350, cy: 130, r: 13 },
                  { cx: 250, cy: 160, r: 17 },
                  { cx: 290, cy: 165, r: 16 },
                  { cx: 330, cy: 170, r: 15 },
                  { cx: 260, cy: 210, r: 15 },
                  { cx: 300, cy: 215, r: 16 },
                  { cx: 340, cy: 210, r: 14 },
                ].map((g, idx) => (
                  <circle key={idx} cx={g.cx} cy={g.cy} r={g.r} fill="#d97706" stroke="#b45309" strokeWidth="1.5" />
                ))}
                {/* Pores indicators */}
                <circle cx="280" cy="140" r="4" fill="#38bdf8" />
                <circle cx="310" cy="148" r="4" fill="#38bdf8" />
              </svg>
            )}

            {/* Target Pins on Diagram */}
            {targets.map((tgt) => {
              const isSelected = activeTarget?.id === tgt.id;
              const isDiscovered = discoveredIds.has(tgt.id);

              return (
                <div
                  key={tgt.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectTargetButton(tgt);
                  }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                  style={{
                    left: `${tgt.xPercent}%`,
                    top: `${tgt.yPercent}%`,
                  }}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-lg transition-all duration-300 ${
                      isSelected
                        ? "bg-purple-500 text-white ring-4 ring-purple-300 scale-125 animate-pulse"
                        : isDiscovered
                        ? "bg-emerald-500 text-white ring-2 ring-emerald-300"
                        : "bg-slate-700/90 text-slate-200 border-2 border-slate-400 hover:scale-110"
                    }`}
                  >
                    {isDiscovered ? "✓" : "•"}
                  </div>
                </div>
              );
            })}

            {/* The AI Crosshair Pointer */}
            <div
              className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-200"
              style={{
                left: `${pointerPos.x}%`,
                top: `${pointerPos.y}%`,
              }}
            >
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute w-12 h-12 rounded-full border-2 border-purple-400 animate-ping opacity-60" />
                <div className="w-8 h-8 rounded-full border-2 border-purple-300 flex items-center justify-center bg-purple-500/30 backdrop-blur-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-300 shadow-md" />
                </div>
                <div className="absolute -top-1 w-0.5 h-3 bg-purple-400" />
                <div className="absolute -bottom-1 w-0.5 h-3 bg-purple-400" />
                <div className="absolute -left-1 w-3 h-0.5 bg-purple-400" />
                <div className="absolute -right-1 w-3 h-0.5 bg-purple-400" />
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-slate-500 font-mono">
            💡 Click anywhere or drag crosshair to identify parts with AI
          </p>
        </div>

        {/* Diagnostic AI Inspector Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-4 rounded-2xl bg-purple-950 text-white shadow-lg space-y-3 border border-purple-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-400" />
                <span className="text-xs font-mono font-bold text-purple-300 uppercase">
                  AI Pointer Diagnostics
                </span>
              </div>
              {activeTarget && (
                <button
                  onClick={() => audioManager.speak(activeTarget.descriptionEn, "en")}
                  className="p-1 text-purple-300 hover:text-white"
                  title="Read Diagnosis Aloud"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {activeTarget ? (
              <div className="space-y-2.5">
                <div>
                  <span className="text-xs text-purple-300 font-mono">Part Targeted:</span>
                  <h5 className="text-base font-black text-amber-300 font-kid leading-snug">
                    {activeTarget.nameEn}
                  </h5>
                  <p className="text-xs text-purple-200 font-arabic mt-0.5">
                    {activeTarget.nameAr}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-purple-900/60 border border-purple-700/60 text-xs text-slate-200 space-y-1 font-kid">
                  <p className="leading-relaxed">{activeTarget.descriptionEn}</p>
                  <p className="text-[11px] text-slate-300 font-arabic leading-relaxed font-semibold">
                    {activeTarget.descriptionAr}
                  </p>
                </div>

                {/* AI Tutor Insight */}
                <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-xs text-amber-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold font-mono text-[11px] text-amber-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Tutor Explanation:</span>
                  </div>
                  <p className="font-kid text-xs">{activeTarget.aiInsightEn}</p>
                  <p className="text-[11px] font-arabic text-amber-100">{activeTarget.aiInsightAr}</p>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-purple-300 font-kid">
                Aim pointer at a diagram part to view AI diagnostics
              </div>
            )}
          </div>

          {/* Target Quick Select Buttons */}
          <div className="space-y-1.5">
            <span className="text-xs font-mono font-bold text-slate-500 block">
              Quick Target Selector:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {targets.map((tgt) => {
                const isSelected = activeTarget?.id === tgt.id;
                const isDiscovered = discoveredIds.has(tgt.id);

                return (
                  <button
                    key={tgt.id}
                    onClick={() => handleSelectTargetButton(tgt)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition flex items-center justify-between ${
                      isSelected
                        ? "bg-purple-100 border-purple-400 text-purple-950 font-black shadow-xs"
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                    }`}
                  >
                    <span className="font-kid truncate pr-1">{tgt.nameEn.split("(")[0]}</span>
                    {isDiscovered && <span className="text-emerald-600 font-bold text-xs">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
