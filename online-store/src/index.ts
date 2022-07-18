import { itemsArray } from './components/view/utils/utils';
import { App } from './components/app/app';
import data from './components/model/data';
import './global.css';
import 'nouislider/dist/nouislider.css';

const items = itemsArray(data);
const filters: HTMLElement = document.querySelector('.filters') as HTMLElement;
const app = new App(filters, items);

app.start();