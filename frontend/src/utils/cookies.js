export function setReferralUID(uid) {
    document.cookie = `referral_uid=${uid}; max-age=${30 * 24 * 60 * 60}; path=/`
  }
  
  export function getReferralUID() {
    const match = document.cookie
      .split('; ')
      .find(row => row.startsWith('referral_uid='))
    return match ? match.split('=')[1] : null
  }
  