# פורטל ספק - Vendor Portal

## סקירה כללית

פורטל הספק הוא פלטפורמה עצמאית המאפשרת לספקים לנהל את הקשר העסקי שלהם עם החברה. הפורטל מספק גישה נוחה למשימות, חיובים, תשלומים והודעות.

## תכונות עיקריות

### 🏠 דשבורד ראשי
- **סטטיסטיקות מפתח**: משימות פתוחות, חשבוניות פתוחות, הכנסה חודשית, פרויקטים פעילים
- **גרפים אינטראקטיביים**: 
  - גרף הכנסה לאורך זמן
  - פילוח משימות לפי סוג
- **משימות אחרונות**: תצוגה מהירה של המשימות האחרונות עם התקדמות

### 📋 ניהול משימות
- **טבלת משימות מקיפה** עם:
  - סינון לפי סטטוס ועדיפות
  - חיפוש מתקדם
  - עדכון סטטוס משימות
  - העלאת קבצים מצורפים
  - מעקב התקדמות
- **מודלים לעדכון סטטוס** ו**העלאת קבצים**

### 💰 חיובים ותשלומים
- **טבלת חשבוניות** עם:
  - סטטיסטיקות פיננסיות
  - סינון לפי סטטוס
  - תצוגת חשבוניות מפורטת
- **טופס יצירת חשבונית חדשה** עם:
  - העלאת קבצים (PDF, DOC, DOCX, XLS, XLSX)
  - גרירה ושחרור קבצים
  - תצוגה מקדימה של קבצים

### 💬 מערכת הודעות
- **צ'אט פנימי** עם:
  - הודעות בזמן אמת
  - העלאת קבצים בהודעות
  - תצוגת היסטוריית שיחות
  - סימון זמן הודעות

## מבנה טכני

### קבצים עיקריים

```
src/
├── app/
│   └── vendor-portal/
│       ├── layout.tsx              # Layout ייעודי לפורטל
│       ├── page.tsx                # דף דשבורד ראשי
│       ├── tasks/
│       │   └── page.tsx            # דף משימות
│       ├── billing/
│       │   └── page.tsx            # דף חיובים ותשלומים
│       └── messages/
│           └── page.tsx            # דף הודעות
└── components/
    └── vendor-portal/
        ├── vendor-portal-sidebar.tsx    # ניווט צד ייעודי
        ├── vendor-portal-header.tsx     # כותרת פורטל
        ├── vendor-portal-dashboard.tsx  # דשבורד ראשי
        ├── vendor-tasks-table.tsx       # טבלת משימות
        ├── vendor-billing-table.tsx     # טבלת חיובים
        ├── vendor-invoice-form.tsx      # טופס חשבונית
        └── vendor-messages-chat.tsx     # צ'אט הודעות
```

### טכנולוגיות

- **Frontend**: React 19, Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **TypeScript**: תמיכה מלאה ב-Type Safety

### ניווט

הפורטל כולל ניווט צד ייעודי עם:
- דשבורד ראשי
- משימות
- חיובים ותשלומים
- הודעות
- פרופיל משתמש עם אפשרות התנתקות

## שימוש

### גישה לפורטל
1. מהמערכת הראשית: לחץ על "פורטל ספק" בסיידבר
2. ישירות: `http://localhost:3000/vendor-portal`

### דפים זמינים
- **דשבורד**: `/vendor-portal`
- **משימות**: `/vendor-portal/tasks`
- **חיובים**: `/vendor-portal/billing`
- **הודעות**: `/vendor-portal/messages`

## תכונות מתקדמות

### העלאת קבצים
- תמיכה בקבצי PDF, DOC, DOCX, XLS, XLSX
- גרירה ושחרור קבצים
- תצוגה מקדימה עם גודל קובץ
- הסרת קבצים לפני שליחה

### סינון וחיפוש
- חיפוש טקסט חופשי
- סינון לפי סטטוס
- סינון לפי עדיפות
- תצוגת תוצאות בזמן אמת

### תצוגה רספונסיבית
- עיצוב מותאם למובייל
- טבלאות עם גלילה אופקית
- ניווט מותאם למסכים קטנים

## פיתוח עתידי

### מודלים נדרשים (Prisma)
```prisma
model VendorUser {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  vendorId  String
  vendor    Vendor   @relation(fields: [vendorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model VendorTask {
  id          String   @id @default(cuid())
  title       String
  description String?
  status      String   @default("pending")
  priority    String   @default("medium")
  assignedTo  String
  vendorId    String
  vendor      Vendor   @relation(fields: [vendorId], references: [id])
  dueDate     DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### API Endpoints נדרשים
- `GET /api/vendor/tasks` - קבלת משימות
- `PUT /api/vendor/tasks/:id/status` - עדכון סטטוס
- `POST /api/vendor/invoices` - יצירת חשבונית
- `GET /api/vendor/invoices` - קבלת חשבוניות
- `POST /api/vendor/messages` - שליחת הודעה
- `GET /api/vendor/messages` - קבלת הודעות

## הערות טכניות

- הפורטל משתמש ב-Mock Data לצורך הדגמה
- כל הקומפוננטות תומכות ב-RTL (עברית)
- התמיכה בקבצים מוגבלת ל-10MB לקובץ
- הצ'אט כולל תמיכה בקבצים מצורפים
- הגרפים מתעדכנים בזמן אמת עם שינויי נתונים 