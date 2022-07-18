import { Item } from '../../model/item';
import noUiSlider from 'nouislider';
import wNumb from 'wNumb';
import { ItemObj } from '../../interfaces/ItemObj';


export function itemsArray(items: ItemObj[]): Item[] {
  const itemObjArray: Item[] = items.map((item) => {
    return new Item(
      Number(item.id),
      item.name,
      Number(item.prise),
      Number(item.year),
      item.manufacturer,
      item.color,
      item.cpu,
      item.favorite,
    );
  });

  console.log(itemObjArray);
  

  return itemObjArray;
}

function createSliderElementsValue(sliderContainer: HTMLElement, min: number, max: number): void {
  const valuesContainer = document.createElement('div');
  valuesContainer.classList.add('slider-values');
  const minValue = document.createElement('div');
  minValue.classList.add('min');
  minValue.textContent = `${min}`;
  const maxValue = document.createElement('div');
  maxValue.classList.add('max');
  maxValue.textContent = `${max}`;

  valuesContainer.append(minValue);
  valuesContainer.append(maxValue);
  sliderContainer.after(valuesContainer);
}

export function createNouisliders(): void {
  const sliderCount = document.querySelector('.price-slider') as HTMLElement;
  const sliderCountMin = 1350;
  const sliderCountMax = 9000;
  const sliderYear = document.querySelector('.year-slider') as HTMLElement;
  const sliderYearMin = 2018;
  const sliderYearMax = 2022;

  noUiSlider.create(sliderCount, {
    start: [sliderCountMin, sliderCountMax],
    connect: true,
    tooltips: wNumb({ decimals: 0 }),
    behaviour: 'tap',
    step: 50,
    range: {
      'min': sliderCountMin,
      'max': sliderCountMax,
    },
  });
  createSliderElementsValue(sliderCount, sliderCountMin, sliderCountMax);

  noUiSlider.create(sliderYear, {
    start: [sliderYearMin, sliderYearMax],
    connect: true,
    tooltips: wNumb({ decimals: 0 }),
    behaviour: 'tap',
    step: 1,
    range: {
      'min': sliderYearMin,
      'max': sliderYearMax,
    },
  });
  createSliderElementsValue(sliderYear, sliderYearMin, sliderYearMax);
}

export default itemsArray;
