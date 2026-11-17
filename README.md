# Hisobim — oʻrnatish va OneDrive sinxronlash

Ilova litsenziya kalitisiz, mutlaqo bepul ishlaydi. Server yoki toʻlov kerak emas.

## Boshqaruv paneli
Chap menyudan **Boshqaruv paneli**, **Hisoblar**, **Taqvim**, **Tranzaksiyalar**, **Avtomatlashtirish**, **Byudjetlar**, **Hisobotlar** va **Sozlamalar** boʻlimlariga oʻting. Yuqoridagi davr tanlagichda shu oy, oxirgi 30 kun, barcha vaqt yoki oʻzingiz belgilagan sanalarni tanlash mumkin. Tranzaksiyani **Tranzaksiyalar** boʻlimida qoʻshing.

**Avtomatlashtirish** boʻlimida bankdan olingan CSV faylni tanlang, sana, izoh va summa ustunlarini moslang, hisobni tanlang va yozuvlarni tekshiring. Ilova mumkin boʻlgan takrorlarni belgilaydi. Belgilangan yozuvlargina kiritiladi. “Guruh tanlash qoidalari” orqali izohdagi kalit soʻzga mos guruhni tavsiya qiling; ilova oldingi bir xil izohli yozuvlardan ham foydalanadi. “Takroriy toʻlov eslatmalari”da har hafta yoki oy qaytariladigan toʻlovni kiriting. Muddati kelganda uni tasdiqlang; shundan keyingina balans va hisobotga qoʻshiladi. CSV fayl qurilmaning oʻzida oʻqiladi. Ilova bank hisobingizga yoki SMS xabarlaringizga toʻgʻridan-toʻgʻri ulanmaydi.

**Tranzaksiyalar** boʻlimida yozuvlar **Daromad** va **Xarajat** ustunlariga ajratilgan. Har bir ustunda tanlangan davr va hisob uchun jami summa koʻrsatiladi. Yozuv yonidagi qalam belgisini bosib turi, summasi, hisobi, guruhi, sanasi va izohini tahrirlang; **Oʻzgarishlarni saqlash** bilan tasdiqlang yoki **Bekor qilish** bilan chiqib keting.

Yuqori oʻngdagi **koʻz belgisi** qoldiq, daromad va xarajat summalarini ekranda yashiradi yoki koʻrsatadi. Tanlov shu qurilmada eslab qolinadi. Yozuv kiritish maydonlari ishlash uchun ochiq qoladi; PDF va Excel fayllari esa toʻliq summalarni saqlaydi.

**Byudjetlar** boʻlimida har bir xarajat guruhiga oylik limit va jamgʻarma maqsadini kiriting. Ilova shu oy sarflangan summa, limitdan qolgan summa va jamgʻarish ulushini koʻrsatadi. Tavsiya etilgan odat: har bir yozuvni oʻsha kuni kiriting, limitlarni oldingi oyga qarab belgilang va haftada bir marta tekshiring.

**Hisobotlar** boʻlimida sana oraligʻi, hisob, tur va guruhni tanlang. **Excel (.xlsx) yuklab olish** tanlangan yozuvlar va xulosani haqiqiy Excel fayliga saqlaydi. **PDF sifatida saqlash** qurilmaning chop etish oynasini ochadi; unda “PDF sifatida saqlash”ni tanlang.

Hisobotda guruhlar ulushi halqa diagrammada, davr boʻyicha xarajat yoki daromad ustunli diagrammada koʻrinadi. Guruh nomini bosing — hisobot shu guruhga filtrlanadi. Ustunni bosing — sana shu kun yoki oyga oʻtadi. Filtrlarni yuqoridan yana oʻzgartirish mumkin.

**Hisoblar** va **Sozlamalar → Guruhlarni tahrirlash** boʻlimlarida har bir hisob va guruh uchun emoji belgisini tanlang. Belgilar barcha qurilmalarda OneDrive orqali maʼlumotlar bilan birga sinxronlanadi.

**Sozlamalar → Zaxira nusxa** orqali JSON zaxira faylini yuklab oling yoki boshqa qurilmadagi nusxani birlashtiring. Faylda shaxsiy moliyaviy maʼlumotlar boʻladi; uni xavfsiz saqlang.

Tilni chap pastdagi tanlagich orqali almashtiring. Dastlabki naqd pul hisobi va standart guruhlar tarjima qilinadi. Oʻzingiz yozgan hisob, guruh va izoh nomlari qanday yozilgan boʻlsa, shunday qoladi; hisob nomlarini **Hisoblar** boʻlimida, guruh nomlarini **Sozlamalar**da tahrirlang.

## 1. Internetga joylash (bir marta, bepul)
Papkadagi barcha fayllarni HTTPS orqali joylang. Eng oson yoʻl: **Cloudflare Pages → Create → Direct Upload**, papkani (yoki ZIP’ni) yuklang. Natijada `https://nomi.pages.dev/` kabi manzil olasiz.
(GitHub Pages ham ishlaydi.) Ilova PWA boʻlgani uchun HTTPS shart.

## 2. Windows’ga oʻrnatish
Microsoft Edge yoki Chrome’da manzilni oching → manzil qatoridagi **“Oʻrnatish”** belgisi (yoki ilovadagi **“Ilovani oʻrnatish”** tugmasi) → Install. Ilova Start menyusida alohida oyna sifatida paydo boʻladi, oflayn ham ishlaydi.

## 3. Android’ga oʻrnatish (APK)
Chrome’da manzilni oching → ⋮ menyu → **“Ilovani oʻrnatish”**. Chrome uni WebAPK sifatida oʻrnatadi (alohida belgi, toʻliq ekran).
Agar alohida `.apk` fayl kerak boʻlsa: **pwabuilder.com** (bepul) → manzilni kiriting → Android → Download. Windows uchun `.msix` ham shu yerda.

## 4. OneDrive sinxronlash (bepul Microsoft hisobi)
Saytda Microsoft ilovasi sozlangan boʻlsa, kompyuter va telefonda **Sozlamalar → OneDrive → Microsoft hisobiga kirish** tugmasini bosing. Ikkala qurilmada ham **bir xil Microsoft hisobiga** kiring. Elektron pochta manzili yoki foydalanuvchi nomini ilovaga alohida kiritish shart emas; Microsoft kirish oynasi hisobni tasdiqlaydi. Ilova ochilganda, oldingi oynaga qaytganda, har 60 soniyada va oʻzgarishdan keyin sinxronlashni tekshiradi. **Sozlamalar**dagi holat yoki chap paneldagi yozuvni kuzating.

Agar sayt egasi Microsoft ilovasini hali sozlamagan boʻlsa, Entra katalogida bir martalik roʻyxatdan oʻtkazish kerak: **App registrations → New registration**, hisob turi **Personal Microsoft accounts only**, platforma **Single-page application (SPA)**, redirect URI `https://mhmuhiddinov-png.github.io/hisobim/`. Microsoft Graph uchun delegatsiya qilingan `Files.ReadWrite.AppFolder` ruxsatini qoʻshing. Yaratilgan **Application (client) ID** ni saytdagi `app-config.js` fayliga kiriting va saytni qayta joylang. Bu ID ommaviy; maxfiy kalit yaratish yoki saytda saqlash kerak emas. Shundan soʻng boshqa qurilmalarda ID kiritilmaydi.

Maʼlumotlar OneDrive’dagi `Apps/…/hisobim.json` faylida saqlanadi (faqat ilovaning oʻz papkasi). Oʻzgarishlar avtomatik yuboriladi; ikki qurilmada qilingan oʻzgarishlar birlashtiriladi (yangisi ustun).
Eslatma: Microsoft SPA uchun kirish tokenini ~24 soatga beradi, shuning uchun gohida “Ulash” tugmasini qayta bosish kerak boʻladi.

## Til va guruhlar
Tilni chap pastdagi tanlagich (Oʻzbekcha / Русский) bilan almashtiring. Guruhlarni “Sozlamalar” boʻlimida nomini oʻzgartirish, oʻchirish va yangi guruh qoʻshish mumkin; guruhlar ham OneDrive orqali sinxronlanadi. Standart guruhlar tilga qarab tarjima qilinadi, oʻzingiz yozgan nomlar esa oʻzgarmaydi.
