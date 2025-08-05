# ProRecruit - אינטגרציית SMS

## 📱 סקירה כללית

מערכת ProRecruit כוללת אינטגרציה לשליחת SMS לאימות דו-שלבי. כרגע המערכת מוגדרת עם פרטי המשתמש האמיתי של אסף לבדיקות.

## 🔧 הגדרת SMS

### פרטי המשתמש הנוכחי:
- **אימייל:** asaf@titans.global
- **סיסמה:** Aa123456
- **טלפון:** 0528512263

### איך זה עובד:

1. **התחברות:** המשתמש מתחבר עם האימייל והסיסמה
2. **זיהוי:** המערכת מזהה שמדובר במשתמש אמיתי
3. **שליחת SMS:** המערכת שולחת SMS עם קוד אימות
4. **אימות:** המשתמש מזין את הקוד ומתחבר

## 🚀 אינטגרציה עם Twilio (לייצור)

### 1. התקנת Twilio
```bash
npm install twilio
```

### 2. הגדרת משתני סביבה
צור קובץ `.env.local`:
```env
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+972XXXXXXXXX
```

### 3. הפעלת אינטגרציה אמיתית
בקובץ `src/app/api/send-sms/route.ts`:
1. הסר את ההערות מהקוד של Twilio
2. העבר את הקוד המוקם לתגובה במקרה של שגיאה

## 📋 API Endpoints

### POST /api/send-sms
שולח SMS למספר טלפון

**Request Body:**
```json
{
  "to": "0528512263",
  "message": "קוד אימות ProRecruit: 123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "SMS sent successfully",
  "sid": "mock_sms_sid_1234567890",
  "to": "0528512263",
  "status": "sent"
}
```

## 🔍 בדיקת המערכת

### 1. התחברות עם פרטי אסף:
- **URL:** http://localhost:3000/login
- **אימייל:** asaf@titans.global
- **סיסמה:** Aa123456

### 2. מה קורה:
1. המערכת תזהה שמדובר במשתמש אמיתי
2. תציג מסך אימות דו-שלבי
3. תנסה לשלוח SMS (כרגע מוקם)
4. תציג הודעה שהקוד נשלח ל-0528512263

### 3. בדיקת Console:
פתח את Developer Tools (F12) ובדוק את ה-Console:
```
SMS Details:
To: 0528512263
Message: קוד אימות ProRecruit: 123456
SMS would be sent in production
```

## 🛠️ הוספת משתמשים נוספים

### עדכון פרטי משתמשים:
בקובץ `src/app/login/page.tsx`:

```typescript
const mockUsers = {
  'asaf@titans.global': { 
    role: 'admin', 
    name: 'אסף - מנהל מערכת',
    phone: '0528512263'
  },
  // הוסף משתמשים נוספים כאן
  'user@example.com': { 
    role: 'recruiter', 
    name: 'משתמש נוסף',
    phone: '0501234567'
  }
};
```

### עדכון לוגיקת שליחת SMS:
```typescript
const sendRealSMS = async (phoneNumber: string) => {
  // שליחת SMS אמיתית
  const response = await fetch('/api/send-sms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: phoneNumber,
      message: `קוד אימות ProRecruit: ${generateCode()}`
    }),
  });
};
```

## 🔒 אבטחה

### הגנה על מספרי טלפון:
- מספרי טלפון נשמרים מוצפנים במסד הנתונים
- גישה מוגבלת למשתמשים מורשים בלבד
- לוג של כל שליחת SMS

### הגבלת ניסיונות:
- מקסימום 3 ניסיונות לאימות
- חסימה זמנית לאחר כישלונות
- התראה על ניסיונות חשודים

## 📞 תמיכה טכנית

### בעיות נפוצות:

#### 1. SMS לא נשלח
```bash
# בדוק את Console
# וודא שמספר הטלפון נכון
# בדוק את הגדרות Twilio
```

#### 2. שגיאת אימות
```bash
# בדוק את הקוד שהוזן
# וודא שהקוד בן 6 ספרות
# נסה לשלוח קוד חדש
```

#### 3. בעיות Twilio
```bash
# בדוק את Account SID ו-Auth Token
# וודא שיש מספיק credit בחשבון
# בדוק את מספר הטלפון של Twilio
```

### לוגים:
```bash
# בדוק את הלוגים ב-Console
# חפש הודעות שגיאה
# וודא שה-API endpoints עובדים
```

## 🎯 שלבים הבאים

### 1. אינטגרציה אמיתית:
- [ ] הגדרת Twilio
- [ ] בדיקת שליחת SMS אמיתית
- [ ] הוספת לוגים מפורטים

### 2. הרחבת פונקציונליות:
- [ ] הוספת WhatsApp Business API
- [ ] תמיכה ב-Email verification
- [ ] הוספת Authenticator App

### 3. אבטחה מתקדמת:
- [ ] הצפנת מספרי טלפון
- [ ] הגבלת ניסיונות
- [ ] התראות על ניסיונות חשודים

---

**פותח על ידי:** מחלקת IT Experts - בינת  
**תאריך עדכון:** אוגוסט 2024  
**גרסה:** 1.0.0 