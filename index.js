// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;
var IS_JOURNAL = true;
class Citation {
  constructor(input) {
    this.ID_ARR = input;
    this.that = this;
    this.NAME_YEAR_LIST = this.SET_NAME_YEAR();
    this.FINAL_OUT = [];
    // this.ASCENT_ORDER = Object.keys(this.NAME_YEAR_LIST).sort();
    // this.DECENT_ORDER = Object.keys(this.NAME_YEAR_LIST).sort().reverse();
    this.config = {
      etal: 'et al.',
      'max-author': 2,
    };
    this.SORTING();
    // console.log([this.ASCENT_ORDER, this.DECENT_ORDER]);
    this.GET_CHRON_ASCEND();
    this.getCitation();
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
    // console.log(year_sort1.slice(0));
    // console.log(
    //   year_sort1.map(function (a, b) {
    //     return a.year;
    //   })
    // );
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
  GET_XREF_STRING(item, Options = {}) {
    return {
      direct: `<a href="${item.rid}">${
        Options.onlyYear ? item.year : item.citation_org.direct
      }</a>`,
      indirect: `<a href="${item.rid}">${
        Options.onlyYear ? item.year : item.citation_org.indirect
      }</a>`,
    };
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
      this.ASCENT_ORDER.forEach((item, idx, arr) => {
        let name = this.GET_NAME_ORDER(item.names);
        var rObj = {
          indirect: `${name.concat(' ', item.year)}`,
          direct: `${name} (${item.year})`,
        };
        this.ASCENT_ORDER[idx].citation_org = rObj;
        if (idx != 0) {
          let IsLastYearSame = item.year == arr[idx - 1].year;
          let IsLastNameSame = item.nameString == arr[idx - 1].nameString;
          //console.log([item.nameString, arr[idx - 1].nameString]);
          if (IsLastNameSame && IsLastYearSame) {
            console.log('NAME-YEAR  SAME -- ' + idx);
          } else if (IsLastNameSame && !IsLastYearSame) {
            let prevObj = this.ASCENT_ORDER[idx - 1].citation_org;
            let prevObjFinal = this.ASCENT_ORDER[idx - 1].citation_finalString;
            let xref = this.GET_XREF_STRING(item, {
              onlyYear: true,
            });
            //console.log([prevObj.indirect]);
            // setter for indirect items
            prevObj.indirect = prevObj.indirect.concat(', ', item.year);
            prevObjFinal.indirect = prevObjFinal.indirect.concat(
              ', ',
              xref.indirect
            );
            // setter for direct items
            let split_txt = prevObj.direct.split('');
            let split_xref = prevObjFinal.direct.split('');
            split_txt.splice(-1, 0, ', ', item.year);
            split_xref.splice(-5, 0, ', ', item.year); // xref.indirect
            // ? txt and xref string combine
            prevObj.direct = split_txt.join('');
            prevObjFinal.direct = split_xref.join('');
            //console.log(prevObj);
            //console.log(prevObjFinal);
          } else if (
            (!IsLastNameSame && IsLastYearSame) ||
            (!IsLastNameSame && !IsLastYearSame)
          ) {
            //console.log('YEAR SAME -- ' + idx);
            this.ASCENT_ORDER[idx].citation_finalString =
              this.GET_XREF_STRING(item);
          }
          //console.log(rObj);
        } else {
          //console.log(this.GET_XREF_STRING(item));
          this.ASCENT_ORDER[idx].citation_finalString =
            this.GET_XREF_STRING(item);
        }
      });
      //console.log(this.ASCENT_ORDER);
      //console.log(this);
    } catch (err) {
      console.warn('--' + err.message);
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
    try {
      var aarr2 = this.DECENT_ORDER.map(function (a, b) {
        return a.year + '--' + a.nameString;
      });
      console.log('---start');
      var arr_direct = this.ASCENT_ORDER.map(function (a, b) {
        let final = a.citation_finalString;
        if (final) {
          return final.direct;
        } else null;
      }).filter(Boolean);
      console.log(arr_direct);
      var arr_indirect = this.ASCENT_ORDER.map(function (a, b) {
        let final = a.citation_finalString;
        if (final) {
          return final.indirect;
        } else null;
      }).filter(Boolean);
      console.log(arr_indirect);
      console.log('---end');
      console.log(this);
    } catch (err) {
      console.log(err.message);
    }
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

console.log('-------');
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
let spl = `Olofsson (2014)`.split('');
spl.splice(-1, 0, ', 2015');
console.log(spl.join(''));

let spl1 = `<a href="CIT0038">Olofsson (2013)</a>`.split('');
spl1.splice(-5, 0, ', 2');
console.log(spl1.join(''));
