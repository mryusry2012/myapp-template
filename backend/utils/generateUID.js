function generateReferralUID() {
  const prefix = 'MVM'
  const suffix = 'SY'
  const randomNumber = Math.floor(100000 + Math.random() * 900000) // hasil 6 digit

  return `${prefix} ${randomNumber} ${suffix}`
}

export default generateReferralUID
