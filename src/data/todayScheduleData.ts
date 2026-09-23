export interface TodaySubject {
  id: "science" | "math" | "english";
  nameEn: string;
  nameAr: string;
  bookTitleEn: string;
  bookTitleAr: string;
  bookCode: string;
  stage: string;
  bookPageNumber: number;
  bookPageImageUrl?: string;
  bookPageUnitEn: string;
  bookPageUnitAr: string;
  colorScheme: {
    primary: string;
    secondary: string;
    bgLight: string;
    borderColor: string;
    textColor: string;
    badgeBg: string;
    gradient: string;
  };
  bookCoverIcon: string;
  estimatedMinutes: number;
  todayTopicEn: string;
  todayTopicAr: string;
  curriculumLessonId?: string;
  isCompleted: boolean;

  // Complete textbook content in short readable chunks for independent audio play
  textbookFullTextEn: string[];
  textbookFullTextAr: string[];
  coreScientificConcepts: Array<{
    termEn: string;
    termAr: string;
    definitionEn: string;
    definitionAr: string;
    visualDiagramUrl?: string;
    iconEmoji: string;
  }>;

  // Vocabulary: Word → Image → Sound → Simple Meaning → Practice
  vocabulary: Array<{
    word: string;
    soundPrompt: string;
    imageEmoji: string;
    simpleMeaningEn: string;
    hintAr: string;
    practicePromptEn: string;
    practiceOptions: string[];
    correctPracticeIndex: number;
  }>;

  // Activity type
  activityType: "interactive_explorer" | "math_place_value" | "learning_snake" | "voxel_3d" | "ai_pointer";
  activityLessonTitleEn: string;
  activityLessonTitleAr: string;

  // Pre-question visual clarification
  questionClarification: {
    promptEn: string;
    promptAr: string;
    visualIcon: string;
    conceptPreviewEn: string;
    conceptPreviewAr: string;
  };

  // Practice Question
  question: {
    questionEn: string;
    arabicHint: string;
    options: string[];
    correctIndex: number;
    explanationEn: string;
    explanationArHint: string;
  };

  // 5 Key Spelling / Writing Practice Words for end of lesson
  spellingWords: Array<{
    id: string;
    wordEn: string;
    wordAr: string;
    meaningEn: string;
    iconEmoji: string;
    sampleSentenceEn: string;
  }>;

  // Homework & Next Step reinforcement
  homeworkEn: string;
  homeworkAr: string;
}

export const todaySubjectsData: TodaySubject[] = [
  // ========================================================
  // 1. SCIENCE — Cambridge Primary Science 3, Unit 1.1 (p. 14)
  // ========================================================
  {
    id: "science",
    nameEn: "Science",
    nameAr: "العلوم",
    bookTitleEn: "Cambridge Primary Science Learner's Book 3",
    bookTitleAr: "كتاب العلوم - كامبريدج المستوى الثالث",
    bookCode: "Stage 3 Science",
    stage: "Stage 3",
    bookPageNumber: 14,
    bookPageImageUrl: "/textbook_pages/science_sb_p14.png",
    bookPageUnitEn: "Unit 1: Light and Dark — Lesson 1.1: Where does light come from?",
    bookPageUnitAr: "الوحدة الأولى: الضوء والظلام — الدرس 1.1: من أين يأتي الضوء؟",
    colorScheme: {
      primary: "#002D62",
      secondary: "#0284C7",
      bgLight: "bg-sky-50/60",
      borderColor: "border-sky-200",
      textColor: "text-[#002D62]",
      badgeBg: "bg-blue-100 text-blue-900 border-blue-300",
      gradient: "from-[#002D62] to-[#0284C7]",
    },
    bookCoverIcon: "🔬",
    estimatedMinutes: 20,
    todayTopicEn: "Light Sources, Dark Bedrooms & Reflection",
    todayTopicAr: "مصادر الضوء، غرف النوم المظلمة والانعكاس",
    isCompleted: false,

    textbookFullTextEn: [
      "Chunk 1: Look at the two bedrooms in the pictures. In Bedroom A, the sun is shining through the window and the electric lamp is turned on.",
      "Chunk 2: In Bedroom B, the heavy curtains are closed and all lights are switched off. Why can we see things clearly in Bedroom A, but struggle to see in Bedroom B?",
      "Chunk 3: Where does light come from? A light source is something that makes its own light. The Sun is our biggest natural light source. Lamps, torches, and candle flames are artificial light sources.",
      "Chunk 4: Darkness is when there is no light at all. In complete darkness, our eyes cannot see anything. Mirrors and the Moon are NOT light sources; they simply bounce light from real sources into our eyes!",
    ],
    textbookFullTextAr: [
      "الجزء 1: انظري إلى غرفتي النوم في صورتي الكتاب: في الغرفة (أ)، أشعة الشمس تشرق من النافذة والمصباح الكهربائي مضاء.",
      "الجزء 2: في الغرفة (ب)، الستائر السميكة مغلقة وجميع الأضواء مطفأة. لماذا نرى الأشياء بوضوح في الغرفة الأولى ولا نكاد نرى في الغرفة الثانية؟",
      "الجزء 3: من أين يأتي الضوء؟ مصدر الضوء هو أي شيء يصنع ضوءه بنفسه! الشمس هي مصدرنا الطبيعي الأكبر، والمصابيح والشموع مصادر صناعية صنعها الإنسان.",
      "الجزء 4: الظلام هو الغياب التام لأي ضوء. في الظلام الكامل لا يمكن للعينين أن تريا أي شيء. المرآة والقمر ليسا مصدري ضوء، بل يعكسان الضوء فقط!",
    ],

    coreScientificConcepts: [
      {
        termEn: "Light Source (مصدر الضوء)",
        termAr: "مصدر الضوء الذاتي",
        definitionEn: "An object that creates and emits its own light (Sun, torch, fire, stars).",
        definitionAr: "جسم يصنع ويبعث ضوءه الخاص بنفسه دون الحاجة لجسم آخر.",
        iconEmoji: "☀️",
      },
      {
        termEn: "Darkness (الظلام)",
        termAr: "الغياب التام للضوء",
        definitionEn: "The total absence of light. Eyes need light rays entering them to see.",
        definitionAr: "الغياب الكامل لأي أشعة ضوئية، وأعيننا تحتاج للضوء لتتمكن من الرؤية.",
        iconEmoji: "🌑",
      },
      {
        termEn: "Reflector (السطح العاكس)",
        termAr: "السطح العاكس",
        definitionEn: "An object that does not produce light, but bounces light rays from another source into our eyes (like a mirror or the Moon).",
        definitionAr: "جسم لا يصنع ضوءاً بنفسه، بل يرد ويعكس الأشعة الضوئية الساقطة عليه.",
        iconEmoji: "🪞",
      },
    ],

    vocabulary: [
      {
        word: "Source",
        soundPrompt: "Source. Where something comes from or is made.",
        imageEmoji: "💡",
        simpleMeaningEn: "The place or object where light is created and starts.",
        hintAr: "💡 تلميح: المكان أو الشيء الذي ينطلق منه الضوء ويصنعه.",
        practicePromptEn: "Which of these is a true light source?",
        practiceOptions: ["The Sun", "A Flat Mirror", "A Wooden Book"],
        correctPracticeIndex: 0,
      },
      {
        word: "Darkness",
        soundPrompt: "Darkness. The absence of light.",
        imageEmoji: "🌑",
        simpleMeaningEn: "When there is no light around us at all.",
        hintAr: "💡 تلميح: غياب الضوء التام حيث تنعدم الرؤية.",
        practicePromptEn: "Why can't we see in complete darkness?",
        practiceOptions: ["Eyes need light to see", "Eyes stop working", "Objects disappear"],
        correctPracticeIndex: 0,
      },
      {
        word: "Mirror",
        soundPrompt: "Mirror. A smooth shiny surface that reflects light.",
        imageEmoji: "🪞",
        simpleMeaningEn: "A shiny surface that bounces light into our eyes.",
        hintAr: "💡 تلميح: سطح زجاجي أملس يعكس الضوء ولا يولده.",
        practicePromptEn: "Is a mirror a light source?",
        practiceOptions: ["No, it reflects light", "Yes, it produces light", "Only in the morning"],
        correctPracticeIndex: 0,
      },
    ],

    activityType: "interactive_explorer",
    activityLessonTitleEn: "Light Source vs Reflector Sorting Lab",
    activityLessonTitleAr: "مختبر تصنيف مصادر الضوء والأسطح العاكسة",

    questionClarification: {
      promptEn: "Before you answer: Think about where light actually comes from!",
      promptAr: "قبل الإجابة: فكري يا زهرة: هل الشيء يصنع ضوءه بنفسه أم مجرد مرآة تعكس الضوء؟",
      visualIcon: "💡",
      conceptPreviewEn: "A light source MAKES its own light. The Sun and torches make light. Mirrors and the Moon only BOUNCE light!",
      conceptPreviewAr: "مصدر الضوء يصنع ضوءه بنفسه مثل الشمس والمصباح. أما المرآة والقمر فيعكسان الضوء الساقط عليهما فقط!",
    },

    question: {
      questionEn: "Zahra, which of these is a TRUE source of light?",
      arabicHint: "أي من هذه الأشياء يصنع ضوءه بنفسه ويضيء بذاته؟",
      options: [
        "A shiny mirror on the wall",
        "An electric torch that is switched on",
        "The Moon at midnight",
      ],
      correctIndex: 1,
      explanationEn: "Super! The torch bulb produces its own light from battery power. Mirrors and the Moon only reflect light!",
      explanationArHint: "ممتاز! المصباح الكهربائي يولّد الضوء بنفسه عبر البطارية، بينما المرآة والقمر يعكسان الضوء فقط.",
    },

    spellingWords: [
      {
        id: "sci-sp1",
        wordEn: "Light",
        wordAr: "الضوء",
        meaningEn: "Energy that helps our eyes see everything around us.",
        iconEmoji: "☀️",
        sampleSentenceEn: "Light travels from the Sun to Earth.",
      },
      {
        id: "sci-sp2",
        wordEn: "Source",
        wordAr: "المصدر",
        meaningEn: "Where something starts or is made.",
        iconEmoji: "💡",
        sampleSentenceEn: "The torch is a source of bright light.",
      },
      {
        id: "sci-sp3",
        wordEn: "Dark",
        wordAr: "الظلام / معتم",
        meaningEn: "Having little or no light.",
        iconEmoji: "🌑",
        sampleSentenceEn: "Bedroom B was very dark.",
      },
      {
        id: "sci-sp4",
        wordEn: "Mirror",
        wordAr: "المرآة",
        meaningEn: "A shiny surface that bounces light.",
        iconEmoji: "🪞",
        sampleSentenceEn: "The mirror reflects my happy smile.",
      },
      {
        id: "sci-sp5",
        wordEn: "Eyes",
        wordAr: "العينان",
        meaningEn: "Our sense organs that receive light to see.",
        iconEmoji: "👀",
        sampleSentenceEn: "Our eyes need light to see colors.",
      },
    ],

    homeworkEn: "Activity Book p. 12: Draw 2 natural light sources and 2 artificial light sources found in your home!",
    homeworkAr: "كتاب الأنشطة صفحة 12: ارسمي مصدري ضوء طبيعيين ومصدري ضوء صناعيين من منزلك!",
  },

  // ========================================================
  // 2. MATHEMATICS — Oxford Primary Mathematics 3, Chapter 1.1 (p. 4)
  // Strictly matching page 4: Numbers to 10,000 & Place Value!
  // ========================================================
  {
    id: "math",
    nameEn: "Mathematics",
    nameAr: "الرياضيات",
    bookTitleEn: "Oxford Primary Mathematics Textbook 3",
    bookTitleAr: "كتاب الرياضيات - أكسفورد المستوى الثالث",
    bookCode: "Stage 3 Maths",
    stage: "Stage 3",
    bookPageNumber: 4,
    bookPageImageUrl: "/textbook_pages/math_sb_p04.png",
    bookPageUnitEn: "Chapter 1: Numbers to 10,000 — Lesson 1.1: Counting & Place Value",
    bookPageUnitAr: "الفصل الأول: الأعداد حتى 10,000 — الدرس 1.1: العد والقيمة المكانية",
    colorScheme: {
      primary: "#4338CA",
      secondary: "#8B5CF6",
      bgLight: "bg-indigo-50/60",
      borderColor: "border-indigo-200",
      textColor: "text-indigo-900",
      badgeBg: "bg-purple-100 text-purple-900 border-purple-300",
      gradient: "from-[#4338CA] to-[#6366F1]",
    },
    bookCoverIcon: "📐",
    estimatedMinutes: 20,
    todayTopicEn: "Place Value: Thousands, Hundreds, Tens & Ones",
    todayTopicAr: "القيمة المكانية: الآلاف، المئات، العشرات والآحاد",
    isCompleted: false,

    textbookFullTextEn: [
      "Chunk 1: Numbers up to 10,000 are made of thousands, hundreds, tens, and ones. We use base-10 blocks to represent them visually.",
      "Chunk 2: A large cube has 1,000 units (One Thousand). A flat square has 100 units (One Hundred). A rod has 10 units (One Ten). A single small cube is 1 (One).",
      "Chunk 3: In the Place Value Chart for 3,452: 3 is in the Thousands place (value = 3,000), 4 is in the Hundreds place (value = 400), 5 is in the Tens place (value = 50), and 2 is in the Ones place (value = 2).",
      "Chunk 4: Expanded Form: 3,452 = 3,000 + 400 + 50 + 2. When comparing two 4-digit numbers, first look at the Thousands digit. If they are equal, compare the Hundreds digit!",
    ],
    textbookFullTextAr: [
      "الجزء 1: الأعداد حتى 10,000 تتكون من أربع منازل: الآلاف، المئات، العشرات، والآحاد. ونستخدم مكعبات العشرات والمئات لتمثيلها بوضوح.",
      "الجزء 2: المكعب الكبير يمثل 1,000 وحدة (ألف واحد). واللوح المربع المسطح يمثل 100 وحدة (مائة واحدة). والعمود يمثل 10 وحدات (عشرة واحدة). والمكعب الصغير يمثل 1 (آحاد).",
      "الجزء 3: في جدول القيمة المكانية للعدد 3,452: الرقم 3 في منزلة الآلاف وقيمته 3,000، والرقم 4 في المئات وقيمته 400، والرقم 5 في العشرات وقيمته 50، والرقم 2 في الآحاد وقيمته 2.",
      "الجزء 4: الصيغة التحليلية: 3,452 = 3,000 + 400 + 50 + 2. وعند المقارنة بين عددين، نبدأ بمقارنة منزلة الآلاف أولاً، فإذا تساويا نقارن منزلة المئات!",
    ],

    coreScientificConcepts: [
      {
        termEn: "Thousands (الآلاف)",
        termAr: "منزلة الآلاف (Th)",
        definitionEn: "Groups of 1,000 units represented by large solid cubes.",
        definitionAr: "مجموعات من ألف وحدة يمثلها المكعب المجسم الكبير.",
        iconEmoji: "🧊",
      },
      {
        termEn: "Hundreds (المئات)",
        termAr: "منزلة المئات (H)",
        definitionEn: "Groups of 100 units represented by flat square slabs.",
        definitionAr: "مجموعات من مائة وحدة يمثلها اللوح المربع المسطح.",
        iconEmoji: "🟩",
      },
      {
        termEn: "Expanded Form (الصيغة التحليلية)",
        termAr: "الصيغة التحليلية",
        definitionEn: "Writing a number showing the value of each digit added together (e.g. 2,000 + 300 + 40 + 5).",
        definitionAr: "كتابة العدد بإظهار القيمة الحقيقية لكل منزلة كمجموع.",
        iconEmoji: "➕",
      },
    ],

    vocabulary: [
      {
        word: "Thousand",
        soundPrompt: "Thousand. Equal to ten hundreds or 1,000 units.",
        imageEmoji: "🧊",
        simpleMeaningEn: "A large number equal to 1,000 units (10 hundreds).",
        hintAr: "💡 تلميح: عشر مئات تساوي ألفاً واحداً (1,000).",
        practicePromptEn: "How many hundreds make one thousand?",
        practiceOptions: ["10 hundreds", "5 hundreds", "100 hundreds"],
        correctPracticeIndex: 0,
      },
      {
        word: "Hundred",
        soundPrompt: "Hundred. Equal to ten tens or 100 units.",
        imageEmoji: "🟩",
        simpleMeaningEn: "A number equal to 10 tens (100 units).",
        hintAr: "💡 تلميح: عشر عشرات تساوي مائة واحدة (100).",
        practicePromptEn: "What is the value of 4 hundreds?",
        practiceOptions: ["400", "40", "4,000"],
        correctPracticeIndex: 0,
      },
      {
        word: "Value",
        soundPrompt: "Value. What a digit is worth based on where it sits.",
        imageEmoji: "💰",
        simpleMeaningEn: "The worth of a digit depending on its column place.",
        hintAr: "💡 تلميح: القيمة الحقيقية للرقم حسب مكان منزلته.",
        practicePromptEn: "In the number 5,230, what is the value of 5?",
        practiceOptions: ["5,000", "500", "50"],
        correctPracticeIndex: 0,
      },
    ],

    activityType: "math_place_value",
    activityLessonTitleEn: "Base-10 Blocks & Place Value Studio",
    activityLessonTitleAr: "مختبر المكعبات والقيمة المكانية للأعداد",

    questionClarification: {
      promptEn: "Before you answer: Look at the column for Hundreds!",
      promptAr: "قبل الإجابة: انظري يا زهرة إلى منزلة المئات في العدد المعطى!",
      visualIcon: "📐",
      conceptPreviewEn: "In a 4-digit number: Thousands (first digit), Hundreds (second digit), Tens (third digit), Ones (last digit).",
      conceptPreviewAr: "في الأعداد المكونة من 4 منازل: الآلاف أولاً من اليسار، ثم المئات، ثم العشرات، ثم الآحاد!",
    },

    question: {
      questionEn: "In the number 4,825, what is the value of the digit 8?",
      arabicHint: "في العدد 4,825: الرقم 8 يقع في منزلة المئات، فكم تكون قيمته؟",
      options: ["80 (8 tens)", "800 (8 hundreds)", "8,000 (8 thousands)"],
      correctIndex: 1,
      explanationEn: "Brilliant! The digit 8 is in the hundreds column, so its true value is 800.",
      explanationArHint: "ممتاز! الرقم 8 في منزلة المئات، إذن قيمته المكانية 800.",
    },

    spellingWords: [
      {
        id: "mth-sp1",
        wordEn: "Thousand",
        wordAr: "ألف (1,000)",
        meaningEn: "A four-digit number equal to 10 hundreds.",
        iconEmoji: "🧊",
        sampleSentenceEn: "Ten hundreds equal one thousand.",
      },
      {
        id: "mth-sp2",
        wordEn: "Hundred",
        wordAr: "مائة (100)",
        meaningEn: "Equal to ten tens or 100 units.",
        iconEmoji: "🟩",
        sampleSentenceEn: "There are four hundred students.",
      },
      {
        id: "mth-sp3",
        wordEn: "Tens",
        wordAr: "عشرات (10)",
        meaningEn: "The second place from the right in numbers.",
        iconEmoji: "🟢",
        sampleSentenceEn: "Five tens is equal to fifty.",
      },
      {
        id: "mth-sp4",
        wordEn: "Ones",
        wordAr: "آحاد (1)",
        meaningEn: "Single units in the last place of a number.",
        iconEmoji: "🟣",
        sampleSentenceEn: "The number 7 has seven ones.",
      },
      {
        id: "mth-sp5",
        wordEn: "Value",
        wordAr: "القيمة المكانية",
        meaningEn: "How much a digit is worth by its place.",
        iconEmoji: "🏷️",
        sampleSentenceEn: "Every digit has a special place value.",
      },
    ],

    homeworkEn: "Oxford Textbook p. 5 #1-4: Write 4 numbers in expanded notation and draw their place value blocks in your notebook!",
    homeworkAr: "كتاب الرياضيات صفحة 5: اكتبي 4 أعداد بالصيغة التحليلية وارسمي مكعبات القيمة المكانية في دفترك!",
  },

  // ========================================================
  // 3. ENGLISH — Cambridge Primary English 3, Unit 1 (p. 22)
  // Real complete story text: The House that was Sad (Dolores Li)
  // ========================================================
  {
    id: "english",
    nameEn: "English",
    nameAr: "اللغة الإنجليزية",
    bookTitleEn: "Cambridge Primary English Learner's Book 3",
    bookTitleAr: "كتاب اللغة الإنجليزية - كامبريدج المستوى الثالث",
    bookCode: "Stage 3 English",
    stage: "Stage 3",
    bookPageNumber: 22,
    bookPageImageUrl: "/textbook_pages/english_sb_p22.png",
    bookPageUnitEn: "Unit 1: The House that was Sad (Story Reading & Descriptive Words)",
    bookPageUnitAr: "الوحدة 1: قصة البيت الحزين والكلمات الوصفية",
    colorScheme: {
      primary: "#BE123C",
      secondary: "#FB7185",
      bgLight: "bg-rose-50/60",
      borderColor: "border-rose-200",
      textColor: "text-rose-950",
      badgeBg: "bg-rose-100 text-rose-900 border-rose-300",
      gradient: "from-[#BE123C] to-[#E11D48]",
    },
    bookCoverIcon: "📖",
    estimatedMinutes: 20,
    todayTopicEn: "Story: The House that was Sad (Descriptive Adjectives)",
    todayTopicAr: "القصة: البيت الحزين والصفات التعبيرية الممتعة",
    isCompleted: false,

    textbookFullTextEn: [
      "Chunk 1: At the far end of the village stood an old, abandoned house. It had broken glass in the windows, crumbling stone walls, and a front door that flapped back and forth in the chilly wind.",
      "Chunk 2: A rusty wooden sign on the creaky gate warned 'Keep Out'. But seven-year-old Dolores Li was very curious. She stood on tiptoe to peek into the overgrown garden.",
      "Chunk 3: Dolores gently pushed open the creaky wooden gate. Step by step, she walked closer to see why the old house looked so sad and forgotten.",
      "Chunk 4: Descriptive Words (Adjectives): Look at how adjectives make the story come alive: broken windows, crumbling walls, creaky gate, flapped door, curious girl, sad house! Adjectives paint pictures in our imagination.",
    ],
    textbookFullTextAr: [
      "الجزء 1: عند الطرف البعيد من القرية، كان يقف بيت قديم ومهجور. كانت نوافذه ذات زجاج مكسور، وجدرانه الحجرية متداعية، وبابه الأمامي يرفرف ذهاباً وإياباً مع هبوب الرياح الباردة.",
      "الجزء 2: لافتة خشبية صدئة فوق البوابة الصامتة كانت تحذر: 'ممنوع الدخول'. لكن الفتاة الصغيرة دولوريس لي (عمرها 7 سنوات) كانت شديدة الفضول، فوقفت على أطراف أصابعها لتسترق النظر إلى الحديقة الكثيفة.",
      "الجزء 3: دفعت دولوريس البوابة الخشبية برفق وهي تصدر صريراً حاداً، وخطت خطوة بخطوة لتقترب وتعرف سر هذا البيت الذي بدا حزيناً ومنسياً.",
      "الجزء 4: الكلمات الوصفية (الصفات): لاحظي كيف تجعل الصفات القصة حية في أذهاننا: نوافذ مكسورة، جدران متداعية، بوابة ذات صرير، باب يرفرف، فتاة فضولية! إنها ترسم صوراً ملونة في مخيلتنا.",
    ],

    coreScientificConcepts: [
      {
        termEn: "Adjectives (الكلمات الوصفية)",
        termAr: "الصفات التعبيرية",
        definitionEn: "Describing words that tell us how a noun looks, sounds, or feels (e.g. broken, crumbling, creaky, curious).",
        definitionAr: "كلمات تصف الأسماء وتخبرنا عن شكلها وصوتها وشعورها.",
        iconEmoji: "🎨",
      },
      {
        termEn: "Curious (فضولية / شغوفة بالاستكشاف)",
        termAr: "الفضول وحب المعرفة",
        definitionEn: "Eager to discover and explore new secrets and stories.",
        definitionAr: "الرغبة القوية في اكتشاف الأسرار ومعرفة ما يحدث حولنا.",
        iconEmoji: "🔍",
      },
      {
        termEn: "Crumbling (متداعٍ / متساقط الأطراف)",
        termAr: "متداعٍ ومتفتت",
        definitionEn: "Breaking into small pieces because of age or weathering.",
        definitionAr: "يتكسر ويتفتت إلى أجزاء صغيرة بسبب القدم والعوامل الجوية.",
        iconEmoji: "🧱",
      },
    ],

    vocabulary: [
      {
        word: "Broken",
        soundPrompt: "Broken. Damaged or in pieces.",
        imageEmoji: "🪟",
        simpleMeaningEn: "Cracked or in separate pieces.",
        hintAr: "💡 تلميح: مكسور ومتشقق إلى أجزاء مثل زجاج النوافذ.",
        practicePromptEn: "The old house had ________ glass in its windows.",
        practiceOptions: ["broken", "clean", "gold"],
        correctPracticeIndex: 0,
      },
      {
        word: "Crumbling",
        soundPrompt: "Crumbling. Breaking apart into small pieces.",
        imageEmoji: "🧱",
        simpleMeaningEn: "Falling apart into dusty fragments.",
        hintAr: "💡 تلميح: متداعٍ ومتساقط من الجدران القديمة.",
        practicePromptEn: "The stone walls were ________ because they were very old.",
        practiceOptions: ["crumbling", "shiny", "flying"],
        correctPracticeIndex: 0,
      },
      {
        word: "Curious",
        soundPrompt: "Curious. Wanting to learn and explore.",
        imageEmoji: "👧",
        simpleMeaningEn: "Wanting to know and explore secrets!",
        hintAr: "💡 تلميح: فتاة تحب الاستكشاف ومعرفة الأسرار.",
        practicePromptEn: "Dolores was very ________ to see what was inside.",
        practiceOptions: ["curious", "sleeping", "bored"],
        correctPracticeIndex: 0,
      },
    ],

    activityType: "learning_snake",
    activityLessonTitleEn: "Story Sentence Completion Challenge",
    activityLessonTitleAr: "تحدي تكملة جمل القصة بالكلمات الصحيحة",

    questionClarification: {
      promptEn: "Before you answer: Think about adjectives that describe sounds!",
      promptAr: "قبل الإجابة: تذكري يا زهرة الكلمة الوصفية التي تصف صوت البوابة القديمة!",
      visualIcon: "🚪",
      conceptPreviewEn: "An old wooden gate that makes a loud, squeaky sound is called a 'creaky' gate!",
      conceptPreviewAr: "البوابة الخشبية القديمة التي تصدر صوتاً حاداً عند فتحها تُوصف بأنها 'creaky' (ذات صرير)!",
    },

    question: {
      questionEn: "Which descriptive word tells us about the sound of the old gate?",
      arabicHint: "أي كلمة وصفية تشرح لنا الصوت الذي أصدرته البوابة الخشبية القديمة؟",
      options: [
        "creaky (تُصدر صريراً حاداً)",
        "delicious (لذيذة الطعم)",
        "fluffy (قطنية ناعمة)",
      ],
      correctIndex: 0,
      explanationEn: "Wonderful! 'Creaky' is an adjective that describes a squeaky grating sound made by old wood.",
      explanationArHint: "رائع! كلمة creaky صفة تصف صرير الخشب القديم عند تحريكه.",
    },

    spellingWords: [
      {
        id: "eng-sp1",
        wordEn: "House",
        wordAr: "البيت / المنزل",
        meaningEn: "A building where people live.",
        iconEmoji: "🏚️",
        sampleSentenceEn: "The old house stood at the end of the village.",
      },
      {
        id: "eng-sp2",
        wordEn: "Window",
        wordAr: "النافذة",
        meaningEn: "An opening in a wall with glass.",
        iconEmoji: "🪟",
        sampleSentenceEn: "The house had a broken window.",
      },
      {
        id: "eng-sp3",
        wordEn: "Broken",
        wordAr: "مكسور",
        meaningEn: "Cracked or damaged into pieces.",
        iconEmoji: "💔",
        sampleSentenceEn: "The glass was broken by the wind.",
      },
      {
        id: "eng-sp4",
        wordEn: "Curious",
        wordAr: "فضولية / شغوفة",
        meaningEn: "Eager to explore and know new things.",
        iconEmoji: "🔍",
        sampleSentenceEn: "Dolores Li was very curious.",
      },
      {
        id: "eng-sp5",
        wordEn: "Gate",
        wordAr: "البوابة",
        meaningEn: "A door in an outside wall or fence.",
        iconEmoji: "🚪",
        sampleSentenceEn: "She opened the creaky wooden gate.",
      },
    ],

    homeworkEn: "Cambridge Learner's Book p. 23: Write 3 descriptive sentences using the adjectives: broken, curious, and creaky!",
    homeworkAr: "كتاب اللغة الإنجليزية صفحة 23: اكتبي 3 جمل وصفية جميلة باستخدام الكلمات: broken و curious و creaky!",
  },
];
