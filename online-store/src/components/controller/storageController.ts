import { target } from 'nouislider';
import { ActiveFilters } from '../interfaces/ActiveFilters';


export class Storage {
  setToStorage(
    actives: NodeListOf<Element>,
    sliders: NodeListOf<Element>,
    inputsChecked: NodeListOf<Element>,
  ): void {
    const activesValue: string[] = [];
    const inputsCheckedValue: string[] = [];

    actives.forEach((active) => {
      activesValue.push((active as HTMLElement).dataset.filter as string);
    });

    inputsChecked.forEach((input) => {
      inputsCheckedValue.push((input as HTMLElement).dataset.name as string);
    });

    sliders.forEach((slider) => {
      const sliderElem = slider as target;
      const minMax: number[] = [];
      
      minMax.push(Math.round(Number(
        (sliderElem.querySelector('.noUi-handle-lower') as HTMLElement).ariaValueNow,
      )));
      minMax.push(Math.round(Number(
        (sliderElem.querySelector('.noUi-handle-upper') as HTMLElement).ariaValueNow,
      )));

      localStorage.setItem(sliderElem.id, JSON.stringify(minMax));
    });

    localStorage.setItem('activesValue', JSON.stringify(activesValue));
    localStorage.setItem('inputsCheckedValue', JSON.stringify(inputsCheckedValue));
  }

  getToStorage(
    actives: NodeListOf<Element>,
    sliders: NodeListOf<Element>,
    inputsChecked: NodeListOf<Element>,
  ): void {
    if (localStorage.getItem('activesValue')) {
      const activesValue: string[] = JSON.parse(
        localStorage.getItem('activesValue') as string,
      );

      actives.forEach((active) => {
        if (
          activesValue.indexOf((active as HTMLElement)
            .dataset.filter as string) !== -1
        ) {
          active.classList.add('active');
        }
      });
    }

    if (localStorage.getItem('inputsCheckedValue')) {
      const inputsCheckedValue: string[] = JSON.parse(
        localStorage.getItem('inputsCheckedValue') as string,
      );

      inputsChecked.forEach((input) => {
        if (
          inputsCheckedValue.indexOf((input as HTMLElement)
            .dataset.name as string) !== -1
        ) {
          (input as HTMLInputElement).checked = true;
        }
      });
    }

    if (
      localStorage.getItem('price-slider') &&
      localStorage.getItem('year-slider')
    ) {
      sliders.forEach((slider) => {
        const sliderValues = JSON.parse(
          localStorage.getItem(slider.id) as string,
        );
        const elementMin = ((slider as HTMLElement).nextSibling as HTMLElement)
          .querySelector('.slider-values .min') as HTMLElement;
        const elementMax = ((slider as HTMLElement).nextSibling as HTMLElement)
          .querySelector('.slider-values .max') as HTMLElement;

        (slider as target).noUiSlider?.set(sliderValues);

        elementMin.textContent = `${sliderValues[0]}`;
        elementMax.textContent = `${sliderValues[1]}`;
      });
    }

    const zero = 0;
    const selectedItemCount = document.querySelector('.selected-items__count') as HTMLElement;
      selectedItemCount.textContent = JSON.parse(
      localStorage.getItem('selectedItemCount') as string,
    ) || zero;
  }

  setStorageProperty(activeFilters: ActiveFilters, selectedItems: string[]): void {
    const selectedItemCount = document.querySelector('.selected-items__count') as HTMLElement;

    localStorage.setItem('activeFilters', JSON.stringify(activeFilters));
    localStorage.setItem('selected', JSON.stringify(selectedItems));
    localStorage.setItem('selectedItemCount',
      JSON.stringify(selectedItemCount.textContent));
  }

  getActiveFiltersStorage(): ActiveFilters | null {
    if (localStorage.getItem('activeFilters')) {
      return JSON.parse(localStorage.getItem('activeFilters') as string);
    }
    return null;
  }

  getSelectedItemsStorage(): string[] {
    return JSON.parse(localStorage.getItem('selected') as string) || [];
  }

  resetStorage(): void {
    localStorage.clear();
  }

}

export default Storage;