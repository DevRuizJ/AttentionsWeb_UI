const checked = (value, options) => {
  if (value !== true) {
    return options.message || 'Debe ser checked'
  }
}

const keyPressNumeric = (code) => {
  if (code !== undefined) {
    return true
  }
}

const MontoDecimal = (x) => {
  if (x !== undefined)
    return Number.parseFloat(x).toFixed(2);
}

const MontoPENDecimal = (x) => {
  if (x !== undefined)
    return 'S/.' + Number.parseFloat(x).toFixed(2);
}

const MontoUSDDecimal = (x) => {
  if (x !== undefined)
    return '$.' + Number.parseFloat(x).toFixed(2);
}

const objectEquals = (v1, v2) => {

  if (typeof (v1) !== typeof (v2)) {
    return false;
  }

  if (typeof (v1) === "function") {
    return v1.toString() === v2.toString();
  }

  if (v1 instanceof Object && v2 instanceof Object) {
    if (countProps(v1) !== countProps(v2)) {
      return false;
    }
    var r = true;
    for (let k in v1) {
      r = objectEquals(v1[k], v2[k]);
      if (!r) {
        return false;
      }
    }
    return true;
  } else {
    return v1 === v2;
  }
}

function countProps(obj) {
  var count = 0;
  for (let k in obj) {
    if (obj.hasOwnProperty(k)) {
      count++;
    }
  }
  return count;
}

export default {
  checked,
  keyPressNumeric,
  MontoDecimal,
  MontoPENDecimal,
  MontoUSDDecimal,
  objectEquals
}
