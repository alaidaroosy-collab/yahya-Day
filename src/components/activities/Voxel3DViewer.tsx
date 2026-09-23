import React, { useState } from "react";
import { audioManager } from "../../utils/audioPlayer";
import { rewardsManager } from "../../utils/rewardsManager";
import confetti from "canvas-confetti";
import {
  Globe,
  Layers,
  Sparkles,
  CheckCircle2,
  Volume2,
  Info,
  RotateCcw,
  Star
} from "lucide-react";

interface EarthLayerInfo {
  id: "crust" | "mantle" | "outer_core" | "inner_core";
  nameEn: string;
  nameAr: string;
  scientificRoleEn: string;
  depthEn: string;
  temperatureEn: string;
  stateEn: string;
  descriptionEn: string;
  descriptionAr: string;
  bookPageNoteEn: string;
  color: string;
  cutawayPath: string; // for SVG rendering
  highlightColor: string;
  realVisualIcon: string;
}

const earthLayers: EarthLayerInfo[] = [
  {
    id: "crust",
    nameEn: "Crust (القشرة الأرضية)",
    nameAr: "القشرة الأرضية الصخرية",
    scientificRoleEn: "Outermost solid rocky shell where plants grow, animals live, and cities stand",
    depthEn: "Surface to 70 km thin",
    temperatureEn: "Cool at surface, up to 400°C deep",
    stateEn: "Solid Rock (Continental & Oceanic)",
    descriptionEn: "The Earth's crust is like the crispy thin shell of an apple! It is made of solid rock, soil, mountains, and the seabed beneath all our oceans.",
    descriptionAr: "القشرة الأرضية تشبه قشرة التفاحة الرقيقة! إنها طبقة صلبة من الصخور والتربة التي نعيش فوقها وتنمو فيها النباتات وتمتد تحت كل المحيطات.",
    bookPageNoteEn: "Cambridge Learner's Book 3 — Unit 2: Earth & Rocks (p. 34)",
    color: "#854d0e",
    cutawayPath: "M 200,200 L 370,200 A 170,170 0 0,0 200,30 Z",
    highlightColor: "#b45309",
    realVisualIcon: "🏔️",
  },
  {
    id: "mantle",
    nameEn: "Mantle (الوشاح)",
    nameAr: "الوشاح أو الستار الصخري",
    scientificRoleEn: "The thickest layer of hot, heavy, semi-molten rock that flows slowly",
    depthEn: "70 km to 2,900 km deep",
    temperatureEn: "1,000°C to 3,700°C (Very hot!)",
    stateEn: "Viscous semi-molten rock (like warm thick honey)",
    descriptionEn: "The mantle is the thickest layer of the Earth. It is made of extremely hot rock that can slowly flow and move. When volcanoes erupt, hot magma rises from this deep layer!",
    descriptionAr: "الوشاح هو أسمك طبقات الأرض على الإطلاق. يتكون من صخور حارة جداً شبه منصهرة تتدفق ببطء شديد وتغذي البراكين بالحمم المتدفقة.",
    bookPageNoteEn: "Cambridge Learner's Book 3 — Unit 2: Earth & Rocks (p. 34)",
    color: "#ea580c",
    cutawayPath: "M 200,200 L 320,200 A 120,120 0 0,0 200,80 Z",
    highlightColor: "#f97316",
    realVisualIcon: "🌋",
  },
  {
    id: "outer_core",
    nameEn: "Outer Core (اللب الخارجي)",
    nameAr: "اللب الخارجي السائل",
    scientificRoleEn: "Boiling, swirling liquid sea of molten iron and nickel metals",
    depthEn: "2,900 km to 5,150 km deep",
    temperatureEn: "4,500°C to 5,500°C (Fiery hot!)",
    stateEn: "Liquid Molten Metals (Iron & Nickel)",
    descriptionEn: "The outer core is a boiling, swirling sea of molten liquid iron and nickel metals. Because it spins as Earth rotates, it acts like a giant magnet that protects our whole planet!",
    descriptionAr: "اللب الخارجي عبارة عن بحر متدفق من سائل الحديد والنيكل المنصهر شديد الحرارة، وهو المسؤول عن توليد المجال المغناطيسي الذي يحمي الأرض في الفضاء.",
    bookPageNoteEn: "Cambridge Learner's Book 3 — Unit 2: Earth & Rocks (p. 35)",
    color: "#eab308",
    cutawayPath: "M 200,200 L 270,200 A 70,70 0 0,0 200,130 Z",
    highlightColor: "#fde047",
    realVisualIcon: "🔥",
  },
  {
    id: "inner_core",
    nameEn: "Inner Core (اللب الداخلي)",
    nameAr: "اللب الداخلي الصلب",
    scientificRoleEn: "Solid, dense white-hot metal sphere at the center of the planet",
    depthEn: "5,150 km to center (6,371 km)",
    temperatureEn: "Around 6,000°C (As hot as the Sun's surface!)",
    stateEn: "Solid Metal Ball (Immense Pressure)",
    descriptionEn: "The inner core is a solid, white-hot metal ball made of iron and nickel. Even though it is as hot as the surface of the Sun, the crushing gravity keeps it pressed solid!",
    descriptionAr: "اللب الداخلي هو كرة معدنية صلبة متوهجة في مركز الأرض. ورغم أن حرارتها تعادل حرارة سطح الشمس، إلا أن الضغط الهائل للجاذبية يمنعها من الانصهار ويبقيها صلبة.",
    bookPageNoteEn: "Cambridge Learner's Book 3 — Unit 2: Earth & Rocks (p. 35)",
    color: "#f8fafc",
    cutawayPath: "M 200,200 L 235,200 A 35,35 0 0,0 200,165 Z",
    highlightColor: "#ffffff",
    realVisualIcon: "☀️",
  },
];

interface Voxel3DViewerProps {
  onComplete?: () => void;
}

export const Voxel3DViewer: React.FC<Voxel3DViewerProps> = ({ onComplete }) => {
  const [selectedLayerId, setSelectedLayerId] = useState<EarthLayerInfo["id"]>("crust");
  const [visitedLayers, setVisitedLayers] = useState<Set<string>>(new Set(["crust"]));
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);

  const activeLayer = earthLayers.find((l) => l.id === selectedLayerId) || earthLayers[0];

  const handleSelectLayer = (id: EarthLayerInfo["id"]) => {
    setSelectedLayerId(id);
    const updated = new Set(visitedLayers);
    updated.add(id);
    setVisitedLayers(updated);

    const layer = earthLayers.find((l) => l.id === id);
    if (layer) {
      audioManager.speak(layer.nameEn.split("(")[0].trim(), "en");
    }

    if (updated.size === earthLayers.length && !hasCompleted) {
      setHasCompleted(true);
      rewardsManager.addStars(25);
      rewardsManager.awardBadge("earth_explorer");
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
      if (onComplete) onComplete();
    }
  };

  const handlePronounce = (text: string) => {
    audioManager.speak(text, "en");
  };

  return (
    <div className="bg-white rounded-3xl border-3 border-amber-200 shadow-md p-5 sm:p-7 space-y-5">
      {/* Top Header: Child-friendly natural lesson title (NO TECHNICAL JARGON) */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-amber-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-mono">
                Science Visual Lab
              </span>
              <span className="text-xs text-slate-500 font-arabic font-bold">
                مختبر استكشاف باطن الأرض
              </span>
            </div>
            <h4 className="text-lg sm:text-xl font-black text-slate-900 font-kid">
              Inside Planet Earth: Crust, Mantle & Core
            </h4>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs font-mono font-bold">
          <Layers className="w-4 h-4 text-amber-600" />
          <span>Explored: {visitedLayers.size} of 4 Layers</span>
        </div>
      </div>

      {/* Main Interactive Stage: Earth Visual Cutaway + Layer Explanation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Side: Real Visual Earth Cutaway Model (Zahra clicks directly on the graphic!) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 rounded-3xl bg-gradient-to-b from-slate-950 via-slate-900 to-[#181109] border-4 border-slate-800 shadow-inner relative overflow-hidden">
          {/* Subtle star particles background */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Prompt instruction for Zahra */}
          <div className="relative z-10 mb-3 text-center">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-kid font-bold border border-amber-400/40 inline-flex items-center gap-1.5">
              <span>👆 Tap any layer directly on Earth's cutaway!</span>
            </span>
          </div>

          {/* SVG Earth Sphere Cutaway Graphic */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 z-10 flex items-center justify-center">
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full drop-shadow-2xl select-none"
            >
              {/* Outer Glow */}
              <circle
                cx="200"
                cy="200"
                r="180"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="4"
                className="opacity-40 animate-pulse"
              />

              {/* 1. Earth Outside Sphere (Blue Ocean & Continents) */}
              <circle cx="200" cy="200" r="170" fill="#0284c7" />
              {/* Continents illustrations on surface */}
              <path
                d="M 60,160 Q 90,130 140,150 T 170,220 T 110,260 Z"
                fill="#22c55e"
                opacity="0.9"
              />
              <path
                d="M 120,70 Q 150,50 180,90 T 170,160 Z"
                fill="#16a34a"
                opacity="0.9"
              />
              <path
                d="M 70,260 Q 120,300 170,280 T 180,350 Z"
                fill="#15803d"
                opacity="0.9"
              />

              {/* Cutaway Wedge: Shows the 4 Internal Layers */}
              {/* 1. Crust Layer */}
              <path
                d="M 200,200 L 370,200 A 170,170 0 0,0 200,30 Z"
                fill="#78350f"
                stroke={selectedLayerId === "crust" ? "#fef08a" : "#92400e"}
                strokeWidth={selectedLayerId === "crust" ? "5" : "2"}
                className="cursor-pointer transition-all hover:opacity-90"
                onClick={() => handleSelectLayer("crust")}
              />

              {/* 2. Mantle Layer */}
              <path
                d="M 200,200 L 330,200 A 130,130 0 0,0 200,70 Z"
                fill="#ea580c"
                stroke={selectedLayerId === "mantle" ? "#fef08a" : "#c2410c"}
                strokeWidth={selectedLayerId === "mantle" ? "5" : "2"}
                className="cursor-pointer transition-all hover:opacity-90"
                onClick={() => handleSelectLayer("mantle")}
              />

              {/* 3. Outer Core Layer */}
              <path
                d="M 200,200 L 275,200 A 75,75 0 0,0 200,125 Z"
                fill="#eab308"
                stroke={selectedLayerId === "outer_core" ? "#ffffff" : "#ca8a04"}
                strokeWidth={selectedLayerId === "outer_core" ? "5" : "2"}
                className="cursor-pointer transition-all hover:opacity-90"
                onClick={() => handleSelectLayer("outer_core")}
              />

              {/* 4. Inner Core Layer */}
              <path
                d="M 200,200 L 235,200 A 35,35 0 0,0 200,165 Z"
                fill="#ffffff"
                stroke={selectedLayerId === "inner_core" ? "#facc15" : "#e2e8f0"}
                strokeWidth={selectedLayerId === "inner_core" ? "5" : "2"}
                className="cursor-pointer transition-all hover:opacity-90 animate-pulse"
                onClick={() => handleSelectLayer("inner_core")}
              />

              {/* Direct Text Labels on the Cutaway Graphic */}
              <text
                x="320"
                y="105"
                fill="#ffffff"
                fontSize="12"
                fontWeight="bold"
                className="pointer-events-none select-none drop-shadow"
              >
                Crust
              </text>
              <text
                x="260"
                y="145"
                fill="#ffffff"
                fontSize="12"
                fontWeight="bold"
                className="pointer-events-none select-none drop-shadow"
              >
                Mantle
              </text>
              <text
                x="222"
                y="180"
                fill="#0f172a"
                fontSize="10"
                fontWeight="bold"
                className="pointer-events-none select-none"
              >
                Core
              </text>
            </svg>
          </div>

          {/* Quick Buttons below the Earth sphere */}
          <div className="relative z-10 grid grid-cols-4 gap-2 w-full mt-4">
            {earthLayers.map((layer) => {
              const isSelected = selectedLayerId === layer.id;
              return (
                <button
                  key={layer.id}
                  onClick={() => handleSelectLayer(layer.id)}
                  className={`py-2 px-1 rounded-xl text-center font-kid transition text-[11px] font-black border-2 flex flex-col items-center justify-center gap-0.5 ${
                    isSelected
                      ? "bg-amber-400 text-amber-950 border-white shadow-lg scale-105"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                  }`}
                >
                  <span className="text-base">{layer.realVisualIcon}</span>
                  <span className="leading-tight">{layer.nameEn.split("(")[0].trim()}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Detailed Scientific Explanation & Real Illustration */}
        <div className="lg:col-span-6 space-y-4">
          {/* Active Layer Details Card */}
          <div
            className="p-5 sm:p-6 rounded-3xl border-3 shadow-md space-y-3 transition-all"
            style={{
              borderColor: activeLayer.highlightColor,
              backgroundColor: `${activeLayer.color}10`,
            }}
          >
            {/* Layer Header & Audio */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activeLayer.realVisualIcon}</span>
                <div>
                  <h5 className="text-xl font-black font-kid text-slate-900 leading-tight">
                    {activeLayer.nameEn}
                  </h5>
                  <p className="text-xs text-slate-500 font-arabic font-bold">
                    {activeLayer.nameAr}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handlePronounce(activeLayer.nameEn.split("(")[0].trim())}
                className="p-2.5 rounded-2xl bg-white hover:bg-amber-100 border border-slate-200 shadow-xs text-amber-700 transition"
                title="Pronounce layer name"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Scientific Properties Pills */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                <span className="text-[10px] text-slate-400 uppercase block font-bold">
                  Depth & Thickness:
                </span>
                <span className="font-black text-slate-800">
                  {activeLayer.depthEn}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                <span className="text-[10px] text-slate-400 uppercase block font-bold">
                  Temperature:
                </span>
                <span className="font-black text-amber-600">
                  {activeLayer.temperatureEn}
                </span>
              </div>
            </div>

            {/* Main Explanation (Faithful to Cambridge Primary Science) */}
            <div className="space-y-2 pt-1">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                <span className="text-[11px] font-mono font-bold text-amber-700 uppercase tracking-wide flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>How It Works (الشرح العلمي المبسط):</span>
                </span>
                <p className="text-sm text-slate-800 font-kid leading-relaxed">
                  {activeLayer.descriptionEn}
                </p>
                <p className="text-xs text-slate-600 font-arabic leading-relaxed pt-1 border-t border-slate-100">
                  💡 {activeLayer.descriptionAr}
                </p>
              </div>

              {/* Cambridge Reference Tag */}
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{activeLayer.bookPageNoteEn}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
