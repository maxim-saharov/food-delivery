//
const postData = async (url, data) => {

   let dataFromForm = JSON.parse( data )

   let dataForJSpl = {
      title: dataFromForm.name,
      body: dataFromForm.phone
   }

   dataForJSpl = JSON.stringify( dataForJSpl )

   let response = await fetch( url, {
      method: 'POST',
      headers: {
         'Content-type': 'application/json; charset=UTF-8'
      },
      body: dataForJSpl
   } )

   if (!(response.status >= 200 && response.status < 300)) {
      //throw new Error( response.status.toString() )
      // это объект со всякими ненужными данными типо имя файла и т.д.
      // но там есть стек вызовов и можно посмотреть кто скинул ошибку
      // смотри ниже версию с объектом
      throw response.status

   }

   return await response.json()
   // если возврат засунут в иначе то оно все равно как то отрабатывает
   // почему то выброс ошибки, хотя и не выбрасывает ее
   // наверно авайт как то типо проверяет ошибку

}


async function getResource(url) {

   //debugger

   let response = await fetch( url )

   if (!response.ok) {
      throw new Error( `Could not fetch ${url}, status: ${response.status}` )
   }

   return await response.json()
}


export {postData}
export {getResource}

