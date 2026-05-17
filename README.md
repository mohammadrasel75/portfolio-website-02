NEXUS Portfolio — Local setup and EmailJS (বাংলা নির্দেশিকা)

এটি ছোট নির্দেশিকা যা আপনাকে লোকালি প্রজেক্ট চালাতে এবং EmailJS দিয়ে কনফিগার করতে সাহায্য করবে।

প্রয়োজনীয়তা
- Node.js (v16+) ও npm ইনস্টল করা থাকতে হবে।

স্টেপ 1 — ডিপেনডেন্সি ইনস্টল
```bash
cd "c:\Projects\Portfolio website 02"
npm install
```

স্টেপ 2 — EmailJS সেটআপ (একবারই করতে হবে)
1. https://www.emailjs.com/ এ অ্যাকাউন্ট খুলুন।
2. Dashboard → Email Services → আপনার ইমেইল (Gmail) কনফিগার করুন (OAuth সুপারিশ করা হয়)।
3. Dashboard → Email Templates → নতুন টেমপ্লেট তৈরি করুন। টেমপ্লেটে আপনি এই ভ্যারিয়েবল ব্যবহার করতে পারেন:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{message}}`
   (টেমপ্লেট ভ্যারিয়েবল নাম আপনার EmailJS টেমপ্লেট কনফিগারেশনের ওপর নির্ভর করবে)
4. Dashboard থেকে নিন:
   - Service ID (উদাহরণ: `service_xxx`)
   - Template ID (উদাহরণ: `template_xxx`)
   - Public Key (আপনার Account Public Key)

স্টেপ 3 — `.env` ফাইল তৈরি করা
প্রজেক্ট রুটে `.env` বা `.env.local` ফাইল তৈরি করুন (এখানে `.env.example` দিলাম—কপি করুন):

```
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_TEMPLATE_ID=template_xxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_TO_EMAIL=devraselmiah75@gmail.com
```

- Vite এর জন্য env ভেরিয়েবল অবশ্যই `VITE_` দিয়ে শুরু করতে হবে।

স্টেপ 4 — ডেভ সার্ভার চালানো
`.env` যোগ করার পর dev সার্ভার রিস্টার্ট দিন:

```bash
npm run dev
```

স্টেপ 5 — ফর্ম পরীক্ষা
- ব্রাউজারে http://localhost:5173 (বা Vite যে URL দেখায়) খুলুন।
- Contact ফর্ম পূরণ করে সাবমিট করুন।
- সফল হলে UI-তে "Message sent" মেসেজ দেখাবে এবং EmailJS Dashboard → Sent Emails-এ লগ আসবে।

অতিরিক্ত টিপস
- প্রোডাকশন: যদি আপনি API-ভিত্তিক সার্ভার পছন্দ করেন (আর keys ক্লায়েন্টে রাখতে না চান), আমি Express + Nodemailer সার্ভার সেটআপ করে দিয়ে দেব — বললে করব।
- Troubleshooting: যদি মেইল না যায়, DevTools Console এবং EmailJS Dashboard Error Logs দেখুন।

সহায়তা লাগলে জানান — আমি `.env` সেটআপ বা সার্ভার বিকল্প করে দিতে পারি।
