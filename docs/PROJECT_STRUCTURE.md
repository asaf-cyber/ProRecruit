# מבנה הפרויקט - ProRecruitmentSystem

## 📁 סקירה כללית

מערכת ProRecruitmentSystem מאורגנת בצורה מודולרית עם הפרדה ברורה בין הקוד הראשי, הנתונים, התיעוד והקבצים הישנים.

## 🏗️ מבנה התיקיות

### 📂 `prorecruit/` - הפרויקט הראשי
האפליקציה הראשית בנויה עם Next.js 15 ו-React 19.

```
prorecruit/
├── src/
│   ├── app/                      # דפי האפליקציה (App Router)
│   │   ├── api/                  # API Routes
│   │   ├── candidates/           # ניהול מועמדים
│   │   ├── clients/              # ניהול לקוחות
│   │   ├── vendors/              # ניהול ספקים
│   │   ├── employees/            # ניהול עובדים
│   │   ├── jobs/                 # ניהול משרות
│   │   ├── contracts/            # ניהול חוזים
│   │   ├── clearances/           # ניהול אישורי אבטחה
│   │   ├── onboarding/           # תהליכי קליטה
│   │   ├── cv-database/          # מסד נתוני קורות חיים
│   │   ├── executive-dashboard/  # דשבורד מנהלים
│   │   ├── sales-portal/         # פורטל מכירות
│   │   ├── client-portal/        # פורטל לקוחות
│   │   ├── vendor-portal/        # פורטל ספקים
│   │   ├── candidate-portal/     # פורטל מועמדים
│   │   ├── login/                # דף התחברות
│   │   ├── layout.tsx            # Layout ראשי
│   │   ├── page.tsx              # דף הבית
│   │   └── globals.css           # סגנונות גלובליים
│   └── components/               # קומפוננטים משותפים
│       ├── auth/                 # קומפוננטי אימות
│       ├── layout/               # קומפוננטי layout
│       ├── dashboard/            # קומפוננטי דשבורד
│       ├── candidates/           # קומפוננטי מועמדים
│       ├── clients/              # קומפוננטי לקוחות
│       ├── vendors/              # קומפוננטי ספקים
│       ├── employees/            # קומפוננטי עובדים
│       ├── jobs/                 # קומפוננטי משרות
│       ├── contracts/            # קומפוננטי חוזים
│       ├── clearances/           # קומפוננטי אישורי אבטחה
│       ├── onboarding/           # קומפוננטי קליטה
│       ├── cv-database/          # קומפוננטי מסד נתונים
│       ├── executive-dashboard/  # קומפוננטי דשבורד מנהלים
│       ├── sales-portal/         # קומפוננטי פורטל מכירות
│       ├── client-portal/        # קומפוננטי פורטל לקוחות
│       ├── vendor-portal/        # קומפוננטי פורטל ספקים
│       └── candidate-portal/     # קומפוננטי פורטל מועמדים
├── public/                       # קבצים סטטיים
├── package.json                  # תלויות הפרויקט
├── tsconfig.json                 # הגדרות TypeScript
├── eslint.config.mjs             # הגדרות ESLint
├── next.config.ts                # הגדרות Next.js
├── tailwind.config.js            # הגדרות Tailwind CSS
└── postcss.config.mjs            # הגדרות PostCSS
```

### 📂 `database/` - קבצי נתונים
קבצי JSON המכילים נתונים לדוגמה ומבני נתונים.

```
database/
├── candidates.json               # נתוני מועמדים
├── clients.json                  # נתוני לקוחות
├── vendors.json                  # נתוני ספקים
├── users.json                    # נתוני משתמשים
├── tasks.json                    # נתוני משימות
└── orders.json                   # נתוני הזמנות
```

### 📂 `docs/` - תיעוד המערכת
קבצי תיעוד מפורטים לכל מודול במערכת.

```
docs/
├── README.md                     # תיעוד כללי
├── PROJECT_STRUCTURE.md          # מבנה הפרויקט (קובץ זה)
├── LOGIN_SYSTEM_README.md        # תיעוד מערכת האימות
├── SMS_INTEGRATION_README.md     # תיעוד אינטגרציית SMS
├── ONBOARDING_README.md          # תיעוד תהליכי קליטה
├── EXECUTIVE_DASHBOARD_README.md # תיעוד דשבורד מנהלים
├── VENDOR_PORTAL_README.md       # תיעוד פורטל ספקים
├── SIDEBAR_IMPROVEMENTS.md       # שיפורי סיידבר
└── SALES_PORTAL_README.md        # תיעוד פורטל מכירות
```

### 📂 `legacy/` - קבצים ישנים
קבצים ישנים שנשמרו לצורך גיבוי והתייחסות.

```
legacy/
├── frontend/                     # קבצי HTML ישנים
│   ├── candidates_full.html
│   ├── modern_dashboard.html
│   ├── candidates_manager.html
│   ├── analytics.html
│   ├── dashboard.html
│   └── view_data.html
├── recruitment-app/              # גרסה ישנה של האפליקציה
│   └── src/
└── src/                          # קוד ישן נוסף
    ├── app/
    └── components/
```

## 🔧 קבצי הגדרה

### 📄 `package.json` (ראשי)
קובץ הגדרות הפרויקט הראשי עם scripts לניהול כל הפרויקט.

### 📄 `.gitignore`
קובץ המגדיר אילו קבצים לא ייכללו ב-Git.

### 📄 `README.md`
קובץ התיעוד הראשי של הפרויקט.

## 🚀 הפעלת הפרויקט

### התקנה
```bash
npm run install:all
```

### הפעלה בפיתוח
```bash
npm run dev
```

### בנייה לפרודקשן
```bash
npm run build
npm run start
```

### בדיקת קוד
```bash
npm run lint
npm run type-check
```

## 📊 ארכיטקטורת הקוד

### 🎯 עקרונות עיצוב
1. **Separation of Concerns** - הפרדה ברורה בין רכיבים
2. **Component Reusability** - קומפוננטים לשימוש חוזר
3. **Type Safety** - שימוש ב-TypeScript
4. **Responsive Design** - עיצוב רספונסיבי
5. **Accessibility** - נגישות מלאה

### 🔄 State Management
- **React Context** - לניהול state גלובלי
- **useState** - לניהול state מקומי
- **useEffect** - לניהול side effects

### 🎨 Styling
- **Tailwind CSS** - לסגנון מהיר ועקבי
- **CSS Modules** - לסגנון מודולרי
- **Responsive Design** - עיצוב מותאם לכל המכשירים

### 🔐 Security
- **Authentication** - מערכת אימות חזקה
- **Authorization** - ניהול הרשאות מבוסס תפקידים
- **Input Validation** - אימות קלט
- **XSS Protection** - הגנה מפני XSS

## 📈 פיתוח עתידי

### 🎯 יעדים קצרי טווח
- [ ] תיקון שגיאות ESLint
- [ ] שיפור ביצועים
- [ ] הוספת בדיקות אוטומטיות

### 🎯 יעדים ארוכי טווח
- [ ] הוספת AI לניתוח מועמדים
- [ ] אינטגרציה עם מערכות חיצוניות
- [ ] אפליקציה למובייל
- [ ] מערכת התראות מתקדמת

## 🤝 תרומה לפרויקט

ראה את קובץ `README.md` הראשי להוראות מפורטות לתרומה לפרויקט. 