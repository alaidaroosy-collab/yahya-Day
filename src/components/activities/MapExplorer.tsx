import React, { useState } from "react";
import { audioManager } from "../../utils/audioPlayer";
import { rewardsManager } from "../../utils/rewardsManager";
import confetti from "canvas-confetti";
import {
  MapPin,
  Compass,
  CheckCircle2,
  Volume2,
  Backpack,
  Sparkles,
  Layers,
  ArrowRight,
  Info
} from "lucide-react";

interface FieldLocation {
  id: string;
  nameEn: string;
  nameAr: string;
  biomeEn: string;
  biomeAr: string;
  xPercent: number;
  yPercent: number;
  rockOrSoilEn: string;
  rockOrSoilAr: string;
  type: "igneous" | "sedimentary" | "metamorphic" | "soil";
  descriptionEn: string;
  descriptionAr: string;
  fieldTestResultEn: string;
  fieldTestResultAr: string;
  icon: string;
  color: string;
}

const fieldLocations: FieldLocation[] = [
  {
    id: "granite-peaks",
    nameEn: "Granite Mountain Ridge",
    nameAr: "قمم جبال الجرانيت الشاهقة",
    biomeEn: "Highland Mountain",
    biomeAr: "مرتفعات جبلية",
    xPercent: 22,
    yPercent: 26,
    rockOrSoilEn: "Granite (صخر الجرانيت)",
    rockOrSoilAr: "جرانيت ناري صلب",
    type: "igneous",
    descriptionEn: "Formed deep underground when molten magma cooled very slowly. The rocks form sharp, durable crags.",
    descriptionAr: "تشكل في أعماق الأرض عندما بردت الصهارة ببطء شديد، مكوناً صخوراً قوية تقاوم عوامل الطقس لآلاف السنين.",
    fieldTestResultEn: "Field Test: Did not scratch with steel pick. Impermeable to water droplets.",
    fieldTestResultAr: "الفحص الميداني: لا يُخدش بمسمار الفولاذ، ولا يمتص قطرات الماء أبداً.",
    icon: "🏔️",
    color: "#475569"
  },
  {
    id: "limestone-quarry",
    nameEn: "Coastal Limestone Quarry",
    nameAr: "محجر الحجر الجيري الساحلي",
    biomeEn: "Coastline & Cliff",
    biomeAr: "جروف ساحلية قديمة",
    xPercent: 78,
    yPercent: 32,
    rockOrSoilEn: "Limestone & Chalk (الحجر الجيري والطباشير)",
    rockOrSoilAr: "حجر جيري رسوبي يحتوي أصدافاً",
    type: "sedimentary",
    descriptionEn: "Formed over millions of years from compressed shells and skeletons of tiny sea creatures on ancient ocean floors.",
    descriptionAr: "تكوّن عبر ملايين السنين من انضغاط أصداف وهياكل الكائنات البحرية الميتة في قيعان البحار القديمة.",
    fieldTestResultEn: "Field Test: Carbonate reaction fizz observed. Contains visible fossil shell fragments.",
    fieldTestResultAr: "الفحص الميداني: يحدث فوراناً خفيفاً عند اختبار الحمض، وتظهر فيه بقايا أصداف متحجرة.",
    icon: "🐚",
    color: "#e2e8f0"
  },
  {
    id: "sandstone-canyon",
    nameEn: "Desert Canyon Cliffs",
    nameAr: "أخاديد الحجر الرملي الصحراوي",
    biomeEn: "Arid Desert Plateau",
    biomeAr: "هضبة صحراوية قاحلة",
    xPercent: 65,
    yPercent: 70,
    rockOrSoilEn: "Sandstone (الحجر الرملي)",
    rockOrSoilAr: "حجر رملي ذو طبقات ملونة",
    type: "sedimentary",
    descriptionEn: "Layers of desert sand deposited by ancient winds and rivers, cemented together under geological pressure.",
    descriptionAr: "طبقات من الرمال تراكمت بفعل الرياح والأنهار القديمة والتحمت تحت الضغط الجيولوجي.",
    fieldTestResultEn: "Field Test: Porous texture. Absorbs water drops slowly and feels gritty to touch.",
    fieldTestResultAr: "الفحص الميداني: ملمس خشن، يمتص قطرات الماء ببطء لوجود مسام دقيقة بين حبات الرمل.",
    icon: "🏜️",
    color: "#d97706"
  },
  {
    id: "river-delta-soil",
    nameEn: "River Valley & Fertile Soil",
    nameAr: "وادي النهر والتربة الزراعية الخصبة",
    biomeEn: "Freshwater Riverbed",
    biomeAr: "مجرى وسهل نهري فيضي",
    xPercent: 35,
    yPercent: 68,
    rockOrSoilEn: "Loam Soil & River Silt (التربة الطميية الخصبة)",
    rockOrSoilAr: "تربة غنية بالدبال والطمي",
    type: "soil",
    descriptionEn: "Rich mixture of eroded mineral rock particles, decaying plant matter (humus), moisture, and earthworms.",
    descriptionAr: "مزيج خصب من فتات الصخور المتآكلة والمواد العضوية المتحللة (الدبال) والرطوبة والديدان.",
    fieldTestResultEn: "Field Test: Highly fertile, holds balanced water, ideal for plant roots.",
    fieldTestResultAr: "الفحص الميداني: يحتفظ برطوبة متوازنة، غني جداً بالعناصر المغذية لنمو النباتات.",
    icon: "🌱",
    color: "#15803d"
  }
];

interface MapExplorerProps {
  onComplete?: () => void;
}

export const MapExplorer: React.FC<MapExplorerProps> = ({ onComplete }) => {
  const [selectedLoc, setSelectedLoc] = useState<FieldLocation>(fieldLocations[0]);
  const [backpack, setBackpack] = useState<Set<string>>(new Set([fieldLocations[0].id]));

  const isAllCollected = backpack.size === fieldLocations.length;

  const handleSelectLocation = (loc: FieldLocation) => {
    setSelectedLoc(loc);
    audioManager.speak(loc.nameEn, "en");

    if (!backpack.has(loc.id)) {
      const nextSet = new Set(backpack);
      nextSet.add(loc.id);
      setBackpack(nextSet);
      rewardsManager.addXP(20);

      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.6 },
      });

      if (nextSet.size === fieldLocations.length) {
        onComplete?.();
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-emerald-200 shadow-md p-5 space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-emerald-100">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-mono">
                Map Explorer
              </span>
              <span className="text-xs text-slate-500 font-arabic">
                مستكشف الخرائط والمواقع البيئية
              </span>
            </div>
            <h4 className="text-base font-black text-slate-900 font-kid">
              Fieldwork: Rocks & Soil in Our Environment
            </h4>
          </div>
        </div>

        {/* Backpack Counter */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-mono font-bold">
          <Backpack className="w-4 h-4 text-emerald-600" />
          <span>Samples in Field Bag: {backpack.size} / {fieldLocations.length}</span>
        </div>
      </div>

      {/* Main Map Arena & Fieldwork Notebook */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Illustrated Geological Landscape Map (7 cols) */}
        <div className="lg:col-span-7 space-y-2">
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border-4 border-slate-800 bg-slate-900 shadow-inner">
            {/* SVG Terrain Map */}
            <svg className="w-full h-full" viewBox="0 0 500 380">
              <defs>
                <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#bae6fd" />
                </linearGradient>
                <linearGradient id="mountainGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>
                <linearGradient id="canyonGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#b45309" />
                  <stop offset="100%" stopColor="#78350f" />
                </linearGradient>
                <linearGradient id="riverGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
              </defs>

              {/* Sky */}
              <rect width="500" height="150" fill="url(#skyGrad)" />
              {/* Distant Sun */}
              <circle cx="80" cy="50" r="28" fill="#facc15" opacity="0.9" />

              {/* Mountain Range (Granite) */}
              <polygon points="0,150 110,40 230,150" fill="url(#mountainGrad)" />
              <polygon points="110,40 140,75 80,75" fill="#f8fafc" opacity="0.8" />
              <polygon points="180,150 260,70 340,150" fill="#334155" />
              <polygon points="260,70 280,95 240,95" fill="#f8fafc" opacity="0.8" />

              {/* Coastal White Limestone Cliffs (Right) */}
              <polygon points="360,150 440,110 500,130 500,260 360,260" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
              <path d="M 370 190 Q 420 180 490 190" stroke="#64748b" strokeWidth="2" fill="none" strokeDasharray="4,4" />
              <path d="M 370 220 Q 430 210 500 220" stroke="#64748b" strokeWidth="2" fill="none" strokeDasharray="4,4" />

              {/* Ocean / Coastline */}
              <path d="M 400 260 C 430 280 470 300 500 310 L 500 380 L 400 380 Z" fill="#0284c7" opacity="0.7" />

              {/* Desert Plateau (Canyon) */}
              <polygon points="270,200 420,200 450,340 280,350" fill="url(#canyonGrad)" />
              {/* Canyon layers */}
              <path d="M 280 230 L 420 230" stroke="#f59e0b" strokeWidth="3" fill="none" opacity="0.8" />
              <path d="M 285 260 L 430 260" stroke="#d97706" strokeWidth="3" fill="none" opacity="0.8" />
              <path d="M 290 290 L 440 290" stroke="#b45309" strokeWidth="3" fill="none" opacity="0.8" />

              {/* River Valley & Green Farmland Plains */}
              <polygon points="0,150 270,180 260,380 0,380" fill="#16a34a" />
              {/* River winding from mountains */}
              <path d="M 170 140 Q 140 220 170 270 T 150 380" fill="none" stroke="url(#riverGrad)" strokeWidth="18" strokeLinecap="round" />
            </svg>

            {/* Interactive Pins on Map */}
            {fieldLocations.map((loc) => {
              const isSelected = selectedLoc.id === loc.id;
              const isCollected = backpack.has(loc.id);

              return (
                <button
                  key={loc.id}
                  onClick={() => handleSelectLocation(loc)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300 group"
                  style={{
                    left: `${loc.xPercent}%`,
                    top: `${loc.yPercent}%`,
                  }}
                >
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-black shadow-xl transition transform group-hover:scale-110 ${
                      isSelected
                        ? "bg-emerald-500 text-white ring-4 ring-emerald-300 scale-110"
                        : isCollected
                        ? "bg-slate-900/90 text-emerald-300 border-2 border-emerald-400"
                        : "bg-white text-slate-900 border-2 border-amber-400 animate-bounce"
                    }`}
                  >
                    <span className="text-base">{loc.icon}</span>
                    <span className="font-kid hidden sm:inline">{loc.nameEn.split(" ")[0]}</span>
                    {isCollected && <span className="text-emerald-300">✓</span>}
                  </div>
                </button>
              );
            })}
          </div>

          <p className="text-xs text-slate-500 text-center font-mono">
            🧭 Click on any terrain pin to collect rock and soil samples into your field bag
          </p>
        </div>

        {/* Fieldwork Notebook & Specimen Inspector (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-amber-50 rounded-3xl p-5 border-2 border-amber-300 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-amber-200">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedLoc.icon}</span>
                <div>
                  <span className="text-[10px] font-mono font-bold text-amber-800 uppercase">
                    Fieldwork Specimen
                  </span>
                  <h5 className="text-base font-black text-amber-950 font-kid">
                    {selectedLoc.nameEn}
                  </h5>
                </div>
              </div>
              <button
                onClick={() => audioManager.speak(selectedLoc.descriptionEn, "en")}
                className="p-1.5 rounded-xl bg-amber-200/70 hover:bg-amber-300 text-amber-900"
                title="Read Field Notes"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Specimen Details */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs bg-white p-2.5 rounded-xl border border-amber-200">
                <span className="font-mono text-slate-500">Material / Rock:</span>
                <span className="font-bold text-slate-900 font-kid">{selectedLoc.rockOrSoilEn}</span>
              </div>

              <div className="flex items-center justify-between text-xs bg-white p-2.5 rounded-xl border border-amber-200">
                <span className="font-mono text-slate-500">Classification:</span>
                <span className="px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 font-bold uppercase text-[10px] font-mono">
                  {selectedLoc.type}
                </span>
              </div>

              <p className="text-xs text-slate-800 font-kid leading-relaxed bg-white/70 p-3 rounded-xl border border-amber-200/80">
                {selectedLoc.descriptionEn}
              </p>
              <p className="text-xs text-amber-900 font-arabic leading-relaxed font-semibold">
                {selectedLoc.descriptionAr}
              </p>

              {/* Field Test Results */}
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="text-[11px] font-mono font-black text-emerald-800 uppercase block">
                  🧪 Scientist Field Test Result:
                </span>
                <p className="text-xs text-emerald-950 font-kid font-bold">
                  {selectedLoc.fieldTestResultEn}
                </p>
                <p className="text-[11px] text-emerald-800 font-arabic">
                  {selectedLoc.fieldTestResultAr}
                </p>
              </div>
            </div>

            {/* Collection Status */}
            <div className="pt-1 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">
                Status: {backpack.has(selectedLoc.id) ? "🎒 Collected in Bag" : "Not yet collected"}
              </span>
              {!backpack.has(selectedLoc.id) && (
                <button
                  onClick={() => handleSelectLocation(selectedLoc)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs font-cambridge"
                >
                  Collect Sample (+20 XP)
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
