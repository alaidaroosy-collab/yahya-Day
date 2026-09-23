import React, { useState } from "react";
import { LessonDesignProfile, ActivityType } from "../../types/curriculum";
import {
  Sparkles,
  Target,
  Compass,
  Eye,
  Layers,
  ChevronDown,
  ChevronUp,
  Info,
  Gamepad2,
  Cpu,
  MapPin,
  Box,
  GitCommit,
  FlaskConical,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

interface DesignSelectionBannerProps {
  profile: LessonDesignProfile;
  activeActivityType: ActivityType;
  onChangeActivityType?: (type: ActivityType) => void;
  onContinueLessonFlow?: () => void;
  isCompleted?: boolean;
  showTechnicalDetails?: boolean;
}

export const DesignSelectionBanner: React.FC<DesignSelectionBannerProps> = ({
  profile,
  activeActivityType,
  onChangeActivityType,
  onContinueLessonFlow,
  isCompleted = false,
  showTechnicalDetails = false,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // If technical details are not explicitly requested by parent/teacher, keep completely hidden from Zahra
  if (!showTechnicalDetails) {
    return null;
  }

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case "interactive_explorer":
        return <Eye className="w-4 h-4 text-sky-500" />;
      case "ai_pointer":
        return <Cpu className="w-4 h-4 text-purple-500" />;
      case "map_explorer":
        return <MapPin className="w-4 h-4 text-emerald-500" />;
      case "voxel_3d":
        return <Box className="w-4 h-4 text-amber-500" />;
      case "journey_courseviz":
        return <GitCommit className="w-4 h-4 text-indigo-500" />;
      case "learning_snake":
        return <Gamepad2 className="w-4 h-4 text-rose-500" />;
      default:
        return <FlaskConical className="w-4 h-4 text-slate-500" />;
    }
  };

  const getActivityLabel = (type: ActivityType) => {
    switch (type) {
      case "interactive_explorer":
        return { en: "Interactive Explorer", ar: "المستكشف التفاعلي" };
      case "ai_pointer":
        return { en: "AI Pointer (Target & Identify)", ar: "مؤشر الذكاء الاصطناعي" };
      case "map_explorer":
        return { en: "Map Explorer (Environment & Field)", ar: "مستكشف الخرائط البيئية" };
      case "voxel_3d":
        return { en: "Voxel 3D (Structural Model)", ar: "مجسم فوكسل ثلاثي الأبعاد" };
      case "journey_courseviz":
        return { en: "Journey / CourseViz (Sequence & Process)", ar: "مسار الرحلة والتسلسل" };
      case "learning_snake":
        return { en: "Learning Snake (Practice Questions)", ar: "لعبة ثعبان التعلّم" };
      default:
        return { en: "Standard Lab", ar: "المختبر الاعتيادي" };
    }
  };

  const currentLabel = getActivityLabel(activeActivityType);

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm overflow-hidden transition-all duration-200">
      {/* Top Header Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-[#002D62] text-white p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Main Title & Objective Flag */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center shrink-0">
              <Target className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-md bg-indigo-400/20 text-indigo-200 text-[11px] font-mono font-bold uppercase tracking-wider">
                  Lesson-Based Design Selection
                </span>
                <span className="text-[11px] text-amber-300 font-bold font-arabic">
                  (اختيار التصميم المرتكز على أهداف الدرس)
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white font-kid flex items-center gap-2 mt-0.5">
                <span>Objective-Driven Activity:</span>
                <span className="text-sky-300 underline decoration-sky-400/60 decoration-2">
                  {currentLabel.en}
                </span>
              </h3>
            </div>
          </div>

          {/* Quick Stats Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="px-3 py-1 rounded-xl bg-white/10 border border-white/15 text-xs text-slate-200 font-mono font-bold flex items-center gap-1.5">
              <span className="text-slate-400">Subject:</span>
              <span className="text-amber-300">{profile.subject}</span>
            </div>
            <div className="px-3 py-1 rounded-xl bg-white/10 border border-white/15 text-xs text-slate-200 font-mono font-bold flex items-center gap-1.5">
              <span className="text-slate-400">Type:</span>
              <span className="text-sky-300 capitalize">{profile.lessonType}</span>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white flex items-center gap-1 transition"
            >
              <Info className="w-3.5 h-3.5 text-amber-300" />
              <span>{isExpanded ? "Hide Rationale" : "Why this design?"}</span>
              {isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Pedagogical Pipeline Tracker */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1 sm:gap-2 text-[11px] font-mono text-slate-300 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-emerald-400 font-bold shrink-0">1. Content</span>
          <span className="text-slate-500">→</span>
          <span className="text-amber-300 font-bold shrink-0">2. Objective</span>
          <span className="text-slate-500">→</span>
          <span className="text-sky-300 font-bold shrink-0">3. Select Interaction</span>
          <span className="text-slate-500">→</span>
          <span className="text-indigo-300 font-bold shrink-0">4. Approved Data</span>
          <span className="text-slate-500">→</span>
          <span className="text-pink-300 font-bold shrink-0">5. Render Design</span>
          <span className="text-slate-500">→</span>
          <span className={isCompleted ? "text-emerald-400 font-black shrink-0" : "text-slate-400 shrink-0"}>
            6. Complete & Continue
          </span>
        </div>
      </div>

      {/* Expanded Rationale & Learning Objective Details */}
      {isExpanded && (
        <div className="p-5 bg-indigo-50/40 border-b border-indigo-100 space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Learning Objective Card */}
            <div className="bg-white p-4 rounded-2xl border border-indigo-100 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-indigo-950 font-black text-xs font-kid">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Learning Objective (الهدف التعليمي للدرس):</span>
              </div>
              <p className="text-sm text-slate-800 font-bold leading-relaxed font-kid">
                {profile.learningObjective.en}
              </p>
              <p className="text-xs text-slate-600 font-arabic leading-relaxed font-semibold">
                {profile.learningObjective.ar}
              </p>
            </div>

            {/* Design Selection Rationale */}
            <div className="bg-white p-4 rounded-2xl border border-indigo-100 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-indigo-950 font-black text-xs font-kid">
                <Compass className="w-4 h-4 text-emerald-600" />
                <span>Pedagogical Selection Rule (مبرر اختيار التصميم):</span>
              </div>
              <p className="text-sm text-slate-800 font-bold leading-relaxed font-kid">
                "{profile.designRationale.en}"
              </p>
              <p className="text-xs text-slate-600 font-arabic leading-relaxed font-semibold">
                "{profile.designRationale.ar}"
              </p>
            </div>
          </div>

          {/* Interaction & Media Requirements */}
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-slate-600 bg-white/80 p-3 rounded-xl border border-indigo-100">
            <div>
              <span className="font-bold text-slate-800">Interaction Needed:</span>{" "}
              <span>{profile.interactionNeeded}</span>
            </div>
            <div className="flex items-center gap-3">
              <span>
                <span className="font-bold text-slate-800">Visual Complexity:</span>{" "}
                <span className="uppercase font-mono font-bold text-indigo-600">
                  {profile.visualComplexity}
                </span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Activity Mode Switcher Ribbon */}
      <div className="p-3 sm:px-5 bg-slate-50 flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-black text-slate-500 text-[11px] font-mono">
            Interaction Mode:
          </span>

          {/* Designed primary activity */}
          <button
            onClick={() => onChangeActivityType?.(profile.activityType)}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition ${
              activeActivityType === profile.activityType
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {getActivityIcon(profile.activityType)}
            <span>Primary Design: {getActivityLabel(profile.activityType).en}</span>
          </button>

          {/* Quick Practice Mode (Learning Snake) if not already active */}
          {profile.activityType !== "learning_snake" && (
            <button
              onClick={() => onChangeActivityType?.("learning_snake")}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition ${
                activeActivityType === "learning_snake"
                  ? "bg-rose-600 text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
              title="Practice Questions in Learning Snake"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-rose-500" />
              <span>Practice Questions (Learning Snake)</span>
            </button>
          )}

          {/* Standard Lab option */}
          <button
            onClick={() => onChangeActivityType?.("standard_lab")}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition ${
              activeActivityType === "standard_lab"
                ? "bg-slate-800 text-white shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5 text-slate-500" />
            <span>Standard Lab</span>
          </button>
        </div>

        {/* Completion & Next Step Button */}
        {isCompleted && onContinueLessonFlow && (
          <button
            onClick={onContinueLessonFlow}
            className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-1.5 shadow-sm transition animate-bounce"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            <span>Activity Complete! Continue Flow</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
