import { Item } from '../../model/item';


export function drawItems(itemArray: Item[], array: string[]): void {
  const itemsContainer: HTMLElement = document
    .querySelector('.items-container') as HTMLElement;    

  itemsContainer.innerHTML = '';

  itemArray.forEach((item: Item) => {
    const itemElem: HTMLElement = document.createElement('div');
    itemElem.classList.add('items-container__item');

    if (array.indexOf(`${item.id}`) !== -1) itemElem.classList.add('selected');

    itemElem.dataset.number = `${item.id}`;
    itemElem.innerHTML = `
      <p class="name">${item.name}</p>
      <img src="./assets/items/${item.id}.png" alt="${item.name}">
      <p class="manufacturer">Производитель: ${item.manufacturer}</p>
      <p class="cpu">Процессор: ${item.cpu}</p>
      <p class="year">Год выпуска: ${item.year} год</p>      
      <p class="color">Цвет: ${item.color}</p>      
      <p class="favorite">Популярный: ${item.favorite === true ? 'да' : 'нет'}</p>
      <p class="prise">Цена: ${item.prise} BYN</p>
      <button class="btnBuy">Купить</button>`;      

    itemsContainer.append(itemElem);
  });
  if (itemArray.length === 0) {
    const message = document.createElement('div');
    message.className = 'sorry';
    message.innerHTML = '<p>Извините, совпадений не обнаружено</p>'
    itemsContainer.append(message);
  }  
}

export default drawItems;
