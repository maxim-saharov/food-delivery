//
import {getResource} from '../services/services'

async function cards() {
   class MenuCard {
      constructor(src, alt, title, descr, price, parentSelector, ...classes) {
         this.src = src
         this.alt = alt
         this.title = title
         this.descr = descr
         this.price = price
         this.classes = classes
         this.parent = document.querySelector( parentSelector )
         this.transfer = 1
         // тут курс устанавливаем
         this.changeToUAH()
      }

      changeToUAH() {
         this.price = this.price * this.transfer
      }

      render() {
         const element = document.createElement( 'div' )

         if (this.classes.length === 0) {
            this.classes = 'menu__item'
            element.classList.add( this.classes )
         } else {
            this.classes.forEach( className => element.classList.add( className ) )
         }

         element.innerHTML =
            `
                <img src='${this.src}' alt='${this.alt}'>
                <h3 class='menu__item-subtitle'>${this.title}</h3>
                <div class='menu__item-descr'>${this.descr}</div>
                <div class='menu__item-divider'></div>
                <div class='menu__item-price'>
                    <div class='menu__item-cost'>Price:</div>
                    <div class='menu__item-total'><span>${this.price}</span> USD/day</div>
                </div>
            `
         this.parent.append( element )
      }
   }

   let data2 = [
      {
         img: 'img/vegy.jpg',
         altimg: 'vegy',
         title: 'Menu \'Fitness\'',
         descr: 'Menu \'Fitness\' - (this is a menu from the code from the JS object!) this is a new approach to cooking: more fresh vegetables and fruits. Product of active and healthy people. This is a brand new product with best price and high quality!',
         price: 9
      },
      {
         img: 'img/post.jpg',
         altimg: 'post',
         title: 'Menu \'Lenten\'',
         descr: 'Menu \'Lenten\' - it is a careful selection of ingredients: the complete absence of animal products, milk from almonds, oats, coconut or buckwheat, the right amount of protein from tofu and imported vegetarian steaks.',
         price: 14
      },
      {
         img: 'img/elite.jpg',
         altimg: 'elite',
         title: 'Menu \'Premium\'',
         descr: 'In menu \'Premium\' we use not only beautiful packaging design, but also high-quality execution of dishes. Red fish, seafood, fruits - restaurant menu without going to a restaurant!',
         price: 21
      }
   ]


   try {
      await getResource( 'http://localhost:3000/menu' )
         .then( data => {

            data.forEach( ({img, altimg, title, descr, price}) => {
               new MenuCard( img, altimg, title, descr, price, '.menu .container' ).render()
            } )
         } )
   } catch (error) {

      console.log( 'Error: ' + error.message )
      console.log( 'Probably JSON Server is disabled, so we take the data from the code from the JS object ' )

      data2.forEach( ({img, altimg, title, descr, price}) => {
         new MenuCard( img, altimg, title, descr, price, '.menu .container' ).render()
      } )
   }


}

export default cards

// тут при выравнивании через альт + контр + L ломается выше разметка !!!
// только то что выделил, то и выравниваем


