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
         this.transfer = 27
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
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `
         this.parent.append( element )
      }
   }

   let data2 = [
      {
         img: 'img/vegy.jpg',
         altimg: 'vegy',
         title: 'Меню \'Фитнес\'',
         descr: 'Меню \'Фитнес\' - (это меню с кода с объекта JS !) это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
         price: 9
      },
      {
         img: 'img/post.jpg',
         altimg: 'post',
         title: 'Меню \'Постное\'',
         descr: 'Меню \'Постное\' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
         price: 14
      },
      {
         img: 'img/elite.jpg',
         altimg: 'elite',
         title: 'Меню \'Премиум\'',
         descr: 'В меню \'Премиум\' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
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

      console.log( 'Ошибка: ' + error.message )
      console.log( 'Наверно JSON Server отключен, поэтому данные берем с кода с объекта JS ' )

      data2.forEach( ({img, altimg, title, descr, price}) => {
         new MenuCard( img, altimg, title, descr, price, '.menu .container' ).render()
      } )
   }


}

export default cards

// тут при выравнивании через альт + контр + L ломается выше разметка !!!
// только то что выделил то и выравниваем


