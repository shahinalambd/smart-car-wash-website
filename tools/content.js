// Bilingual content for the Smart Car Wash concept site. Every string is {en, ar}.
const C = {};

C.brand = { en: 'Smart Car Wash', ar: 'سمارت كار واش' };
C.tagline = { en: 'Premium care for your car, every time.', ar: 'عناية فاخرة بسيارتك، في كل مرة.' };

C.nav = [
  { id: 'home', href: 'index.html', en: 'Home', ar: 'الرئيسية' },
  { id: 'services', href: 'services.html', en: 'Services', ar: 'الخدمات' },
  { id: 'packages', href: 'packages.html', en: 'Packages', ar: 'الباقات' },
  { id: 'gallery', href: 'gallery.html', en: 'Gallery', ar: 'المعرض' },
  { id: 'about', href: 'about.html', en: 'About', ar: 'من نحن' },
  { id: 'booking', href: 'booking.html', en: 'Contact', ar: 'تواصل معنا' },
];

C.ui = {
  skip: { en: 'Skip to content', ar: 'تخطَّ إلى المحتوى' },
  book: { en: 'Book Now', ar: 'احجز الآن' },
  menuOpen: { en: 'Open menu', ar: 'فتح القائمة' },
  menuClose: { en: 'Close menu', ar: 'إغلاق القائمة' },
  mainNav: { en: 'Main', ar: 'القائمة الرئيسية' },
  mobileNav: { en: 'Mobile', ar: 'قائمة الجوال' },
  langName: { en: 'العربية', ar: 'English' },
  langLabel: { en: 'اقرأ هذه الصفحة بالعربية', ar: 'Read this page in English' },
  openDaily: { en: 'Open daily · Dubai, UAE', ar: 'مفتوح يوميًا · دبي، الإمارات' },
  learnMore: { en: 'Learn more', ar: 'اعرف المزيد' },
  from: { en: 'From', ar: 'تبدأ من' },
  aed: { en: 'AED', ar: 'درهم' },
  toTop: { en: 'Back to top', ar: 'العودة إلى الأعلى' },
  breadcrumb: { en: 'Breadcrumb', ar: 'مسار التنقل' },
  pause: { en: 'Pause slideshow', ar: 'إيقاف العرض' },
  prevSlide: { en: 'Previous slide', ar: 'الشريحة السابقة' },
  nextSlide: { en: 'Next slide', ar: 'الشريحة التالية' },
  goSlide: { en: 'Go to slide', ar: 'انتقل إلى الشريحة' },
  of: { en: 'of', ar: 'من' },
  slide: { en: 'slide', ar: 'شريحة' },
  featured: { en: 'Featured services', ar: 'خدمات مميزة' },
  scroll: { en: 'Scroll', ar: 'مرّر' },
  viewImage: { en: 'View larger image:', ar: 'عرض الصورة بحجم أكبر:' },
  prevReview: { en: 'Previous review', ar: 'التقييم السابق' },
  nextReview: { en: 'Next review', ar: 'التقييم التالي' },
  rated: { en: 'Rated 5 out of 5', ar: 'التقييم 5 من 5' },
  demoFigures: { en: 'Demo figures for a concept website.', ar: 'أرقام تجريبية لموقع تجريبي.' },
};

C.footer = {
  about: {
    en: 'A fictional luxury car wash and detailing studio in Dubai, designed as a showcase website.',
    ar: 'استوديو خيالي فاخر لغسيل السيارات والعناية بها في دبي، صُمّم كموقع استعراضي.',
  },
  explore: { en: 'Explore', ar: 'استكشف' },
  services: { en: 'Services', ar: 'الخدمات' },
  hours: { en: 'Opening hours', ar: 'ساعات العمل' },
  hoursList: [
    { en: 'Saturday – Thursday', ar: 'السبت – الخميس', t: '08:00 – 22:00' },
    { en: 'Friday', ar: 'الجمعة', t: '14:00 – 22:00' },
  ],
  area: { en: 'Dubai, UAE', ar: 'دبي، الإمارات العربية المتحدة' },
  contactVia: { en: 'Get in touch through our contact form', ar: 'تواصل معنا عبر نموذج التواصل' },
  social: { en: 'Social media (placeholder icons, no links)', ar: 'وسائل التواصل الاجتماعي (أيقونات توضيحية دون روابط)' },
  rights: { en: 'Smart Car Wash. All rights reserved.', ar: 'سمارت كار واش. جميع الحقوق محفوظة.' },
  concept: { en: 'Concept website for a fictional brand.', ar: 'موقع تجريبي لعلامة تجارية خيالية.' },
  demo: { en: 'Prices, reviews and figures are demo content.', ar: 'الأسعار والتقييمات والأرقام محتوى تجريبي.' },
};

C.services = [
  {
    id: 'exterior-wash', icon: 'droplet', img: 'service-exterior-wash', sedan: 79, suv: 95,
    en: 'Exterior Wash', ar: 'الغسيل الخارجي',
    short: { en: 'Snow-foam pre-wash, two-bucket hand wash and a spot-free dry for a flawless, scratch-free shine.', ar: 'رغوة تمهيدية كثيفة وغسيل يدوي بطريقة الدلوين وتجفيف خالٍ من البقع، للمعان مثالي دون خدوش.' },
    long: { en: 'Our signature hand wash removes Dubai dust and sand without swirl marks. pH-neutral snow foam lifts dirt before any contact, then we wash panel by panel with clean mitts and finish with filtered water for a spot-free result.', ar: 'غسيلنا اليدوي المميز يزيل غبار دبي ورمالها دون أن يترك خدوشًا دائرية. ترفع الرغوة المتعادلة الأوساخ قبل أي ملامسة، ثم نغسل السيارة لوحًا تلو الآخر بقفازات نظيفة، وننهي بمياه مفلترة لنتيجة خالية من البقع.' },
    time: { en: '45 min', ar: '45 دقيقة' }, ideal: { en: 'Weekly care', ar: 'عناية أسبوعية' },
    list: { en: ['Snow-foam pre-wash', 'Two-bucket hand wash', 'Wheels, tyres & arches', 'Door shuts & fuel cap', 'Spot-free filtered rinse', 'Microfibre hand dry'], ar: ['رغوة تمهيدية كثيفة', 'غسيل يدوي بطريقة الدلوين', 'الجنوط والإطارات وأقواس العجلات', 'حواف الأبواب وغطاء الوقود', 'شطف بمياه مفلترة خالية من البقع', 'تجفيف يدوي بالمايكروفايبر'] },
  },
  {
    id: 'interior-detailing', icon: 'seat', img: 'service-interior-detailing', sedan: 249, suv: 299,
    en: 'Interior Detailing', ar: 'التنظيف الداخلي',
    short: { en: 'Deep vacuum, steam clean and leather care that leave your cabin fresh, hygienic and like new.', ar: 'تنظيف عميق بالمكنسة والبخار مع العناية بالجلد، لتعود المقصورة منتعشة ونظيفة وكأنها جديدة.' },
    long: { en: 'From sand in the seat rails to fingerprints on the screen, we treat every surface with the right product. Leather is cleaned and conditioned, fabrics are shampooed and extracted, and vents are steamed to kill bacteria.', ar: 'من الرمال العالقة في سكك المقاعد إلى بصمات الأصابع على الشاشة، نعالج كل سطح بالمنتج المناسب. ننظف الجلد ونرطّبه، ونغسل الأقمشة ونستخلص منها الأوساخ، ونعقّم فتحات التكييف بالبخار للقضاء على البكتيريا.' },
    time: { en: '2–3 hrs', ar: '2–3 ساعات' }, ideal: { en: 'Families & desert trips', ar: 'العائلات ورحلات الصحراء' },
    list: { en: ['Deep vacuum incl. boot', 'Steam clean of vents & console', 'Leather clean & condition', 'Fabric & carpet shampoo', 'Streak-free glass', 'Odour neutraliser'], ar: ['تنظيف عميق بالمكنسة يشمل الصندوق', 'تنظيف فتحات التكييف والكونسول بالبخار', 'تنظيف الجلد وترطيبه', 'غسيل الأقمشة والسجاد بالشامبو', 'زجاج لامع دون آثار', 'إزالة الروائح'] },
  },
  {
    id: 'ceramic-coating', icon: 'shield', img: 'service-ceramic-coating', sedan: 1899, suv: 2299,
    en: 'Ceramic Coating', ar: 'طلاء السيراميك',
    short: { en: 'A hard, hydrophobic layer that protects paint from UV, sand and stains for up to 3 years.', ar: 'طبقة صلبة طاردة للماء تحمي الطلاء من الأشعة فوق البنفسجية والرمال والبقع لمدة تصل إلى 3 سنوات.' },
    long: { en: 'Ceramic coating bonds to your clear coat to create a glass-like shield. Water beads and rolls away, dust struggles to stick and washing becomes faster. Every coating starts with careful decontamination and a polish, so we lock in a flawless finish.', ar: 'يلتحم طلاء السيراميك بالطبقة الشفافة ليكوّن درعًا يشبه الزجاج؛ فينزلق الماء على شكل قطرات، ويصعب التصاق الغبار، ويصبح الغسيل أسرع. يبدأ كل طلاء بإزالة دقيقة للملوثات ثم التلميع، لنحافظ على لمعة مثالية.' },
    time: { en: '1–2 days', ar: 'يوم إلى يومين' }, ideal: { en: 'New & nearly-new cars', ar: 'السيارات الجديدة وشبه الجديدة' },
    list: { en: ['Full decontamination wash', 'Iron & tar removal', 'Paint depth inspection', 'One-step machine polish', 'Professional ceramic layer', 'Infrared curing'], ar: ['غسيل لإزالة الملوثات بالكامل', 'إزالة برادة الحديد والقطران', 'فحص سماكة الطلاء', 'تلميع آلي بمرحلة واحدة', 'طبقة سيراميك احترافية', 'معالجة بالأشعة تحت الحمراء'] },
  },
  {
    id: 'paint-protection-film', icon: 'layers', img: 'service-wheel-cleaning', sedan: 4500, suv: 5500,
    en: 'Paint Protection Film', ar: 'أفلام حماية الطلاء',
    short: { en: 'Self-healing, invisible film that guards high-impact areas against stone chips and scratches.', ar: 'فيلم شفاف ذاتي الالتئام يحمي المناطق الأكثر عرضة من الحصى المتطاير والخدوش.' },
    long: { en: 'Paint protection film is a clear urethane layer that absorbs the impact of stones and road debris. Light scratches disappear with heat from the sun, and the film can be combined with ceramic coating for the ultimate protection.', ar: 'فيلم حماية الطلاء طبقة شفافة من اليوريثان تمتص صدمات الحصى ومخلفات الطريق. تختفي الخدوش الخفيفة بفعل حرارة الشمس، ويمكن دمج الفيلم مع طلاء السيراميك لأقصى درجات الحماية.' },
    time: { en: '2–4 days', ar: '2–4 أيام' }, ideal: { en: 'Frequent highway driving', ar: 'القيادة المتكررة على الطرق السريعة' },
    list: { en: ['Precision computer-cut patterns', 'Front bumper, bonnet & mirrors', 'Self-healing top coat', 'Gloss or satin finish', 'Edges wrapped where possible', 'Aftercare inspection'], ar: ['قصّ دقيق بالكمبيوتر', 'الصدام الأمامي والكبوت والمرايا', 'طبقة علوية ذاتية الالتئام', 'لمسة لامعة أو مطفية', 'لفّ الحواف قدر الإمكان', 'فحص متابعة بعد التركيب'] },
  },
  {
    id: 'polishing', icon: 'sparkle', img: 'service-polishing', sedan: 799, suv: 949,
    en: 'Polishing', ar: 'التلميع',
    short: { en: 'Multi-stage machine polishing that removes swirls and light scratches to reveal a deep, mirror gloss.', ar: 'تلميع آلي متعدد المراحل يزيل الخدوش الدائرية والخفيفة ليكشف عن لمعان عميق كالمرآة.' },
    long: { en: 'Under our studio lights we measure paint depth and correct defects stage by stage with professional polishers and pads. The result is clarity and depth that a wash alone can never achieve.', ar: 'تحت إضاءة الاستوديو نقيس سماكة الطلاء ونصحّح العيوب مرحلة بعد مرحلة بآلات وإسفنجات تلميع احترافية. والنتيجة صفاء وعمق في اللون لا يمكن أن يحققهما الغسيل وحده.' },
    time: { en: '4–8 hrs', ar: '4–8 ساعات' }, ideal: { en: 'Dull or swirled paint', ar: 'الطلاء الباهت أو المخدوش' },
    list: { en: ['Paint correction assessment', 'Swirl & hologram removal', 'Light scratch refinement', 'Finishing polish for depth', 'Panel wipe inspection', 'Wax or sealant topper'], ar: ['تقييم تصحيح الطلاء', 'إزالة الخدوش الدائرية والهالات', 'معالجة الخدوش الخفيفة', 'تلميع نهائي لعمق اللون', 'فحص الألواح بعد المسح', 'طبقة نهائية من الشمع أو الحماية'] },
  },
  {
    id: 'engine-bay', icon: 'engine', img: 'service-engine-bay', sedan: 199, suv: 239,
    en: 'Engine Bay Cleaning', ar: 'تنظيف حجرة المحرك',
    short: { en: 'Safe, low-pressure steam cleaning and dressing for a clean, protected and show-ready engine bay.', ar: 'تنظيف آمن بالبخار منخفض الضغط مع طبقة حماية، لحجرة محرك نظيفة ومحمية وجاهزة للعرض.' },
    long: { en: 'A clean engine bay makes leaks easier to spot and impresses at resale. We protect sensitive electronics, lift grease with steam and dress plastics and rubbers to keep them from cracking in the heat.', ar: 'حجرة المحرك النظيفة تسهّل اكتشاف التسريبات وتترك انطباعًا رائعًا عند إعادة البيع. نحمي الأجزاء الإلكترونية الحساسة، ونزيل الشحوم بالبخار، ونعالج البلاستيك والمطاط لحمايتهما من التشقق بسبب الحرارة.' },
    time: { en: '60 min', ar: '60 دقيقة' }, ideal: { en: 'Before resale & inspections', ar: 'قبل البيع والفحص الفني' },
    list: { en: ['Electronics safely covered', 'Low-pressure steam clean', 'Degreasing of plastics', 'Detailing-brush agitation', 'Air-blow dry', 'UV-protective dressing'], ar: ['تغطية آمنة للأجزاء الإلكترونية', 'تنظيف بالبخار منخفض الضغط', 'إزالة الشحوم عن الأجزاء البلاستيكية', 'تنظيف دقيق بالفرشاة', 'تجفيف بالهواء المضغوط', 'طبقة حماية من الأشعة فوق البنفسجية'] },
  },
];

C.packages = [
  { id: 'basic', sedan: 149, suv: 179, en: 'Basic', ar: 'الأساسية', time: { en: 'approx. 45 min', ar: 'نحو 45 دقيقة' },
    desc: { en: 'The essentials for a clean car, inside and out.', ar: 'الأساسيات لسيارة نظيفة من الداخل والخارج.' } },
  { id: 'premium', sedan: 299, suv: 349, en: 'Premium', ar: 'المميزة', featured: true, time: { en: 'approx. 2 hrs', ar: 'نحو ساعتين' },
    desc: { en: 'Our most-booked package for a deep, detailed clean.', ar: 'الباقة الأكثر حجزًا لتنظيف عميق ودقيق.' } },
  { id: 'ultimate', sedan: 549, suv: 649, en: 'Ultimate', ar: 'الفاخرة', time: { en: 'approx. 4 hrs', ar: 'نحو 4 ساعات' },
    desc: { en: 'Full detail with polish and protection that lasts.', ar: 'عناية كاملة مع تلميع وحماية تدوم طويلًا.' } },
];
C.features = [
  { en: 'Hand foam wash & rinse', ar: 'غسيل يدوي بالرغوة وشطف', in: [1, 1, 1] },
  { en: 'Wheels, tyres & arches', ar: 'الجنوط والإطارات وأقواس العجلات', in: [1, 1, 1] },
  { en: 'Interior vacuum & windows', ar: 'تنظيف داخلي بالمكنسة والنوافذ', in: [1, 1, 1] },
  { en: 'Dashboard & trim care', ar: 'العناية بلوحة القيادة والزخارف', in: [0, 1, 1] },
  { en: 'Clay bar decontamination', ar: 'إزالة الملوثات بالصلصال', in: [0, 1, 1] },
  { en: 'Leather clean & condition', ar: 'تنظيف الجلد وترطيبه', in: [0, 1, 1] },
  { en: 'One-step machine polish', ar: 'تلميع آلي بمرحلة واحدة', in: [0, 0, 1] },
  { en: 'Ceramic paint sealant (6 months)', ar: 'حماية سيراميك للطلاء (6 أشهر)', in: [0, 0, 1] },
  { en: 'Engine bay refresh', ar: 'تنظيف سريع لحجرة المحرك', in: [0, 0, 1] },
];

C.membership = [
  { id: 'membership', sedan: 399, suv: 469, en: 'Shine Club', ar: 'نادي اللمعان',
    desc: { en: 'Keep your car spotless all month long.', ar: 'حافظ على نظافة سيارتك طوال الشهر.' },
    list: { en: ['Unlimited exterior washes', '1 interior refresh per month', 'Priority booking', '10% off detailing services'], ar: ['غسيل خارجي غير محدود', 'تنظيف داخلي سريع مرة شهريًا', 'أولوية في الحجز', 'خصم 10% على خدمات العناية'] } },
  { id: 'membership-plus', sedan: 699, suv: 799, en: 'Shine Club Plus', ar: 'نادي اللمعان بلس',
    desc: { en: 'For enthusiasts who want showroom condition, always.', ar: 'لعشاق السيارات الذين يريدون حالة صالة العرض دائمًا.' },
    list: { en: ['Everything in Shine Club', '1 Premium package per month', 'Quarterly ceramic top-up', '20% off detailing services'], ar: ['كل مزايا نادي اللمعان', 'باقة مميزة واحدة شهريًا', 'تجديد طبقة السيراميك كل 3 أشهر', 'خصم 20% على خدمات العناية'] } },
];

C.addons = [
  { icon: 'leaf', en: 'Odour removal', ar: 'إزالة الروائح', p: 149, d: { en: 'Ozone treatment that neutralises smoke, food and pet odours.', ar: 'معالجة بالأوزون تقضي على روائح الدخان والطعام والحيوانات الأليفة.' } },
  { icon: 'sun', en: 'Headlight restoration', ar: 'تجديد المصابيح الأمامية', p: 199, d: { en: 'Removes yellowing and haze for clearer night driving.', ar: 'يزيل الاصفرار والضباب لرؤية أوضح أثناء القيادة ليلًا.' } },
  { icon: 'users', en: 'Pet hair removal', ar: 'إزالة شعر الحيوانات', p: 99, d: { en: 'Specialist tools lift embedded hair from fabric and carpets.', ar: 'أدوات متخصصة لإزالة الشعر العالق من الأقمشة والسجاد.' } },
  { icon: 'droplet', en: 'Glass coating', ar: 'طلاء الزجاج', p: 249, d: { en: 'Hydrophobic windscreen coating for better visibility in rain.', ar: 'طلاء طارد للماء للزجاج الأمامي لرؤية أفضل أثناء المطر.' } },
  { icon: 'shield', en: 'Leather protection', ar: 'حماية الجلد', p: 299, d: { en: 'Breathable coating that guards seats against dye transfer and UV.', ar: 'طبقة تحمي المقاعد من انتقال الألوان والأشعة فوق البنفسجية.' } },
  { icon: 'wheel', en: 'Wheel & caliper coating', ar: 'طلاء الجنوط والمكابح', p: 349, d: { en: 'Heat-resistant ceramic that keeps brake dust from sticking.', ar: 'سيراميك مقاوم للحرارة يمنع التصاق غبار المكابح.' } },
];

C.steps = [
  { icon: 'calendar', en: 'Book online', ar: 'احجز أونلاين', d: { en: 'Pick a service, your vehicle and a time slot in under a minute.', ar: 'اختر الخدمة ونوع سيارتك والموعد في أقل من دقيقة.' } },
  { icon: 'message', en: 'We confirm', ar: 'نؤكد موعدك', d: { en: 'Your detailer reviews the request and confirms your slot.', ar: 'يراجع الفني طلبك ويؤكد الموعد.' } },
  { icon: 'sparkle', en: 'Expert care', ar: 'عناية احترافية', d: { en: 'Trained detailers treat your car with premium, pH-neutral products.', ar: 'يعتني فنيون مدرَّبون بسيارتك بمنتجات فاخرة متعادلة الحموضة.' } },
  { icon: 'sedan', en: 'Drive away shining', ar: 'انطلق بسيارة لامعة', d: { en: 'A final inspection together, then enjoy the showroom finish.', ar: 'فحص نهائي معك، ثم استمتع بلمعة صالة العرض.' } },
];

C.testimonials = [
  { n: { en: 'Layla R.', ar: 'ليلى ر.' }, i: { en: 'LR', ar: 'ل ر' }, s: { en: 'Premium package · SUV', ar: 'الباقة المميزة · دفع رباعي' },
    q: { en: 'Booked in under a minute and the car came back looking better than the day I bought it. The attention to the wheels and interior is next level.', ar: 'حجزت في أقل من دقيقة، وعادت السيارة أجمل مما كانت يوم اشتريتها. الاهتمام بالجنوط والمقصورة على مستوى آخر.' } },
  { n: { en: 'Daniel M.', ar: 'دانيال م.' }, i: { en: 'DM', ar: 'د م' }, s: { en: 'Ceramic coating · Coupe', ar: 'طلاء السيراميك · كوبيه' }, silver: true,
    q: { en: 'They explained every step of the ceramic coating and the water beading is unreal. Honest advice and zero pressure to upgrade.', ar: 'شرحوا كل خطوة في طلاء السيراميك، وتكوّن قطرات الماء مذهل. نصيحة صادقة ودون أي ضغط للترقية.' } },
  { n: { en: 'Hessa A.', ar: 'حصة أ.' }, i: { en: 'HA', ar: 'ح أ' }, s: { en: 'Shine Club member', ar: 'عضوة في نادي اللمعان' },
    q: { en: 'The monthly membership is the best decision I have made for my car. Always on time, always spotless.', ar: 'العضوية الشهرية أفضل قرار اتخذته لسيارتي. دائمًا في الموعد، ودائمًا نظيفة تمامًا.' } },
  { n: { en: 'Arjun P.', ar: 'أرجون ب.' }, i: { en: 'AP', ar: 'أ ب' }, s: { en: 'Interior detailing · Sedan', ar: 'التنظيف الداخلي · سيدان' }, silver: true,
    q: { en: 'Sand everywhere after a desert weekend. They made the interior look brand new, and it smelled amazing.', ar: 'الرمل في كل مكان بعد عطلة في الصحراء، لكنهم أعادوا المقصورة كأنها جديدة، وبرائحة رائعة.' } },
  { n: { en: 'Sofia K.', ar: 'صوفيا ك.' }, i: { en: 'SK', ar: 'ص ك' }, s: { en: 'Paint protection film · SUV', ar: 'أفلام حماية الطلاء · دفع رباعي' },
    q: { en: 'Professional team, a beautiful studio and a finish that turns heads. Worth every dirham.', ar: 'فريق محترف واستوديو جميل ولمسة نهائية تلفت الأنظار. تستحق كل درهم.' } },
];

C.faq = [
  { q: { en: 'How long does a wash or detail take?', ar: 'كم يستغرق الغسيل أو العناية التفصيلية؟' },
    a: { en: 'A Basic package takes about 45 minutes, Premium about 2 hours and Ultimate around 4 hours. Ceramic coating and paint protection film are scheduled as 1–4 day appointments so the products can cure properly.', ar: 'تستغرق الباقة الأساسية نحو 45 دقيقة، والمميزة نحو ساعتين، والفاخرة قرابة 4 ساعات. أما طلاء السيراميك وأفلام حماية الطلاء فتُحجز لمدة 1–4 أيام حتى تثبت المواد بشكل صحيح.' } },
  { q: { en: 'Do I need to book in advance?', ar: 'هل أحتاج إلى الحجز مسبقًا؟' },
    a: { en: 'Booking online guarantees your time slot and takes less than a minute. Same-day slots are often available for washes and packages.', ar: 'الحجز أونلاين يضمن موعدك ولا يستغرق أكثر من دقيقة. وغالبًا تتوفر مواعيد في اليوم نفسه للغسيل والباقات.' } },
  { q: { en: 'Which products do you use?', ar: 'ما المنتجات التي تستخدمونها؟' },
    a: { en: 'We use pH-neutral shampoos, water-based dressings and professional-grade coatings that are safe for every paint finish, wrap and protection film.', ar: 'نستخدم شامبو متعادل الحموضة ومواد تلميع مائية وطلاءات احترافية آمنة على جميع أنواع الطلاء والتغليف وأفلام الحماية.' } },
  { q: { en: 'Is ceramic coating worth it in the UAE climate?', ar: 'هل يستحق طلاء السيراميك العناء في مناخ الإمارات؟' },
    a: { en: 'Yes. Strong sun, sand and humidity age paint quickly. A ceramic layer adds UV resistance, makes dust easier to wash off and keeps the gloss for years with simple maintenance.', ar: 'نعم. الشمس القوية والرمال والرطوبة تُتلف الطلاء بسرعة، وطبقة السيراميك تزيد مقاومته للأشعة فوق البنفسجية، وتسهّل إزالة الغبار، وتحافظ على اللمعان لسنوات مع عناية بسيطة.' } },
  { q: { en: 'Can I reschedule or cancel?', ar: 'هل يمكنني تغيير الموعد أو إلغاؤه؟' },
    a: { en: 'You can reschedule or cancel free of charge up to 12 hours before your appointment.', ar: 'يمكنك تغيير الموعد أو إلغاؤه مجانًا حتى 12 ساعة قبل الموعد.' } },
  { q: { en: 'Is Smart Car Wash a real business?', ar: 'هل سمارت كار واش نشاط تجاري حقيقي؟' },
    a: { en: 'No. Smart Car Wash is a fictional brand created for a concept website. Prices, reviews and figures are demo content, and no bookings or messages are sent.', ar: 'لا. سمارت كار واش علامة تجارية خيالية صُمّمت لموقع تجريبي، والأسعار والتقييمات والأرقام محتوى تجريبي، ولا تُرسل أي حجوزات أو رسائل.' } },
];

C.vehicles = [
  { id: 'sedan', icon: 'sedan', en: 'Sedan', ar: 'سيدان', s: { en: 'Saloon & hatchback', ar: 'صالون وهاتشباك' } },
  { id: 'suv', icon: 'suv', en: 'SUV / 4x4', ar: 'دفع رباعي', s: { en: 'SUV, 4x4 & pick-up', ar: 'رياضية متعددة الاستخدامات وبيك أب' } },
  { id: 'coupe', icon: 'coupe', en: 'Coupe / Sports', ar: 'كوبيه / رياضية', s: { en: 'Two-door & sports cars', ar: 'سيارات بابين ورياضية' } },
];
C.slots = ['08:00', '09:30', '11:00', '12:30', '14:00', '15:30', '17:00', '18:30', '20:00'];
C.booked = ['11:00', '17:00'];

// image catalogue: base path (no extension), full width/height, small width, alt text
C.img = {
  'hero-1': { en: 'Black sports car wrapped in a splash of water inside a Dubai detailing studio at sunset', ar: 'سيارة رياضية سوداء يحيط بها رذاذ الماء داخل استوديو عناية في دبي وقت الغروب' },
  'hero-2': { en: 'Gloved hand washing a glossy black sports car with thick foam', ar: 'يد بقفاز تغسل سيارة رياضية سوداء لامعة برغوة كثيفة' },
  'hero-3': { en: 'Freshly washed black sports car in front of the Dubai skyline at night', ar: 'سيارة رياضية سوداء بعد غسيلها أمام أفق دبي ليلًا' },
  'service-exterior-wash': { w: 1200, h: 900, s: 600, dir: 'services', en: 'Two detailers foam-washing a black sports car', ar: 'فنيان يغسلان سيارة رياضية سوداء بالرغوة' },
  'service-interior-detailing': { w: 1200, h: 900, s: 600, dir: 'services', en: 'Detailer vacuuming the leather seats of a luxury car', ar: 'فني ينظف المقاعد الجلدية لسيارة فاخرة بالمكنسة' },
  'service-ceramic-coating': { w: 1200, h: 900, s: 600, dir: 'services', en: 'Ceramic coating applied to a black bonnet with water beading on the surface', ar: 'تطبيق طلاء السيراميك على غطاء محرك أسود مع تكوّن قطرات الماء على سطحه' },
  'service-wheel-cleaning': { w: 1200, h: 900, s: 600, dir: 'services', en: 'Detailer cleaning a foam-covered alloy wheel with a brush', ar: 'فني ينظف جنطًا مغطى بالرغوة بالفرشاة' },
  'service-polishing': { w: 1200, h: 900, s: 600, dir: 'services', en: 'Machine polisher bringing a mirror finish to a black sports car', ar: 'آلة تلميع تمنح سيارة رياضية سوداء لمعانًا كالمرآة' },
  'service-engine-bay': { w: 1200, h: 900, s: 600, dir: 'services', en: 'Engine bay being steam-cleaned with a detailing brush', ar: 'تنظيف حجرة المحرك بالبخار وفرشاة دقيقة' },
  'before-suv': { w: 1600, h: 1067, s: 800, dir: 'before-after', en: 'Sports car covered in dust and grime before cleaning', ar: 'سيارة رياضية مغطاة بالغبار والأوساخ قبل التنظيف' },
  'after-suv': { w: 1600, h: 1067, s: 800, dir: 'before-after', en: 'The same sports car with a deep gloss after exterior detailing', ar: 'السيارة الرياضية نفسها بلمعان عميق بعد العناية الخارجية' },
  'before-interior': { w: 1600, h: 1067, s: 800, dir: 'before-after', en: 'Dusty car interior with dirty seats and dashboard before detailing', ar: 'مقصورة سيارة مغبرة بمقاعد ولوحة قيادة متسخة قبل التنظيف' },
  'after-interior': { w: 1600, h: 1067, s: 800, dir: 'before-after', en: 'The same interior clean and conditioned after detailing', ar: 'المقصورة نفسها نظيفة ومرطّبة بعد التنظيف' },
  'before-wheel': { w: 1600, h: 1067, s: 800, dir: 'before-after', en: 'Alloy wheel covered in brake dust and mud before cleaning', ar: 'جنط مغطى بغبار المكابح والطين قبل التنظيف' },
  'after-wheel': { w: 1600, h: 1067, s: 800, dir: 'before-after', en: 'The same wheel clean and glossy after cleaning', ar: 'الجنط نفسه نظيف ولامع بعد التنظيف' },
  'gallery-1-exterior-foam-wash': { w: 1200, h: 1200, s: 600, dir: 'gallery', en: 'Detailer hand-washing a sports car covered in foam', ar: 'فني يغسل سيارة رياضية مغطاة بالرغوة يدويًا' },
  'gallery-2-interior-cleaning': { w: 1200, h: 1200, s: 600, dir: 'gallery', en: 'Detailer wiping down a luxury car interior', ar: 'فني ينظف المقصورة الداخلية لسيارة فاخرة' },
  'gallery-3-detailing-wheel': { w: 1200, h: 1200, s: 600, dir: 'gallery', en: 'Wheel being deep-cleaned with a soft brush and foam', ar: 'تنظيف عميق للجنط بفرشاة ناعمة ورغوة' },
  'gallery-4-detailing-polish': { w: 1200, h: 1200, s: 600, dir: 'gallery', en: 'Detailer machine-polishing a black bonnet', ar: 'فني يلمّع غطاء محرك أسود بالآلة' },
  'gallery-5-detailing-coating': { w: 1200, h: 1200, s: 600, dir: 'gallery', en: 'Ceramic coating being applied with an applicator pad', ar: 'تطبيق طلاء السيراميك بإسفنجة خاصة' },
  'gallery-6-detailing-engine': { w: 1200, h: 1200, s: 600, dir: 'gallery', en: 'Engine bay being steam-cleaned', ar: 'تنظيف حجرة المحرك بالبخار' },
  'gallery-7-exterior-hand-dry': { w: 1200, h: 1200, s: 600, dir: 'gallery', en: 'Detailer drying a sports car with microfibre towels', ar: 'فني يجفف سيارة رياضية بمناشف المايكروفايبر' },
  'gallery-8-exterior-finish': { w: 1200, h: 1200, s: 600, dir: 'gallery', en: 'Gleaming black sports car in a studio with orange lighting', ar: 'سيارة رياضية سوداء لامعة في استوديو بإضاءة برتقالية' },
  'about-team': { w: 1600, h: 1067, s: 800, dir: 'about', en: 'Smart Car Wash detailer hand-drying a black sports car in the studio', ar: 'فني من سمارت كار واش يجفف سيارة رياضية سوداء يدويًا في الاستوديو' },
  'about-craft': { w: 1600, h: 1067, s: 800, dir: 'about', en: 'Close-up of a detailer machine-polishing a black car', ar: 'لقطة قريبة لفني يلمّع سيارة سوداء بالآلة' },
  'banner-booking': { w: 2400, h: 800, s: 1200, dir: 'banners', en: 'Detailer polishing a sports car in a dark studio with orange light strips', ar: 'فني يلمّع سيارة رياضية في استوديو داكن بإضاءة برتقالية' },
  'banner-membership': { w: 2400, h: 800, s: 1200, dir: 'banners', en: 'Detailer rinsing a sports car with a pressure washer at sunset', ar: 'فني يشطف سيارة رياضية بمضخة ماء وقت الغروب' },
};

C.gallery = [
  { img: 'gallery-1-exterior-foam-wash', cat: 'exterior', en: 'Snow-foam hand wash', ar: 'غسيل يدوي بالرغوة' },
  { img: 'gallery-2-interior-cleaning', cat: 'interior', en: 'Interior detailing', ar: 'تنظيف المقصورة' },
  { img: 'gallery-3-detailing-wheel', cat: 'detailing', en: 'Wheel deep-clean', ar: 'تنظيف عميق للجنوط' },
  { img: 'gallery-4-detailing-polish', cat: 'detailing', en: 'Machine polishing', ar: 'التلميع الآلي' },
  { img: 'gallery-7-exterior-hand-dry', cat: 'exterior', en: 'Microfibre hand dry', ar: 'تجفيف يدوي بالمايكروفايبر' },
  { img: 'gallery-5-detailing-coating', cat: 'detailing', en: 'Ceramic coating', ar: 'طلاء السيراميك' },
  { img: 'service-interior-detailing', cat: 'interior', en: 'Leather seat care', ar: 'العناية بالمقاعد الجلدية' },
  { img: 'gallery-8-exterior-finish', cat: 'exterior', en: 'Showroom finish', ar: 'لمسة صالة العرض' },
  { img: 'gallery-6-detailing-engine', cat: 'detailing', en: 'Engine bay steam clean', ar: 'تنظيف حجرة المحرك بالبخار' },
  { img: 'after-interior', cat: 'interior', en: 'Cabin after detailing', ar: 'المقصورة بعد التنظيف' },
  { img: 'service-exterior-wash', cat: 'exterior', en: 'Team foam wash', ar: 'غسيل جماعي بالرغوة' },
  { img: 'after-suv', cat: 'exterior', en: 'Deep gloss after detailing', ar: 'لمعان عميق بعد العناية' },
];
C.cats = { all: { en: 'All', ar: 'الكل' }, exterior: { en: 'Exterior', ar: 'خارجي' }, interior: { en: 'Interior', ar: 'داخلي' }, detailing: { en: 'Detailing', ar: 'عناية تفصيلية' } };

C.team = [
  { i: { en: 'KH', ar: 'ك' }, n: { en: 'Karim H.', ar: 'كريم ح.' }, r: { en: 'Head of Detailing', ar: 'رئيس قسم العناية' }, d: { en: '12 years perfecting paint correction.', ar: '12 عامًا في إتقان تصحيح الطلاء.' } },
  { i: { en: 'MS', ar: 'م' }, n: { en: 'Maya S.', ar: 'مايا س.' }, r: { en: 'Ceramic & PPF Specialist', ar: 'أخصائية السيراميك وأفلام الحماية' }, d: { en: 'Certified in coatings and film installation.', ar: 'معتمدة في الطلاءات وتركيب الأفلام.' }, silver: true },
  { i: { en: 'FA', ar: 'ف' }, n: { en: 'Faisal A.', ar: 'فيصل أ.' }, r: { en: 'Interior Specialist', ar: 'أخصائي التنظيف الداخلي' }, d: { en: 'Leather, Alcantara and fabric expert.', ar: 'خبير في الجلد والألكانتارا والأقمشة.' } },
  { i: { en: 'NR', ar: 'ن' }, n: { en: 'Nadia R.', ar: 'نادية ر.' }, r: { en: 'Customer Care Lead', ar: 'مسؤولة خدمة العملاء' }, d: { en: 'Makes every visit smooth and on time.', ar: 'تحرص على أن تكون كل زيارة سلسة وفي موعدها.' }, silver: true },
];

module.exports = C;
