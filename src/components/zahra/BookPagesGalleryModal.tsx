import React, { useState } from "react";
import { X, BookOpen, ZoomIn, Download, ExternalLink, Filter, Layers, FileText } from "lucide-react";

export interface BookGalleryItem {
  id: string;
  bookTitleEn: string;
  bookTitleAr: string;
  category: "science" | "math" | "english" | "plan";
  pageNumber: number | string;
  titleEn: string;
  titleAr: string;
  imageUrl: string;
  sourceLabel: string;
}

export const bookGalleryItems: BookGalleryItem[] = [
  // Science Pages
  {
    id: "sci-14",
    bookTitleEn: "Cambridge Primary Science 3",
    bookTitleAr: "كتاب العلوم - الصف الثالث",
    category: "science",
    pageNumber: 14,
    titleEn: "Unit 1.1: Where does light come from? (Dark & Light Bedrooms)",
    titleAr: "الوحدة 1.1: من أين يأتي الضوء؟ (غرفتي النوم)",
    imageUrl: "/textbook_pages/science_sb_p14.png",
    sourceLabel: "Student Book p. 14",
  },
  {
    id: "sci-15",
    bookTitleEn: "Cambridge Primary Science 3",
    bookTitleAr: "كتاب العلوم - الصف الثالث",
    category: "science",
    pageNumber: 15,
    titleEn: "Unit 1.1: Light travels from sources & Natural vs Artificial",
    titleAr: "الوحدة 1.1: انتقال الضوء من مصادره والمصادر الطبيعية والصناعية",
    imageUrl: "/textbook_pages/science_sb_p15.png",
    sourceLabel: "Student Book p. 15",
  },
  {
    id: "sci-16",
    bookTitleEn: "Cambridge Primary Science 3",
    bookTitleAr: "كتاب العلوم - الصف الثالث",
    category: "science",
    pageNumber: 16,
    titleEn: "Unit 1.2: Is a mirror a source of light? Reflection explanation",
    titleAr: "الوحدة 1.2: هل المرآة مصدر ضوء؟ شرح الانعكاس",
    imageUrl: "/textbook_pages/science_sb_p16.png",
    sourceLabel: "Student Book p. 16",
  },
  {
    id: "sci-17",
    bookTitleEn: "Cambridge Primary Science 3",
    bookTitleAr: "كتاب العلوم - الصف الثالث",
    category: "science",
    pageNumber: 17,
    titleEn: "Unit 1.2: Eye Safety & Protecting Vision in Bright Light",
    titleAr: "الوحدة 1.2: حماية العينين وقواعد السلامة في الضوء الشديد",
    imageUrl: "/textbook_pages/science_sb_p17.png",
    sourceLabel: "Student Book p. 17",
  },
  {
    id: "sci-20",
    bookTitleEn: "Cambridge Primary Science 3",
    bookTitleAr: "كتاب العلوم - الصف الثالث",
    category: "science",
    pageNumber: 20,
    titleEn: "Unit 1.3: What is darkness? Absence of light",
    titleAr: "الوحدة 1.3: ما هو الظلام؟ غياب الضوء والحواس",
    imageUrl: "/textbook_pages/science_sb_p20.png",
    sourceLabel: "Student Book p. 20",
  },
  {
    id: "sci-21",
    bookTitleEn: "Cambridge Primary Science 3",
    bookTitleAr: "كتاب العلوم - الصف الثالث",
    category: "science",
    pageNumber: 21,
    titleEn: "Unit 1.3: STEM Investigating darkness & The Dark Box",
    titleAr: "الوحدة 1.3: استقصاء الظلام وصنع صندوق الظلام",
    imageUrl: "/textbook_pages/science_sb_p21.png",
    sourceLabel: "Student Book p. 21",
  },
  {
    id: "sci-22",
    bookTitleEn: "Cambridge Primary Science 3",
    bookTitleAr: "كتاب العلوم - الصف الثالث",
    category: "science",
    pageNumber: 22,
    titleEn: "Unit 1.4: Investigating Shadows & Shadow Making",
    titleAr: "الوحدة 1.4: استقصاء الظلال وكيف يتكون الظل",
    imageUrl: "/textbook_pages/science_sb_p22.png",
    sourceLabel: "Student Book p. 22",
  },
  {
    id: "sci-26",
    bookTitleEn: "Cambridge Primary Science 3",
    bookTitleAr: "كتاب العلوم - الصف الثالث",
    category: "science",
    pageNumber: 26,
    titleEn: "Unit 1 Review: Light & Shadows Mastery Questions",
    titleAr: "مراجعة الوحدة الأولى: أسئلة إتقان الضوء والظلال",
    imageUrl: "/textbook_pages/science_sb_p26.png",
    sourceLabel: "Student Book p. 26",
  },
  {
    id: "sci-27",
    bookTitleEn: "Cambridge Primary Science 3",
    bookTitleAr: "كتاب العلوم - الصف الثالث",
    category: "science",
    pageNumber: 27,
    titleEn: "Unit 1 Review: Self Assessment Checklist",
    titleAr: "مراجعة الوحدة الأولى: قائمة التقييم الذاتي",
    imageUrl: "/textbook_pages/science_sb_p27.png",
    sourceLabel: "Student Book p. 27",
  },

  // English Pages
  {
    id: "eng-10",
    bookTitleEn: "Cambridge Primary English 3",
    bookTitleAr: "كتاب اللغة الإنجليزية - الصف الثالث",
    category: "english",
    pageNumber: 10,
    titleEn: "Unit 1: Home and School Introduction",
    titleAr: "الوحدة 1: البيت والمدرسة - مقدمة الوحدة",
    imageUrl: "/textbook_pages/english_sb_p10.png",
    sourceLabel: "Student Book p. 10",
  },
  {
    id: "eng-14",
    bookTitleEn: "Cambridge Primary English 3",
    bookTitleAr: "كتاب اللغة الإنجليزية - الصف الثالث",
    category: "english",
    pageNumber: 14,
    titleEn: "Unit 1: Morning Poem & Reading",
    titleAr: "الوحدة 1: قصيدة وقراءة الصباح (Morning)",
    imageUrl: "/textbook_pages/english_sb_p14.png",
    sourceLabel: "Student Book p. 14",
  },
  {
    id: "eng-16",
    bookTitleEn: "Cambridge Primary English 3",
    bookTitleAr: "كتاب اللغة الإنجليزية - الصف الثالث",
    category: "english",
    pageNumber: 16,
    titleEn: "Unit 1: The Butterfly Story & Comprehension",
    titleAr: "الوحدة 1: قصة الفراشة واستيعاب المقروء",
    imageUrl: "/textbook_pages/english_sb_p16.png",
    sourceLabel: "Student Book p. 16",
  },
  {
    id: "eng-18",
    bookTitleEn: "Cambridge Primary English 3",
    bookTitleAr: "كتاب اللغة الإنجليزية - الصف الثالث",
    category: "english",
    pageNumber: 18,
    titleEn: "Unit 1: Grammar and Vocabulary (Nouns & Adjectives)",
    titleAr: "الوحدة 1: القواعد والمفردات اللغوية (الأسماء والصفات)",
    imageUrl: "/textbook_pages/english_sb_p18.png",
    sourceLabel: "Student Book p. 18",
  },
  {
    id: "eng-22",
    bookTitleEn: "Cambridge Primary English 3",
    bookTitleAr: "كتاب اللغة الإنجليزية - الصف الثالث",
    category: "english",
    pageNumber: 22,
    titleEn: "Unit 1: The House that was Sad (Reading & Expression)",
    titleAr: "الوحدة 1: قصة البيت الحزين والتعبير الكتابي",
    imageUrl: "/textbook_pages/english_sb_p22.png",
    sourceLabel: "Student Book p. 22",
  },

  // Math Pages
  {
    id: "math-03",
    bookTitleEn: "Oxford Primary Mathematics 3",
    bookTitleAr: "كتاب الرياضيات - الصف الثالث",
    category: "math",
    pageNumber: 3,
    titleEn: "Chapter 1: Numbers to 1,000 Introduction",
    titleAr: "الفصل 1: مقدمة الأعداد حتى 1,000",
    imageUrl: "/textbook_pages/math_sb_p03.png",
    sourceLabel: "Textbook 3 p. 3",
  },
  {
    id: "math-04",
    bookTitleEn: "Oxford Primary Mathematics 3",
    bookTitleAr: "كتاب الرياضيات - الصف الثالث",
    category: "math",
    pageNumber: 4,
    titleEn: "Chapter 1.1: Counting to 10,000",
    titleAr: "الفصل 1.1: العد حتى 10,000",
    imageUrl: "/textbook_pages/math_sb_p04.png",
    sourceLabel: "Textbook 3 p. 4",
  },
  {
    id: "math-06",
    bookTitleEn: "Oxford Primary Mathematics 3",
    bookTitleAr: "كتاب الرياضيات - الصف الثالث",
    category: "math",
    pageNumber: 6,
    titleEn: "Chapter 1.2: Place Value of 4-digit Numbers",
    titleAr: "الفصل 1.2: القيمة المكانية للأعداد المكونة من 4 منازل",
    imageUrl: "/textbook_pages/math_sb_p06.png",
    sourceLabel: "Textbook 3 p. 6",
  },
  {
    id: "math-09",
    bookTitleEn: "Oxford Primary Mathematics 3",
    bookTitleAr: "كتاب الرياضيات - الصف الثالث",
    category: "math",
    pageNumber: 9,
    titleEn: "Lesson 3: Comparing and Ordering Numbers",
    titleAr: "الدرس 3: مقارنة وترتيب الأعداد",
    imageUrl: "/textbook_pages/math_sb_p09.png",
    sourceLabel: "Textbook 3 p. 9",
  },
  {
    id: "math-14",
    bookTitleEn: "Oxford Primary Mathematics 3",
    bookTitleAr: "كتاب الرياضيات - الصف الثالث",
    category: "math",
    pageNumber: 14,
    titleEn: "Lesson 3: Practice Comparing Numbers to 10,000",
    titleAr: "الدرس 3: تدريبات مقارنة الأعداد حتى 10,000",
    imageUrl: "/textbook_pages/math_sb_p14.png",
    sourceLabel: "Textbook 3 p. 14",
  },
  {
    id: "math-22",
    bookTitleEn: "Oxford Primary Mathematics 3",
    bookTitleAr: "كتاب الرياضيات - الصف الثالث",
    category: "math",
    pageNumber: 22,
    titleEn: "Chapter 2: Addition and Subtraction within 10,000",
    titleAr: "الفصل 2: الجمع والطرح ضمن 10,000",
    imageUrl: "/textbook_pages/math_sb_p22.png",
    sourceLabel: "Textbook 3 p. 22",
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialFilter?: "all" | "science" | "math" | "english";
}

export const BookPagesGalleryModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialFilter = "all",
}) => {
  const [filter, setFilter] = useState<"all" | "science" | "math" | "english">(initialFilter);
  const [selectedItem, setSelectedItem] = useState<BookGalleryItem | null>(null);

  if (!isOpen) return null;

  const filteredItems = filter === "all"
    ? bookGalleryItems
    : bookGalleryItems.filter((i) => i.category === filter);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border-4 border-amber-300 overflow-hidden">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-amber-50 to-yellow-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black font-kid text-slate-900">
                  Cambridge Textbooks Digital Archive
                </h3>
                <span className="text-[11px] font-mono font-bold bg-amber-200 text-amber-950 px-2 py-0.5 rounded-full border border-amber-300">
                  صور صفحات الكتب الأصلية
                </span>
              </div>
              <p className="text-xs text-slate-600 font-arabic">
                الصفحات الأصلية عالية الدقة من كتب كامبريدج المعتمدة من مجلد Google Drive
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-white/80 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills Bar */}
        <div className="px-4 sm:px-5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => setFilter("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-kid font-bold transition flex items-center gap-1.5 ${
                filter === "all"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Pages ({bookGalleryItems.length})</span>
            </button>
            <button
              onClick={() => setFilter("science")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-kid font-bold transition flex items-center gap-1.5 ${
                filter === "science"
                  ? "bg-[#002D62] text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              <span>🔬</span>
              <span>Science (العلوم)</span>
            </button>
            <button
              onClick={() => setFilter("math")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-kid font-bold transition flex items-center gap-1.5 ${
                filter === "math"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              <span>📐</span>
              <span>Maths (الرياضيات)</span>
            </button>
            <button
              onClick={() => setFilter("english")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-kid font-bold transition flex items-center gap-1.5 ${
                filter === "english"
                  ? "bg-rose-600 text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              <span>📖</span>
              <span>English (الإنجليزية)</span>
            </button>
          </div>

          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
            Directly from Cambridge Google Drive ☁️
          </span>
        </div>

        {/* Gallery Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 bg-slate-100/60">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-white rounded-2xl border-2 border-slate-200 hover:border-amber-400 p-2.5 space-y-2 cursor-pointer group shadow-2xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 group-hover:scale-101 transition-transform">
                <img
                  src={item.imageUrl}
                  alt={item.titleEn}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-2.5 py-1 rounded-lg bg-white/95 text-slate-900 font-kid font-bold text-[11px] flex items-center gap-1 shadow-sm">
                    <ZoomIn className="w-3 h-3 text-amber-600" />
                    <span>View Page</span>
                  </span>
                </div>
                <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-slate-950/80 text-white text-[10px] font-mono font-bold">
                  p. {item.pageNumber}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold text-amber-700 block truncate">
                  {item.bookTitleEn}
                </span>
                <p className="text-xs font-kid font-black text-slate-900 line-clamp-1 leading-snug">
                  {item.titleEn}
                </p>
                <p className="text-[10px] text-slate-500 font-arabic truncate">
                  {item.titleAr}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-200 bg-white flex items-center justify-between text-xs text-slate-500 font-kid">
          <span>كل الصور مستخرجة بدقة كاملة ومطابقة لمنهج كامبريدج</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold"
          >
            Close (إغلاق)
          </button>
        </div>
      </div>

      {/* Detail Fullscreen Preview Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-60 bg-slate-950/90 backdrop-blur-xs flex items-center justify-center p-3 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-5 space-y-3 shadow-2xl relative max-h-[95vh] flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-black font-kid text-slate-900">
                    {selectedItem.bookTitleEn} — Page {selectedItem.pageNumber}
                  </h4>
                  <span className="text-xs font-mono bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                    {selectedItem.sourceLabel}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-arabic">
                  {selectedItem.titleAr}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={selectedItem.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                  title="Open full image in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Large Scrollable High-Res Image View */}
            <div className="flex-1 overflow-auto rounded-2xl border border-slate-200 bg-slate-900 flex items-center justify-center p-2">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.titleEn}
                className="max-w-full h-auto rounded-xl shadow-lg"
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-500 font-mono">
                High-Resolution Cambridge Student Book Page
              </span>
              <button
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-kid font-bold"
              >
                Back to Archive
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
