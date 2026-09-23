import React, { useState } from "react";
import { X, ShieldCheck, BookOpen, Layers, Settings, RotateCcw } from "lucide-react";

interface ParentTeacherDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBookExplorer: () => void;
  onOpenRoadmap: () => void;
  onOpenAwards: () => void;
  onOpenBookPagesGallery?: () => void;
  onResetTodaySchedule: () => void;
}

export const ParentTeacherDrawer: React.FC<ParentTeacherDrawerProps> = ({
  isOpen,
  onClose,
  onOpenBookExplorer,
  onOpenRoadmap,
  onOpenAwards,
  onOpenBookPagesGallery,
  onResetTodaySchedule,
}) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [pinAnswer, setPinAnswer] = useState<string>("");
  const [pinError, setPinError] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple math question: 4 + 3 = 7
    if (pinAnswer.trim() === "7") {
      setIsUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="bg-white w-full max-w-md h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 font-kid">
                  Parent / Teacher Mode
                </h3>
                <p className="text-xs text-slate-500 font-arabic">
                  ركن المعلم وولي الأمر (خلف الكواليس)
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Gate verification if not yet unlocked */}
          {!isUnlocked ? (
            <form onSubmit={handleUnlock} className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-4">
              <span className="text-xs font-mono font-bold uppercase text-amber-900 block">
                Parental Verification Gate
              </span>
              <p className="text-sm font-kid text-slate-800">
                To prevent accidental clicks by Zahra, please solve:
              </p>
              <div className="text-base font-bold text-slate-900 font-mono bg-white p-3 rounded-xl border border-amber-200 text-center">
                What is 4 + 3 = ?
              </div>
              <input
                type="text"
                placeholder="Enter answer"
                value={pinAnswer}
                onChange={(e) => setPinAnswer(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-center font-bold font-mono text-base focus:ring-2 focus:ring-amber-400 outline-none"
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-rose-600 font-kid font-bold text-center">
                  Incorrect answer, please try again!
                </p>
              )}
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-kid font-bold text-sm transition"
              >
                Unlock Teacher Controls
              </button>
            </form>
          ) : (
            /* Unlocked Teacher & Syllabus Controls */
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-mono font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Parent & Teacher Access Active</span>
              </div>

              {/* Advanced Hubs */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400 uppercase block font-bold">
                  Curriculum & Textbook Browsers
                </span>

                {onOpenBookPagesGallery && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenBookPagesGallery();
                    }}
                    className="w-full p-3.5 rounded-2xl border-2 border-amber-300 bg-amber-50 hover:bg-amber-100 text-left transition flex items-center justify-between group shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📸</span>
                      <div>
                        <span className="text-sm font-bold font-kid text-amber-950 block">
                          Original Book Scans Gallery
                        </span>
                        <span className="text-xs text-amber-800 font-arabic">
                          أرشيف صور صفحات الكتب الأصلية (Google Drive)
                        </span>
                      </div>
                    </div>
                    <span className="text-amber-800 text-xs font-bold font-mono">View ➔</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    onClose();
                    onOpenBookExplorer();
                  }}
                  className="w-full p-3.5 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 text-left transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                    <div>
                      <span className="text-sm font-bold font-kid text-slate-900 block">
                        Cambridge Textbook Book Explorer
                      </span>
                      <span className="text-xs text-slate-500 font-arabic">
                        تصفح صفحات الكتاب الأصلية ص 14 – 38
                      </span>
                    </div>
                  </div>
                  <span className="text-indigo-600 text-xs font-bold font-mono">Open ➔</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenRoadmap();
                  }}
                  className="w-full p-3.5 rounded-2xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50 text-left transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <Layers className="w-5 h-5 text-amber-600" />
                    <div>
                      <span className="text-sm font-bold font-kid text-slate-900 block">
                        Full Weekly Syllabus Roadmap
                      </span>
                      <span className="text-xs text-slate-500 font-arabic">
                        الخطة الأسبوعية والمخرجات التعليمية الكاملة
                      </span>
                    </div>
                  </div>
                  <span className="text-amber-600 text-xs font-bold font-mono">Open ➔</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenAwards();
                  }}
                  className="w-full p-3.5 rounded-2xl border border-slate-200 hover:border-yellow-400 hover:bg-yellow-50 text-left transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🏆</span>
                    <div>
                      <span className="text-sm font-bold font-kid text-slate-900 block">
                        Student Awards & Badge Showcase
                      </span>
                      <span className="text-xs text-slate-500 font-arabic">
                        لوحة الأوسمة والشهادات التقديرية لزهرة
                      </span>
                    </div>
                  </div>
                  <span className="text-amber-600 text-xs font-bold font-mono">Open ➔</span>
                </button>
              </div>

              {/* Reset Session Option */}
              <div className="pt-4 border-t border-slate-200 space-y-2">
                <span className="text-xs font-mono text-slate-400 uppercase block font-bold">
                  Session Controls
                </span>
                <button
                  onClick={() => {
                    onResetTodaySchedule();
                    onClose();
                  }}
                  className="w-full p-3 rounded-2xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-900 text-xs font-kid font-bold transition flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Today's Schedule for Practice</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-slate-200 text-center">
          <p className="text-[11px] text-slate-400 font-mono">
            Cambridge Primary Curriculum (Stage 3) • Built for Zahra
          </p>
        </div>
      </div>
    </div>
  );
};
