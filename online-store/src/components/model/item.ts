export class Item {
  id: number;
  name: string;
  prise: number;
  year: number;
  manufacturer: string;
  color: string;
  cpu: string;
  favorite: boolean;

  constructor(
    id: number,
    name: string,
    prise: number,
    year: number,
    manufacturer: string,
    color: string,
    cpu: string,
    favorite: boolean,
  ) {
    this.id = id;
    this.name = name;
    this.prise = prise;
    this.year = year;
    this.manufacturer = manufacturer;
    this.color = color;
    this.cpu = cpu;
    this.favorite = favorite;
  }

}

export default Item;
