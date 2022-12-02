// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;
var IS_JOURNAL = true;
class Citation {
  constructor(input) {
    this.ID_ARR = input;
    this.ARR_LIST = this.GET_ARR(this.ID_ARR);
    this.that = this;
    this.NAME_YEAR_LIST = this.SET_NAME_YEAR();
    this.ASCENT_ORDER = {};
    this.DECENT_ORDER = {};
    this.SORTING();
    // console.log([this.ASCENT_ORDER, this.DECENT_ORDER]);
    this.GET_CHRON_ASCEND();
  }
  // ? getter
  SET_NAME_YEAR() {
    try {
      let Obj = {};
      console.log('Start');
      Array.from(this.ID_ARR).forEach((id, idx, arr) => {
        let ID = this.GET_ID(id);
        let ref = document.getElementById(ID);
        if (ref) {
          let key_year = ref.querySelector('.year').textContent;
          console.log('Pass--' + ID + `---` + key_year);
          let name = Array.from(
            ref.querySelectorAll('.surname, .anonymous, .collab')
          ).map((el) => {
            return el.textContent;
          });

          if (!Obj[key_year]) {
            Obj[key_year] = {};
          }
          if (!Obj[key_year][ID]) {
            Obj[key_year][ID] = {};
          }
          Obj[key_year][ID] = name;
        } else {
          console.log('falied');
        }
      });
      // console.log(Obj);
      return Obj;
    } catch (err) {
      console.warn(err.message);
      //this.ErrorLogTrace('SET_NAME_YEAR', err.message);
    }
  }
  SORTING() {
    // Get the keys of your "array"
    let arrayOfKeys = Object.keys(this.NAME_YEAR_LIST);
    console.log(arrayOfKeys);
    // We ascent sort it out...
    let ascent_sortedArray = arrayOfKeys.sort();
    this.ASCENT_ORDER = ascent_sortedArray;
    // console.log(ascent_sortedArray);
    // We decent sort it out...
    let desent_sortedArray = arrayOfKeys.sort().reverse();
    this.DECENT_ORDER = desent_sortedArray;
    //console.log(desent_sortedArray);
    // [ascent_sortedArray, desent_sortedArray].forEach((order, idx, arr) => {
    //   order.forEach((e) => {
    //     this[idx == 0 ? 'ASCENT_ORDER' : 'DECENT_ORDER'][e] =
    //       this.NAME_YEAR_LIST[e];
    //   });
    // });
    // ascent_sortedArray.forEach((e) => {

    //   console.log(this.NAME_YEAR_LIST[e])
    //   this.ASCENT_ORDER.push({
    //     year: e,
    //   });
    // });
    desent_sortedArray.forEach((e) => {
      //this.DECENT_ORDER[e] = this.NAME_YEAR_LIST[e];
    });
  }
  GET_ID(_Id) {
    try {
      //console.log(typeof _Id)
      return !IS_JOURNAL && _Id.toString().indexOf('ref-') == -1
        ? 'ref-' + _Id
        : _Id;
    } catch (err) {
      console.warn(err.message);
      ErrorLogTrace('GET_ID', err.message);
    }
  }
  GET_ARR(ARR) {
    try {
      //console.log(this);
      return this.ARR.map((x) => x * 2);
    } catch {}
  }
  getFormat() {
    return this.ARR;
  }
  // ? getter
  getCitation() {
    //console.log(that);
  }
  GET_NAME_ORDER(Arr) {}
  GET_CHRON_ASCEND() {
    try {
      var output = [];
      this.ASCENT_ORDER.forEach((year) => {
        let Obj = this.NAME_YEAR_LIST[year];
        for (let x in Obj) {
          console.log(x);
        }
      });
    } catch (err) {
      console.warn(err.message);
      ErrorLogTrace('GET_CHRON_ASCEND', err.message);
    }
  }
  GET_CHRON_DESCAND() {
    try {
    } catch (err) {
      console.warn(err.message);
      ErrorLogTrace('GET_CHRON_TYPE_2', err.message);
    }
  }
}

var CITE = new Citation([
  'CIT0036',
  'CIT0037',
  'CIT0038',
  'CIT0039',
  'CIT0040',
  'CIT0041',
  'CIT0042',
  'CIT0043',
  'CIT0044',
  'CIT0020',
]);

//console.log([CITE.getFormat(), CITE.GET_ARR()]);
// class GET_CHRON_TYPE_1 extends Citation {
//   getFormat() {
//     return this.type;
//   }
// }
//class GET_CHRON_TYPE_2 extends Citation {}
//const FORMAT_1 = new GET_CHRON_TYPE_1('CHRON_TYPE_2');
//console.log(FORMAT_1.getFormat());

// console.log('2009ad' > '2009ac');
// var demo = [...document.querySelectorAll('p')].map((x) => {
//   return x.textContent;
// });
// console.log(demo);
