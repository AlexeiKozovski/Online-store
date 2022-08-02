import { Item } from '../model/item';
import { Filters } from './filters/filters';
import { Sorting } from './sorting/sorting';
import { Storage } from '../controller/storageController';
import { createNouisliders } from './utils/utils';

export class AppView {
  private filters: Filters;

  constructor(filter: HTMLElement, items: Item[]) {
    this.filters = new Filters(filter, items);
  }

  private sorting = new Sorting();

  private storage = new Storage();

  public viewContent(): void {

    document.addEventListener('DOMContentLoaded', () => {
      createNouisliders();
      this.onStorageLoadedHandler();
      this.filtersTurnOn();
      this.resetStorageHandler();
    });
  }

  filtersTurnOn() {
    const searchElem = document.querySelector('.search') as HTMLInputElement;
    searchElem.focus();

    this.onStorageSavedHandler();
    this.sorting.addItemSortingHandler(
      this.filters.filtersElem,
      this.filters.filteredItems,
      this.filters.selectedItems,
    );
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
        if (target.closest('.btnBuy')?.classList.contains('selected')) {
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

  onStorageSavedHandler(): void {
    window.addEventListener('beforeunload', () => {
      const actives = this.filters.filtersElem.querySelectorAll('.active');
      const sliders = this.filters.filtersElem.querySelectorAll('.slider');
      const inputsChecked = this.filters.filtersElem.querySelectorAll('input:checked');

      this.storage.setToStorage(actives, sliders, inputsChecked);
      this.storage.setStorageProperty(
        this.filters.activeFilters,
        this.filters.selectedItems,
      );
    });
  }

  onStorageLoadedHandler(): void {
    const buttons = this.filters.filtersElem.querySelectorAll('button');
    const sliders = this.filters.filtersElem.querySelectorAll('.slider');
    const inputs = this.filters.filtersElem.querySelectorAll('input');
    const activeFilters = this.storage.getActiveFiltersStorage();
    this.filters.selectedItems = this.storage.getSelectedItemsStorage();

    if (activeFilters) {
      this.filters.activeFilters = activeFilters;
    }
    this.filters.itemsFilterApply();
    this.storage.getToStorage(buttons, sliders, inputs);
  }

  resetStorageHandler(): void {
    const resetAll = this.filters.filtersElem.querySelector('#reset-all') as HTMLElement;

    resetAll?.addEventListener('click', () => {
      const selectedItemCount = document.querySelector('.selected-items__count') as HTMLElement;
      selectedItemCount.textContent = '0';

      this.storage.resetStorage();
      this.filters.selectedItems = [];
      
      this.filters.addResetFiltersHandler();
      this.filters.itemsFilterApply();
    });
  }
}

export default AppView;