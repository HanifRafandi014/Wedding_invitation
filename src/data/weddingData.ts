export interface CoupleInfo {
  name: string;
  fullName: string;
  parents: string;
  father: string;
  mother: string;
  instagram: string;
  photoUrl: string;
  attireDescription: string;
  bio: string;
}

export interface WeddingEvent {
  title: string;
  dateStr: string;
  date: Date;
  timeStr: string;
  venue: string;
  address: string;
  mapsUrl: string;
  mapsEmbedQuery: string;
  note?: string;
}

export interface StoryMilestone {
  year: string;
  title: string;
  story: string;
  imageUrl: string;
  location?: string;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  holderName: string;
  logo: string;
  color: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  category: 'prewedding' | 'engagement' | 'details';
}

export interface GuestWish {
  id: string;
  name: string;
  attendance: 'hadir' | 'ragu' | 'tidak_hadir';
  message: string;
  createdAt: string;
  city?: string;
}

export const WEDDING_DATA = {
  groom: {
    name: 'Hanif',
    fullName: 'Hanif Naufal Rafandi',
    parents: 'Putra tercinta dari Bapak H. Ahmad Sukirman & Ibu Hj. Siti Aminah',
    father: 'Bapak H. Ahmad Sukirman',
    mother: 'Ibu Hj. Siti Aminah',
    instagram: '@hanifnaufalrafandi',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    attireDescription: 'Mengenakan setelan jas hitam modern elegan, kemeja putih rapi, dan dasi formal',
    bio: 'Penuh rasa syukur dipertemukan dengan wanita sholehah yang kini menjadi pelabuhan terakhir hatiku.'
  },
  bride: {
    name: 'Rina',
    fullName: 'Ikrinatus Sadiyah',
    parents: 'Putri tercinta dari Bapak H. Bambang Wahyudi & Ibu Hj. Sri Rahayu',
    father: 'Bapak H. Bambang Wahyudi',
    mother: 'Ibu Hj. Sri Rahayu',
    instagram: '@ikrinatussadiyah',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    attireDescription: 'Mengenakan gaun pengantin muslimah putih panjang bertabur bordir mutiara, dipadukan jilbab putih anggun dan veil renda',
    bio: 'Menemukan ketenangan dan kehangatan dalam diri pria yang siap membimbing menuju surga-Nya.'
  },
  quranVerse: {
    surah: 'QS. Ar-Rum: 21',
    arabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
    latin: 'Wa min aayaatihii an khalaqa lakum min anfusikum azwaajal litaskunuuu ilaihaa wa ja\'ala bainakum mawaddataw wa rahmah; inna fii zaalika la-aayaatil liqawmiy yatafakkaruun.',
    translation: 'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.'
  },
  targetDate: new Date('2026-10-24T08:00:00+07:00'),
  events: [
    {
      title: 'Akad Nikah',
      dateStr: 'Sabtu, 24 Oktober 2026',
      date: new Date('2026-10-24T08:00:00+07:00'),
      timeStr: '08:00 - 10:00 WIB',
      venue: 'Masjid Raya Al-Barkah & Kediaman Mempelai',
      address: 'Jl. Melati Indah No. 12, Kebon Jeruk, Jakarta Barat',
      mapsUrl: 'https://maps.app.goo.gl/roJYnbBnbUvhJ2dm7',
      mapsEmbedQuery: 'Jl.+Melati+Indah+No.+12+Jakarta+Barat',
      note: 'Diharapkan hadir 15 menit sebelum acara dimulai dengan khidmat.'
    },
    {
      title: 'Resepsi Pernikahan',
      dateStr: 'Sabtu, 24 Oktober 2026',
      date: new Date('2026-10-24T11:00:00+07:00'),
      timeStr: '11:00 - 17:00 WIB',
      venue: 'Ballroom Graha Sarana Harmoni',
      address: 'Jl. Melati Indah No. 12, Kebon Jeruk, Jakarta Barat',
      mapsUrl: 'https://maps.app.goo.gl/roJYnbBnbUvhJ2dm7',
      mapsEmbedQuery: 'Jl.+Melati+Indah+No.+12+Jakarta+Barat',
      note: 'Merupakan kehormatan bagi kami atas kehadiran dan doa restu Bapak/Ibu/Saudara/i.'
    }
  ],
  story: [
    {
      year: '2021',
      title: 'Awal Pertemuan yang Manis',
      story: 'Sebuah takdir indah mempertemukan pandangan kami di sebuah acara seminar kampus. Dari sekadar diskusi ringan tentang cita-cita, tumbuh benih kekaguman dan kecocokan hati yang mendalam.',
      imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      location: 'Jakarta Barat'
    },
    {
      year: '2023',
      title: 'Ikrar Lamaran & Pertemuan Dua Keluarga',
      story: 'Dengan niat suci berlandaskan ibadah, Hanif didampingi orang tua tercinta melangkah meminang Rina. Di hari yang penuh kebahagiaan itu, dua keluarga berpadu dalam kehangatan doa dan restu.',
      imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      location: 'Kediaman Rina'
    },
    {
      year: '2026',
      title: 'Menuju Ikatan Suci Abadi',
      story: 'Setelah melewati perjalanan penuh saling menguatkan, kami siap mengikrarkan akad suci pernikahan. Memulai lembaran baru dalam balutan cinta, ridho orang tua, dan berkah Allah SWT.',
      imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      location: 'Graha Sarana Harmoni'
    }
  ],
  bankAccounts: [
    {
      bankName: 'Bank BRI',
      accountNumber: '012301098765501',
      holderName: 'Hanif Naufal Rafandi',
      logo: 'BRI',
      color: '#00529C'
    },
    {
      bankName: 'Bank BNI',
      accountNumber: '9876543210',
      holderName: 'Ikrinatus Sadiyah',
      logo: 'BNI',
      color: '#E05A1F'
    },
    {
      bankName: 'ShopeePay / DANA',
      accountNumber: '081234567890',
      holderName: 'Ikrinatus Sadiyah',
      logo: 'E-WALLET',
      color: '#EE4D2D'
    }
  ],
  physicalGiftAddress: {
    receiver: 'Hanif Naufal Rafandi & Ikrinatus Sadiyah',
    phone: '0812-3456-7890',
    address: 'Jl. Melati Indah No. 12, RT 04/RW 02, Kebon Jeruk, Jakarta Barat, DKI Jakarta 11530',
    note: 'Mohon konfirmasi sebelum pengiriman agar kado dapat diterima dengan baik.'
  },
  gallery: [
    {
      id: 'g1',
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80',
      caption: 'Potret Keanggunan Pengantin: Jas Hitam & Gaun Jilbab Putih',
      category: 'prewedding',
    },
    {
      id: 'g2',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
      caption: 'Momen Bahagia Lamaran',
      category: 'engagement',
    },
    {
      id: 'g3',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
      caption: 'Janji Setia di Bawah Langit Senja',
      category: 'prewedding',
    },
    {
      id: 'g4',
      url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=80',
      caption: 'Cincin Pengikat Dua Jiwa',
      category: 'details',
    },
    {
      id: 'g5',
      url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1000&q=80',
      caption: 'Buket Mawar Putih Lambang Kesucian',
      category: 'details',
    },
    {
      id: 'g6',
      url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80',
      caption: 'Tawa & Bahagia yang Tak Lekang Waktu',
      category: 'prewedding',
    },
  ] as GalleryItem[],
  initialWishes: [
    {
      id: 'wish-1',
      name: 'Rian Pratama & Keluarga',
      attendance: 'hadir',
      message: 'Barakallahu lakum wa baraka \'alaikum wa jama\'a bainakuma fii khoir. Selamat menempuh hidup baru Hanif dan Rina! Semoga selalu dilimpahkan cinta dan kebahagiaan!',
      createdAt: '10 menit yang lalu',
      city: 'Jakarta'
    },
    {
      id: 'wish-2',
      name: 'Dr. Dinda Faradiba',
      attendance: 'hadir',
      message: 'Masya Allah terharu banget liat perjalanan kalian berdua! Semoga sakinah mawaddah warahmah sampai kakek nenek. Aamiin ya Rabbal alamin.',
      createdAt: '25 menit yang lalu',
      city: 'Bandung'
    },
    {
      id: 'wish-3',
      name: 'Keluarga Besar Alumni Informatika',
      attendance: 'hadir',
      message: 'Selamat bro Hanif & Mbak Rina! InsyaAllah rombongan kami hadir meramaikan hari bahagia kalian.',
      createdAt: '1 jam yang lalu',
      city: 'Surabaya'
    },
    {
      id: 'wish-4',
      name: 'Siti Rahmawati',
      attendance: 'ragu',
      message: 'Selamat berbahagia sahabatku Rina! Maaf bila nanti agak telat karena ada dinas, tapi doa terbaik selalu mengiringi kalian.',
      createdAt: '2 jam yang lalu',
      city: 'Yogyakarta'
    }
  ]
};
