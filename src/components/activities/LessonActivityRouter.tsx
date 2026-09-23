import React, { useState, useEffect } from "react";
import { Lesson, ActivityType } from "../../types/curriculum";
import { lessonDesignProfiles } from "../../data/lessonDesignProfiles";
import { DesignSelectionBanner } from "../design-selection/DesignSelectionBanner";
import { rewardsManager } from "../../utils/rewardsManager";
import confetti from "canvas-confetti";

// Specific tailored design components
import { LearningSnake } from "./LearningSnake";
import { AIPointerExplorer } from "./AIPointerExplorer";
import { MapExplorer } from "./MapExplorer";
import { Voxel3DViewer } from "./Voxel3DViewer";
import { JourneyCourseViz } from "./JourneyCourseViz";
import { LightSourcesExplorer } from "./LightSourcesExplorer";

// Existing standard labs as fallback
import { InteractiveRaySimulator } from "../InteractiveRaySimulator";
import { ShadowDistanceLab } from "../ShadowDistanceLab";
import { DarkBoxSimulator } from "../DarkBoxSimulator";
import { EarthLayersExplorer } from "../EarthLayersExplorer";
import { RockClassifierKey } from "../RockClassifierKey";
import { RockCycleInteractive } from "../RockCycleInteractive";
import { BuildingMaterialsSorter } from "../BuildingMaterialsSorter";
import { InteractiveWordsearch } from "../InteractiveWordsearch";

interface LessonActivityRouterProps {
  lesson: Lesson;
  onAdvanceToNextLesson?: () => void;
}

export const LessonActivityRouter: React.FC<LessonActivityRouterProps> = ({
  lesson,
  onAdvanceToNextLesson,
}) => {
  const profile = lessonDesignProfiles[lesson.id] || {
    subject: "Science",
    lessonType: "concept",
    learningObjective: {
      en: lesson.subtitleEn || lesson.titleEn,
      ar: lesson.subtitleAr || lesson.titleAr,
    },
    interactionNeeded: "Direct interactive investigation tailored to lesson concept.",
    visualComplexity: "medium",
    requiredMedia: ["interactive_diagram"],
    activityType: "interactive_explorer",
    designRationale: {
      en: "Interactive simulation directly connects cause and effect to fulfill lesson objective.",
      ar: "المحاكاة التفاعلية تربط بين السبب والنتيجة لتحقيق الهدف التعليمي للدرس.",
    },
  };

  const [activeActivityType, setActiveActivityType] = useState<ActivityType>(profile.activityType);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // When lesson changes, reset to that lesson's pedagogical designated activity
  useEffect(() => {
    setActiveActivityType(profile.activityType);
    setIsCompleted(false);
  }, [lesson.id, profile.activityType]);

  const handleActivityComplete = () => {
    setIsCompleted(true);
    rewardsManager.addXP(30);
    rewardsManager.recordExerciseCompleted();

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleContinueLessonFlow = () => {
    if (onAdvanceToNextLesson) {
      onAdvanceToNextLesson();
    }
  };

  // Render the matching design according to selected ActivityType & Lesson
  const renderActivityContent = () => {
    // 1. Practice Questions via Learning Snake
    if (activeActivityType === "learning_snake") {
      return (
        <LearningSnake
          questions={lesson.quiz}
          lessonTitle={lesson.titleEn}
          onComplete={handleActivityComplete}
        />
      );
    }

    // 2. Identify Parts via AI Pointer
    if (activeActivityType === "ai_pointer") {
      const diagramType =
        lesson.id === "lesson-2-3-identifying-rocks"
          ? "rock_microstructure"
          : "reflection_optics";

      return (
        <AIPointerExplorer
          diagramType={diagramType}
          onComplete={handleActivityComplete}
        />
      );
    }

    // 3. Environment & Location via Map Explorer
    if (activeActivityType === "map_explorer") {
      return <MapExplorer onComplete={handleActivityComplete} />;
    }

    // 4. 3D Models / Objects via Voxel 3D
    if (activeActivityType === "voxel_3d") {
      return <Voxel3DViewer onComplete={handleActivityComplete} />;
    }

    // 5. Processes / Sequences via Journey / CourseViz
    if (activeActivityType === "journey_courseviz") {
      const processType =
        lesson.id === "lesson-1-5-shadows" ? "shadow_sequence" : "rock_cycle";

      return (
        <JourneyCourseViz
          processType={processType}
          onComplete={handleActivityComplete}
        />
      );
    }

    // 6. Interactive Explorer
    if (activeActivityType === "interactive_explorer") {
      if (lesson.id === "lesson-1-2-sources") {
        return <LightSourcesExplorer onComplete={handleActivityComplete} />;
      }
      if (lesson.id === "lesson-1-4-darkness") {
        return <DarkBoxSimulator />;
      }
      if (lesson.id === "lesson-1-1-light-dark") {
        return <InteractiveWordsearch type="light" />;
      }
    }

    // 7. Standard Labs fallback
    if (lesson.id === "lesson-1-3-reflection") return <InteractiveRaySimulator />;
    if (lesson.id === "lesson-1-5-shadows") return <ShadowDistanceLab />;
    if (lesson.id === "lesson-2-2-earth-layers") return <EarthLayersExplorer />;
    if (lesson.id === "lesson-2-3-identifying-rocks") return <RockClassifierKey />;
    if (lesson.id === "lesson-2-4-rock-cycle") return <RockCycleInteractive />;
    if (lesson.id === "lesson-2-5-fossils-materials") return <BuildingMaterialsSorter />;

    return <InteractiveWordsearch type="rocks" />;
  };

  return (
    <div className="space-y-4">
      {/* Pedagogical Design Selection Decision Banner */}
      <DesignSelectionBanner
        profile={profile}
        activeActivityType={activeActivityType}
        onChangeActivityType={(type) => setActiveActivityType(type)}
        onContinueLessonFlow={handleContinueLessonFlow}
        isCompleted={isCompleted}
      />

      {/* Rendered Matching Design */}
      <div className="transition-all duration-300">
        {renderActivityContent()}
      </div>
    </div>
  );
};
