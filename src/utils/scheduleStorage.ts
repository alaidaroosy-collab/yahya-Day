export interface ScheduleSubjectItem {
  id?: string;
  subjectKey?: "science" | "math" | "english";
  subjectNameEn: string;
  subjectNameAr: string;
  bookTitleEn: string;
  bookTitleAr: string;
  bookCode?: string;
  lessonNameEn: string;
  lessonNameAr: string;
  pageNumbers: string; // Must not be omitted!
  homework?: string;
  testQuiz?: string;
  color: string;
  bookIcon: string;
  durationMins: number;
  completed: boolean;
}

export interface DayScheduleItem {
  dateStr: string;
  dayNameEn: string;
  dayNameAr: string;
  isToday: boolean;
  isCompleted: boolean;
  subjects: ScheduleSubjectItem[];
  starsEarned: number;
}

export interface WeeklySchedulePlan {
  weekNumber: number;
  titleEn: string;
  titleAr: string;
  dateRangeEn: string;
  dateRangeAr: string;
  pageRange: string;
  status: "completed" | "in_progress" | "upcoming";
  scheduleImageUrl?: string;
  days: DayScheduleItem[];
}

const STORAGE_KEY = "cambridge_weekly_schedules_v5";

const defaultWeeks: WeeklySchedulePlan[] = [
  // ==========================================
  // WEEK 1
  // ==========================================
  {
    weekNumber: 1,
    titleEn: "Week 1: Light & Earth Foundations",
    titleAr: "الأسبوع 1: أساسيات الضوء والأرض",
    dateRangeEn: "7 – 11 Sep 2026",
    dateRangeAr: "٧ – ١١ سبتمبر ٢٠٢٦",
    pageRange: "Pages 14 – 17",
    status: "completed",
    scheduleImageUrl: "/weekly_plans/week1_plan.png",
    days: [
      {
        dateStr: "7 Sep 2026",
        dayNameEn: "Sunday",
        dayNameAr: "الأحد",
        isToday: false,
        isCompleted: true,
        subjects: [
          {
            id: "w1-sun-sci",
            subjectKey: "science",
            subjectNameEn: "Science",
            subjectNameAr: "العلوم",
            bookTitleEn: "Cambridge Science Learner's Book 3",
            bookTitleAr: "كتاب العلوم كامبريدج - المستوى الثالث",
            bookCode: "Stage 3 Science",
            lessonNameEn: "Why We Need Light",
            lessonNameAr: "لماذا نحتاج إلى الضوء",
            pageNumbers: "pp. 14–15",
            homework: "Activity Book p. 8 #1-2",
            color: "#002D62",
            bookIcon: "🔬",
            durationMins: 20,
            completed: true,
          },
          {
            id: "w1-sun-math",
            subjectKey: "math",
            subjectNameEn: "Maths",
            subjectNameAr: "الرياضيات",
            bookTitleEn: "Oxford Primary Mathematics 3",
            bookTitleAr: "كتاب الرياضيات أكسفورد - المستوى الثالث",
            bookCode: "Stage 3 Maths",
            lessonNameEn: "Counting to 1,000",
            lessonNameAr: "العد حتى 1,000",
            pageNumbers: "pp. 2–3",
            homework: "Workbook p. 4 #1-3",
            color: "#4338CA",
            bookIcon: "📐",
            durationMins: 20,
            completed: true,
          },
        ],
        starsEarned: 40,
      },
      {
        dateStr: "8 Sep 2026",
        dayNameEn: "Monday",
        dayNameAr: "الإثنين",
        isToday: false,
        isCompleted: true,
        subjects: [
          {
            id: "w1-mon-sci",
            subjectKey: "science",
            subjectNameEn: "Science",
            subjectNameAr: "العلوم",
            bookTitleEn: "Cambridge Science Learner's Book 3",
            bookTitleAr: "كتاب العلوم كامبريدج - المستوى الثالث",
            bookCode: "Stage 3 Science",
            lessonNameEn: "Natural vs Artificial Light",
            lessonNameAr: "مصادر الضوء الطبيعية والصناعية",
            pageNumbers: "pp. 16–17",
            homework: "Activity Book p. 9",
            color: "#002D62",
            bookIcon: "🔬",
            durationMins: 20,
            completed: true,
          },
          {
            id: "w1-mon-eng",
            subjectKey: "english",
            subjectNameEn: "English",
            subjectNameAr: "اللغة الإنجليزية",
            bookTitleEn: "Cambridge English Learner's Book 3",
            bookTitleAr: "كتاب اللغة الإنجليزية كامبريدج - المستوى الثالث",
            bookCode: "Stage 3 English",
            lessonNameEn: "Phonics & Story Words",
            lessonNameAr: "الأصوات وكلمات القصة",
            pageNumbers: "pp. 18–19",
            homework: "Spelling notebook #1-5",
            color: "#BE123C",
            bookIcon: "📖",
            durationMins: 20,
            completed: true,
          },
        ],
        starsEarned: 45,
      },
      {
        dateStr: "9 Sep 2026",
        dayNameEn: "Tuesday",
        dayNameAr: "الثلاثاء",
        isToday: false,
        isCompleted: true,
        subjects: [
          {
            id: "w1-tue-sci",
            subjectKey: "science",
            subjectNameEn: "Science",
            subjectNameAr: "العلوم",
            bookTitleEn: "Cambridge Science Learner's Book 3",
            bookTitleAr: "كتاب العلوم كامبريدج - المستوى الثالث",
            bookCode: "Stage 3 Science",
            lessonNameEn: "Darkness & Eyes",
            lessonNameAr: "الظلام وحاسة البصر",
            pageNumbers: "pp. 18–19",
            color: "#002D62",
            bookIcon: "🔬",
            durationMins: 20,
            completed: true,
          },
          {
            id: "w1-tue-math",
            subjectKey: "math",
            subjectNameEn: "Maths",
            subjectNameAr: "الرياضيات",
            bookTitleEn: "Oxford Primary Mathematics 3",
            bookTitleAr: "كتاب الرياضيات أكسفورد - المستوى الثالث",
            bookCode: "Stage 3 Maths",
            lessonNameEn: "Place Value Tens & Ones",
            lessonNameAr: "العشرات والآحاد",
            pageNumbers: "pp. 3–4",
            homework: "Workbook p. 5",
            color: "#4338CA",
            bookIcon: "📐",
            durationMins: 20,
            completed: true,
          },
        ],
        starsEarned: 40,
      },
      {
        dateStr: "10 Sep 2026",
        dayNameEn: "Wednesday",
        dayNameAr: "الأربعاء",
        isToday: false,
        isCompleted: true,
        subjects: [
          {
            id: "w1-wed-eng",
            subjectKey: "english",
            subjectNameEn: "English",
            subjectNameAr: "اللغة الإنجليزية",
            bookTitleEn: "Cambridge English Learner's Book 3",
            bookTitleAr: "كتاب اللغة الإنجليزية كامبريدج - المستوى الثالث",
            bookCode: "Stage 3 English",
            lessonNameEn: "Reading Comprehension",
            lessonNameAr: "فهم المقروء واستيعاب النص",
            pageNumbers: "pp. 20–21",
            color: "#BE123C",
            bookIcon: "📖",
            durationMins: 20,
            completed: true,
          },
          {
            id: "w1-wed-sci",
            subjectKey: "science",
            subjectNameEn: "Science",
            subjectNameAr: "العلوم",
            bookTitleEn: "Cambridge Science Learner's Book 3",
            bookTitleAr: "كتاب العلوم كامبريدج - المستوى الثالث",
            bookCode: "Stage 3 Science",
            lessonNameEn: "Mirror Reflections Lab",
            lessonNameAr: "انعكاس الضوء على المرايا",
            pageNumbers: "p. 20",
            homework: "Draw mirror in notebook",
            color: "#002D62",
            bookIcon: "🔬",
            durationMins: 20,
            completed: true,
          },
        ],
        starsEarned: 50,
      },
      {
        dateStr: "11 Sep 2026",
        dayNameEn: "Thursday",
        dayNameAr: "الخميس",
        isToday: false,
        isCompleted: true,
        subjects: [
          {
            id: "w1-thu-rev",
            subjectKey: "science",
            subjectNameEn: "Weekly Review",
            subjectNameAr: "مراجعة واختبار الأسبوع",
            bookTitleEn: "Cambridge Primary Checkpoint 3",
            bookTitleAr: "مراجعة كامبريدج الأسبوعية",
            bookCode: "Stage 3 Quiz",
            lessonNameEn: "Light & Dark Mastery Quiz",
            lessonNameAr: "اختبار مراجعة الضوء والظلام",
            pageNumbers: "pp. 14–20 Review",
            testQuiz: "Quiz ⭐ (Passed 100%)",
            color: "#059669",
            bookIcon: "🏆",
            durationMins: 25,
            completed: true,
          },
        ],
        starsEarned: 50,
      },
    ],
  },

  // ==========================================
  // WEEK 2
  // ==========================================
  {
    weekNumber: 2,
    titleEn: "Week 2: Shadows, Reflection & Vocabulary",
    titleAr: "الأسبوع 2: الظلال والانعكاس وبناء المفردات",
    dateRangeEn: "14 – 18 Sep 2026",
    dateRangeAr: "١٤ – ١٨ سبتمبر ٢٠٢٦",
    pageRange: "Pages 20 – 26",
    status: "completed",
    scheduleImageUrl: "/weekly_plans/week2_plan.png",
    days: [
      {
        dateStr: "14 Sep 2026",
        dayNameEn: "Sunday",
        dayNameAr: "الأحد",
        isToday: false,
        isCompleted: true,
        subjects: [
          {
            id: "w2-sun-sci",
            subjectKey: "science",
            subjectNameEn: "Science",
            subjectNameAr: "العلوم",
            bookTitleEn: "Cambridge Science Learner's Book 3",
            bookTitleAr: "كتاب العلوم كامبريدج - المستوى الثالث",
            bookCode: "Stage 3 Science",
            lessonNameEn: "How Shadows Form",
            lessonNameAr: "كيف تتكون الظلال",
            pageNumbers: "pp. 21–22",
            homework: "Activity Book p. 11",
            color: "#002D62",
            bookIcon: "🔬",
            durationMins: 20,
            completed: true,
          },
        ],
        starsEarned: 40,
      },
      {
        dateStr: "15 Sep 2026",
        dayNameEn: "Monday",
        dayNameAr: "الإثنين",
        isToday: false,
        isCompleted: true,
        subjects: [
          {
            id: "w2-mon-math",
            subjectKey: "math",
            subjectNameEn: "Maths",
            subjectNameAr: "الرياضيات",
            bookTitleEn: "Oxford Primary Mathematics 3",
            bookTitleAr: "كتاب الرياضيات أكسفورد - المستوى الثالث",
            bookCode: "Stage 3 Maths",
            lessonNameEn: "Comparing Numbers to 1,000",
            lessonNameAr: "مقارنة الأعداد حتى 1,000",
            pageNumbers: "pp. 6–7",
            homework: "Workbook p. 7",
            color: "#4338CA",
            bookIcon: "📐",
            durationMins: 20,
            completed: true,
          },
        ],
        starsEarned: 35,
      },
      {
        dateStr: "16 Sep 2026",
        dayNameEn: "Tuesday",
        dayNameAr: "الثلاثاء",
        isToday: false,
        isCompleted: true,
        subjects: [
          {
            id: "w2-tue-eng",
            subjectKey: "english",
            subjectNameEn: "English",
            subjectNameAr: "اللغة الإنجليزية",
            bookTitleEn: "Cambridge English Learner's Book 3",
            bookTitleAr: "كتاب اللغة الإنجليزية كامبريدج - المستوى الثالث",
            bookCode: "Stage 3 English",
            lessonNameEn: "Adjectives & Describing Nouns",
            lessonNameAr: "الصفات والكلمات الوصفية",
            pageNumbers: "pp. 24–25",
            homework: "Grammar sheet #1-4",
            color: "#BE123C",
            bookIcon: "📖",
            durationMins: 20,
            completed: true,
          },
        ],
        starsEarned: 45,
      },
      {
        dateStr: "17 Sep 2026",
        dayNameEn: "Wednesday",
        dayNameAr: "الأربعاء",
        isToday: false,
        isCompleted: true,
        subjects: [
          {
            id: "w2-wed-sci",
            subjectKey: "science",
            subjectNameEn: "Science",
            subjectNameAr: "العلوم",
            bookTitleEn: "Cambridge Science Learner's Book 3",
            bookTitleAr: "كتاب العلوم كامبريدج - المستوى الثالث",
            bookCode: "Stage 3 Science",
            lessonNameEn: "Opaque, Translucent & Transparent",
            lessonNameAr: "المواد المعتمة والشفافة ونصف الشفافة",
            pageNumbers: "pp. 24–25",
            color: "#002D62",
            bookIcon: "🔬",
            durationMins: 20,
            completed: true,
          },
        ],
        starsEarned: 40,
      },
      {
        dateStr: "18 Sep 2026",
        dayNameEn: "Thursday",
        dayNameAr: "الخميس",
        isToday: false,
        isCompleted: true,
        subjects: [
          {
            id: "w2-thu-rev",
            subjectKey: "math",
            subjectNameEn: "Maths Assessment",
            subjectNameAr: "تقييم الرياضيات",
            bookTitleEn: "Oxford Primary Mathematics 3",
            bookTitleAr: "كتاب الرياضيات أكسفورد - المستوى الثالث",
            bookCode: "Stage 3 Maths",
            lessonNameEn: "End of Chapter 1 Quiz",
            lessonNameAr: "اختبار الفصل الأول في الأعداد",
            pageNumbers: "p. 8 Quiz",
            testQuiz: "Test ⭐ (Passed 100%)",
            color: "#059669",
            bookIcon: "🏆",
            durationMins: 25,
            completed: true,
          },
        ],
        starsEarned: 50,
      },
    ],
  },

  // ==========================================
  // WEEK 3 (CURRENT ACTIVE WEEK!)
  // ==========================================
  {
    weekNumber: 3,
    titleEn: "Week 3: Light Sources, Numbers to 10,000 & The Sad House",
    titleAr: "الأسبوع 3: مصادر الضوء، الأعداد حتى 10,000 وقصة البيت الحزين",
    dateRangeEn: "20 – 24 Sep 2026 (Active)",
    dateRangeAr: "٢٠ – ٢٤ سبتمبر ٢٠٢٦ (الأسبوع الحالي)",
    pageRange: "Science p.14, Math p.4, English p.22",
    status: "in_progress",
    scheduleImageUrl: "/weekly_plans/week3_plan.png",
    days: [
      {
        dateStr: "20 Sep 2026",
        dayNameEn: "Sunday",
        dayNameAr: "الأحد",
        isToday: true,
        isCompleted: false,
        subjects: [
          {
            id: "w3-sun-sci",
            subjectKey: "science",
            subjectNameEn: "Science",
            subjectNameAr: "العلوم",
            bookTitleEn: "Cambridge Primary Science Learner's Book 3",
            bookTitleAr: "كتاب العلوم كامبريدج - المستوى الثالث",
            bookCode: "Stage 3 Science",
            lessonNameEn: "Where Does Light Come From?",
            lessonNameAr: "من أين يأتي الضوء؟ ومصادره",
            pageNumbers: "pp. 14–15",
            homework: "Activity Book p. 12: Draw 2 light sources",
            color: "#002D62",
            bookIcon: "🔬",
            durationMins: 20,
            completed: false,
          },
          {
            id: "w3-sun-math",
            subjectKey: "math",
            subjectNameEn: "Mathematics",
            subjectNameAr: "الرياضيات",
            bookTitleEn: "Oxford Primary Mathematics Textbook 3",
            bookTitleAr: "كتاب الرياضيات أكسفورد - المستوى الثالث",
            bookCode: "Stage 3 Maths",
            lessonNameEn: "Place Value: Thousands, Hundreds, Tens & Ones",
            lessonNameAr: "القيمة المكانية: الآلاف، المئات، العشرات والآحاد",
            pageNumbers: "pp. 4–5",
            homework: "Textbook p. 5 #1-4: Expanded notation",
            color: "#4338CA",
            bookIcon: "📐",
            durationMins: 20,
            completed: false,
          },
          {
            id: "w3-sun-eng",
            subjectKey: "english",
            subjectNameEn: "English",
            subjectNameAr: "اللغة الإنجليزية",
            bookTitleEn: "Cambridge Primary English Learner's Book 3",
            bookTitleAr: "كتاب اللغة الإنجليزية كامبريدج - المستوى الثالث",
            bookCode: "Stage 3 English",
            lessonNameEn: "Story: The House that was Sad (Dolores Li)",
            lessonNameAr: "قصة البيت الحزين والصفات التعبيرية",
            pageNumbers: "pp. 22–23",
            homework: "Learner's Book p. 23: 3 descriptive sentences",
            color: "#BE123C",
            bookIcon: "📖",
            durationMins: 20,
            completed: false,
          },
        ],
        starsEarned: 0,
      },
      {
        dateStr: "21 Sep 2026",
        dayNameEn: "Monday",
        dayNameAr: "الإثنين",
        isToday: false,
        isCompleted: false,
        subjects: [
          {
            id: "w3-mon-sci",
            subjectKey: "science",
            subjectNameEn: "Science",
            subjectNameAr: "العلوم",
            bookTitleEn: "Cambridge Primary Science Learner's Book 3",
            bookTitleAr: "كتاب العلوم كامبريدج - المستوى الثالث",
            bookCode: "Stage 3 Science",
            lessonNameEn: "Investigating Darkness with Boxes",
            lessonNameAr: "استقصاء الظلام التام بالصناديق",
            pageNumbers: "pp. 16–17",
            homework: "Record observation in Activity Book",
            color: "#002D62",
            bookIcon: "🔬",
            durationMins: 20,
            completed: false,
          },
          {
            id: "w3-mon-math",
            subjectKey: "math",
            subjectNameEn: "Mathematics",
            subjectNameAr: "الرياضيات",
            bookTitleEn: "Oxford Primary Mathematics Textbook 3",
            bookTitleAr: "كتاب الرياضيات أكسفورد - المستوى الثالث",
            bookCode: "Stage 3 Maths",
            lessonNameEn: "Comparing & Ordering 4-Digit Numbers",
            lessonNameAr: "مقارنة وترتيب الأعداد المكونة من 4 منازل",
            pageNumbers: "pp. 6–7",
            homework: "Workbook p. 8 #1-5",
            color: "#4338CA",
            bookIcon: "📐",
            durationMins: 20,
            completed: false,
          },
        ],
        starsEarned: 0,
      },
      {
        dateStr: "22 Sep 2026",
        dayNameEn: "Tuesday",
        dayNameAr: "الثلاثاء",
        isToday: false,
        isCompleted: false,
        subjects: [
          {
            id: "w3-tue-eng",
            subjectKey: "english",
            subjectNameEn: "English",
            subjectNameAr: "اللغة الإنجليزية",
            bookTitleEn: "Cambridge Primary English Learner's Book 3",
            bookTitleAr: "كتاب اللغة الإنجليزية كامبريدج - المستوى الثالث",
            bookCode: "Stage 3 English",
            lessonNameEn: "Adjectives Hunt in the Story",
            lessonNameAr: "استخراج الصفات الوصفية من القصة",
            pageNumbers: "p. 24",
            homework: "Write 4 new adjectives with sentences",
            color: "#BE123C",
            bookIcon: "📖",
            durationMins: 20,
            completed: false,
          },
          {
            id: "w3-tue-sci",
            subjectKey: "science",
            subjectNameEn: "Science",
            subjectNameAr: "العلوم",
            bookTitleEn: "Cambridge Primary Science Learner's Book 3",
            bookTitleAr: "كتاب العلوم كامبريدج - المستوى الثالث",
            bookCode: "Stage 3 Science",
            lessonNameEn: "Safety with Bright Light & Sun",
            lessonNameAr: "السلامة من الأضواء الساطعة والشمس",
            pageNumbers: "pp. 18–19",
            color: "#002D62",
            bookIcon: "🔬",
            durationMins: 20,
            completed: false,
          },
        ],
        starsEarned: 0,
      },
      {
        dateStr: "23 Sep 2026",
        dayNameEn: "Wednesday",
        dayNameAr: "الأربعاء",
        isToday: false,
        isCompleted: false,
        subjects: [
          {
            id: "w3-wed-math",
            subjectKey: "math",
            subjectNameEn: "Mathematics",
            subjectNameAr: "الرياضيات",
            bookTitleEn: "Oxford Primary Mathematics Textbook 3",
            bookTitleAr: "كتاب الرياضيات أكسفورد - المستوى الثالث",
            bookCode: "Stage 3 Maths",
            lessonNameEn: "Rounding to Nearest 10 and 100",
            lessonNameAr: "التقريب لأقرب 10 وأقرب 100",
            pageNumbers: "pp. 8–9",
            homework: "Workbook p. 10",
            color: "#4338CA",
            bookIcon: "📐",
            durationMins: 20,
            completed: false,
          },
          {
            id: "w3-wed-eng",
            subjectKey: "english",
            subjectNameEn: "English",
            subjectNameAr: "اللغة الإنجليزية",
            bookTitleEn: "Cambridge Primary English Learner's Book 3",
            bookTitleAr: "كتاب اللغة الإنجليزية كامبريدج - المستوى الثالث",
            bookCode: "Stage 3 English",
            lessonNameEn: "Creative Writing: Dolores's Next Step",
            lessonNameAr: "التعبير الكتابي: ماذا حدث لدولوريس بعد ذلك؟",
            pageNumbers: "p. 25",
            homework: "Write a 4-line story ending",
            color: "#BE123C",
            bookIcon: "📖",
            durationMins: 20,
            completed: false,
          },
        ],
        starsEarned: 0,
      },
      {
        dateStr: "24 Sep 2026",
        dayNameEn: "Thursday",
        dayNameAr: "الخميس",
        isToday: false,
        isCompleted: false,
        subjects: [
          {
            id: "w3-thu-chk",
            subjectKey: "science",
            subjectNameEn: "Weekly Mastery",
            subjectNameAr: "الاختبار الأسبوعي التراكمي",
            bookTitleEn: "Cambridge & Oxford Weekly Checkpoint",
            bookTitleAr: "مراجعة واختبار نهاية الأسبوع الثالث",
            bookCode: "Week 3 Quiz",
            lessonNameEn: "Science & Maths Checkpoint Assessment",
            lessonNameAr: "اختبار مراجعة العلوم والرياضيات",
            pageNumbers: "Week 3 Mastery pp. 14–25",
            testQuiz: "Checkpoint Quiz ⭐",
            color: "#D97706",
            bookIcon: "🏆",
            durationMins: 25,
            completed: false,
          },
        ],
        starsEarned: 0,
      },
    ],
  },

  // ==========================================
  // WEEK 4
  // ==========================================
  {
    weekNumber: 4,
    titleEn: "Week 4: Planet Earth Layers & Addition to 10,000",
    titleAr: "الأسبوع 4: طبقات كوكب الأرض والجمع حتى 10,000",
    dateRangeEn: "27 Sep – 1 Oct 2026",
    dateRangeAr: "٢٧ سبتمبر – ١ أكتوبر ٢٠٢٦",
    pageRange: "Science pp. 30–35, Math pp. 10–15",
    status: "upcoming",
    days: [
      {
        dateStr: "27 Sep 2026",
        dayNameEn: "Sunday",
        dayNameAr: "الأحد",
        isToday: false,
        isCompleted: false,
        subjects: [
          {
            id: "w4-sun-sci",
            subjectKey: "science",
            subjectNameEn: "Science",
            subjectNameAr: "العلوم",
            bookTitleEn: "Cambridge Science Learner's Book 3",
            bookTitleAr: "كتاب العلوم كامبريدج - المستوى الثالث",
            bookCode: "Stage 3 Science",
            lessonNameEn: "Inside Planet Earth: Crust, Mantle & Core",
            lessonNameAr: "داخل كوكب الأرض: القشرة، الوشاح واللب",
            pageNumbers: "pp. 30–31",
            homework: "Activity Book p. 22",
            color: "#002D62",
            bookIcon: "🔬",
            durationMins: 20,
            completed: false,
          },
        ],
        starsEarned: 0,
      },
      {
        dateStr: "28 Sep 2026",
        dayNameEn: "Monday",
        dayNameAr: "الإثنين",
        isToday: false,
        isCompleted: false,
        subjects: [
          {
            id: "w4-mon-math",
            subjectKey: "math",
            subjectNameEn: "Maths",
            subjectNameAr: "الرياضيات",
            bookTitleEn: "Oxford Primary Mathematics 3",
            bookTitleAr: "كتاب الرياضيات أكسفورد - المستوى الثالث",
            bookCode: "Stage 3 Maths",
            lessonNameEn: "Addition within 10,000 with Regrouping",
            lessonNameAr: "الجمع ضمن 10,000 مع إعادة التجميع",
            pageNumbers: "pp. 12–13",
            color: "#4338CA",
            bookIcon: "📐",
            durationMins: 20,
            completed: false,
          },
        ],
        starsEarned: 0,
      },
      {
        dateStr: "29 Sep 2026",
        dayNameEn: "Tuesday",
        dayNameAr: "الثلاثاء",
        isToday: false,
        isCompleted: false,
        subjects: [
          {
            id: "w4-tue-eng",
            subjectKey: "english",
            subjectNameEn: "English",
            subjectNameAr: "اللغة الإنجليزية",
            bookTitleEn: "Cambridge English Learner's Book 3",
            bookTitleAr: "كتاب اللغة الإنجليزية كامبريدج - المستوى الثالث",
            bookCode: "Stage 3 English",
            lessonNameEn: "Dialogue & Speech Marks",
            lessonNameAr: "الحوار وعلامات التنصيص في القصص",
            pageNumbers: "pp. 28–29",
            color: "#BE123C",
            bookIcon: "📖",
            durationMins: 20,
            completed: false,
          },
        ],
        starsEarned: 0,
      },
      {
        dateStr: "30 Sep 2026",
        dayNameEn: "Wednesday",
        dayNameAr: "الأربعاء",
        isToday: false,
        isCompleted: false,
        subjects: [
          {
            id: "w4-wed-sci",
            subjectKey: "science",
            subjectNameEn: "Science",
            subjectNameAr: "العلوم",
            bookTitleEn: "Cambridge Science Learner's Book 3",
            bookTitleAr: "كتاب العلوم كامبريدج - المستوى الثالث",
            bookCode: "Stage 3 Science",
            lessonNameEn: "Rocks & Soil Formation",
            lessonNameAr: "الصخور وتكوين التربة",
            pageNumbers: "pp. 34–35",
            color: "#002D62",
            bookIcon: "🔬",
            durationMins: 20,
            completed: false,
          },
        ],
        starsEarned: 0,
      },
      {
        dateStr: "1 Oct 2026",
        dayNameEn: "Thursday",
        dayNameAr: "الخميس",
        isToday: false,
        isCompleted: false,
        subjects: [
          {
            id: "w4-thu-rev",
            subjectKey: "science",
            subjectNameEn: "Earth Science Quiz",
            subjectNameAr: "اختبار علوم الأرض",
            bookTitleEn: "Cambridge Primary Science 3",
            bookTitleAr: "كتاب العلوم كامبريدج - المستوى الثالث",
            bookCode: "Stage 3 Science",
            lessonNameEn: "Earth Layers Model Checkpoint",
            lessonNameAr: "اختبار نموذج طبقات كوكب الأرض",
            pageNumbers: "p. 36 Quiz",
            testQuiz: "Quiz ⭐",
            color: "#D97706",
            bookIcon: "🏆",
            durationMins: 25,
            completed: false,
          },
        ],
        starsEarned: 0,
      },
    ],
  },

  // ==========================================
  // WEEK 5
  // ==========================================
  {
    weekNumber: 5,
    titleEn: "Week 5: Plant Roots, Subtraction & Poetry",
    titleAr: "الأسبوع 5: جذور النباتات، الطرح والشعر",
    dateRangeEn: "4 – 8 Oct 2026",
    dateRangeAr: "٤ – ٨ أكتوبر ٢٠٢٦",
    pageRange: "Science pp. 38–42, Math pp. 16–20",
    status: "upcoming",
    days: [
      {
        dateStr: "4 Oct 2026",
        dayNameEn: "Sunday",
        dayNameAr: "الأحد",
        isToday: false,
        isCompleted: false,
        subjects: [
          {
            id: "w5-sun-sci",
            subjectKey: "science",
            subjectNameEn: "Science",
            subjectNameAr: "العلوم",
            bookTitleEn: "Cambridge Science Learner's Book 3",
            bookTitleAr: "كتاب العلوم كامبريدج - المستوى الثالث",
            bookCode: "Stage 3 Science",
            lessonNameEn: "Parts of Plants & Roots",
            lessonNameAr: "أجزاء النبات ووظائف الجذور",
            pageNumbers: "pp. 38–39",
            color: "#002D62",
            bookIcon: "🔬",
            durationMins: 20,
            completed: false,
          },
        ],
        starsEarned: 0,
      },
      {
        dateStr: "5 Oct 2026",
        dayNameEn: "Monday",
        dayNameAr: "الإثنين",
        isToday: false,
        isCompleted: false,
        subjects: [
          {
            id: "w5-mon-math",
            subjectKey: "math",
            subjectNameEn: "Maths",
            subjectNameAr: "الرياضيات",
            bookTitleEn: "Oxford Primary Mathematics 3",
            bookTitleAr: "كتاب الرياضيات أكسفورد - المستوى الثالث",
            bookCode: "Stage 3 Maths",
            lessonNameEn: "Subtraction within 10,000",
            lessonNameAr: "الطرح ضمن 10,000",
            pageNumbers: "pp. 18–19",
            color: "#4338CA",
            bookIcon: "📐",
            durationMins: 20,
            completed: false,
          },
        ],
        starsEarned: 0,
      },
      {
        dateStr: "6 Oct 2026",
        dayNameEn: "Tuesday",
        dayNameAr: "الثلاثاء",
        isToday: false,
        isCompleted: false,
        subjects: [
          {
            id: "w5-tue-eng",
            subjectKey: "english",
            subjectNameEn: "English",
            subjectNameAr: "اللغة الإنجليزية",
            bookTitleEn: "Cambridge English Learner's Book 3",
            bookTitleAr: "كتاب اللغة الإنجليزية كامبريدج - المستوى الثالث",
            bookCode: "Stage 3 English",
            lessonNameEn: "Rhyming Poems & Rhythm",
            lessonNameAr: "القصائد المقفاة والإيقاع الصوتي",
            pageNumbers: "pp. 32–33",
            color: "#BE123C",
            bookIcon: "📖",
            durationMins: 20,
            completed: false,
          },
        ],
        starsEarned: 0,
      },
      {
        dateStr: "7 Oct 2026",
        dayNameEn: "Wednesday",
        dayNameAr: "الأربعاء",
        isToday: false,
        isCompleted: false,
        subjects: [
          {
            id: "w5-wed-sci",
            subjectKey: "science",
            subjectNameEn: "Science",
            subjectNameAr: "العلوم",
            bookTitleEn: "Cambridge Science Learner's Book 3",
            bookTitleAr: "كتاب العلوم كامبريدج - المستوى الثالث",
            bookCode: "Stage 3 Science",
            lessonNameEn: "Water Transportation in Stems",
            lessonNameAr: "انتقال الماء في سيقان النباتات",
            pageNumbers: "pp. 40–41",
            color: "#002D62",
            bookIcon: "🔬",
            durationMins: 20,
            completed: false,
          },
        ],
        starsEarned: 0,
      },
      {
        dateStr: "8 Oct 2026",
        dayNameEn: "Thursday",
        dayNameAr: "الخميس",
        isToday: false,
        isCompleted: false,
        subjects: [
          {
            id: "w5-thu-rev",
            subjectKey: "english",
            subjectNameEn: "Weekly Review",
            subjectNameAr: "المراجعة الأسبوعية",
            bookTitleEn: "Cambridge Primary Checkpoint 3",
            bookTitleAr: "مراجعة وتقييم الأسبوع الخامس",
            bookCode: "Week 5 Quiz",
            lessonNameEn: "Plant Life & Poetry Recitation Quiz",
            lessonNameAr: "اختبار حياة النبات وإلقاء الشعر",
            pageNumbers: "pp. 38–42 Review",
            testQuiz: "Quiz ⭐",
            color: "#059669",
            bookIcon: "🏆",
            durationMins: 25,
            completed: false,
          },
        ],
        starsEarned: 0,
      },
    ],
  },
];

class ScheduleStorageService {
  private weeks: WeeklySchedulePlan[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    if (typeof window === "undefined") {
      this.weeks = defaultWeeks;
      return;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.weeks = parsed;
          return;
        }
      }
    } catch {
      // Fallback
    }

    this.weeks = defaultWeeks;
    this.saveToStorage();
  }

  private saveToStorage() {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.weeks));
    } catch {
      // ignore
    }
  }

  public getAllWeeks(): WeeklySchedulePlan[] {
    return this.weeks;
  }

  public getWeekByNumber(num: number): WeeklySchedulePlan | undefined {
    return this.weeks.find((w) => w.weekNumber === num);
  }

  public uploadScheduleForWeek(
    weekNumber: number,
    scheduleImageUrl: string,
    titleEn?: string,
    titleAr?: string
  ) {
    const existingIdx = this.weeks.findIndex((w) => w.weekNumber === weekNumber);

    if (existingIdx >= 0) {
      this.weeks[existingIdx] = {
        ...this.weeks[existingIdx],
        scheduleImageUrl,
        titleEn: titleEn || this.weeks[existingIdx].titleEn,
        titleAr: titleAr || this.weeks[existingIdx].titleAr,
      };
    } else {
      // Create new week without deleting old ones!
      const newWeek: WeeklySchedulePlan = {
        weekNumber,
        titleEn: titleEn || `Week ${weekNumber}: Cambridge Timetable Plan`,
        titleAr: titleAr || `الأسبوع ${weekNumber}: جدول الحصص الأسبوعي`,
        dateRangeEn: `Week ${weekNumber}`,
        dateRangeAr: `الأسبوع ${weekNumber}`,
        pageRange: "Pages to be assigned",
        status: "upcoming",
        scheduleImageUrl,
        days: [
          {
            dateStr: `Week ${weekNumber} Day 1`,
            dayNameEn: "Sunday",
            dayNameAr: "الأحد",
            isToday: false,
            isCompleted: false,
            subjects: [
              {
                subjectNameEn: "Science",
                subjectNameAr: "العلوم",
                bookTitleEn: "Cambridge Primary Science 3",
                bookTitleAr: "كتاب العلوم كامبريدج 3",
                lessonNameEn: "Lesson to be scheduled",
                lessonNameAr: "درس في الجدول المرفوع",
                pageNumbers: "pp. TBA",
                color: "#002D62",
                bookIcon: "🔬",
                durationMins: 20,
                completed: false,
              },
            ],
            starsEarned: 0,
          },
          {
            dateStr: `Week ${weekNumber} Day 2`,
            dayNameEn: "Monday",
            dayNameAr: "الإثنين",
            isToday: false,
            isCompleted: false,
            subjects: [],
            starsEarned: 0,
          },
          {
            dateStr: `Week ${weekNumber} Day 3`,
            dayNameEn: "Tuesday",
            dayNameAr: "الثلاثاء",
            isToday: false,
            isCompleted: false,
            subjects: [],
            starsEarned: 0,
          },
          {
            dateStr: `Week ${weekNumber} Day 4`,
            dayNameEn: "Wednesday",
            dayNameAr: "الأربعاء",
            isToday: false,
            isCompleted: false,
            subjects: [],
            starsEarned: 0,
          },
          {
            dateStr: `Week ${weekNumber} Day 5`,
            dayNameEn: "Thursday",
            dayNameAr: "الخميس",
            isToday: false,
            isCompleted: false,
            subjects: [],
            starsEarned: 0,
          },
        ],
      };
      this.weeks.push(newWeek);
      this.weeks.sort((a, b) => a.weekNumber - b.weekNumber);
    }

    this.saveToStorage();
  }
}

export const scheduleStorage = new ScheduleStorageService();
