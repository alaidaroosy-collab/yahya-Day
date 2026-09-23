import { LessonDesignProfile, LessonId } from "../types/curriculum";

export const lessonDesignProfiles: Record<LessonId, LessonDesignProfile> = {
  "lesson-1-1-light-dark": {
    subject: "Science",
    lessonType: "exploration",
    learningObjective: {
      en: "Distinguish between light and dark environments, and understand why human eyes require light to see objects.",
      ar: "التمييز بين البيئات المضيئة والمظلمة، وفهم سبب احتياج العين للضوء لرؤية الأشياء."
    },
    interactionNeeded: "Direct contrast toggle between illuminated and dark states, revealing hidden objects.",
    visualComplexity: "medium",
    requiredMedia: ["interactive_rooms", "light_beam", "illuminated_objects"],
    activityType: "interactive_explorer",
    designRationale: {
      en: "Interactive Explorer allows the student to switch light on/off and inspect how visibility changes in real time, directly proving the core objective.",
      ar: "المستكشف التفاعلي يتيح للطالب التبديل المباشر بين الإضاءة والعتمة ورؤية اختفاء وظهور الأجسام، مما يرسخ المفهوم بالتجربة الحسية."
    }
  },

  "lesson-1-2-sources": {
    subject: "Science",
    lessonType: "concept",
    learningObjective: {
      en: "Identify what is and is not a true light source (emitters vs reflectors like the Moon and mirrors).",
      ar: "تحديد ما يُعد مصدراً حقيقياً للضوء وما ليس مصدراً (الأجسام المضيئة بذاتها مقابل العاكسة كالمرآة والقمر)."
    },
    interactionNeeded: "Testing individual objects to see if they emit their own light, checking lux output, and revealing false sources.",
    visualComplexity: "medium",
    requiredMedia: ["sun", "torch", "candle", "moon", "mirror", "traffic_reflector"],
    activityType: "interactive_explorer",
    designRationale: {
      en: "Interactive Explorer allows students to test every object independently, toggle power, and view emission vs reflection rays.",
      ar: "المستكشف التفاعلي يُمكّن الطالب من اختبار كل جسم بمفرده، وإضاءته أو إطفائه لمعاينة انبعاث الضوء مقابل مجرد ارتداده."
    }
  },

  "lesson-1-3-reflection": {
    subject: "Science",
    lessonType: "identification",
    learningObjective: {
      en: "Identify reflection components (incident ray, reflected ray, normal, surface) and use mirrors to redirect light rays.",
      ar: "التعرف على أجزاء مسار الانعكاس (الشعاع الساقط، الشعاع المنعكس، العمود المقام، السطح العاكس) وتوجيه الضوء بالمرآة."
    },
    interactionNeeded: "AI Pointer aiming crosshair on optical diagrams, inspecting ray components, and hitting optical targets.",
    visualComplexity: "medium",
    requiredMedia: ["laser_beam", "mirror_plane", "normal_line", "target_sensors"],
    activityType: "ai_pointer",
    designRationale: {
      en: "AI Pointer precisely targets specific ray components on the diagram with instant diagnostic AI feedback, satisfying part identification.",
      ar: "مؤشر الذكاء الاصطناعي يستهدف بدقة أجزاء مسار الضوء على الرسم التخطيطي ويقدم تشخيصاً فورياً لتثبيت أجزاء التجربة."
    }
  },

  "lesson-1-4-darkness": {
    subject: "Science",
    lessonType: "exploration",
    learningObjective: {
      en: "Demonstrate that darkness is the complete absence of light, and eyes cannot adapt to see in total darkness without light.",
      ar: "إثبات أن الظلام التام هو غياب كامل للضوء، وأن العين البشرية لا تستطيع الرؤية في العتمة المطلقة دون أي فوتونات ضوئية."
    },
    interactionNeeded: "Dark box simulator with adjustable slit aperture, peephole viewing, and variable lux levels.",
    visualComplexity: "medium",
    requiredMedia: ["sealed_box", "aperture_slider", "colored_card_inside"],
    activityType: "interactive_explorer",
    designRationale: {
      en: "Interactive Dark Box Simulator directly recreates the Cambridge textbook experiment of adjusting light slits to see what happens inside.",
      ar: "محاكي الصندوق المظلم يُعيد تمثيل تجربة كتاب كامبريدج الحقيقية لفتح وإغلاق فتحة الضوء وملاحظة الرؤية في الداخل."
    }
  },

  "lesson-1-5-shadows": {
    subject: "Science",
    lessonType: "process",
    learningObjective: {
      en: "Trace the sequence of shadow size changes as distance varies, and follow the diurnal shadow journey across the sky.",
      ar: "تتبع تسلسل تغير حجم الظل مع تغير المسافة، ومسار تغير أطوال واتجاهات الظلال عبر ساعات النهار."
    },
    interactionNeeded: "Step-by-step distance sequence and timeline journey tracking shadow length and sharpness.",
    visualComplexity: "medium",
    requiredMedia: ["torch_source", "opaque_puppet", "shadow_screen", "ruler_scale"],
    activityType: "journey_courseviz",
    designRationale: {
      en: "Journey / CourseViz maps the sequential cause-and-effect relationship (closer distance -> larger shadow) in a clear progressive timeline.",
      ar: "نظام الرحلة والتسلسل CourseViz يوضح العلاقة التسلسلية بين المسافة وحجم الظل خطوة بخطوة في مسار منطقي واضح."
    }
  },

  "lesson-2-1-rocks-soil": {
    subject: "Science",
    lessonType: "exploration",
    learningObjective: {
      en: "Explore natural geographic locations where rocks and soils occur in our environment, from riverbeds to limestone cliffs and quarries.",
      ar: "استكشاف المواقع الجغرافية الطبيعية التي تتواجد فيها الصخور والتربة في بيئتنا، من مجاري الأنهار إلى المنحدرات والمحاجر."
    },
    interactionNeeded: "Geological terrain map explorer with interactive pins, collecting field samples, and inspecting local soil types.",
    visualComplexity: "high",
    requiredMedia: ["topographic_map", "rock_pins", "sample_inspection_cards"],
    activityType: "map_explorer",
    designRationale: {
      en: "Map Explorer brings geology into real-world geographic context, showing students where rocks naturally originate on Earth.",
      ar: "مستكشف الخرائط يربط الجيولوجيا بالبيئة الواقعية، مما يُري الطالب أماكن تواجد الصخور الطبيعية على كوكب الأرض."
    }
  },

  "lesson-2-2-earth-layers": {
    subject: "Science",
    lessonType: "model",
    learningObjective: {
      en: "Examine the 3D internal structure of planet Earth: Crust, Mantle, Outer Core, and Inner Core.",
      ar: "فحص البنية ثلاثية الأبعاد لطبقات باطن الأرض: القشرة، والوشاح، واللب الخارجي، واللب الداخلي."
    },
    interactionNeeded: "3D Voxel block slicing, rotatable model, layer explosion, and depth inspection.",
    visualComplexity: "3d",
    requiredMedia: ["voxel_globe_slices", "layer_legend", "temperature_scale"],
    activityType: "voxel_3d",
    designRationale: {
      en: "Voxel 3D provides tactile spatial depth and thickness perception of Earth's internal layers that flat 2D diagrams fail to communicate.",
      ar: "التصميم المجسم Voxel 3D يمنح الطالب إدراكاً حقيقياً لعمق وسماكة طبقات الأرض ثلاثية الأبعاد بدلاً من الرسم المسطح."
    }
  },

  "lesson-2-3-identifying-rocks": {
    subject: "Science",
    lessonType: "identification",
    learningObjective: {
      en: "Identify rock types by examining micro-parts: interlocking crystals vs rounded grains, pore spaces, and scratch hardness.",
      ar: "التعرف على أنواع الصخور من خلال فحص أجزائها المجهرية: البلورات المتشابكة، الحبيبات المستديرة، والمسام والصلابة."
    },
    interactionNeeded: "AI Pointer diagnostic lens pinpointing mineral grains, crystal facets, and performing hardness diagnostic checks.",
    visualComplexity: "high",
    requiredMedia: ["microscope_rock_textures", "hardness_picks", "diagnostic_crosshairs"],
    activityType: "ai_pointer",
    designRationale: {
      en: "AI Pointer allows students to aim at specific crystals or grains and receive instant diagnostic identification of the specimen.",
      ar: "مؤشر الذكاء الاصطناعي يسمح باستهداف بلورة محددة أو حبة رمل وفحصها لتشخيص نوع الصخر بدقة."
    }
  },

  "lesson-2-4-rock-cycle": {
    subject: "Science",
    lessonType: "process",
    learningObjective: {
      en: "Understand the continuous multi-stage sequence of the Rock Cycle (Magma -> Igneous -> Weathering -> Sedimentary -> Metamorphic).",
      ar: "فهم التسلسل المستمر متعدد المراحل لدورة الصخور (الصهارة -> النارية -> التجوية والترسيب -> الرسوبية -> المتحولة)."
    },
    interactionNeeded: "Sequential node-based journey visualizer with stage triggers, transformation checkpoints, and process milestones.",
    visualComplexity: "medium",
    requiredMedia: ["cycle_flow_nodes", "geological_state_transitions", "process_checkpoints"],
    activityType: "journey_courseviz",
    designRationale: {
      en: "Journey / CourseViz is ideal for sequential geological processes, guiding students through each transformation node in order.",
      ar: "نظام الرحلة والتسلسل CourseViz هو الأنسب للعمليات الجيولوجية المتعاقبة، ليقود المتعلم عبر محطات التحول بالترتيب."
    }
  },

  "lesson-2-5-fossils-materials": {
    subject: "Science",
    lessonType: "practice",
    learningObjective: {
      en: "Consolidate and rapidly test knowledge of rock building uses, fossil formation, and material properties through quick-fire practice.",
      ar: "تثبيت واختبار المعرفة حول استخدامات الصخور في البناء، وتشكل الأحافير، وخصائص المواد عبر تحديات تفاعلية سريعة."
    },
    interactionNeeded: "Gamified practice challenge with question navigation, target selection, and immediate pedagogical explanations.",
    visualComplexity: "medium",
    requiredMedia: ["practice_question_tokens", "science_snake_canvas", "explanation_cards"],
    activityType: "learning_snake",
    designRationale: {
      en: "Learning Snake transforms practice questions into an active, high-retention practice game where students navigate to correct answers.",
      ar: "لعبة ثعبان التعلّم Learning Snake تحول أسئلة الممارسة إلى تدريب ممتع ونشط، يوجه فيه الطالب الأفعى نحو الإجابة الصحيحة مع شروح فورية."
    }
  }
};
