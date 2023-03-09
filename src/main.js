import STRIPE_KEYS from './stripe-keys'

const d = document
const $hero = d.getElementById('hero-gym')
const $template = d.getElementById('plan-template').content
const $fragment = d.createDocumentFragment()

const fetchOptions = {
  headers: {
    Authorization: `Bearer ${STRIPE_KEYS.secret}`
  }
}

Promise.all([
  fetch('https://api.stripe.com/v1/products', fetchOptions),
  fetch('https://api.stripe.com/v1/prices', fetchOptions)
])
  .then(responses => Promise.all(responses.map(res => res.json())))
  .then(json => {
    const products = json[0].data
    const prices = json[1].data

    prices.forEach(el => {
      const product = products.filter(product => product.id === el.product)
      console.log(product)

      $template.querySelector('.gym').setAttribute('data-price', el.id)
      $template.querySelector('img').src = product[0].images[0]
      $template.querySelector('img').alt = product[0].name
      $template.querySelector('figcaption').innerHTML = `
      <h3>
      ${product[0].name}
      </h3>
      <p>
      ${el.unit_amount_decimal} ${el.currency}
      </p>
      <p>
      ${product[0].description}
      </p> 
      `

      const $clone = d.importNode($template, true)
      $fragment.appendChild($clone)
    })

    $hero.appendChild($fragment)
  })
  .catch(err => {
    const message =
      err.statusText || 'Ocurrio un error al conectarse con la API de Stripe'
    $hero.innerHTML = `<p>Error ${err.status}: ${message}</p>`
  })
