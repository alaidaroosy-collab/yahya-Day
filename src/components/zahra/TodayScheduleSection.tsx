import React from "react";
import { TodaySubject } from "../../data/todayScheduleData";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Play,
  BookOpen,
  ArrowRight,
  Sparkles,
  BookMarked
} from "lucide-react";

interface TodayScheduleSectionProps {
  subjects: TodaySubject[];
  activeSubjectIndex: number;
  onSelectSubject: (index: number) => void;
  onStartLearning: () => void;
  onOpenBookPagesGallery?: () => void;
}

export const TodayScheduleSection: React.FC<TodayScheduleSectionProps> = ({
  subjects,
  activeSubjectIndex,
  onSelectSubject,
  onStartLearning,
  onOpenBookPagesGallery,
}) => {
  const allCompleted = subjects.every((s) => s.isCompleted);
  const activeSubject = subjects[activeSubjectIndex] || subjects[0];

  return (
    <div className="bg-white rounded-3xl border-3 border-amber-300 shadow-lg p-5 sm:p-7 space-y-5">
      {/* Title Header: Prominent Date and School Order */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-kid">
                Today's Schedule
              </h2>
              <span className="text-xs font-mono font-bold text-amber-950 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                Sunday, 20 September 2026 • الأحد ٢٠ سبتمبر ٢٠٢٦
              </span>
            </div>
            <p className="text-xs text-slate-500 font-arabic font-semibold">
              الحصص بالترتيب المدرسي المعتمد: العلوم 🔬 ← الرياضيات 📐 ← اللغة الإنجليزية 📖
            </p>
          </div>
        </div>

        {/* Progress & Book Archive */}
        <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
          {onOpenBookPagesGallery && (
            <button
              onClick={onOpenBookPagesGallery}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-kid font-black transition shadow-2xs"
              title="View all Cambridge textbook page photos"
            >
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>Book Pages Archive (ألبوم صفحات الكتب) 📖</span>
            </button>
          )}

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs font-kid font-bold">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>
              {subjects.filter((s) => s.isCompleted).length} of {subjects.length} Completed
            </span>
          </div>
        </div>
      </div>

      {/* 3 HORIZONTAL CARDS: Science -> Mathematics -> English */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {subjects.map((subject, idx) => {
          const isCurrent = activeSubjectIndex === idx;
          const isDone = subject.isCompleted;

          return (
            <div
              key={subject.id}
              onClick={() => onSelectSubject(idx)}
              className={`rounded-3xl p-5 border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden shadow-2xs hover:shadow-md ${
                isDone
                  ? "bg-emerald-50/70 border-emerald-300"
                  : isCurrent
                  ? "bg-white border-amber-400 ring-4 ring-amber-200 shadow-md"
                  : "bg-slate-50/90 border-slate-200 hover:border-slate-300"
              }`}
            >
              {/* Top Color Accent */}
              <div
                className="absolute top-0 left-0 right-0 h-2"
                style={{ backgroundColor: subject.colorScheme.primary }}
              />

              <div className="space-y-2.5">
                {/* Step Index & Status Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg">
                    Period {idx + 1} (الحصة {idx + 1})
                  </span>

                  {isDone ? (
                    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-kid font-black border border-emerald-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Finished ✓</span>
                    </span>
                  ) : isCurrent ? (
                    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 text-xs font-kid font-black animate-pulse shadow-xs">
                      <span>Current ⭐</span>
                    </span>
                  ) : (
                    <span className="text-xs font-mono text-slate-400">
                      Upcoming
                    </span>
                  )}
                </div>

                {/* Subject Name & Book Name */}
                <div className="flex items-start gap-3 pt-1">
                  <span className="text-3xl p-2 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    {subject.bookCoverIcon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3
                        className="text-lg font-black font-kid leading-tight"
                        style={{ color: subject.colorScheme.primary }}
                      >
                        {subject.nameEn}
                      </h3>
                      <span className="text-xs font-arabic text-slate-400">
                        ({subject.nameAr})
                      </span>
                    </div>

                    {/* Book Name */}
                    <p className="text-xs font-mono font-bold text-slate-500 truncate mt-0.5" title={subject.bookTitleEn}>
                      📚 {subject.bookTitleEn}
                    </p>
                  </div>
                </div>

                {/* Lesson Name */}
                <div className="bg-white/80 rounded-2xl p-3 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
                    Lesson Topic:
                  </span>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 font-kid leading-snug">
                    {subject.todayTopicEn}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-arabic line-clamp-1">
                    {subject.todayTopicAr}
                  </p>
                </div>

                {/* REQUIRED PAGE NUMBERS */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-black text-amber-950 bg-amber-100 px-2.5 py-1 rounded-xl border border-amber-300 shadow-2xs">
                    📄 Page {subject.bookPageNumber}
                  </span>

                  <span className="flex items-center gap-1 text-slate-500 font-mono text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{subject.estimatedMinutes} mins</span>
                  </span>
                </div>
              </div>

              {/* Bottom Action Hint */}
              <div className="pt-3 border-t border-slate-200/60 mt-3 flex items-center justify-between text-xs font-mono text-slate-500">
                <span className="font-arabic font-bold text-slate-400 text-[11px]">
                  {isDone ? "تمت الحصة بنجاح" : isCurrent ? "الحصة النشطة الآن" : "في الانتظار"}
                </span>
                <span
                  className="font-bold flex items-center gap-1 font-kid text-xs"
                  style={{ color: subject.colorScheme.primary }}
                >
                  {isDone ? "Review (مراجعة)" : "Open (فتح الدرس)"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* START TODAY'S LEARNING BUTTON: Prominent & Centered */}
      <div className="pt-2 flex justify-center">
        <button
          onClick={onStartLearning}
          className="w-full sm:w-auto px-10 py-4 rounded-3xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-600 hover:to-amber-500 text-amber-950 font-kid font-black text-lg shadow-xl hover:shadow-2xl transform hover:scale-102 active:scale-98 transition flex items-center justify-center gap-3 border-3 border-white ring-4 ring-amber-300 cursor-pointer"
        >
          <Play className="w-6 h-6 fill-amber-950" />
          <span>
            {allCompleted
              ? "Review Today's Learning Journey (مراجعة رحلة اليوم)"
              : `Start Today's Learning: ${activeSubject.nameEn} (ابدئي رحلة تعلّم اليوم)`}
          </span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
