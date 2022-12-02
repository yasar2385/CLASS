// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

class Citation {
  constructor(input) {
    this.ARR = input;
    this.ARR_LIST = this.GET_ARR(this.ARR);
    this.that = this;
    console.log(this.ARR);
    console.log(this.ARR_LIST);
  }
  // ? getter
  that = 'this';
  GET_ARR(ARR) {
    try {
      console.log(this);
      return this.ARR.map((x) => x * 2);
    } catch {}
  }
  getFormat() {
    return this.ARR;
  }
  // ? getter
  getCitation() {
    console.log(that);
  }
  // ? setter
}

var CITE = new Citation([1, 2, 3]);
//console.log([CITE.getFormat(), CITE.GET_ARR()]);
// class GET_CHRON_TYPE_1 extends Citation {
//   getFormat() {
//     return this.type;
//   }
// }
//class GET_CHRON_TYPE_2 extends Citation {}
//const FORMAT_1 = new GET_CHRON_TYPE_1('CHRON_TYPE_2');
//console.log(FORMAT_1.getFormat());
