import React, { useState, useEffect } from "react";
import { curriculumUnits } from "./data/curriculumData";
import { Unit, Lesson } from "./types/curriculum";
import { audioManager } from "./utils/audioPlayer";
import { rewardsManager, StudentProfile } from "./utils/rewardsManager";
import { Badge } from "./data/badgesData";

// Zahra Specialized Experiential Components
import { todaySubjectsData, TodaySubject } from "./data/todayScheduleData";
import { ZahraGreetingHeader } from "./components/zahra/ZahraGreetingHeader";
import { TodayScheduleSection } from "./components/zahra/TodayScheduleSection";
import { WeeklyScheduleHorizontal } from "./components/zahra/WeeklyScheduleHorizontal";
import { ZahraLessonViewer } from "./components/zahra/ZahraLessonViewer";
import { GoodbyeZahraModal } from "./components/zahra/GoodbyeZahraModal";
import { ParentTeacherDrawer } from "./components/zahra/ParentTeacherDrawer";
import { BookPagesGalleryModal } from "./components/zahra/BookPagesGalleryModal";

// Parent & Teacher Backstage Components
import { BookPagesExplorer } from "./components/BookPagesExplorer";
import { WeeklyRoadmapWidget } from "./components/WeeklyRoadmapWidget";
import { AwardsModal } from "./components/AwardsModal";
import { BadgeUnlockedToast } from "./components/BadgeUnlockedToast";
import { AITutorWidget } from "./components/AITutorWidget";

import {
  Volume2,
  VolumeX,
  Sparkles,
  Bot,
  Home,
  ShieldCheck,
  Award,
  ChevronLeft
} from "lucide-react";

type AppViewMode = "home" | "lesson" | "parent_book_explorer" | "parent_roadmap";

export default function App() {
  const [appView, setAppView] = useState<AppViewMode>("home");
  const [subjects, setSubjects] = useState<TodaySubject[]>(todaySubjectsData);
  const [activeSubjectIndex, setActiveSubjectIndex] = useState<number>(0);

  // Modals & Drawers
  const [isGoodbyeModalOpen, setIsGoodbyeModalOpen] = useState<boolean>(false);
  const [isParentDrawerOpen, setIsParentDrawerOpen] = useState<boolean>(false);
  const [isBookGalleryOpen, setIsBookGalleryOpen] = useState<boolean>(false);
  const [isAwardsOpen, setIsAwardsOpen] = useState<boolean>(false);
  const [isTutorOpen, setIsTutorOpen] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Digital Rewards & Profile State
  const [profile, setProfile] = useState<StudentProfile>(rewardsManager.getProfile());
  const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState<Badge | null>(null);

  useEffect(() => {
    const unsub = rewardsManager.subscribe((newProfile, badge) => {
      setProfile({ ...newProfile });
      if (badge) {
        setNewlyUnlockedBadge(badge);
      }
    });
    return unsub;
  }, []);

  const levelInfo = rewardsManager.getLevelInfo();

  // Handlers for Lesson Flow:
  // Home → Today's Schedule → Start → Lesson → Interactive Activity → Next → Next Subject → Finish → Goodbye Zahra

  const handleStartLearning = () => {
    // Find the first uncompleted subject or start with first
    const uncompletedIdx = subjects.findIndex((s) => !s.isCompleted);
    const targetIdx = uncompletedIdx !== -1 ? uncompletedIdx : 0;
    setActiveSubjectIndex(targetIdx);
    setAppView("lesson");
    audioManager.stop();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectSubject = (index: number) => {
    setActiveSubjectIndex(index);
    setAppView("lesson");
    audioManager.stop();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubjectCompleted = () => {
    const nextSubjects = [...subjects];
    nextSubjects[activeSubjectIndex].isCompleted = true;
    setSubjects(nextSubjects);

    // If all subjects are completed
    const allDone = nextSubjects.every((s) => s.isCompleted);
    if (allDone) {
      setTimeout(() => {
        setIsGoodbyeModalOpen(true);
      }, 1200);
    }
  };

  const handleGoToNextSubject = () => {
    audioManager.stop();
    if (activeSubjectIndex + 1 < subjects.length) {
      setActiveSubjectIndex(activeSubjectIndex + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Finished all subjects!
      setIsGoodbyeModalOpen(true);
    }
  };

  const handleResetTodaySchedule = () => {
    const resetSubjects = subjects.map((s) => ({ ...s, isCompleted: false }));
    setSubjects(resetSubjects);
    setActiveSubjectIndex(0);
    setAppView("home");
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans selection:bg-amber-200">
      {/* Top Child-Friendly Cambridge Crest Header */}
      <header className="bg-[#002D62] text-white border-b-2 border-[#001D40] sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between flex-wrap gap-3">
          {/* Logo & Stage Identity */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              setAppView("home");
              audioManager.stop();
            }}
          >
            <div className="w-11 h-11 rounded-2xl bg-[#00A3E0] text-white flex flex-col items-center justify-center shadow-md font-mono font-black border-2 border-sky-300 transform group-hover:scale-105 transition">
              <span className="text-[9px] uppercase tracking-wider opacity-90">Stage</span>
              <span className="text-lg leading-none">3</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#00A3E0] text-white text-[11px] font-black font-cambridge shadow-xs">
                  Cambridge Primary
                </span>
                <span className="text-xs text-amber-300 font-arabic font-bold">
                  منصة التعلّم الذكية لزهرة
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-black text-white leading-tight font-cambridge tracking-wide mt-0.5">
                Zahra's Daily Learning Hub
              </h1>
            </div>
          </div>

          {/* Right: Quick Stars, Audio Mute, and Parent Mode */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Stars pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs sm:text-sm font-kid font-black">
              <Sparkles className="w-4 h-4 text-amber-400 fill-amber-300" />
              <span>{profile.totalXp} Stars ⭐</span>
            </div>

            {/* Book Pages Archive Trigger */}
            <button
              onClick={() => setIsBookGalleryOpen(true)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-2xl bg-amber-400/30 hover:bg-amber-400/50 border border-amber-300/60 text-amber-100 text-xs font-kid font-black transition flex items-center gap-1.5 shadow-2xs"
              title="Open Cambridge Textbook Scans"
            >
              <span className="text-sm">📖</span>
              <span className="hidden sm:inline">Book Photos (صور الكتب)</span>
            </button>

            {/* Awards Modal Trigger */}
            <button
              onClick={() => setIsAwardsOpen(true)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-kid font-bold transition flex items-center gap-1.5"
              title="Open Awards & Badges"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Awards</span>
            </button>

            {/* Ask AI Tutor */}
            <button
              onClick={() => setIsTutorOpen(true)}
              className="p-2 sm:px-3.5 sm:py-1.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-kid font-black transition flex items-center gap-1.5 shadow-xs"
            >
              <Bot className="w-4 h-4 text-amber-100" />
              <span className="hidden md:inline">Ask Tutor</span>
            </button>

            {/* Audio Stop */}
            <button
              onClick={() => {
                audioManager.stop();
                setIsSpeaking(false);
              }}
              className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition border border-white/20"
              title="Stop Audio"
            >
              {isSpeaking ? (
                <VolumeX className="w-4 h-4 text-rose-400 animate-pulse" />
              ) : (
                <Volume2 className="w-4 h-4 text-sky-300" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* ======================================================== */}
        {/* 1. HOME VIEW: THE REQUESTED ZAHRA HOMEPAGE ORDER */}
        {/* ======================================================== */}
        {appView === "home" && (
          <div className="space-y-6 animate-fade-in">
            {/* 1. Good Morning / Good Afternoon, Zahra */}
            <ZahraGreetingHeader
              profile={profile}
              onOpenParentMode={() => setIsParentDrawerOpen(true)}
            />

            {/* 2. Today's Schedule & 3. مواد اليوم بالترتيب & 4. Start Today's Learning */}
            <TodayScheduleSection
              subjects={subjects}
              activeSubjectIndex={activeSubjectIndex}
              onSelectSubject={handleSelectSubject}
              onStartLearning={handleStartLearning}
              onOpenBookPagesGallery={() => setIsBookGalleryOpen(true)}
            />

            {/* 5. Weekly Schedule (Horizontal layout with Week 1..5 tabs & upload) */}
            <WeeklyScheduleHorizontal
              onSelectTodaySubject={(subjectKey) => {
                const sIdx = subjects.findIndex((s) => s.id === subjectKey);
                if (sIdx !== -1) {
                  handleSelectSubject(sIdx);
                }
              }}
            />
          </div>
        )}

        {/* ======================================================== */}
        {/* 2. LESSON VIEW: THE INTEGRATED LEARNING EXPERIENCE */}
        {/* ======================================================== */}
        {appView === "lesson" && (
          <div className="animate-fade-in">
            <ZahraLessonViewer
              subject={subjects[activeSubjectIndex]}
              onBackToHome={() => {
                setAppView("home");
                audioManager.stop();
              }}
              onSubjectCompleted={handleSubjectCompleted}
              onGoToNextSubject={handleGoToNextSubject}
              hasNextSubject={activeSubjectIndex + 1 < subjects.length}
            />
          </div>
        )}

        {/* ======================================================== */}
        {/* 3. PARENT / TEACHER BOOK EXPLORER (Backstage) */}
        {/* ======================================================== */}
        {appView === "parent_book_explorer" && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border-2 border-slate-200">
              <button
                onClick={() => setAppView("home")}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-kid font-bold flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Return to Zahra Home</span>
              </button>
              <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                Cambridge Learner's Book 3 (Pages 14 – 39)
              </span>
            </div>
            <BookPagesExplorer initialPage={14} />
          </div>
        )}

        {/* ======================================================== */}
        {/* 4. PARENT / TEACHER WEEKLY ROADMAP (Backstage) */}
        {/* ======================================================== */}
        {appView === "parent_roadmap" && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border-2 border-slate-200">
              <button
                onClick={() => setAppView("home")}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-kid font-bold flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Return to Zahra Home</span>
              </button>
              <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                Full Curriculum Roadmap (Weeks 1 – 4)
              </span>
            </div>
            <WeeklyRoadmapWidget
              profile={profile}
              onJumpToBookPage={() => setAppView("parent_book_explorer")}
              onJumpToLesson={() => {}}
              onSwitchView={() => {}}
              onOpenAwardsModal={() => setIsAwardsOpen(true)}
            />
          </div>
        )}
      </main>

      {/* ======================================================== */}
      {/* MODALS & OVERLAYS */}
      {/* ======================================================== */}

      {/* Day Finish Celebration: Goodbye Zahra Modal */}
      <GoodbyeZahraModal
        isOpen={isGoodbyeModalOpen}
        onClose={() => {
          setIsGoodbyeModalOpen(false);
          setAppView("home");
        }}
        starsEarned={75}
      />

      {/* Parent / Teacher Mode Drawer */}
      <ParentTeacherDrawer
        isOpen={isParentDrawerOpen}
        onClose={() => setIsParentDrawerOpen(false)}
        onOpenBookExplorer={() => setAppView("parent_book_explorer")}
        onOpenRoadmap={() => setAppView("parent_roadmap")}
        onOpenAwards={() => setIsAwardsOpen(true)}
        onOpenBookPagesGallery={() => setIsBookGalleryOpen(true)}
        onResetTodaySchedule={handleResetTodaySchedule}
      />

      {/* Book Pages Archive Gallery Modal */}
      <BookPagesGalleryModal
        isOpen={isBookGalleryOpen}
        onClose={() => setIsBookGalleryOpen(false)}
      />

      {/* Awards Showcase Modal */}
      <AwardsModal
        isOpen={isAwardsOpen}
        onClose={() => setIsAwardsOpen(false)}
        profile={profile}
      />

      {/* Badge Unlocked Celebration Toast */}
      {newlyUnlockedBadge && (
        <BadgeUnlockedToast
          badge={newlyUnlockedBadge}
          onViewAwards={() => setIsAwardsOpen(true)}
          onClose={() => setNewlyUnlockedBadge(null)}
        />
      )}

      {/* Cambridge AI Tutor Widget */}
      <AITutorWidget
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
        currentLessonTitle={subjects[activeSubjectIndex]?.todayTopicEn || "Light and Dark"}
      />
    </div>
  );
}
