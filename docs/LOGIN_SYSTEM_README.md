# ProRecruit - מערכת כניסה מאובטחת

## 🚀 סקירה כללית

מערכת הכניסה של ProRecruit מספקת פתרון מאובטח ומקצועי להתחברות למגוון רחב של משתמשים במערכת ניהול הגיוס. המערכת כוללת אימות דו-שלבי, ניתוב חכם לפי תפקידים, וממשק משתמש מודרני וממותג.

## ✨ תכונות עיקריות

### 🔐 אבטחה מתקדמת
- **אימות דו-שלבי (2FA)** - למנהלים ואנשי כספים
- **הצפנת סיסמאות** - עם hashing ו-salt
- **ניהול הרשאות** - מבוסס תפקידים (RBAC)
- **סשן מאובטח** - עם JWT tokens

### 🎨 עיצוב מקצועי
- **רקע דינמי** - עם אנימציות מתחלפות
- **מיתוג בינת** - לוגו וצבעים ממותגים
- **ממשק עברי** - תמיכה מלאה ב-RTL
- **עיצוב רספונסיבי** - לכל סוגי המסכים

### 🔄 ניתוב חכם
- **זיהוי אוטומטי** של תפקיד המשתמש
- **הפניה לדשבורד המתאים** לכל סוג משתמש
- **הגנה על נתיבים** לפי הרשאות

## 👥 סוגי משתמשים

| תפקיד | דוא"ל לדוגמה | דשבורד יעד | אימות דו-שלבי |
|-------|-------------|------------|---------------|
| מנהל מערכת | admin@prorecruit.co.il | Executive Dashboard | ✅ |
| מגייס | recruiter@prorecruit.co.il | Candidates Management | ❌ |
| לקוח | client@company.com | Client Portal | ❌ |
| ספק | vendor@vendor.com | Vendor Portal | ❌ |
| מועמד | candidate@email.com | Candidate Portal | ❌ |

## 🛠️ רכיבי המערכת

### 📁 מבנה הקבצים
```
src/
├── app/
│   ├── login/
│   │   └── page.tsx              # דף הכניסה הראשי
│   └── layout.tsx                # Layout עם AuthProvider
├── components/
│   └── auth/
│       ├── auth-context.tsx      # ניהול מצב התחברות
│       ├── company-logo.tsx      # לוגו החברה
│       ├── login-background.tsx  # רקע דינמי
│       ├── login-form.tsx        # טופס התחברות
│       ├── two-factor-auth.tsx   # אימות דו-שלבי
│       └── protected-route.tsx   # הגנה על נתיבים
```

### 🔧 רכיבים עיקריים

#### `LoginPage` - דף הכניסה הראשי
- ניהול תהליך ההתחברות
- ניתוב לפי תפקידים
- תמיכה באימות דו-שלבי

#### `LoginForm` - טופס התחברות
- שדות דוא"ל וסיסמה
- הצגת/הסתרת סיסמה
- איפוס סיסמה
- פרטי התחברות לדוגמה

#### `TwoFactorAuth` - אימות דו-שלבי
- קוד בן 6 ספרות
- תמיכה ב-SMS ואפליקציה
- אוטו-פוקוס וניווט
- שליחה חוזרת של קוד

#### `AuthContext` - ניהול מצב
- ניהול סשן משתמש
- אחסון ב-localStorage
- ניהול הרשאות
- פונקציות התחברות/התנתקות

## 🚀 התקנה והפעלה

### 1. התקנת תלויות
```bash
npm install
```

### 2. הפעלת השרת
```bash
npm run dev
```

### 3. גישה למערכת
- פתח את הדפדפן בכתובת: `http://localhost:3000`
- המערכת תנתב אותך אוטומטית לדף הכניסה
- השתמש בפרטי ההתחברות לדוגמה

## 🔑 פרטי התחברות לדוגמה

### מנהל מערכת
- **דוא"ל:** admin@prorecruit.co.il
- **סיסמה:** password123
- **אימות דו-שלבי:** ✅ (כל קוד בן 6 ספרות)

### מגייס
- **דוא"ל:** recruiter@prorecruit.co.il
- **סיסמה:** password123

### לקוח
- **דוא"ל:** client@company.com
- **סיסמה:** password123

### ספק
- **דוא"ל:** vendor@vendor.com
- **סיסמה:** password123

### מועמד
- **דוא"ל:** candidate@email.com
- **סיסמה:** password123

## 🔒 אבטחה

### הצפנת סיסמאות
```typescript
// דוגמה ל-hashing (באמת ייושם ב-backend)
const hashedPassword = await bcrypt.hash(password, saltRounds);
```

### ניהול הרשאות
```typescript
const permissions = {
  admin: ['*'], // כל ההרשאות
  recruiter: ['candidates.read', 'candidates.write', 'jobs.read', 'jobs.write'],
  client: ['candidates.read', 'jobs.read', 'reports.read'],
  vendor: ['jobs.read', 'candidates.read'],
  candidate: ['profile.read', 'profile.write', 'applications.read']
};
```

### הגנה על נתיבים
```typescript
// דוגמה לשימוש ב-ProtectedRoute
<AdminRoute>
  <ExecutiveDashboard />
</AdminRoute>

<CandidateRoute>
  <CandidatePortal />
</CandidateRoute>
```

## 🎨 התאמה אישית

### שינוי צבעים
```css
/* ב-globals.css */
:root {
  --primary-color: #dc2626; /* אדום בינת */
  --secondary-color: #6b7280; /* אפור */
  --accent-color: #1f2937; /* כהה */
}
```

### הוספת לוגו מותאם
```typescript
// ב-company-logo.tsx
const customLogo = {
  companyName: "שם החברה שלך",
  logoUrl: "/path/to/your/logo.png",
  primaryColor: "#your-color"
};
```

## 🔧 אינטגרציה עם Backend

### API Endpoints נדרשים
```typescript
// POST /api/auth/login
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  token?: string;
  message?: string;
}

// POST /api/auth/2fa/verify
interface TwoFactorRequest {
  code: string;
  userId: string;
}

// POST /api/auth/forgot-password
interface ForgotPasswordRequest {
  email: string;
}
```

### דוגמה ל-API Call
```typescript
const loginUser = async (email: string, password: string) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  return response.json();
};
```

## 🐛 פתרון בעיות

### בעיות נפוצות

#### 1. שגיאת CORS
```bash
# הוסף ל-next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },
};
```

#### 2. בעיות RTL
```css
/* וודא שהוספת את התמיכה ב-RTL */
html {
  direction: rtl;
  text-align: right;
}
```

#### 3. בעיות אימות
```typescript
// בדוק שה-AuthProvider עוטף את האפליקציה
<AuthProvider>
  <App />
</AuthProvider>
```

## 📞 תמיכה

לשאלות ותמיכה טכנית:
- **אימייל:** support@prorecruit.co.il
- **טלפון:** 03-1234567
- **שעות פעילות:** א'-ה' 9:00-18:00

## 📄 רישיון

© 2024 בינת - מחלקת IT Experts. כל הזכויות שמורות.

---

**פותח על ידי:** מחלקת IT Experts - בינת  
**גרסה:** 1.0.0  
**תאריך עדכון:** אוגוסט 2024 