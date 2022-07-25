import itemsArray from '../src/components/view/utils/utils';
import data from '../src/components/model/data'


test('Renders all items from the database', () =>{
  const result = itemsArray(data).length;
  const expected = 18;

  expect(result).toEqual(expected)
})

test('Check item content', () =>{
  expect(itemsArray(data)).toContainEqual(  {
    id: 1,
    name: 'HP ProBook 455',
    prise: 3250,
    year: 2021,
    manufacturer: 'HP',
    color: 'серебристый',
    cpu: 'AMD Ryzen',
    favorite: false,
  })
})

