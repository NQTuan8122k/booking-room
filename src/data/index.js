import { HOTEL } from './hotel';
const labelList = Object.keys(HOTEL[0]);
console.log(labelList);
console.log(labelList.length);

HOTEL.map((item, index) => {
  if (labelList.length !== Object.keys(item).length) {
    console.log(index);
  }
});
