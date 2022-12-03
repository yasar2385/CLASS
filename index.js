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
    // this.ASCENT_ORDER = Object.keys(this.NAME_YEAR_LIST).sort();
    // this.DECENT_ORDER = Object.keys(this.NAME_YEAR_LIST).sort().reverse();
    this.config = {
      etal: 'et al.',
      'max-author': 2,
    };
    this.SORTING();
    // console.log([this.ASCENT_ORDER, this.DECENT_ORDER]);
    this.GET_CHRON_ASCEND();
  }
  // ? getter
  SET_NAME_YEAR() {
    try {
      let Obj = [];
      console.log('Start');
      Array.from(this.ID_ARR).forEach((id, idx, arr) => {
        let ID = this.GET_ID(id);
        let ref = document.getElementById(ID);
        if (ref) {
          let key_year = ref.querySelector('.year').textContent;
          //console.log('Pass--' + ID + `---` + key_year);
          let coll = ref.querySelectorAll('.surname, .anonymous, .collab');
          let name = Array.from(coll).map((el) => {
            return el.textContent;
          });
          Obj.push({
            year: key_year,
            names: name,
            nameString: name.join(''),
            rid: ID,
            collection: coll,
          });
          return Obj;
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
  NAME_SORTING(NameList) {
    try {
      return NameList.sort(function (a, b) {
        //console.log([a.year, b.year, a.year == b.year])
        if (a.year == b.year) {
          return ('' + a.nameString).localeCompare(b.nameString);
        } else return 0;
      });
    } catch {}
  }
  SORTING() {
    // ? https://stackoverflow.com/questions/51165/how-to-sort-strings-in-javascript
    //  https://stackoverflow.com/questions/28560801/javascript-sorting-array-by-multiple-criteria

    // We ascent sort it out...
    var year_sort1 = this.NAME_YEAR_LIST.sort(function (a, b) {
      // return a['year'] - b['year'];
      if (a.year < b.year) return -1;
      if (a.year > b.year) return 1;
      return 0;
    });
    this.ASCENT_ORDER = this.NAME_SORTING(year_sort1);
    // We decent sort it out...
    var year_sort2 = year_sort1.slice(0).reverse();
    this.DECENT_ORDER = this.NAME_SORTING(year_sort2);
    //console.log([this.ASCENT_ORDER, this.DECENT_ORDER]);
    console.log(year_sort1.slice(0));
    console.log(
      year_sort1.map(function (a, b) {
        return a.year;
      })
    );
    // console.log(
    //   this.DECENT_ORDER.map(function (a, b) {
    //     return a.year + '--' + a.nameString;
    //   })
    // );
    // console.log(
    //   this.ASCENT_ORDER.map(function (a, b) {
    //     return a.year + '--' + a.nameString;
    //   })
    // );
  }

  GET_NAME_ORDER(NameArr) {
    let list = [];
    //console.log([NameArr.length, this.config['max-author'], NameArr.length > this.config['max-author']]);
    if (NameArr.length > this.config['max-author']) {
      // more than author count config
      return NameArr.filter(Boolean)[0].concat(' ', this.config['etal']);
    } else {
      //  ? single and double
      return NameArr.filter(Boolean).join(' and ');
    }
  }
  GET_CHRON_ASCEND() {
    try {
      var output = [];
      //console.log(this.ASCENT_ORDER);
      this.ASCENT_ORDER.forEach((item, idx, arr) => {
        let name = this.GET_NAME_ORDER(item.names);
        var rObj = {
          indirect: `${name.concat(' ', item.year)}`,
          direct: `${name} (${item.year})`,
        };
        console.log(rObj);
      });
    } catch (err) {
      console.warn(err.message);
      this.ErrorLogTrace('GET_CHRON_ASCEND', err.message);
    }
  }
  GET_CHRON_DESCAND() {
    try {
    } catch (err) {
      console.warn(err.message);
      this.ErrorLogTrace('GET_CHRON_TYPE_2', err.message);
    }
  }
  GET_ID(_Id) {
    try {
      //console.log(typeof _Id)
      return !IS_JOURNAL && _Id.toString().indexOf('ref-') == -1
        ? 'ref-' + _Id
        : _Id;
    } catch (err) {
      console.warn(err.message);
      this.ErrorLogTrace('GET_ID', err.message);
    }
  }
  ErrorLogTrace(id, msg) {
    console.log(msg);
  }
  getFormat() {
    return this.ARR;
  }
  // ? getter
  getCitation() {
    //console.log(that);
  }
  GET_ARR(ARR) {
    try {
      //console.log(this);
      return this.ARR.map((x) => x * 2);
    } catch {}
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

//console.log(['Yasar', 'Abu'].filter(Boolean).join(' and '));
//console.log(['Yasar', ''].filter(Boolean).join(' and '));

//console.log([CITE.getFormat(), CITE.GET_ARR()]);
// class GET_CHRON_TYPE_1 extends Citation {
//   getFormat() {
//     return this.type;
//   }
// }
//class GET_CHRON_TYPE_2 extends Citation {}
//const FORMAT_1 = new GET_CHRON_TYPE_1('CHRON_TYPE_2');
//console.log(FORMAT_1.getFormat());

// var demo = [...document.querySelectorAll('p')].map((x) => {
//   return x.textContent;
// });
// console.log(demo);

let names_arry = [
  'YasarAfroze',
  'AfrozeYasar',
  'FarzeenAfroze',
  'YasarArafat',
  'ArafatAfroze',
];
names_arry.sort();
// console.log(names_arry.sort((a, b) => (a > b) - (a < b)));
// console.log(names_arry.sort());
