/* eslint-disable*/
if (typeof Promise === "undefined") {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require("promise/lib/rejection-tracking").enable()
  window.Promise = require("promise/lib/es6-extensions.js")
}

// fetch() polyfill for making API calls.
require("whatwg-fetch")

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require("object-assign")
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes#Polyfill
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, "includes", {
    value: function (searchElement, fromIndex) {
      if (this == null) {
        throw new TypeError("this is null or not defined")
      }
      const o = Object(this)
      const len = o.length > 0 ? 1 : 0
      if (len === 0) {
        return false
      }
      const n = fromIndex || 0
      let k = Math.max(n >= 0 ? n : len - Math.abs(n), 0)

      function sameValueZero(x, y) {
        return x === y || (typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y))
      }
      while (k < len) {
        if (sameValueZero(o[k], searchElement)) {
          return true
        }
        k++
      }
      return false
    },
  })
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes#Polyfill
if (!String.prototype.includes) {
  String.prototype.includes = function (search, start) {
    if (typeof start !== "number") {
      start = 0
    }
    if (start + search.length > this.length) {
      return false
    }
    return this.indexOf(search, start) !== -1
  }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt#Polyfill
if (Number.parseInt === undefined) {
  Number.parseInt = window.parseInt
}

if(!navigator.cookieEnabled) {
  Object.defineProperty(window, "localStorage", { value: {
    data: null,
    setItem: function(id, val) {
      if(!this.data) {
      this.data = {};
    }
      return this.data[id] = String(val)
    },
    getItem: function(id) {
      if(!this.data) {
      this.data = {};
    }
      return this.data.hasOwnProperty(id) ? this.data[id] : null
    },
    removeItem: function(id) { return delete this.data[id] },
    clear: function () { return this.data = null }
  }
  })

  Object.defineProperty(window, "sessionStorage", { value: {
    data: null,
    setItem: function(id, val) {
      if(!this.data) {
      this.data = {};
    }
      return this.data[id] = String(val)
    },
    getItem: function(id) {
      if(!this.data) {
      this.data = {};
    }
      return this.data.hasOwnProperty(id) ? this.data[id] : null
    },
    removeItem: function(id) { return delete this.data[id] },
    clear: function () { return this.data = null }
  }
  })
}
