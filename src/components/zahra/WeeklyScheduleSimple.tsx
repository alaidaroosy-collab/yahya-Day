import React from "react";
import { Calendar, CheckCircle2, Star, Sparkles, Clock } from "lucide-react";

interface DayPlan {
  dayNameEn: string;
  dayNameAr: string;
  isToday: boolean;
  isDone: boolean;
  subjects: string[];
  weatherIcon: string;
  starsEarned: number;
}

const weekDays: DayPlan[] = [
  {
    dayNameEn: "Sunday",
    dayNameAr: "الأحد",
    isToday: false,
    isDone: true,
    subjects: ["Science: Light & Dark", "Maths: Numbers"],
    weatherIcon: "☀️",
    starsEarned: 40,
  },
  {
    dayNameEn: "Monday",
    dayNameAr: "الإثنين",
    isToday: false,
    isDone: true,
    subjects: ["Science: Mirrors", "English: Phonics"],
    weatherIcon: "🌤️",
    starsEarned: 50,
  },
  {
    dayNameEn: "Tuesday",
    dayNameAr: "الثلاثاء",
    isToday: true,
    isDone: false,
    subjects: ["Science: Light Sources", "Maths: 3D Shapes", "English: Words"],
    weatherIcon: "🌈",
    starsEarned: 60,
  },
  {
    dayNameEn: "Wednesday",
    dayNameAr: "الأربعاء",
    isToday: false,
    isDone: false,
    subjects: ["Science: Dark Box", "Maths: Fractions"],
    weatherIcon: "☀️",
    starsEarned: 0,
  },
  {
    dayNameEn: "Thursday",
    dayNameAr: "الخميس",
    isToday: false,
    isDone: false,
    subjects: ["Science: Earth Layers", "Celebration & Badges"],
    weatherIcon: "🎉",
    starsEarned: 0,
  },
];

export const WeeklyScheduleSimple: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border-3 border-slate-200 shadow-md p-6 sm:p-8 space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 font-kid">
              Weekly Schedule
            </h3>
            <p className="text-xs text-slate-500 font-arabic font-semibold">
              جدول الأسبوع المبسط - رحلتك الممتعة خطوة بخطوة
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
          Cambridge Stage 3
        </span>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 pt-1">
        {weekDays.map((day, idx) => {
          return (
            <div
              key={idx}
              className={`rounded-2xl p-4 border-2 transition flex flex-col justify-between ${
                day.isToday
                  ? "bg-amber-50/80 border-amber-400 ring-4 ring-amber-200 shadow-md scale-102"
                  : day.isDone
                  ? "bg-emerald-50/50 border-emerald-300"
                  : "bg-slate-50/80 border-slate-200 opacity-90"
              }`}
            >
              <div className="space-y-2">
                {/* Day Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg">{day.weatherIcon}</span>
                    <span className="font-kid font-black text-sm text-slate-900">
                      {day.dayNameEn}
                    </span>
                  </div>

                  {day.isToday ? (
                    <span className="px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 text-[10px] font-kid font-black animate-pulse">
                      Today ⭐
                    </span>
                  ) : day.isDone ? (
                    <span className="text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                  ) : null}
                </div>

                <span className="text-xs text-slate-400 font-arabic block">
                  {day.dayNameAr}
                </span>

                {/* Subject list */}
                <div className="space-y-1 pt-1">
                  {day.subjects.map((sub, sIdx) => (
                    <div
                      key={sIdx}
                      className="text-xs font-kid font-bold text-slate-700 bg-white/90 p-1.5 rounded-xl border border-slate-200/70"
                    >
                      {sub}
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Stars */}
              <div className="pt-3 border-t border-slate-200/50 mt-3 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>{day.isDone ? "Done" : day.isToday ? "In Progress" : "Upcoming"}</span>
                {day.starsEarned > 0 && (
                  <span className="font-bold text-amber-600 flex items-center gap-0.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>+{day.starsEarned}</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
