# ProRecruit - מודול קליטת עובד (Onboarding)

## סקירה כללית

מודול קליטת עובד הוא מערכת מתקדמת לייעול ואוטומציה של תהליך הקליטה של עובדים חדשים, מרגע חתימת החוזה ועד יום העבודה הראשון. המערכת מצמצמת באופן משמעותי את העבודה האדמיניסטרטיבית, מבטיחה שכל המשימות בוצעו בצורה מסודרת ומאורגנת, ומספקת לעובד החדש חוויה ראשונית חיובית ומקצועית.

## תכונות עיקריות

### 🤖 הפעלה אוטומטית
- **טריגר אוטומטי**: תהליך ה-Onboarding מופעל אוטומטית ברגע שסטטוס מועמד משתנה ל-Hired
- **תבניות מותאמות**: המערכת בוחרת תבנית Onboarding מוגדרת מראש לפי תפקיד או מחלקה
- **יצירת רשימת משימות**: יצירה אוטומטית של רשימת משימות מותאמת אישית

### 📋 ניהול משימות חכם
- **רשימת משימות דינמית**: רשימה מפורטת עם סטטוס, תאריך יעד ואחראי לביצוע
- **אוטומציה של משימות**: שליחת טפסים דיגיטליים ותזכורות אוטומטיות
- **מעקב התקדמות**: חיווי ויזואלי של התקדמות התהליך

### 👤 פורטל עובדים
- **דף אישי**: דף מינימליסטי לעובד החדש עם משימות ומסמכים
- **אימות מאובטח**: כניסה באמצעות אימות מאובטח
- **עדכון סטטוס**: העובד יכול לסמן משימות כ-Done

### 📧 תקשורת אוטומטית
- **הודעות ברוכים הבאים**: שליחה אוטומטית של הודעות מייל/WhatsApp
- **עדכון צוות**: הודעה אוטומטית לצוות הרלוונטי
- **תזכורות חכמות**: תזכורות יומיות או שבועיות למשימות פתוחות

## מבנה הרכיבים

### 1. OnboardingHeader
- **תפקיד**: כותרת הדף עם כפתורים ומידע כללי
- **תכונות**:
  - כפתור "התחל קליטה חדשה"
  - תפריט פעולות (ייצוא, ייבוא, הגדרות)
  - מידע על תהליך קליטה אוטומטי

### 2. OnboardingStats
- **תפקיד**: סטטיסטיקות ותובנות על תהליך הקליטה
- **תכונות**:
  - עובדים בתהליך
  - קליטות שהושלמו
  - משימות ממתינות
  - זמן קליטה ממוצע
  - יעילות אוטומציה

### 3. OnboardingFilters
- **תפקיד**: סינון וחיפוש עובדים בתהליך קליטה
- **תכונות**:
  - חיפוש חופשי
  - סינון לפי סטטוס
  - סינון לפי מחלקה
  - סינון לפי מנהל אחראי

### 4. OnboardingTable
- **תפקיד**: טבלה של עובדים בתהליך קליטה
- **תכונות**:
  - עמודות: עובד, תפקיד, מנהל, תאריך התחלה, התקדמות, משימות, סטטוס
  - פעולות שורתיות (צפייה, עריכה, מחיקה)
  - חיווי התקדמות ויזואלי

### 5. OnboardingChecklist
- **תפקיד**: ניהול רשימת משימות דינמית
- **תכונות**:
  - קטגוריות משימות (מסמכים, ציוד, הרשאות, פגישות, הדרכות)
  - סטטוס משימות (לעשות, בתהליך, הושלם, עבר זמנו)
  - עדיפויות (נמוך, בינוני, גבוה)
  - משימות אוטומטיות

## Data Models

### OnboardingEmployee
```typescript
interface OnboardingEmployee {
  id: string;
  name: string;
  position: string;
  department: string;
  manager: string;
  startDate: string;
  progress: number;
  status: 'not_started' | 'in_progress' | 'completed' | 'overdue';
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  lastActivity: string;
  template: string;
}
```

### OnboardingTask
```typescript
interface OnboardingTask {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'completed' | 'overdue';
  assignedTo: 'employee' | 'manager' | 'hr' | 'it' | 'finance';
  dueDate: string;
  completedDate?: string;
  priority: 'low' | 'medium' | 'high';
  category: 'documentation' | 'equipment' | 'access' | 'meeting' | 'training';
  isAutomated: boolean;
}
```

### OnboardingTemplate
```typescript
interface OnboardingTemplate {
  id: string;
  name: string;
  department: string;
  position: string;
  tasks: OnboardingTask[];
  estimatedDuration: number; // days
  isActive: boolean;
}
```

## המלצות טכניות

### Backend Services
1. **Onboarding Trigger Service**
   - מעקב אחר שינויי סטטוס מועמדים
   - הפעלה אוטומטית של תהליך קליטה
   - בחירת תבנית מתאימה

2. **Task Management Service**
   - יצירה ועדכון משימות
   - מעקב אחר התקדמות
   - חישוב אחוזי השלמה

3. **Communication Service**
   - שליחת מיילים אוטומטיים
   - אינטגרציה עם WhatsApp API
   - תזכורות חכמות

4. **Scheduler Service**
   - Cron Jobs לבדיקת משימות שעבר זמנן
   - שליחת תזכורות אוטומטיות
   - עדכון סטטוסים

### Database Schema (Prisma)
```prisma
model OnboardingEmployee {
  id              String   @id @default(cuid())
  employeeId      String   @unique
  name            String
  position        String
  department      String
  manager         String
  startDate       DateTime
  progress        Int      @default(0)
  status          String   @default("not_started")
  totalTasks      Int      @default(0)
  completedTasks  Int      @default(0)
  overdueTasks    Int      @default(0)
  lastActivity    DateTime @updatedAt
  template        String
  createdAt       DateTime @default(now())
  
  tasks           OnboardingTask[]
  
  @@map("onboarding_employees")
}

model OnboardingTask {
  id              String   @id @default(cuid())
  employeeId      String
  employee        OnboardingEmployee @relation(fields: [employeeId], references: [id])
  title           String
  description     String
  status          String   @default("todo")
  assignedTo      String
  dueDate         DateTime
  completedDate   DateTime?
  priority        String   @default("medium")
  category        String
  isAutomated     Boolean  @default(false)
  createdAt       DateTime @default(now())
  
  @@map("onboarding_tasks")
}

model OnboardingTemplate {
  id                String   @id @default(cuid())
  name              String
  department        String
  position          String
  estimatedDuration Int
  isActive          Boolean  @default(true)
  createdAt         DateTime @default(now())
  
  @@map("onboarding_templates")
}
```

## Workflow

### 1. הפעלת תהליך קליטה
1. מועמד חותם על חוזה דיגיטלי
2. סטטוס המועמד משתנה ל-Hired
3. המערכת מזהה את השינוי ומפעילה תהליך קליטה
4. נבחרת תבנית מתאימה לפי תפקיד/מחלקה
5. נוצרת רשימת משימות מותאמת אישית

### 2. ניהול משימות
1. משימות נשלחות אוטומטית לעובד ולמנהל
2. תזכורות נשלחות למשימות שעבר זמנן
3. העובד מעדכן סטטוס משימות בפורטל האישי
4. אחוז ההתקדמות מתעדכן אוטומטית

### 3. תקשורת אוטומטית
1. הודעת "ברוכים הבאים" נשלחת לעובד
2. קישור לפורטל האישי נשלח
3. הצוות מקבל הודעה על עובד חדש
4. תזכורות נשלחות למשימות פתוחות

### 4. השלמת תהליך
1. כל המשימות מסומנות כהושלמו
2. אחוז ההתקדמות מגיע ל-100%
3. סטטוס הקליטה משתנה ל"הושלם"
4. דוח השלמה נשלח למנהל

## תבניות Onboarding

### תבנית מפתח תוכנה
- מילוי טופס קליטה דיגיטלי
- הזמנת ציוד מחשב (מחשב נייד, עכבר, מקלדת)
- הגדרת הרשאות מערכות (Gmail, Slack, CRM, Git)
- פגישת היכרות עם המנהל
- הדרכה על מערכות החברה
- הגדרת סביבת פיתוח

### תבנית אנשי מכירות
- מילוי טופס קליטה דיגיטלי
- הזמנת ציוד (מחשב, טלפון, כרטיסי ביקור)
- הגדרת הרשאות CRM ומערכות מכירות
- פגישת היכרות עם צוות המכירות
- הדרכה על מוצרי החברה
- הגדרת יעדי מכירות

### תבנית משאבי אנוש
- מילוי טופס קליטה דיגיטלי
- הזמנת ציוד משרדי
- הגדרת הרשאות מערכות HR
- פגישת היכרות עם הצוות
- הדרכה על נהלי החברה
- הכנת כרטיס עובד

## UI/UX Features

### עיצוב ברור ויזואלי
- ממשק משתמש נקי ומודרני
- חיווי התקדמות קל להבנה
- צבעים מקצועיים ועקביים
- טיפוגרפיה ברורה וקריאה

### חווית משתמש מתקדמת
- תגובה מהירה לכל פעולה
- משוב ויזואלי מיידי
- ניווט אינטואיטיבי
- תצוגה רספונסיבית

### אנימציות ומעברים
- אנימציות חלקות של התקדמות
- מעברים עדינים בין מסכים
- אפקטים ויזואליים מתקדמים
- חיווי מצב ברור

## ביצועים ואופטימיזציה

### Frontend
- Lazy loading של רכיבים
- Virtual scrolling לטבלאות גדולות
- Caching של נתונים
- Optimistic updates

### Backend
- Caching של תבניות Onboarding
- Batch processing למשימות
- Database indexing מתקדם
- Rate limiting ל-API calls

## אבטחה

### הגנה על נתונים
- הצפנת מידע אישי
- הרשאות מבוססות תפקיד
- Audit trail לכל פעולה
- Backup אוטומטי

### פרטיות
- עמידה ב-GDPR
- מחיקת נתונים אוטומטית
- הסכמה מפורשת לשימוש בנתונים
- שקיפות מלאה

## אינטגרציות

### מערכות חיצוניות
- Email service לשליחת הודעות
- WhatsApp API לתזכורות
- Digital signature service לחתימת חוזים
- HR systems לסנכרון נתונים

### מערכות פנימיות
- מערכת ניהול עובדים
- מערכת ניהול ציוד
- מערכת הרשאות
- מערכת הדרכות

## מדדי הצלחה

### כמותיים
- זמן קליטה ממוצע: <5 ימים
- אחוז השלמת משימות: >95%
- זמן תגובה למשימות: <24 שעות
- שביעות רצון עובדים: >90%

### איכותיים
- הפחתת זמן אדמיניסטרטיבי
- שיפור חווית העובד החדש
- הקטנת טעויות אנוש
- הגדלת יעילות התהליך

## תחזוקה ותמיכה

### ניטור
- מעקב אחר ביצועי המערכת
- ניטור שגיאות אוטומציה
- מדדי שימוש
- התראות אוטומטיות

### עדכונים
- עדכון תבניות Onboarding
- שיפור אלגוריתמי אוטומציה
- הוספת פיצ'רים חדשים
- תיקוני באגים

## סיכום

מודול קליטת עובד של ProRecruit מייצג את הדור הבא של מערכות Onboarding, המשלב אוטומציה חכמה, חווית משתמש מעולה ותהליכים יעילים. המערכת מספקת פתרון מקיף שמחסוך זמן יקר, מפחית טעויות ומשפר משמעותית את חווית הקליטה של עובדים חדשים. 