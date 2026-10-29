export const WHATSAPP_URL = 'https://wa.me/22233313150'
export const PHONE_DISPLAY = '+222 33 31 31 50'
export const NATIVE_NAME = 'محظرة الأندلس العلمية'
export const LATIN_NAME = 'Mahdara Al-Andalous Al-Ilmiyya'

export const NAV_ITEMS = ['about', 'mission', 'objectives', 'activities', 'achievements', 'gallery', 'contact']

export const PHOTOS = [
  { key: 'studentsCertificates', src: '/images/graduation-students-certificates.jpg' },
  { key: 'femaleGraduates', src: '/images/graduation-female-graduates.jpg' },
  { key: 'teachersGraduates', src: '/images/graduation-teachers-graduates.jpg' },
  { key: 'ijazahRecipient', src: '/images/graduation-ijazah-recipient.jpg' },
  { key: 'celebration', src: '/images/graduation-celebration.jpg' },
  { key: 'teacherStudent', src: '/images/graduation-teacher-student.jpg' },
  { key: 'nafiIjazah', src: '/images/graduation-nafi-ijazah.jpg' },
  { key: 'honorCertificate1', src: '/images/graduation-honor-certificate-1.jpg' },
  { key: 'honorCertificate2', src: '/images/graduation-honor-certificate-2.jpg' },
  { key: 'youngHafiz', src: '/images/graduation-young-hafiz.jpg' },
]
export const photo = (key) => PHOTOS.find((p) => p.key === key)
