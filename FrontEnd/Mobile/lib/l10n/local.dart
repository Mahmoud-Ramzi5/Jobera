import 'package:get/get.dart';

class Local implements Translations {
  @override
  Map<String, Map<String, String>> get keys => {
        'ar': {
          '1': 'ar',
          '2': 'فرد',
          '3': 'شركة',
          '4': 'إنشاء حساب',
          '5': 'الاسم',
          '6': 'ايميل',
          '7': 'كلمة المرور',
          '8': 'تأكيد كلمة المرور',
          '9': 'رقم الموبايل',
          '10': 'تاريخ ميلادك',
          '11': 'ذكر',
          '12': 'أنثى',
          '13': 'اختر البلد',
          '14': 'اختر المدينة',
          '15': 'أنشىء الحساب الآن',
          '16': 'مجال العمل',
          '17': 'تاريخ إنشاء الشركة',
          '18': 'نسيت كلمة المرور',
          '19': 'تذكرني',
          '20': 'تسجيل الدخول الآن',
          '21': 'لا تملك حساب؟',
          '22': 'ادخل ايميلك لتحصل على ايميل تغيير كلمة السر',
          '23': 'حفظ',
          '24': 'التقييم',
          '25': 'المراجعات',
          '26': 'الوصف',
          '27': 'تعديل',
          '28': 'المعلومات العامة',
          '29': 'التعليم',
          '30': 'المهارات',
          '31': 'الشهادات',
          '32': 'عرض',
          '33': 'معارض الأعمال',
          '34': 'التالي',
          '35': 'مهاراتي',
          '36': 'بحث',
          '37': 'أنواع المهارات',
          '38': 'تعديل المعلومات العامة',
          '39': 'المستوى التعليمي',
          '40': 'الاختصاص',
          '41': 'الجامعة',
          '42': 'تاريخ البدء',
          '43': 'تاريخ الانتهاء',
          '44': 'أضف ملف',
          '45': 'الملف',
          '46': 'تنبيه',
          '47': 'هل أنت متأكد أنك تريد حذف الملف؟',
          '48': 'المنظمة',
          '49': 'تاريخ الإصدار',
          '50': 'هل أنت متأكد أنك تريد حذف الشهادة؟',
          '51': 'اختر تاريخ الإصدار',
          '52': 'اختر ملف جديد',
          '53': 'أضف شهادة',
          '54': 'اختر الملف',
          '55': 'هل أنت متأكد أنك تريد حذف المعرض؟',
          '56': 'الرابط',
          '57': 'العنوان',
          '58': 'المهارات المستخدمة',
          '59': 'الملفات',
          '60': 'لا يوجد ملفات',
          '61': 'تعديل معرض الأعمال',
          '62': 'أضف صورة',
          '63': 'اختر المهارات المستخدمة الحد الأعظمي 5',
          '64': 'توسيع',
          '65': 'اختر الملفات الحد الأعظمي 5',
          '66': 'اختر الملفات',
          '67': 'أضف معرض أعمال',
          '68': 'الإعدادات',
          '69': 'العام',
          '70': 'الوضع الليلي',
          '71': 'المحفظة',
          '72': 'الرصيد المتاح',
          '73': 'الرصيد الكلي',
          '74': 'رمز استرداد',
          '75': 'عمليات التحويل',
          '76': 'من',
          '77': 'إلى',
          '78': 'العمل',
          '79': 'المبلغ',
          '80': 'التاريخ',
          '81': 'الإشعارات',
          '82': 'قراءة الكل',
          '83': 'حذف الكل',
          '84': 'الرسالة',
          '85': 'مقروءة',
          '86': 'أكثر الأعمال الحرة أجراً',
          '87': 'الراتب',
          '88': 'أكثر الوظائف أجراً',
          '89': 'عرض',
          '90': 'أكثر الشركات الناشرة',
          '91': 'المنشورات',
          '92': 'أكثر المهارات طلباً',
          '93': 'عدد المرات',
          '94': 'نشر وظيفة',
          '95': 'الملف الشخصي',
          '96': 'تسجيل الخروج',
          '97': 'الصفحة الرئيسية',
          '98': 'عادية',
          '99': 'حرة',
          '100': 'المحادثات',
          '101': 'نشر',
          '102': 'نوع الوظيفة',
          '103': 'دوام كامل',
          '104': 'دوام جزئي',
          '105': 'عنوان الوظيفة',
          '106': 'أدنى عرض',
          '107': 'أقصى عرض',
          '108': 'اختر الموعد النهائي',
          '109': 'عن بعد',
          '110': 'الموقع',
          '111': 'لا توجد وظائف للعرض',
          '112': 'لا توجد المزيد من الوظائف',
          '113': 'تصفية حسب',
          '114': 'إعادة تعيين التصفية',
          '115': 'منشور بواسطة',
          '116': 'الحد الأدنى للراتب',
          '117': 'الحد الأقصى للراتب',
          '118': 'تفاصيل الوظيفة',
          '119': 'هل أنت متأكد أنك تريد حذف المنشور؟',
          '120': 'المهارات المطلوبة',
          '121': 'كن منافساً',
          '122': 'المنافسين',
          '123': 'قدم طلباً',
          '124': 'تعليق',
          '125': 'اختر التاريخ',
          '126': 'إنهاء الوظيفة',
          '127': 'تغيير العرض',
          '128': 'إلغاء',
          '129': 'حصتك',
          '130': 'لا توجد محادثات',
          '131': '...جار التحميل',
          '132': 'هل أنت متأكد أنك تريد تسجيل الخروج؟',
          '133': 'نعم',
          '134': 'لا',
          '135': 'انتهت الجلسة',
          '136': 'يرجى تسجيل الدخول مرة أخرى',
          '137': 'أضف وصفًا',
          '138': 'إلغاء',
          '139': 'صورة',
          '140': 'التقط صورة',
          '141': 'تحميل صورة',
          '142': 'إزالة الصورة',
          '143': 'الرمز',
          '144': 'استرداد',
          '145': 'الحقل مطلوب',
          '146': 'بريد إلكتروني غير صالح',
          '147': 'كلمة المرور لا تتطابق مع تأكيد كلمة المرور',
          '148': 'رقم غير صالح',
          '149': 'عرض غير صالح',
          '150': 'خارج نطاق العرض',
          '151': 'تم التسجيل بنجاح',
          '152': 'فشل في التسجيل',
          '153': 'خطأ',
          '154': 'تمت إضافة الصورة بنجاح',
          '155': 'نجاح',
          '156': 'لا يوجد ملف',
          '157': 'الحد الأقصى للمهارات لكل معرض هو 5',
          '158': 'يجب اختيار مهارة واحدة على الأقل',
          '159': 'فشل',
          '160': 'تم تسجيل الدخول بنجاح',
          '161': 'فشل تسجيل الدخول',
          '162': 'Google فشل تسجيل الدخول عبر',
          '163': 'فشل في استرداد الرمز',
          '164': 'تم تسجيل الخروج بنجاح',
          '165': 'فشل تسجيل الخروج',
          '166': 'الحد الأقصى للمهارات لكل وظيفة هو 5',
          '167': 'اكتب رسالة...',
          '168': 'إرسال',
          '169': 'الجنس',
          '170': 'تاريخ الميلاد',
          '171': 'تاريخ التأسيس',
          '172': 'الشهادة',
          '173': 'نطاق العرض',
          '174': 'متوسط العرض',
          '175': 'المفضلة',
          '176': 'تاريخ التسليم',
          '177': 'بكالوريوس',
          '178': 'ماجستير',
          '179': 'دكتوراه',
          '180': 'شهادة ثانوية',
          '181': 'معهد عالي',
          '182': 'تاريخ النشر',
          '183': 'اللغة',
          '184': 'تعديل العرض',
          '185': 'الإدارة',
          '186': 'المنشورات',
          '187': 'العروض',
          '188': 'المحفوظات',
          '189': 'الحالة'
        },
        'en': {
          "1": "en",
          "2": "Individual",
          "3": "Company",
          "4": "Register",
          "5": "Name",
          "6": "Email",
          "7": "Password",
          "8": "Confirm Password",
          "9": "Phone Number",
          "10": "Birth Date",
          "11": "Male",
          "12": "Female",
          "13": "Select Country",
          "14": "Select City",
          "15": "Register Now",
          "16": "Field of Work",
          "17": "Company Founding Date",
          "18": "Forgot Password",
          "19": "Remember Me",
          "20": "Login",
          "21": "Don't have an account?",
          "22": "Enter your email to receive a password reset email",
          "23": "Submit",
          "24": "Rating",
          "25": "Reviews",
          "26": "Description",
          "27": "Edit",
          "28": "Basic Information",
          "29": "Education",
          "30": "Skills",
          "31": "Certificates",
          "32": "View",
          "33": "Portfolios",
          "34": "Next",
          "35": "My Skills",
          "36": "Search",
          "37": "Skill Types",
          "38": "Edit Information",
          "39": "Educational Level",
          "40": "Field",
          "41": "School",
          "42": "Start Date",
          "43": "End Date",
          "44": "Add File",
          "45": "File",
          "46": "Notice",
          "47": "Are you sure you want to delete the file?",
          "48": "Organization",
          "49": "Release Date",
          "50": "Are you sure you want to delete the certificate?",
          "51": "Select Release Date",
          "52": "Choose New File",
          "53": "Add Certificate",
          "54": "Choose File",
          "55": "Are you sure you want to delete the portfolio?",
          "56": "Link",
          "57": "Title",
          "58": "Used Skills",
          "59": "Files",
          "60": "No Files",
          "61": "Edit Portfolio",
          "62": "Add a Photo",
          "63": "Select skills Max 5 skills",
          "64": "Expand",
          "65": "Select Files Max 5 files",
          "66": "Choose Files",
          "67": "Add Portfolio",
          "68": "Settings",
          "69": "General",
          "70": "Dark Mode",
          "71": "Wallet",
          "72": "Available Balance",
          "73": "Total Balance",
          "74": "Redeem Code",
          "75": "Transactions",
          "76": "From",
          "77": "To",
          "78": "Job",
          "79": "Amount",
          "80": "Date",
          "81": "Notifications",
          "82": "Mark All as Read",
          "83": "Delete All",
          "84": "Message",
          "85": "Read",
          "86": "Highest Paying Freelancing Jobs",
          "87": "Salary",
          "88": "Highest Paying Regular Jobs",
          "89": "Offer",
          "90": "Most Posting Companies",
          "91": "Posts",
          "92": "Most Needed Skills",
          "93": "Times",
          "94": "Post Job",
          "95": "Profile",
          "96": "Logout",
          "97": "Job Feed",
          "98": "Regular",
          "99": "Freelancing",
          "100": "Chats",
          "101": "Post",
          "102": "Job type",
          "103": "Full Time",
          "104": "Part Time",
          "105": "Job title",
          "106": "Min Offer",
          "107": "Max Offer",
          "108": "Select Deadline",
          "109": "Remotely",
          "110": "Location",
          "111": "No Jobs to Show",
          "112": "No More Jobs",
          "113": "Filter By",
          "114": "Reset Filter",
          "115": "Published By",
          "116": "Min Salary",
          "117": "Max Salary",
          "118": "Job details",
          "119": "Are you sure you want to delete the post?",
          "120": "Required Skills",
          "121": "Be a Competitor",
          "122": "Competitors",
          "123": "Apply",
          "124": "Comment",
          "125": "Pick Date",
          "126": "End Job",
          "127": "Change Offer",
          "128": "Cancel",
          "129": "Your Share",
          "130": "No Chats",
          "131": "Loading...",
          "132": "Are you sure you want to logout?",
          "133": "Yes",
          "134": "No",
          "135": "Session Expired",
          "136": "Please Login Again",
          "137": "Add Description",
          "138": "Cancel",
          "139": "Photo",
          "140": "Take Photo",
          "141": "Upload Photo",
          "142": "Remove Photo",
          "143": "Code",
          "144": "Redeem",
          "145": "Required Field",
          "146": "Invalid Email",
          "147": "Password does not match Confirm Password",
          "148": "Invalid Number",
          "149": "Invalid Offer",
          "150": "Out of Offer Range",
          "151": "Register Successful",
          "152": "Register Failed",
          "153": "Error",
          "154": "Photo Added Successfully",
          "155": "Success",
          "156": "No File",
          "157": "Max 5 Skills per Portfolio",
          "158": "Must Select at Least 1 Skill",
          "159": "Failed",
          "160": "Login Successful",
          "161": "Login Failed",
          "162": "Login with Google Failed",
          "163": "Failed to Redeem Code",
          "164": "Logout Successful",
          "165": "Logout Failed",
          "166": "Max 5 Skills per Job",
          "167": "Type a Message...",
          "168": "Send",
          "169": "Gender",
          "170": "Birth Date",
          "171": "Founding Date",
          "172": "Certificate",
          "173": "Offer range",
          "174": "Average Offer",
          '175': 'Bookmark',
          '176': 'DeadLine',
          '177': 'Bachelor',
          '178': 'Master',
          '179': 'PHD',
          '180': 'High School Diploma',
          '181': 'High Institute',
          '182': 'Publish date',
          '183': 'Language',
          '184': 'Edit offer',
          '185': 'Manage',
          '186': 'Posts',
          '187': 'Offers',
          '188': 'Bookmarks',
          '189': 'Status'
        }
      };
}