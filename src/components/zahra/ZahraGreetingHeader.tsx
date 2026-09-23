import React from "react";
import { audioManager } from "../../utils/audioPlayer";
import { StudentProfile } from "../../utils/rewardsManager";
import {
  Sun,
  Moon,
  Volume2,
  Sparkles,
  Award,
  Flame,
  ShieldCheck
} from "lucide-react";

interface ZahraGreetingHeaderProps {
  profile: StudentProfile;
  onOpenParentMode: () => void;
}

export const ZahraGreetingHeader: React.FC<ZahraGreetingHeaderProps> = ({
  profile,
  onOpenParentMode,
}) => {
  // Determine if morning or afternoon
  const currentHour = new Date().getHours();
  const isMorning = currentHour >= 4 && currentHour < 12;
  const isAfternoon = currentHour >= 12 && currentHour < 18;

  const greetingTitleEn = isMorning
    ? "Good Morning, Zahra! ☀️"
    : isAfternoon
    ? "Good Afternoon, Zahra! 🌤️"
    : "Good Evening, Zahra! 🌙";

  const greetingSubAr = isMorning
    ? "صباح الخير والنشاط يا زهرة، يوم دراسي مشرق وممتع بانتظارك!"
    : isAfternoon
    ? "مساء الخير والهمّة يا زهرة، مستعدة لإكمال مغامرات اليوم؟"
    : "مساء النور يا زهرة، وقت هادئ وممتع للاستكشاف!";

  const handleSpeakGreeting = () => {
    const speechText = `${greetingTitleEn} Are you ready for today's learning adventure?`;
    audioManager.speak(speechText, "en");
  };

  return (
    <div className="w-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200 rounded-3xl p-5 sm:p-7 shadow-lg border-4 border-amber-300 relative overflow-hidden">
      {/* Decorative whimsical circles */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/20 rounded-full blur-xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5">
        {/* Left: Avatar + Warm Greeting */}
        <div className="flex items-center gap-4 sm:gap-6 text-center md:text-left flex-col md:flex-row">
          {/* Zahra Avatar with Gold Glow */}
          <div className="relative group cursor-pointer" onClick={handleSpeakGreeting}>
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white shadow-xl bg-amber-100 ring-4 ring-amber-300/80 transform transition group-hover:scale-105">
              <img
                src={profile.photoUrl || "/src/assets/images/zahra_avatar_1790017518372.jpg"}
                alt="Zahra"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>
            {/* Playful Floating Badge */}
            <div className="absolute -bottom-1 -right-1 bg-white text-amber-900 rounded-full p-1.5 shadow-md border-2 border-amber-200 text-xs">
              ⭐
            </div>
          </div>

          {/* Greeting Text */}
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-amber-950 font-kid tracking-tight">
                {greetingTitleEn}
              </h1>
              <button
                onClick={handleSpeakGreeting}
                className="p-1.5 rounded-full bg-white/80 hover:bg-white text-amber-900 shadow-xs transition active:scale-95"
                title="Hear Greeting"
              >
                <Volume2 className="w-5 h-5 text-amber-700" />
              </button>
            </div>
            <p className="text-sm sm:text-base font-bold text-amber-900 font-arabic">
              {greetingSubAr}
            </p>
          </div>
        </div>

        {/* Right: Friendly Kid Stats & Discrete Parent Mode Toggle */}
        <div className="flex flex-col items-center md:items-end gap-2.5">
          {/* Stars & Streak Pills */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-white/90 border-2 border-amber-300 shadow-xs text-amber-950 font-kid font-black text-sm">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>{profile.totalXp} Stars ⭐</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-white/90 border-2 border-amber-300 shadow-xs text-amber-950 font-kid font-black text-sm">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-400" />
              <span>{profile.streakDays || 3} Days Streak 🔥</span>
            </div>
          </div>

          {/* Discrete Parent/Teacher Button (Keeps Zahra's UI completely free of tech complexity) */}
          <button
            onClick={onOpenParentMode}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-950/10 hover:bg-amber-950/20 text-amber-950 text-xs font-mono font-medium transition"
            title="Parent & Teacher Settings"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-800" />
            <span>Parent / Teacher Mode</span>
          </button>
        </div>
      </div>
    </div>
  );
};
