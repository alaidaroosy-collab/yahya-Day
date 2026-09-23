import React from "react";
import { audioManager } from "../../utils/audioPlayer";
import { Sparkles, Trophy, Star, Heart, CheckCircle2, Home } from "lucide-react";

interface GoodbyeZahraModalProps {
  isOpen: boolean;
  onClose: () => void;
  starsEarned: number;
}

export const GoodbyeZahraModal: React.FC<GoodbyeZahraModalProps> = ({
  isOpen,
  onClose,
  starsEarned,
}) => {
  if (!isOpen) return null;

  const handleSpeakGoodbye = () => {
    audioManager.speak(
      "Super job Zahra! You finished all your lessons for today. Goodbye, see you tomorrow!",
      "en"
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl border-4 border-amber-300 max-w-lg w-full p-6 sm:p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
        {/* Whimsical Background circles */}
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-amber-200/50 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-emerald-200/50 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          {/* Trophy & Zahra's Star Badge */}
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 border-4 border-white shadow-xl flex items-center justify-center text-5xl animate-bounce">
            🎉
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono font-black uppercase text-amber-700 tracking-wider">
              Daily Mission Accomplished
            </span>
            <h2 className="text-3xl font-black text-slate-900 font-kid">
              Goodbye, Zahra! 🌟
            </h2>
            <p className="text-lg font-bold text-amber-900 font-arabic">
              مع السلامة يا زهرة! أحسنتِ صنعاً وأتممتِ دروس اليوم بكل تفوق!
            </p>
          </div>

          {/* Daily Achievement Stats */}
          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 grid grid-cols-2 gap-3 text-left">
            <div className="bg-white p-3 rounded-xl border border-amber-200">
              <span className="text-[11px] font-mono text-slate-500 uppercase block">
                Today's Lessons:
              </span>
              <span className="text-base font-black text-emerald-600 font-kid flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> 3 / 3 Completed
              </span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-amber-200">
              <span className="text-[11px] font-mono text-slate-500 uppercase block">
                Stars Collected:
              </span>
              <span className="text-base font-black text-amber-600 font-kid flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" /> +{starsEarned || 75} Stars
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-600 font-kid leading-relaxed">
            "You were an incredible scientist, mathematician, and story reader today. Get plenty of rest and we'll see you tomorrow for new wonders!"
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleSpeakGoodbye}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-kid font-bold text-sm transition"
            >
              Hear Goodbye Message 🔊
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-kid font-black text-base shadow-lg transition flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home (الرئيسية)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
