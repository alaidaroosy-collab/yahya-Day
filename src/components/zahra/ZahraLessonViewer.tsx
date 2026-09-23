import React, { useState, useRef, useEffect } from "react";
import { TodaySubject } from "../../data/todayScheduleData";
import { audioManager } from "../../utils/audioPlayer";
import { rewardsManager } from "../../utils/rewardsManager";
import confetti from "canvas-confetti";
import {
  BookOpen,
  Volume2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Home,
  Star,
  Maximize2,
  Eye,
  EyeOff,
  Check,
  HelpCircle,
  X,
  Layers,
  ZoomIn,
  ZoomOut,
  Target,
  Pencil,
  VolumeX,
  Play,
  RotateCcw,
  Minimize2,
  ChevronDown,
  ChevronUp,
  Columns,
  Pin
} from "lucide-react";

// Integrated Interactive Activities matching exact page content!
import { LightSourcesExplorer } from "../activities/LightSourcesExplorer";
import { MathPlaceValueExplorer } from "../activities/MathPlaceValueExplorer";
import { LearningSnake } from "../activities/LearningSnake";
import { LessonSpellingReview } from "./LessonSpellingReview";

interface ZahraLessonViewerProps {
  subject: TodaySubject;
  onBackToHome: () => void;
  onSubjectCompleted: () => void;
  onGoToNextSubject: () => void;
  hasNextSubject: boolean;
}

export type LessonStepId =
  | "page"
  | "listen"
  | "understand"
  | "question"
  | "activity"
  | "spelling"
  | "homework";

interface PageHotspot {
  id: string;
  top: string;
  left: string;
  titleEn: string;
  titleAr: string;
  chunkIdx: number;
}

export const ZahraLessonViewer: React.FC<ZahraLessonViewerProps> = ({
  subject,
  onBackToHome,
  onSubjectCompleted,
  onGoToNextSubject,
  hasNextSubject,
}) => {
  const [currentStep, setCurrentStep] = useState<LessonStepId>("page");
  const [activeVocabIndex, setActiveVocabIndex] = useState<number>(0);
  const [vocabPracticeSelected, setVocabPracticeSelected] = useState<number | null>(null);
  const [isVocabPracticeCorrect, setIsVocabPracticeCorrect] = useState<boolean | null>(null);

  // Audio Chunk Tracking
  const [activePlayingChunkIdx, setActivePlayingChunkIdx] = useState<number | null>(null);

  // Question state
  const [selectedQuestionOption, setSelectedQuestionOption] = useState<number | null>(null);
  const [isQuestionSubmitted, setIsQuestionSubmitted] = useState<boolean>(false);
  const [isQuestionCorrect, setIsQuestionCorrect] = useState<boolean>(false);

  // Backdrop Page Controls
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isPageZoomOpen, setIsPageZoomOpen] = useState<boolean>(false);

  // Layering Controls to NEVER cover essential content:
  // 1) isPeekMode: makes overlay 95% transparent so Zahra can see the full book page instantly!
  // 2) isOverlayMinimized: collapses overlay to a sleek bottom bar
  // 3) layoutMode: "backdrop_overlay" (layered on top) or "split_side" (side-by-side for wide screens)
  const [isPeekMode, setIsPeekMode] = useState<boolean>(false);
  const [isOverlayMinimized, setIsOverlayMinimized] = useState<boolean>(false);
  const [layoutMode, setLayoutMode] = useState<"backdrop_overlay" | "split_side">("backdrop_overlay");
  const [overlayOpacity, setOverlayOpacity] = useState<"solid" | "translucent">("solid");

  const backdropContainerRef = useRef<HTMLDivElement>(null);

  // Subject-specific hotspot pins placed directly on the scanned textbook page
  const pageHotspots: Record<string, PageHotspot[]> = {
    science: [
      { id: "h1", top: "18%", left: "26%", titleEn: "Bedroom A: Sun & Lamp", titleAr: "الغرفة أ: الشمس والمصباح", chunkIdx: 0 },
      { id: "h2", top: "18%", left: "74%", titleEn: "Bedroom B: Closed Curtains", titleAr: "الغرفة ب: ستائر وظلام", chunkIdx: 1 },
      { id: "h3", top: "48%", left: "50%", titleEn: "Light Sources Definition", titleAr: "تعريف مصادر الضوء", chunkIdx: 2 },
      { id: "h4", top: "75%", left: "50%", titleEn: "Darkness & Mirrors Reflection", titleAr: "الظلام وانعكاس المرايا", chunkIdx: 3 },
    ],
    math: [
      { id: "h1", top: "16%", left: "28%", titleEn: "Thousands Cube (1,000)", titleAr: "مكعب الألف", chunkIdx: 0 },
      { id: "h2", top: "16%", left: "72%", titleEn: "Hundreds & Tens Blocks", titleAr: "مسطحات المئات والعشرات", chunkIdx: 1 },
      { id: "h3", top: "46%", left: "50%", titleEn: "Place Value Table", titleAr: "جدول القيمة المكانية", chunkIdx: 2 },
      { id: "h4", top: "76%", left: "50%", titleEn: "Expanded Form (3,426)", titleAr: "الصيغة التحليلية للعدد", chunkIdx: 3 },
    ],
    english: [
      { id: "h1", top: "15%", left: "50%", titleEn: "The House that was Sad", titleAr: "عنوان القصة: البيت الحزين", chunkIdx: 0 },
      { id: "h2", top: "34%", left: "72%", titleEn: "The Abandoned House", titleAr: "صورة البيت المهجور", chunkIdx: 1 },
      { id: "h3", top: "54%", left: "34%", titleEn: "Dolores Li at the Gate", titleAr: "دولوريس لي عند البوابة", chunkIdx: 2 },
      { id: "h4", top: "78%", left: "50%", titleEn: "Describing Feelings & Ending", titleAr: "الصفات والمشاعر في القصة", chunkIdx: 3 },
    ],
  };

  const currentHotspots = pageHotspots[subject.id] || pageHotspots.science;

  const activeVocab = subject.vocabulary[activeVocabIndex] || subject.vocabulary[0];

  // Stop any audio when unmounting or switching steps
  useEffect(() => {
    return () => {
      audioManager.stop();
    };
  }, []);

  // RULE 8 & 9: Strict Stop Before Play
  const handlePlayChunk = (chunkTextEn: string, chunkTextAr: string, chunkIdx: number) => {
    if (activePlayingChunkIdx === chunkIdx) {
      audioManager.stop();
      setActivePlayingChunkIdx(null);
      return;
    }

    audioManager.stop(); // Stop any currently playing speech immediately!
    setActivePlayingChunkIdx(chunkIdx);

    const cleanEn = chunkTextEn.replace(/^Chunk \d+:\s*/i, "");
    audioManager.speak(cleanEn, "en", false, chunkTextAr);

    const approxDuration = Math.max(3000, cleanEn.split(" ").length * 450);
    setTimeout(() => {
      setActivePlayingChunkIdx((cur) => (cur === chunkIdx ? null : cur));
    }, approxDuration);
  };

  const handleStopAudio = () => {
    audioManager.stop();
    setActivePlayingChunkIdx(null);
  };

  const handleSpeakText = (text: string) => {
    audioManager.stop();
    audioManager.speak(text, "en");
  };

  const handleVocabOptionSelect = (optionIdx: number) => {
    setVocabPracticeSelected(optionIdx);
    const correct = optionIdx === activeVocab.correctPracticeIndex;
    setIsVocabPracticeCorrect(correct);

    if (correct) {
      audioManager.playSuccessChime();
      audioManager.speak("Super! Well done Zahra!", "en");
      rewardsManager.addXP(10);
      confetti({ particleCount: 25, spread: 50, origin: { y: 0.6 } });
    } else {
      audioManager.playGentleIncorrect();
      audioManager.speak("Try again! Look closely at the hint.", "en");
    }
  };

  const handleNextVocab = () => {
    setVocabPracticeSelected(null);
    setIsVocabPracticeCorrect(null);
    if (activeVocabIndex + 1 < subject.vocabulary.length) {
      setActiveVocabIndex(activeVocabIndex + 1);
    } else {
      setActiveVocabIndex(0);
    }
  };

  const handleQuestionOptionSelect = (idx: number) => {
    if (isQuestionSubmitted && isQuestionCorrect) return;
    setSelectedQuestionOption(idx);
    setIsQuestionSubmitted(true);

    const isCorrect = idx === subject.question.correctIndex;
    setIsQuestionCorrect(isCorrect);

    if (isCorrect) {
      audioManager.playSuccessChime();
      audioManager.speak("Brilliant answer, Zahra! You mastered this Cambridge lesson!", "en");
      rewardsManager.addXP(25);
      onSubjectCompleted();

      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
      });
    } else {
      audioManager.playGentleIncorrect();
      audioManager.speak("Think carefully! Read the little hint below.", "en");
    }
  };

  // Render the exact interactive activity matching the book page
  const renderActiveActivity = () => {
    if (subject.id === "science") {
      return <LightSourcesExplorer onComplete={() => rewardsManager.addXP(20)} />;
    }
    if (subject.id === "math") {
      return <MathPlaceValueExplorer onComplete={() => rewardsManager.addXP(20)} />;
    }

    const englishQuestions = [
      {
        id: "eng-q1",
        questionEn: "At the far end of the village stood an old, ________ house.",
        questionAr: "عند الطرف البعيد من القرية، كان يقف بيت قديم و...",
        options: [
          { id: "o1", textEn: "abandoned (مهجور وحزين)", textAr: "مهجور" },
          { id: "o2", textEn: "flying (يطير)", textAr: "يطير" },
          { id: "o3", textEn: "banana (موزة)", textAr: "موزة" },
        ],
        correctOptionId: "o1",
        explanationEn: "The story tells us the old house was abandoned and sad.",
        explanationAr: "تخبرنا القصة أن البيت كان قديماً ومهجوراً وبدا حزيناً.",
        pageRef: "p. 22",
      },
      {
        id: "eng-q2",
        questionEn: "The house had ________ glass in all its windows.",
        questionAr: "كان البيت يمتلك زجاجاً... في جميع نوافذه.",
        options: [
          { id: "o1", textEn: "broken (مكسور)", textAr: "مكسور" },
          { id: "o2", textEn: "chocolate (شوكولاتة)", textAr: "شوكولاتة" },
          { id: "o3", textEn: "clean (نظيف)", textAr: "نظيف" },
        ],
        correctOptionId: "o1",
        explanationEn: "'Broken' is the adjective describing the damaged window glass.",
        explanationAr: "كلمة broken صفة تصف الزجاج المتكسر في النوافذ.",
        pageRef: "p. 22",
      },
      {
        id: "eng-q3",
        questionEn: "Dolores Li gently pushed open the ________ wooden gate.",
        questionAr: "دفعت دولوريس لي برفق البوابة الخشبية الـ...",
        options: [
          { id: "o1", textEn: "creaky (تُصدر صريراً)", textAr: "تُصدر صريراً" },
          { id: "o2", textEn: "silent (صامتة)", textAr: "صامتة" },
          { id: "o3", textEn: "soft (ناعمة)", textAr: "ناعمة" },
        ],
        correctOptionId: "o1",
        explanationEn: "'Creaky' describes the squeaky noise of the old wooden gate.",
        explanationAr: "صفة creaky تصف صوت الصرير الصادر من البوابة الخشبية القديمة.",
        pageRef: "p. 22",
      },
    ];

    return (
      <LearningSnake
        questions={englishQuestions}
        lessonTitle={subject.todayTopicEn}
        onComplete={() => rewardsManager.addXP(20)}
      />
    );
  };

  const stepsList: Array<{ id: LessonStepId; titleEn: string; titleAr: string; icon: string }> = [
    { id: "page", titleEn: "1. Book Page", titleAr: "صفحة الكتاب", icon: "📖" },
    { id: "listen", titleEn: "2. Listen", titleAr: "الاستماع المجزأ", icon: "🎧" },
    { id: "understand", titleEn: "3. Understand", titleAr: "الشرح والمفاهيم", icon: "💡" },
    { id: "question", titleEn: "4. Practice Question", titleAr: "سؤال الدرس", icon: "✍️" },
    { id: "activity", titleEn: "5. Interactive Lab", titleAr: "النشاط التفاعلي", icon: "🔬" },
    { id: "spelling", titleEn: "6. Spelling Review", titleAr: "كتابة الكلمات", icon: "✏️" },
    { id: "homework", titleEn: "7. Homework", titleAr: "التطبيق المنزلي", icon: "🏠" },
  ];

  return (
    <div className="space-y-4 animate-fade-in max-w-7xl mx-auto">
      {/* ======================================================== */}
      {/* 1. TOP HEADER & WORKSPACE TOOLBAR                        */}
      {/* ======================================================== */}
      <div className="bg-white rounded-3xl border-3 border-slate-200 shadow-md p-4 sm:p-5 space-y-3.5">
        {/* Row 1: Back, Title & Quick View Presets */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="p-2 sm:p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1.5 font-kid text-xs sm:text-sm font-bold active:scale-95"
            >
              <Home className="w-4 h-4 text-slate-600" />
              <span>Today's Home</span>
            </button>

            <div className="h-6 w-px bg-slate-200 hidden sm:block" />

            <div>
              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-mono font-black"
                  style={{
                    backgroundColor: `${subject.colorScheme.primary}15`,
                    color: subject.colorScheme.primary,
                  }}
                >
                  {subject.nameEn} • {subject.bookCode}
                </span>
                <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                  📄 Page {subject.bookPageNumber}
                </span>
              </div>
              <h2
                className="text-xl sm:text-2xl font-black font-kid leading-tight mt-0.5"
                style={{ color: subject.colorScheme.primary }}
              >
                {subject.todayTopicEn}
              </h2>
            </div>
          </div>

          {/* Right Action Tools: Peek Page, Zoom, View Modes */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* ESSENTIAL: Peek Page Button (Instantly makes overlay ghosted so Zahra sees 100% of book page!) */}
            <button
              onClick={() => setIsPeekMode(!isPeekMode)}
              className={`px-3 py-2 rounded-2xl font-kid text-xs font-black transition flex items-center gap-1.5 shadow-xs border-2 ${
                isPeekMode
                  ? "bg-amber-400 text-amber-950 border-amber-500 ring-2 ring-amber-300 animate-pulse"
                  : "bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300"
              }`}
              title="Click to peek full textbook page underneath with zero obstruction"
            >
              {isPeekMode ? (
                <>
                  <EyeOff className="w-4 h-4 text-amber-950" />
                  <span>Exit Peek (العودة للنشاط)</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 text-amber-700" />
                  <span>Peek Page (معاينة صفحة الكتاب)</span>
                </>
              )}
            </button>

            {/* Layout Toggle: Backdrop Overlay vs Side-by-side */}
            <button
              onClick={() =>
                setLayoutMode(layoutMode === "backdrop_overlay" ? "split_side" : "backdrop_overlay")
              }
              className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition hidden sm:flex items-center gap-1 text-xs font-kid font-bold"
              title="Toggle Layout (Overlay vs Side-by-Side)"
            >
              {layoutMode === "backdrop_overlay" ? (
                <>
                  <Columns className="w-4 h-4 text-indigo-600" />
                  <span>Side-by-Side</span>
                </>
              ) : (
                <>
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span>Backdrop Overlay</span>
                </>
              )}
            </button>

            {/* Audio Controls */}
            <button
              onClick={() => handleSpeakText(`${subject.nameEn}. ${subject.todayTopicEn}`)}
              className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              title="Pronounce lesson title"
            >
              <Volume2 className="w-4 h-4 text-amber-600" />
            </button>
            <button
              onClick={handleStopAudio}
              className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              title="Stop audio"
            >
              <VolumeX className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stepper Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {stepsList.map((step) => {
            const isActive = currentStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => {
                  setCurrentStep(step.id);
                  setIsOverlayMinimized(false);
                  setIsPeekMode(false);
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-kid font-black transition-all flex items-center gap-1.5 shrink-0 border-2 ${
                  isActive
                    ? "bg-slate-900 text-white border-slate-900 shadow-md ring-3 ring-amber-400 scale-102"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100"
                }`}
              >
                <span>{step.icon}</span>
                <span>{step.titleEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. MAIN WORKSPACE: BOOK PAGE BACKDROP + LAYERED OVERLAY  */}
      {/* ======================================================== */}
      <div
        className={`relative min-h-[720px] rounded-3xl overflow-hidden border-3 border-amber-300 shadow-xl bg-slate-900 ${
          layoutMode === "split_side" ? "grid grid-cols-1 lg:grid-cols-12 gap-4 p-4" : ""
        }`}
      >
        {/* ---------------------------------------------------- */}
        {/* A. THE PRIMARY BACKDROP: HIGH-RES TEXTBOOK SCAN      */}
        {/* ---------------------------------------------------- */}
        <div
          ref={backdropContainerRef}
          className={`relative bg-[#f6f4ee] flex items-center justify-center overflow-auto select-none transition-all duration-300 ${
            layoutMode === "split_side"
              ? "lg:col-span-6 rounded-2xl min-h-[680px] border-2 border-slate-300 shadow-md"
              : "w-full min-h-[720px] max-h-[88vh]"
          }`}
        >
          {/* Paper Texture & Book Header Ribbon */}
          <div className="absolute top-3 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2 bg-slate-950/75 backdrop-blur-md text-white px-3 py-1.5 rounded-2xl text-xs font-mono font-bold shadow-md">
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>{subject.bookTitleEn}</span>
            </div>

            {/* Backdrop Zoom Widget (Directly on the canvas) */}
            <div className="pointer-events-auto flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-2xl border border-slate-300 shadow-md">
              <button
                onClick={() => setZoomLevel((z) => Math.min(2, z + 0.2))}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-700"
                title="Zoom in"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-700"
                title="Zoom out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="px-2 py-1 rounded-xl text-[10px] font-mono font-bold hover:bg-slate-100 text-slate-600"
                title="Reset zoom"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                onClick={() => setIsPageZoomOpen(true)}
                className="p-1.5 rounded-xl hover:bg-amber-100 text-amber-900 border border-amber-200"
                title="Full Screen View"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scanned Book Page Image with Smooth Zoom */}
          <div
            className="w-full h-full flex items-center justify-center p-4 transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {subject.bookPageImageUrl ? (
              <div className="relative max-w-full max-h-[82vh] shadow-2xl rounded-xl overflow-hidden bg-white border border-slate-300">
                <img
                  src={subject.bookPageImageUrl}
                  alt={`${subject.nameEn} Page ${subject.bookPageNumber}`}
                  className="max-h-[80vh] w-auto object-contain block"
                />

                {/* Hotspot Pins Overlay on top of the Scanned Page */}
                {currentHotspots.map((hotspot) => {
                  const isPlayingThis = activePlayingChunkIdx === hotspot.chunkIdx;
                  return (
                    <div
                      key={hotspot.id}
                      style={{ top: hotspot.top, left: hotspot.left }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                    >
                      <button
                        onClick={() => {
                          const chunkEn = subject.textbookFullTextEn[hotspot.chunkIdx] || "";
                          const chunkAr = subject.textbookFullTextAr[hotspot.chunkIdx] || "";
                          handlePlayChunk(chunkEn, chunkAr, hotspot.chunkIdx);
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform transform group-hover:scale-125 border-2 ${
                          isPlayingThis
                            ? "bg-amber-400 text-amber-950 border-white ring-4 ring-amber-300 animate-bounce"
                            : "bg-slate-900/90 hover:bg-amber-500 text-white border-white/80"
                        }`}
                        title={hotspot.titleEn}
                      >
                        {isPlayingThis ? (
                          <Volume2 className="w-4 h-4" />
                        ) : (
                          <Pin className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center bg-slate-950/90 backdrop-blur-md text-white text-[11px] font-kid font-bold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xl pointer-events-none z-30 border border-slate-700">
                        <span>{hotspot.titleEn}</span>
                        <span className="text-[10px] text-amber-300 font-arabic">
                          {hotspot.titleAr}
                        </span>
                        <div className="w-2 h-2 bg-slate-950 rotate-45 -mb-1 mt-0.5" />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400">
                <BookOpen className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                <span>Textbook scan loading...</span>
              </div>
            )}
          </div>

          {/* Bottom Page Reference Bar */}
          <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
            <span className="bg-slate-950/75 backdrop-blur-md text-amber-300 px-3 py-1 rounded-xl text-xs font-mono font-bold shadow-md">
              Cambridge Stage 3 • Page {subject.bookPageNumber}
            </span>

            {/* Quick Peek Hint */}
            <span className="bg-amber-400/90 text-amber-950 px-3 py-1 rounded-xl text-xs font-kid font-black shadow-md hidden sm:inline-block">
              Original Textbook Foundation (صفحة كتاب المدرسة الأصلية)
            </span>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* B. THE LAYERED INTERACTIVE DECK                      */}
        {/* ---------------------------------------------------- */}
        <div
          className={`transition-all duration-300 z-30 ${
            layoutMode === "split_side"
              ? "lg:col-span-6 flex flex-col justify-start"
              : isOverlayMinimized
              ? "absolute bottom-3 left-3 right-3"
              : isPeekMode
              ? "absolute inset-4 pointer-events-none opacity-5 transition-opacity duration-200"
              : "absolute bottom-3 left-3 right-3 sm:left-6 sm:right-6 max-h-[78%] overflow-hidden flex flex-col"
          }`}
        >
          {/* Floating Glassmorphic Container Layered Over the Page */}
          <div
            className={`rounded-3xl border-3 shadow-2xl transition-all flex flex-col ${
              isOverlayMinimized
                ? "bg-slate-900/95 text-white border-amber-400 p-2.5"
                : "bg-white/96 backdrop-blur-md border-amber-400 max-h-full flex flex-col"
            }`}
          >
            {/* Deck Header: Title, Peek Toggle, Minimize & Opacity Controls */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-slate-200/80 bg-slate-50/80 rounded-t-3xl shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xl">
                  {stepsList.find((s) => s.id === currentStep)?.icon}
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-black font-kid text-slate-900 leading-tight">
                    {stepsList.find((s) => s.id === currentStep)?.titleEn}
                  </h3>
                  <span className="text-[11px] text-slate-500 font-arabic block">
                    {stepsList.find((s) => s.id === currentStep)?.titleAr}
                  </span>
                </div>
              </div>

              {/* Utility Deck Buttons */}
              <div className="flex items-center gap-2">
                {/* Peek Page button */}
                <button
                  onClick={() => setIsPeekMode(!isPeekMode)}
                  className="px-2.5 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-kid font-bold flex items-center gap-1 border border-amber-300 transition"
                  title="Make layer transparent to see the textbook page underneath"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-700" />
                  <span className="hidden sm:inline">Peek Page (معاينة)</span>
                </button>

                {/* Minimize / Expand Toggle */}
                {layoutMode === "backdrop_overlay" && (
                  <button
                    onClick={() => setIsOverlayMinimized(!isOverlayMinimized)}
                    className="p-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 transition"
                    title={isOverlayMinimized ? "Expand Activity Layer" : "Minimize to see page"}
                  >
                    {isOverlayMinimized ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* ACTIVE INTERACTIVE CONTENT INSIDE LAYERED DECK       */}
            {/* ---------------------------------------------------- */}
            {!isOverlayMinimized && (
              <div className="p-4 sm:p-5 overflow-y-auto space-y-4 max-h-[62vh] scrollbar-thin">
                {/* STEP 1: ORIGINAL BOOK PAGE FOUNDATION */}
                {currentStep === "page" && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-300 space-y-1">
                      <span className="text-xs font-mono font-bold text-amber-900 uppercase">
                        Curriculum Reference:
                      </span>
                      <p className="text-sm font-kid font-black text-slate-900">
                        {subject.bookTitleEn} — {subject.bookPageUnitEn} (Page {subject.bookPageNumber})
                      </p>
                      <p className="text-xs text-slate-600 font-arabic font-semibold">
                        {subject.bookTitleAr} — {subject.bookPageUnitAr}
                      </p>
                    </div>

                    {/* Book Text Excerpt with Hotspots notice */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <span className="text-xs font-mono font-bold text-slate-400 uppercase block">
                        Interactive Page Text (النص المكتوب في الصفحة):
                      </span>
                      {subject.textbookFullTextEn.map((chunk, idx) => (
                        <p key={idx} className="text-sm font-kid text-slate-800 leading-relaxed font-bold">
                          {chunk}
                        </p>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <button
                        onClick={() => setIsOverlayMinimized(true)}
                        className="text-xs font-kid font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Minimize to examine full page</span>
                      </button>

                      <button
                        onClick={() => setCurrentStep("listen")}
                        className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-kid text-xs font-bold flex items-center gap-2 shadow-xs"
                      >
                        <span>Next: Segmented Audio (الاستماع المجزأ)</span>
                        <ArrowRight className="w-4 h-4 text-amber-300" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: SEGMENTED AUDIO LISTENING */}
                {currentStep === "listen" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                      <span className="text-xs font-mono font-bold text-slate-500">
                        Bite-sized Audio Segments (استماع هادئ مجزأ بدون تداخل)
                      </span>
                      <span className="text-xs font-mono font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded-full">
                        {subject.textbookFullTextEn.length} Parts
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      {subject.textbookFullTextEn.map((chunkEn, idx) => {
                        const chunkAr = subject.textbookFullTextAr[idx] || "";
                        const isPlayingThis = activePlayingChunkIdx === idx;

                        return (
                          <div
                            key={idx}
                            className={`p-3.5 rounded-2xl border-2 transition-all space-y-1.5 ${
                              isPlayingThis
                                ? "bg-amber-50 border-amber-400 ring-2 ring-amber-200 shadow-sm"
                                : "bg-slate-50 border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="space-y-0.5 flex-1">
                                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                                  Part {idx + 1}:
                                </span>
                                <p className="text-xs sm:text-sm font-kid text-slate-900 font-black leading-snug">
                                  {chunkEn}
                                </p>
                                <p className="text-[11px] font-arabic text-slate-600 font-semibold leading-relaxed">
                                  {chunkAr}
                                </p>
                              </div>

                              <button
                                onClick={() => handlePlayChunk(chunkEn, chunkAr, idx)}
                                className={`p-2.5 rounded-xl font-kid text-xs font-bold transition flex items-center gap-1 shrink-0 shadow-xs ${
                                  isPlayingThis
                                    ? "bg-amber-500 text-white animate-pulse"
                                    : "bg-white hover:bg-slate-100 text-slate-800 border border-slate-200"
                                }`}
                              >
                                {isPlayingThis ? (
                                  <>
                                    <VolumeX className="w-3.5 h-3.5" />
                                    <span>Stop</span>
                                  </>
                                ) : (
                                  <>
                                    <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                                    <span>Play</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-2 flex justify-between">
                      <button
                        onClick={() => setCurrentStep("page")}
                        className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-kid text-xs font-bold flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                      <button
                        onClick={() => setCurrentStep("understand")}
                        className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-kid text-xs font-bold flex items-center gap-2 shadow-xs"
                      >
                        <span>Next: Understand & Visuals</span>
                        <ArrowRight className="w-4 h-4 text-amber-300" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: UNDERSTAND & VISUAL CONCEPTS */}
                {currentStep === "understand" && (
                  <div className="space-y-4">
                    {/* Visual concepts grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {subject.coreScientificConcepts.map((concept, cIdx) => (
                        <div
                          key={cIdx}
                          className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 hover:border-amber-400 transition"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xl p-1 rounded-xl bg-white border border-slate-200 shadow-2xs">
                              {concept.iconEmoji}
                            </span>
                            <div>
                              <h4 className="text-xs font-black font-kid text-slate-900">
                                {concept.termEn}
                              </h4>
                              <span className="text-[10px] text-slate-500 font-arabic font-bold">
                                {concept.termAr}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs font-kid text-slate-700 leading-relaxed">
                            {concept.definitionEn}
                          </p>
                          <p className="text-[10px] font-arabic text-slate-500">
                            {concept.definitionAr}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Word Flashcard */}
                    <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-300 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono font-bold text-amber-900 uppercase">
                          Lesson Vocabulary: {activeVocab.word}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {activeVocabIndex + 1} of {subject.vocabulary.length}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-3xl p-1.5 rounded-xl bg-white border border-amber-200 shadow-2xs">
                          {activeVocab.imageEmoji}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-black font-kid text-slate-900">
                              {activeVocab.word}
                            </h4>
                            <button
                              onClick={() => handleSpeakText(activeVocab.soundPrompt)}
                              className="p-1 rounded-lg bg-white hover:bg-amber-100 text-amber-900 border border-amber-200"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-xs font-kid text-slate-800">
                            {activeVocab.simpleMeaningEn}
                          </p>
                        </div>
                      </div>

                      {/* Quick options */}
                      <div className="pt-1 flex items-center gap-2 flex-wrap">
                        {activeVocab.practiceOptions.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => handleVocabOptionSelect(oIdx)}
                            className={`px-3 py-1 rounded-xl text-xs font-kid font-bold transition border ${
                              vocabPracticeSelected === oIdx
                                ? isVocabPracticeCorrect
                                  ? "bg-emerald-500 text-white border-emerald-600"
                                  : "bg-rose-500 text-white border-rose-600"
                                : "bg-white hover:bg-amber-100 text-slate-800 border-amber-200"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                        <button
                          onClick={handleNextVocab}
                          className="px-3 py-1 rounded-xl bg-slate-900 text-white text-xs font-kid font-bold ml-auto"
                        >
                          Next Word →
                        </button>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-between">
                      <button
                        onClick={() => setCurrentStep("listen")}
                        className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-kid text-xs font-bold flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                      <button
                        onClick={() => setCurrentStep("question")}
                        className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-kid text-xs font-bold flex items-center gap-2 shadow-xs"
                      >
                        <span>Next: Practice Question</span>
                        <ArrowRight className="w-4 h-4 text-amber-300" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: PRACTICE QUESTION */}
                {currentStep === "question" && (
                  <div className="space-y-4">
                    {subject.questionClarification && (
                      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-300 space-y-1">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-900">
                          <span className="text-lg">{subject.questionClarification.visualIcon}</span>
                          <span>How to think about this question:</span>
                        </div>
                        <p className="text-xs sm:text-sm font-kid font-bold text-slate-800">
                          {subject.questionClarification.conceptPreviewEn}
                        </p>
                        <p className="text-[11px] font-arabic text-slate-600 font-semibold">
                          💡 {subject.questionClarification.conceptPreviewAr}
                        </p>
                      </div>
                    )}

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <div>
                        <h4 className="text-sm sm:text-base font-black font-kid text-slate-900">
                          {subject.question.questionEn}
                        </h4>
                        <p className="text-xs text-slate-600 font-arabic font-bold mt-0.5">
                          💡 {subject.question.arabicHint}
                        </p>
                      </div>

                      <div className="space-y-2">
                        {subject.question.options.map((opt, idx) => {
                          const isSelected = selectedQuestionOption === idx;
                          const isCorrect = idx === subject.question.correctIndex;

                          return (
                            <button
                              key={idx}
                              onClick={() => handleQuestionOptionSelect(idx)}
                              className={`w-full p-3 rounded-2xl border-2 text-left font-kid text-xs sm:text-sm font-bold transition flex items-center justify-between ${
                                isSelected
                                  ? isCorrect
                                    ? "bg-emerald-500 text-white border-emerald-600 shadow-md ring-2 ring-emerald-200"
                                    : "bg-rose-500 text-white border-rose-600 shadow-md ring-2 ring-rose-200"
                                  : "bg-white hover:bg-slate-100 text-slate-800 border-slate-200"
                              }`}
                            >
                              <span>{opt}</span>
                              {isSelected && <span>{isCorrect ? "✓" : "✗"}</span>}
                            </button>
                          );
                        })}
                      </div>

                      {isQuestionSubmitted && (
                        <div
                          className={`p-3 rounded-xl text-xs font-kid font-bold border ${
                            isQuestionCorrect
                              ? "bg-emerald-100 text-emerald-950 border-emerald-300"
                              : "bg-amber-100 text-amber-950 border-amber-300"
                          }`}
                        >
                          <p>{isQuestionCorrect ? subject.question.explanationEn : "Look at the book page hint above!"}</p>
                          <p className="text-[10px] font-arabic mt-0.5">{subject.question.explanationArHint}</p>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 flex justify-between">
                      <button
                        onClick={() => setCurrentStep("understand")}
                        className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-kid text-xs font-bold flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                      <button
                        onClick={() => setCurrentStep("activity")}
                        className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-kid text-xs font-bold flex items-center gap-2 shadow-xs"
                      >
                        <span>Next: Interactive Lab</span>
                        <ArrowRight className="w-4 h-4 text-amber-300" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 5: INTERACTIVE LAB */}
                {currentStep === "activity" && (
                  <div className="space-y-4">
                    {renderActiveActivity()}

                    <div className="pt-2 flex justify-between">
                      <button
                        onClick={() => setCurrentStep("question")}
                        className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-kid text-xs font-bold flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                      <button
                        onClick={() => setCurrentStep("spelling")}
                        className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-kid text-xs font-bold flex items-center gap-2 shadow-xs"
                      >
                        <span>Next: Spelling Review</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 6: SPELLING REVIEW */}
                {currentStep === "spelling" && (
                  <div className="space-y-4">
                    <LessonSpellingReview
                      subjectNameEn={subject.nameEn}
                      subjectNameAr={subject.nameAr}
                      words={subject.spellingWords}
                      onComplete={() => rewardsManager.addXP(25)}
                    />

                    <div className="pt-2 flex justify-between">
                      <button
                        onClick={() => setCurrentStep("activity")}
                        className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-kid text-xs font-bold flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                      <button
                        onClick={() => setCurrentStep("homework")}
                        className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-kid text-xs font-bold flex items-center gap-2 shadow-xs"
                      >
                        <span>Next: Homework & Finish</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 7: HOMEWORK */}
                {currentStep === "homework" && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-1.5">
                      <span className="text-xs font-mono font-bold text-emerald-900 uppercase block">
                        Tonight's Assignment:
                      </span>
                      <p className="text-sm sm:text-base font-kid font-black text-emerald-950">
                        {subject.homeworkEn}
                      </p>
                      <p className="text-xs font-arabic text-emerald-800 font-bold">
                        📝 {subject.homeworkAr}
                      </p>
                    </div>

                    <div className="pt-3 flex items-center justify-between gap-3 flex-wrap">
                      <button
                        onClick={onBackToHome}
                        className="px-4 py-2.5 rounded-2xl border-2 border-slate-300 hover:bg-slate-100 text-slate-700 font-kid text-xs font-bold flex items-center gap-2"
                      >
                        <Home className="w-4 h-4" />
                        <span>Return to Today's Home</span>
                      </button>

                      {hasNextSubject ? (
                        <button
                          onClick={onGoToNextSubject}
                          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-amber-500 text-amber-950 font-kid font-black text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
                        >
                          <span>Proceed to Next Subject (الحصة التالية)</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={onBackToHome}
                          className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-kid font-black text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
                        >
                          <span>All Today's Lessons Done! 🎉</span>
                          <Star className="w-4 h-4 fill-white" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full Page Zoom Modal */}
      {isPageZoomOpen && subject.bookPageImageUrl && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-4 space-y-3 shadow-2xl border-4 border-amber-400 max-h-[95vh] flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-600" />
                <h4 className="text-sm sm:text-base font-black font-kid text-slate-900">
                  {subject.bookTitleEn} — Page {subject.bookPageNumber}
                </h4>
              </div>
              <button
                onClick={() => setIsPageZoomOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto rounded-2xl bg-slate-100 p-2 flex items-center justify-center">
              <img
                src={subject.bookPageImageUrl}
                alt={`Full Page ${subject.bookPageNumber}`}
                className="max-h-full max-w-full object-contain rounded-xl shadow-md"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
