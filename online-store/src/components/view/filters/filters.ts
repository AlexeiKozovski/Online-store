import { Item } from '../../model/item';
import { drawItems } from '../items/items';
import { target } from 'nouislider';
import './filters.css';
import { ActiveFilters } from '../../interfaces/ActiveFilters';

export class Filters {
  filtersElem: HTMLElement;

  items: Item[];

  filteredItems: Item[];

  selectedItems: string[];

  activeFilters: ActiveFilters;

  constructor(filtersElem: HTMLElement, items: Item[]) {
    this.filtersElem = filtersElem;
    this.items = items;
    this.selectedItems = [];
    this.filteredItems = items;
    this.activeFilters = {
      name: [],
      manufacturer: [],
      prise: [],
      year: [],
      color: [],
      cpu: [],
      favorite: [],
      search: [],
    };
  }

  itemsFilterApply(): void {
    const filter = this.activeFilters;
    
    this.filteredItems = this.items.filter((item: Item) => {
      return (
        (!filter.manufacturer.length || filter.manufacturer.includes(item.manufacturer)) &&
        (
          !filter.prise.length ||
          (item.prise >= filter.prise[0] && item.prise <= filter.prise[1])
        ) &&
        (
          !filter.year.length || (item.year >= filter.year[0] &&
          item.year <= filter.year[1])
        ) &&
        (!filter.color.length || filter.color.includes(item.color)) &&
        (!filter.cpu.length || filter.cpu.includes(item.cpu)) &&
        (!filter.favorite.length || item.favorite === true) &&
        (
          !filter.search.length ||
          item.name.toLowerCase().indexOf(filter.search[0]) !== -1
        )
      );
    });

    drawItems(this.filteredItems, this.selectedItems);
  }

  addManufacturerFilterHandler(): void {
    const manufacturers = this.filtersElem.querySelector('.filters__manufacturer') as HTMLElement;

    manufacturers.addEventListener('click', (e: Event) => {
      const etarget: HTMLElement = e.target as HTMLElement;
      
      if (etarget.tagName === 'BUTTON') {
        etarget.classList.toggle('active');
        this.activeFilters.manufacturer.length = 0;
        const active = manufacturers.querySelectorAll('.active');

        active.forEach((elem) => {
          const dataFilter = (elem as HTMLElement).dataset.filter as string;
          this.activeFilters.manufacturer.push(dataFilter);
        });

        this.itemsFilterApply();
      }
    });
  }

  addPriceFilterHandler(): void {
    const price = this.filtersElem.querySelector('.price-slider') as target;
    const elementMin = ((price as HTMLElement).nextSibling as HTMLElement)
      .querySelector('.slider-values .min') as HTMLElement;
    const elementMax = ((price as HTMLElement).nextSibling as HTMLElement)
      .querySelector('.slider-values .max') as HTMLElement;

    price.noUiSlider?.on('update', () => {
      this.activeFilters.prise.length = 0;
      const min = Math.round(Number(
        (price.querySelector('.noUi-handle-lower') as HTMLElement).ariaValueNow),
      );
      const max = Math.round(Number(
        (price.querySelector('.noUi-handle-upper') as HTMLElement).ariaValueNow),
      );

      elementMin.textContent = `${min}`;
      elementMax.textContent = `${max}`;

      this.activeFilters.prise.push(min, max);

      this.itemsFilterApply();
    });
  }

  addYearFilterHandler(): void {
    const years = this.filtersElem.querySelector('.year-slider') as target;
    const elementMin = ((years as HTMLElement).nextSibling as HTMLElement)
      .querySelector('.slider-values .min') as HTMLElement;
    const elementMax = ((years as HTMLElement).nextSibling as HTMLElement)
      .querySelector('.slider-values .max') as HTMLElement;

    years.noUiSlider?.on('update', () => {
      this.activeFilters.year.length = 0;
      const min = Math.round(Number(
        (years.querySelector('.noUi-handle-lower') as HTMLElement).ariaValueNow),
      );
      const max = Math.round(Number(
        (years.querySelector('.noUi-handle-upper') as HTMLElement).ariaValueNow),
      );

      elementMin.textContent = `${min}`;
      elementMax.textContent = `${max}`;

      this.activeFilters.year.push(min, max);

      this.itemsFilterApply();
    });
  }

  addColorFilterHandler(): void {
    const colors = this.filtersElem.querySelector('.filters__color') as HTMLElement;

    colors.addEventListener('click', (e: Event) => {
      const etarget: HTMLElement = e.target as HTMLElement;
      
      if (etarget.tagName === 'BUTTON') {
        etarget.classList.toggle('active');
        this.activeFilters.color.length = 0;
        const active = colors.querySelectorAll('.active');

        active.forEach((elem) => {
          const dataFilter = (elem as HTMLElement).dataset.filter as string;
          this.activeFilters.color.push(dataFilter);
        });

        this.itemsFilterApply();
      }
    });
  }

  addCpuFilterHandler(): void {
    const processors = this.filtersElem.querySelector('.filters__cpu') as HTMLElement;

    processors.addEventListener('click', (e: Event) => {
      const etarget: HTMLElement = e.target as HTMLElement;

      if (etarget.tagName === 'INPUT') {
        this.activeFilters.cpu.length = 0;
        const active = processors.querySelectorAll('input:checked');

        active.forEach((elem) => {
          const dataFilter = (elem as HTMLElement).dataset.name as string;
          this.activeFilters.cpu.push(dataFilter);
        });

        this.itemsFilterApply();
      }
    });
  }

  addFavoriteFilterHandler(): void {
    const favorite = this.filtersElem.querySelector('.filters__favorite') as HTMLElement;

    favorite.addEventListener('click', (e: Event) => {
      const etarget: HTMLElement = e.target as HTMLElement;

      if (etarget.tagName === 'INPUT') {
        this.activeFilters.favorite.length = 0;
        const active = favorite.querySelector('input:checked');
        
        if (active) this.activeFilters.favorite.push('true');

        this.itemsFilterApply();
      }
    });
  }

  addSearchFilterHandler(searchElem: HTMLInputElement): void {
    searchElem.addEventListener('input', (e: Event) => {
      this.activeFilters.search.length = 0;
      const etarget = e.target as HTMLInputElement;
      const searchName: string = etarget.value.toLowerCase();
      this.activeFilters.search.push(searchName);

      this.itemsFilterApply();
    });
  }

  addResetFiltersHandler(): void {
    const resetFilters = this.filtersElem.querySelector('#reset-filters') as HTMLElement;

    resetFilters.addEventListener('click', () => {
      const actives = this.filtersElem.querySelectorAll('.active');
      const inputsChecked = this.filtersElem.querySelectorAll('input:checked');
      const sliders = this.filtersElem.querySelectorAll('.slider');      

      actives.forEach((active) => {
        active.classList.remove('active');
      });

      inputsChecked.forEach((input) => {
        (input as HTMLInputElement).checked = false;
      });

      sliders.forEach((slider) => {
        const sliderElem = slider as target;
        const minValue = (
          sliderElem.querySelector('.noUi-handle-lower') as HTMLElement
        ).ariaValueMin;
        const maxValue = (
          sliderElem.querySelector('.noUi-handle-upper') as HTMLElement
        ).ariaValueMax;
        sliderElem.noUiSlider?.set([
          Math.round(Number(minValue)),
          Math.round(Number(maxValue)),
        ]);
      });

      this.activeFilters = {
        name: [],
        manufacturer: [],
        prise: [],
        year: [],
        color: [],
        cpu: [],
        favorite: [],
        search: [],
      };

      this.itemsFilterApply();
    });
  }
}

export default Filters;
