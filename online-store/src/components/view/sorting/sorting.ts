import { Item } from '../../model/item';
import { drawItems } from '../items/items';

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class Sorting {
  sortingItem(data: Item[], prop: 'name' | 'prise' | 'year', sort: string): void {
    if (sort === SortOrder.ASC) {
      data.sort((a, b) => a[prop] < b[prop] ? -1 : 1);
    }
    if (sort === SortOrder.DESC) {
      data.sort((a, b) => a[prop] > b[prop] ? -1 : 1);
    }
  }

  addItemSortingHandler(
    filtersElem: HTMLElement,
    itemsFilter: Item[],
    selectedItems: string[],
  ): void {
    const sorting = filtersElem.querySelector('#sort') as HTMLElement;

    document.addEventListener('DOMContentLoaded', () => {
      const sortProp: string[] = (sorting as HTMLSelectElement).value.split('-');
      if (
        sortProp[0] === 'name' ||
        sortProp[0] === 'prise' ||
        sortProp[0] === 'year'
      ) {
        this.sortingItem(itemsFilter, sortProp[0], sortProp[1]);        
        drawItems(itemsFilter, selectedItems);
      }
    });
    
    sorting.addEventListener('change', (e: Event) => {
      const etarget: HTMLSelectElement = e.target as HTMLSelectElement;
      const sortProp: string[] = etarget.value.split('-');

      if (
        sortProp[0] === 'name' ||
        sortProp[0] === 'prise' ||
        sortProp[0] === 'year'
      ) {
        this.sortingItem(itemsFilter, sortProp[0], sortProp[1]);
        drawItems(itemsFilter, selectedItems);
      }
    });
  }
}

export default Sorting;
