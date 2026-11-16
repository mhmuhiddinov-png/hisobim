# Hisobim — oʻrnatish va OneDrive sinxronlash

Ilova litsenziya kalitisiz, mutlaqo bepul ishlaydi. Server yoki toʻlov kerak emas.

## 1. Internetga joylash (bir marta, bepul)
Papkadagi barcha fayllarni HTTPS orqali joylang. Eng oson yoʻl: **Cloudflare Pages → Create → Direct Upload**, papkani (yoki ZIP’ni) yuklang. Natijada `https://nomi.pages.dev/` kabi manzil olasiz.
(GitHub Pages ham ishlaydi.) Ilova PWA boʻlgani uchun HTTPS shart.

## 2. Windows’ga oʻrnatish
Microsoft Edge yoki Chrome’da manzilni oching → manzil qatoridagi **“Oʻrnatish”** belgisi (yoki ilovadagi **“Ilovani oʻrnatish”** tugmasi) → Install. Ilova Start menyusida alohida oyna sifatida paydo boʻladi, oflayn ham ishlaydi.

## 3. Android’ga oʻrnatish (APK)
Chrome’da manzilni oching → ⋮ menyu → **“Ilovani oʻrnatish”**. Chrome uni WebAPK sifatida oʻrnatadi (alohida belgi, toʻliq ekran).
Agar alohida `.apk` fayl kerak boʻlsa: **pwabuilder.com** (bepul) → manzilni kiriting → Android → Download. Windows uchun `.msix` ham shu yerda.

## 4. OneDrive sinxronlash (bepul Microsoft hisobi)
1. https://entra.microsoft.com (yoki portal.azure.com) → **App registrations → New registration**.
2. Name: Hisobim. Supported account types: **Personal Microsoft accounts only** (yoki “… and personal”).
3. Redirect URI: platforma **Single-page application (SPA)**, qiymati — ilovadagi “Redirect URI” (OneDrive boʻlimida koʻrinadi, masalan `https://nomi.pages.dev/index.html` yoki `https://nomi.pages.dev/`). Aynan bir xil boʻlishi kerak.
4. Yaratilgach **Application (client) ID** ni nusxalang.
5. Ilovada: **OneDrive bilan sinxronlash** → Client ID’ni kiriting → **Ulash** → Microsoft hisobingiz bilan kiring va ruxsat bering.
6. Boshqa qurilmada (telefon/kompyuter) ham shu Client ID’ni kiriting va ulang.

Maʼlumotlar OneDrive’dagi `Apps/…/hisobim.json` faylida saqlanadi (faqat ilovaning oʻz papkasi). Oʻzgarishlar avtomatik yuboriladi; ikki qurilmada qilingan oʻzgarishlar birlashtiriladi (yangisi ustun).
Eslatma: Microsoft SPA uchun kirish tokenini ~24 soatga beradi, shuning uchun gohida “Ulash” tugmasini qayta bosish kerak boʻladi.

## Til va guruhlar
Tilni yuqoridagi tanlagich (Oʻzbekcha / Русский) bilan almashtiring. Guruhlarni “Guruhlarni tahrirlash” boʻlimida nomini oʻzgartirish, oʻchirish va yangi guruh qoʻshish mumkin; guruhlar ham OneDrive orqali sinxronlanadi. Standart guruhlar tilga qarab tarjima qilinadi, oʻzingiz yozgan nomlar esa oʻzgarmaydi.
