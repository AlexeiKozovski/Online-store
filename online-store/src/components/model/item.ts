export class Item {
  constructor(
    public id: number,
    public name: string,
    public prise: number,
    public year: number,
    public manufacturer: string,
    public color: string,
    public cpu: string,
    public favorite: boolean,
  ) {}
}