import React, { useState, useRef } from "react";
import { WeeklySchedulePlan, scheduleStorage, ScheduleSubjectItem } from "../../utils/scheduleStorage";
import {
  Calendar,
  CheckCircle2,
  Star,
  Upload,
  Clock,
  Sparkles,
  Eye,
  X,
  FileImage,
  PlusCircle,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Layers,
  Award
} from "lucide-react";

interface WeeklyScheduleHorizontalProps {
  onSelectTodaySubject?: (subjectId: "science" | "math" | "english") => void;
  onReviewLesson?: (subjectKey: string, lessonTitle: string, pageRef: string) => void;
}

export const WeeklyScheduleHorizontal: React.FC<WeeklyScheduleHorizontalProps> = ({
  onSelectTodaySubject,
  onReviewLesson,
}) => {
  const [weeks, setWeeks] = useState<WeeklySchedulePlan[]>(scheduleStorage.getAllWeeks());
  const [selectedWeekNum, setSelectedWeekNum] = useState<number>(3); // Default to active Week 3
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [viewingSheetUrl, setViewingSheetUrl] = useState<string | null>(null);

  // Form states for uploading a new schedule
  const [uploadWeekNumber, setUploadWeekNumber] = useState<number>(weeks.length + 1);
  const [uploadTitleEn, setUploadTitleEn] = useState<string>("");
  const [uploadTitleAr, setUploadTitleAr] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeWeek = weeks.find((w) => w.weekNumber === selectedWeekNum) || weeks[0];

  const handleSelectWeek = (wNum: number) => {
    setSelectedWeekNum(wNum);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveUploadedSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewImage) {
      alert("الرجاء اختيار صورة الجدول أولاً");
      return;
    }

    const titleEn = uploadTitleEn.trim() || `Week ${uploadWeekNumber}: Timetable Plan`;
    const titleAr = uploadTitleAr.trim() || `الأسبوع ${uploadWeekNumber}: جدول الحصص`;

    scheduleStorage.uploadScheduleForWeek(uploadWeekNumber, previewImage, titleEn, titleAr);

    // Refresh state
    const updated = scheduleStorage.getAllWeeks();
    setWeeks(updated);
    setSelectedWeekNum(uploadWeekNumber);
    setIsUploadModalOpen(false);
    setPreviewImage(null);
    setUploadTitleEn("");
    setUploadTitleAr("");
  };

  const handleLessonClick = (sub: ScheduleSubjectItem) => {
    if (sub.subjectKey && onSelectTodaySubject) {
      onSelectTodaySubject(sub.subjectKey);
    } else if (onReviewLesson) {
      onReviewLesson(sub.subjectNameEn, sub.lessonNameEn, sub.pageNumbers);
    }
  };

  return (
    <div className="bg-white rounded-3xl border-3 border-slate-200 shadow-md p-5 sm:p-7 space-y-5">
      {/* Top Header: Title, Total Weeks & Upload Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-kid">
                Weekly School Schedule
              </h3>
              <span className="text-xs font-mono font-bold text-amber-950 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                الجدول الأسبوعي الكامل
              </span>
            </div>
            <p className="text-xs text-slate-500 font-arabic font-semibold">
              الأيام معروضة أفقياً داخل نفس الصف • اختاري أي أسبوع لعرض جدوله وحصصه مباشرة
            </p>
          </div>
        </div>

        {/* Action Buttons: Upload Schedule & View Schedule Sheet */}
        <div className="flex items-center gap-2 flex-wrap">
          {activeWeek.scheduleImageUrl && (
            <button
              onClick={() => setViewingSheetUrl(activeWeek.scheduleImageUrl || null)}
              className="px-3.5 py-2 rounded-2xl text-xs font-kid font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition flex items-center gap-1.5 shadow-2xs"
              title="View original timetable sheet"
            >
              <FileImage className="w-4 h-4 text-blue-600" />
              <span>Timetable Sheet (صورة الجدول الورقي)</span>
            </button>
          )}

          <button
            onClick={() => {
              setUploadWeekNumber(weeks.length + 1);
              setIsUploadModalOpen(true);
            }}
            className="px-3.5 py-2 rounded-2xl text-xs font-kid font-bold text-amber-950 bg-amber-400 hover:bg-amber-500 transition flex items-center gap-1.5 shadow-2xs active:scale-95"
          >
            <Upload className="w-4 h-4" />
            <span>Upload New Week (إضافة أسبوع جديد)</span>
          </button>
        </div>
      </div>

      {/* 1. HORIZONTAL WEEKS TABS (Week 1 | Week 2 | Week 3 | Week 4 | Week 5 | ...) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {weeks.map((week) => {
          const isSelected = week.weekNumber === selectedWeekNum;
          const isActiveWeek = week.status === "in_progress";
          const isDone = week.status === "completed";

          return (
            <button
              key={week.weekNumber}
              onClick={() => handleSelectWeek(week.weekNumber)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-kid font-black transition-all flex items-center gap-2 shrink-0 border-2 ${
                isSelected
                  ? "bg-slate-900 text-white border-slate-900 shadow-md ring-3 ring-amber-400 scale-102"
                  : isActiveWeek
                  ? "bg-amber-100 text-amber-950 border-amber-400 hover:bg-amber-200"
                  : isDone
                  ? "bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <span>Week {week.weekNumber}</span>
              {isActiveWeek && (
                <span className="px-1.5 py-0.2 rounded-md bg-amber-400 text-slate-950 text-[10px] font-bold">
                  Active
                </span>
              )}
              {isDone && (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              )}
            </button>
          );
        })}

        <button
          onClick={() => {
            setUploadWeekNumber(weeks.length + 1);
            setIsUploadModalOpen(true);
          }}
          className="px-3.5 py-2.5 rounded-2xl text-xs font-kid font-bold text-slate-500 hover:text-slate-800 bg-slate-100/80 hover:bg-slate-200/80 border-2 border-dashed border-slate-300 transition flex items-center gap-1.5 shrink-0"
        >
          <PlusCircle className="w-3.5 h-3.5 text-amber-600" />
          <span>+ Add Week</span>
        </button>
      </div>

      {/* Week Title & Topic Ribbon (Updates on the same page!) */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex items-center justify-between flex-wrap gap-2 text-xs">
        <div>
          <span className="font-kid font-black text-slate-900 text-base">
            Week {activeWeek.weekNumber}: {activeWeek.titleEn}
          </span>
          <span className="text-slate-500 font-arabic block mt-0.5">
            {activeWeek.titleAr} • {activeWeek.dateRangeEn} ({activeWeek.dateRangeAr}) • {activeWeek.pageRange}
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono">
          <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-2xs">
            {activeWeek.status === "completed"
              ? "Completed Week ✓"
              : activeWeek.status === "in_progress"
              ? "Current Active Week ⭐"
              : "Upcoming Week"}
          </span>
        </div>
      </div>

      {/* 2. STRICT HORIZONTAL DAYS ROW (Sunday to Thursday side-by-side in one row, never vertically stacked!) */}
      <div className="overflow-x-auto pb-3 pt-1 scrollbar-thin">
        <div className="grid grid-cols-5 min-w-[860px] gap-3.5">
          {activeWeek.days.map((day, idx) => {
            const isToday = day.isToday;
            const isDone = day.isCompleted;

            return (
              <div
                key={idx}
                className={`rounded-2xl p-3.5 border-2 transition flex flex-col justify-between ${
                  isToday
                    ? "bg-amber-50/80 border-amber-400 ring-3 ring-amber-200 shadow-sm"
                    : isDone
                    ? "bg-emerald-50/30 border-emerald-300"
                    : "bg-slate-50/80 border-slate-200"
                }`}
              >
                {/* Day Header: Day Name + Date */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200/70">
                    <div>
                      <h5 className="font-kid font-black text-sm text-slate-900 leading-tight">
                        {day.dayNameEn}
                      </h5>
                      <span className="text-[11px] text-slate-500 font-arabic block">
                        {day.dayNameAr} • {day.dateStr}
                      </span>
                    </div>

                    {isToday ? (
                      <span className="px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 text-[10px] font-kid font-black animate-pulse shadow-2xs">
                        Today ⭐
                      </span>
                    ) : isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : null}
                  </div>

                  {/* Lessons in the day */}
                  <div className="space-y-2">
                    {day.subjects.map((sub, sIdx) => (
                      <div
                        key={sIdx}
                        onClick={() => handleLessonClick(sub)}
                        className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:shadow-sm hover:border-amber-400 transition cursor-pointer space-y-1 group"
                        title="Click to open or review this lesson"
                      >
                        {/* Subject Badge & Duration */}
                        <div className="flex items-center justify-between">
                          <span
                            className="text-[11px] font-kid font-black flex items-center gap-1"
                            style={{ color: sub.color }}
                          >
                            <span>{sub.bookIcon}</span>
                            <span>{sub.subjectNameEn}</span>
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {sub.durationMins}m
                          </span>
                        </div>

                        {/* Book Name & Code */}
                        <p className="text-[10px] font-mono text-slate-500 truncate" title={sub.bookTitleEn}>
                          {sub.bookCode ? `[${sub.bookCode}] ` : ""}{sub.bookTitleEn}
                        </p>

                        {/* Lesson Name */}
                        <h6 className="text-[11px] text-slate-900 font-kid font-bold leading-tight line-clamp-2 group-hover:text-amber-700 transition-colors">
                          {sub.lessonNameEn}
                        </h6>

                        {/* REQUIRED: Page Numbers (MUST NEVER BE DROPPED) */}
                        <div className="flex items-center justify-between text-[10px] pt-0.5">
                          <span className="font-mono font-black text-amber-900 bg-amber-50 px-1.5 py-0.2 rounded-md border border-amber-200">
                            📄 {sub.pageNumbers}
                          </span>

                          {sub.testQuiz && (
                            <span className="font-mono font-bold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded-md border border-rose-200">
                              {sub.testQuiz}
                            </span>
                          )}
                        </div>

                        {/* Homework if present */}
                        {sub.homework && (
                          <div className="text-[9px] text-slate-500 font-arabic line-clamp-1 pt-0.5 border-t border-slate-100">
                            📝 {sub.homework}
                          </div>
                        )}
                      </div>
                    ))}

                    {day.subjects.length === 0 && (
                      <div className="p-3 text-center text-xs text-slate-400 font-kid">
                        No scheduled classes
                      </div>
                    )}
                  </div>
                </div>

                {/* Day Footer */}
                <div className="pt-2.5 border-t border-slate-200/60 mt-2.5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="font-bold">
                    {isDone ? "Completed ✓" : isToday ? "Active Today" : "Planned"}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{day.starsEarned}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: View Full School Timetable Sheet */}
      {viewingSheetUrl && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-5 space-y-4 shadow-2xl border-4 border-amber-400 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileImage className="w-5 h-5 text-amber-600" />
                <h4 className="text-lg font-black font-kid text-slate-900">
                  Week {activeWeek.weekNumber} School Timetable Sheet
                </h4>
              </div>
              <button
                onClick={() => setViewingSheetUrl(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto rounded-2xl border border-slate-200 bg-slate-50 p-2 flex items-center justify-center">
              <img
                src={viewingSheetUrl}
                alt="School Timetable Sheet"
                className="max-h-full max-w-full object-contain rounded-xl shadow-md"
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal: Upload New Week Schedule */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border-4 border-amber-400">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-amber-600" />
                <h4 className="text-lg font-black font-kid text-slate-900">
                  Upload School Timetable (رفع جدول أسبوعي جديد)
                </h4>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveUploadedSchedule} className="space-y-4">
              <div>
                <label className="text-xs font-mono font-bold text-slate-700 block mb-1">
                  Week Number (رقم الأسبوع):
                </label>
                <input
                  type="number"
                  min="1"
                  max="52"
                  value={uploadWeekNumber}
                  onChange={(e) => setUploadWeekNumber(Number(e.target.value))}
                  className="w-full p-3 rounded-2xl border-2 border-slate-200 font-mono text-sm font-bold"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-slate-700 block mb-1">
                  Week Topic English (عنوان الأسبوع بالإنجليزية):
                </label>
                <input
                  type="text"
                  placeholder="e.g. Week 6: Forces & Motion"
                  value={uploadTitleEn}
                  onChange={(e) => setUploadTitleEn(e.target.value)}
                  className="w-full p-3 rounded-2xl border-2 border-slate-200 font-kid text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-slate-700 block mb-1">
                  Week Topic Arabic (عنوان الأسبوع بالعربية):
                </label>
                <input
                  type="text"
                  placeholder="مثال: الأسبوع 6: القوى والحركة"
                  value={uploadTitleAr}
                  onChange={(e) => setUploadTitleAr(e.target.value)}
                  className="w-full p-3 rounded-2xl border-2 border-slate-200 font-arabic text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-slate-700 block mb-1">
                  Timetable Photo (صورة الجدول من المدرسة):
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-4 rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50/60 hover:bg-amber-100/60 text-amber-900 font-kid text-xs font-bold transition flex flex-col items-center justify-center gap-1"
                >
                  <FileImage className="w-6 h-6 text-amber-600" />
                  <span>
                    {previewImage ? "Change Image (تغيير الصورة)" : "Choose Image File (اختيار صورة الجدول)"}
                  </span>
                </button>
              </div>

              {previewImage && (
                <div className="h-32 rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="flex-1 py-3 rounded-2xl border-2 border-slate-200 text-slate-600 font-kid text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-kid text-xs font-black shadow-md"
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
