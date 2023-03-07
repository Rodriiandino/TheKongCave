import STRIPE_KEYS from './stripe-keys'

console.log(STRIPE_KEYS)

fetch('https://api.stripe.com/v1/products', {
  headers: {
    Authorization: `Bearer ${STRIPE_KEYS.secret}`
  }
})
  .then(res => {
    console.log(res)
    return res.json()
  })
  .then(json => {
    console.log(json)
  })

fetch('https://api.stripe.com/v1/prices', {
  headers: {
    Authorization: `Bearer ${STRIPE_KEYS.secret}`
  }
})
  .then(res => {
    console.log(res)
    return res.json()
  })
  .then(json => {
    console.log(json)
  })
