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

// Helper gambar aman untuk localhost maupun subpath/deploy server
export const getImg = (name: string): string => {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  return `${base}/assets/images/${name}`;
};

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
    parents: 'Putra tercinta dari Bapak H. Adi Makroni & Ibu Hj. Windya Astuti',
    father: 'Bapak H. Adi Makroni',
    mother: 'Ibu Hj. Windya Astuti',
    instagram: '@hnfnoppaall',
    photoUrl: getImg('hanif3.jpg'),
    attireDescription: 'Mengenakan setelan jas hitam modern elegan, kemeja putih rapi, dan dasi formal',
    bio: 'Penuh rasa syukur dipertemukan dengan wanita sholehah yang kini menjadi pelabuhan terakhir hatiku.'
  },
  bride: {
    name: 'Rina',
    fullName: 'Ikrinatus Sadiyah',
    parents: 'Putri tercinta dari Bapak Edy Sofyan & Ibu Masluha',
    father: 'Bapak Edy Sofyan',
    mother: 'Ibu Masluha',
    instagram: '@ikrinasdyy',
    photoUrl: getImg('rina3.jpg'),
    attireDescription: 'Mengenakan gaun pengantin muslimah putih panjang bertabur bordir mutiara, dipadukan jilbab putih anggun dan veil renda',
    bio: 'Menemukan ketenangan dan kehangatan dalam diri pria yang siap membimbing menuju surga-Nya.'
  },
  quranVerse: {
    surah: 'QS. Ar-Rum: 21',
    arabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
    latin: 'Wa min aayaatihii an khalaqa lakum min anfusikum azwaajal litaskunuuu ilaihaa wa ja\'ala bainakum mawaddataw wa rahmah; inna fii zaalika la-aayaatil liqawmiy yatafakkaruun.',
    translation: 'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.'
  },
  targetDate: new Date('2029-11-17T08:00:00+07:00'),
  events: [
    {
      title: 'Akad Nikah & Lamaran',
      dateStr: 'Sabtu, 17 November 2029',
      date: new Date('2029-11-17T08:00:00+07:00'),
      timeStr: '08:00 - 10:00 WIB',
      venue: 'Kediaman Mempelai Wanita',
      address: 'Jl. Gatot Subroto, Gg 2, RT 001/RW 002, Kelurahan Petahunan, Kecamatan Gadingrejo, Kota Pasuruan',
      mapsUrl: 'https://maps.app.goo.gl/xArezLUQkuNvaXF47',
      mapsEmbedQuery: 'Jl.+Gatot+Subroto,+Gg+2,+RT+001/RW+002,+Kelurahan+Petahunan,+Kecamatan+Gadingrejo,+Kota+Pasuruan',
      note: 'Diharapkan hadir 15 menit sebelum acara dimulai dengan khidmat.'
    },
    {
      title: 'Resepsi Pernikahan',
      dateStr: 'Sabtu, 17 November 2029',
      date: new Date('2029-11-17T11:00:00+07:00'),
      timeStr: '11:00 - 17:00 WIB',
      venue: 'Kediaman Mempelai Wanita',
      address: 'Jl. Gatot Subroto, Gg 2, RT 001/RW 002, Kelurahan Petahunan, Kecamatan Gadingrejo, Kota Pasuruan',
      mapsUrl: 'https://maps.app.goo.gl/xArezLUQkuNvaXF47',
      mapsEmbedQuery: 'Jl.+Gatot+Subroto,+Gg+2,+RT+001/RW+002,+Kelurahan+Petahunan,+Kecamatan+Gadingrejo,+Kota+Pasuruan',
      note: 'Merupakan kehormatan bagi kami atas kehadiran dan doa restu Bapak/Ibu/Saudara/i.'
    }
  ],
  story: [
    {
      year: '2024',
      title: 'Awal Pertemuan yang Manis',
      story: 'Sebuah takdir indah mempertemukan pandangan kami di sebuah acara seminar kampus. Dari sekadar diskusi ringan tentang cita-cita, tumbuh benih kekaguman dan kecocokan hati yang mendalam.',
      imageUrl: getImg('hanif4.jpg'),
      location: 'Malang'
    },
    {
      year: '2027',
      title: 'Ikrar Tunangan & Pertemuan Dua Keluarga',
      story: 'Dengan niat suci berlandaskan ibadah, Hanif didampingi orang tua tercinta melangkah meminang Rina. Di hari yang penuh kebahagiaan itu, dua keluarga berpadu dalam kehangatan doa dan restu.',
      imageUrl: getImg('hanif4.jpg'),
      location: 'Kediaman Rina'
    },
    {
      year: '2029',
      title: 'Menuju Ikatan Suci Abadi',
      story: 'Setelah melewati perjalanan penuh saling menguatkan, kami siap mengikrarkan akad suci pernikahan. Memulai lembaran baru dalam balutan cinta, ridho orang tua, dan berkah Allah SWT.',
      imageUrl: getImg('hanif4.jpg'),
      location: 'Kediaman Rina'
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
      accountNumber: '088801524852',
      holderName: 'Ikrinatus Sadiyah',
      logo: 'E-WALLET',
      color: '#EE4D2D'
    }
  ],
  physicalGiftAddress: {
    receiver: 'Hanif Naufal Rafandi & Ikrinatus Sadiyah',
    phone: '0888-0152-4852',
    address: 'Jl. Gatot Subroto, Gg 2, RT 001/RW 002, Kelurahan Petahunan, Kecamatan Gadingrejo, Kota Pasuruan',
    note: 'Mohon konfirmasi sebelum pengiriman agar kado dapat diterima dengan baik.'
  },
  gallery: [
    {
      id: 'g1',
      url: getImg('hanif1.jpg'),
      caption: 'Potret Keanggunan Pengantin: Jas Hitam & Gaun Jilbab Putih',
      category: 'prewedding',
    },
    {
      id: 'g2',
      url: getImg('rina1.jpg'),
      caption: 'Momen Bahagia Lamaran',
      category: 'engagement',
    },
    {
      id: 'g3',
      url: getImg('hanif2.jpg'),
      caption: 'Janji Setia di Bawah Langit Senja',
      category: 'prewedding',
    },
    {
      id: 'g4',
      url: getImg('rina2.jpg'),
      caption: 'Cincin Pengikat Dua Jiwa',
      category: 'details',
    },
    {
      id: 'g5',
      url: getImg('hanif3.jpg'),
      caption: 'Buket Mawar Putih Lambang Kesucian',
      category: 'details',
    },
    {
      id: 'g6',
      url: getImg('rina3.jpg'),
      caption: 'Tawa & Bahagia yang Tak Lekang Waktu',
      category: 'prewedding',
    },
  ] as GalleryItem[]
};