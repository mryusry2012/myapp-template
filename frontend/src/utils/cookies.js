import Cookies from 'js-cookie'

// Simpan referral UID ke dalam cookie selama 30 hari
export const setReferralUID = (uid) => {
  Cookies.set('referral_uid', uid, { expires: 30 })
}

// Dapatkan referral UID dari cookie
export const getReferralUID = () => {
  return Cookies.get('referral_uid') || null
}

// Hapus referral UID dari cookie (optional guna nanti)
export const clearReferralUID = () => {
  Cookies.remove('referral_uid')
}
