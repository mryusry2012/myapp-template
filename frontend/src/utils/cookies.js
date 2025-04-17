// frontend/src/utils/cookies.js

// ✅ Simpan referral_uid dalam cookie selama 30 hari
export function setReferralUID(uid) {
  const expires = new Date()
  expires.setDate(expires.getDate() + 30)

  document.cookie = `referral_uid=${encodeURIComponent(uid)}; expires=${expires.toUTCString()}; path=/`
}

// ✅ Ambil nilai referral_uid dari cookie
export function getReferralUID() {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("referral_uid="))

  return match ? decodeURIComponent(match.split("=")[1]) : null
}

// ✅ Optional: Buang referral_uid jika perlu reset
export function clearReferralUID() {
  document.cookie = "referral_uid=; max-age=0; path=/"
}
