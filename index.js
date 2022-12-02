// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;
var IS_JOURNAL = false;
class Citation {
  constructor(input) {
    this.ID_ARR = input;
    this.ARR_LIST = this.GET_ARR(this.ID_ARR);
    this.that = this;
    this.NAME_YEAR_LIST = this.SET_NAME_YEAR();
    //console.log(this.ID_ARR);
    //console.log(this.NAME_YEAR_LIST);
    //console.log(this.ARR_LIST);
  }
  // ? getter
  SET_NAME_YEAR() {
    try {
      let Obj = {};
      console.log("Start")
        Array.from(this.ID_ARR).forEach((id, idx, arr) => {
            let ID = this.GET_ID(id);
            let ref = document.getElementById(ID);
            if (ref) {
              console.log("Pass")
                let key_year = ref.querySelector('.year').textContent;
                let name =  [ref.querySelectorAll('.surname, .anonymous, .collab')].forEach(el => {
                  return el.textContent
              });
              console.log([name])
              if(!Obj[key_year]) !Obj[key_year] = {};
              Obj[key_year][ID] = name
                
            } else {
              console.log("falied")
            }
        });
        console.log(Obj)
            return Obj;
    } catch (err) {
      console.warn(err.message);
      //this.ErrorLogTrace('SET_NAME_YEAR', err.message);
    }
  }
  ErrorLogTrace() {}
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
  // ? setter
}

var CITE = new Citation(["CIT0001"]);


//console.log([CITE.getFormat(), CITE.GET_ARR()]);
// class GET_CHRON_TYPE_1 extends Citation {
//   getFormat() {
//     return this.type;
//   }
// }
//class GET_CHRON_TYPE_2 extends Citation {}
//const FORMAT_1 = new GET_CHRON_TYPE_1('CHRON_TYPE_2');
//console.log(FORMAT_1.getFormat());

console.log('2009ad' > '2009ac');
var demo = [...document.querySelectorAll('p')].map(x => {
  return x.textContent
})
console.log(demo);
