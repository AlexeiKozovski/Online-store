import { Item } from '../model/item';
import { Filters } from './filters/filters';

export class AppView {
  filters: Filters;

  constructor(filter: HTMLElement, items: Item[]) {
    this.filters = new Filters(filter, items);
  }

  viewContent(): void {

    document.addEventListener('DOMContentLoaded', () => {
      this.filtersTurnOn();
      this.resetStorageHandler();
    });
  }

  filtersTurnOn() {
    const searchElem = document.querySelector('.search') as HTMLInputElement;
    searchElem.focus();

    this.filters.addManufacturerFilterHandler();
    this.filters.addPriceFilterHandler();
    this.filters.addYearFilterHandler();
    this.filters.addColorFilterHandler();
    this.filters.addCpuFilterHandler();
    this.filters.addFavoriteFilterHandler();
    this.filters.addSearchFilterHandler(searchElem);
    this.addItemSelectedHandler(this.filters.selectedItems);
    this.filters.addResetFiltersHandler();
  }

  addItemSelectedHandler(array: string[]): void {
    const itemsContainer = document.querySelector('.items-container') as HTMLElement;
    const selectedItemCount = document.querySelector('.selected-items__count') as HTMLElement;
  
    itemsContainer.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
  
      if (target.closest('.btnBuy')) {
        if (array.length === 5 && !target.closest('.selected')) {
          const message = document.createElement('div');
          message.className = 'alert';
          message.innerHTML = '<p>Извините, корзина заполнена</p>';
  
          itemsContainer.append(message);  
          setTimeout(() => message.remove(), 3000);
          return;
        }

        (target.closest('.btnBuy') as HTMLElement)
          .classList.toggle('selected');
        if (target.closest('.btnBuy')?.classList.contains('selected')){
          (target.closest('.btnBuy') as HTMLElement)
            .innerHTML = 'В Корзине';
        } else {
          (target.closest('.btnBuy') as HTMLElement)
          .innerHTML = 'Купить';
        }        
  
        array.length = 0;
        
        const selectedItems = itemsContainer.querySelectorAll('.selected');
  
        selectedItems.forEach((item) => {
          const itemElement = item as HTMLElement;
          array.push((itemElement.dataset.number as string));
        });
  
        selectedItemCount.textContent = `${array.length}`;
        this.filters.selectedItems = array;
      }
    });
  }

  resetStorageHandler(): void {
    const resetAll = this.filters.filtersElem.querySelector('#reset-all') as HTMLElement;

    resetAll?.addEventListener('click', () => {
      const selectedItemCount = document.querySelector('.selected-items__count') as HTMLElement;
      selectedItemCount.textContent = '0';

      this.filters.selectedItems = [];
      
      this.filters.addResetFiltersHandler();
      this.filters.itemsFilterApply();
    });
  }
}

export default AppView;