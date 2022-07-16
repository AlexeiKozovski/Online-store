import { Item } from '../../model/item';
import { ItemObj } from '../../interfaces/ItemObj';


export function itemsArray(items: ItemObj[]): Item[] {
  const itemObjArray: Item[] = items.map((item) => {
    return new Item(
      Number(item.id),
      item.name,
      Number(item.count),
      Number(item.year),
      item.shape,
      item.color,
      item.size,
      item.favorite,
    );
  });
  return itemObjArray;
}

export default itemsArray;
