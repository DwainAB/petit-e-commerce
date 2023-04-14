const card = document.querySelectorAll('.product')
const btn = document.querySelectorAll('button.is-fullwidth')
const items = document.querySelector('.items')
const footer = document.querySelector('footer span')
let basket = []
let priceBasket = 0
footer.innerText = priceBasket

function itemInCart(title) {
  return basket.find(item => item.title === title) || false
}

for (let i = 0; i < card.length; i++) {

  btn[i].addEventListener('click', () => {

    let existingItem = itemInCart(card[i].dataset.title)

    if(existingItem) {
      existingItem.quantity += 1
      priceBasket += parseInt(card[i].dataset.price)
    } else {
      let newCartItem = {
        title: card[i].dataset.title,
        price: card[i].dataset.price,
        quantity: 1
      }
      priceBasket += parseInt(card[i].dataset.price)
      basket.push(newCartItem)
    }

    // Trouve l'article correspondant dans le panier
    let cartItem = items.querySelector(`[data-title="${card[i].dataset.title}"]`)
    
    if(cartItem) {
      // Mettre à jour la quantité affichée
      let quantityElement = cartItem.querySelector('.quantity')
      quantityElement.textContent = existingItem ? existingItem.quantity : 1

      // Mettre à jour le prix total affiché
      let priceElement = cartItem.querySelector('.price')
      priceElement.textContent = `${card[i].dataset.price * (existingItem ? existingItem.quantity : 1)}€`

    } else {
      let article = document.createElement('article')
      article.classList.add('box', 'media')
      article.setAttribute('data-title', card[i].dataset.title)
      article.innerHTML = 
      `
      <div class="media-left">
        <figure class="image is-64x64">
          <img src="https://via.placeholder.com/400x400?text=1" alt="image">
        </figure>
      </div>
      <div class="media-content">
        <h3 class="title is-6 mb-2">
          ${card[i].dataset.title}
        </h3>
        <p>prix à l'unité <span>${card[i].dataset.price} €</span></p>
        <hr>
        <p class="has-text-weight-bold">
          Quantité : <span class="quantity">${existingItem ? existingItem.quantity : 1}</span>
        </p>
      </div>
      <div class="media-right">
        <p class="is-size-4 has-text-weight-bold has-text-dark price">
          ${card[i].dataset.price * (existingItem ? existingItem.quantity : 1)}€
        </p>
        <p class="mt-3">
          <button type="button" class="button sup is-small is-danger">
            Supprimer
          </button>
        </p>
      </div>
      `
      items.insertBefore(article, items.firstChild)
      
    }
        footer.innerText = priceBasket
        const sup = document.querySelectorAll('.sup')

        for (let j = 0; j < sup.length; j++) {
            sup[j].addEventListener('click', () =>{
                const itemTitle = sup[j].parentNode.parentNode.parentNode.getAttribute('data-title');
                const itemIndex = basket.findIndex(item => item.title === itemTitle);
                if (itemIndex > -1) {
                    basket.splice(itemIndex, 1);
                }
                const itemElement = sup[j].parentNode.parentNode.parentNode;
                itemElement.parentNode.removeChild(itemElement);
                updatePrice();
            })
        }
        
        function updatePrice() {
            let totalPrice = 0;
            for (let i = 0; i < basket.length; i++) {
                totalPrice += basket[i].price * basket[i].quantity;
            }
            footer.innerText = totalPrice;
        }
  })
}

///////////////////////////////////////////////////////////////////////////////

const btnCategory = document.querySelectorAll('.category')

for (let h = 0; h < btnCategory.length; h++) {
    btnCategory[h].addEventListener('click', () => {
        for (let l = 0; l < card.length; l++) {
            if(card[l].dataset.category === btnCategory[h].dataset.category){
                card[l].parentNode.classList.remove('hidden-card')
            }else{
                card[l].parentNode.classList.add('hidden-card')
            }

            if(btnCategory[h].dataset.category == "tous"){
                card[l].parentNode.classList.remove('hidden-card')
            }
        }
    })
}


const searchInput = document.getElementById('search');

searchInput.addEventListener('input', (event) => {
  const searchTerm = event.target.value.trim().toLowerCase();

  card.forEach((article) => {
    const title = article.querySelector('h2').textContent.trim().toLowerCase();

    if (title.includes(searchTerm)) {
      article.classList.remove('hidden-card');
    } else {
      article.classList.add('hidden-card');
    }
  });
});


////////////////////////////////////////////////////////////////////////////////



