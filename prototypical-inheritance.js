function extend(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
}

function Shape(color) {
  this.color = color;
}

Shape.prototype.duplicate = function () {
  console.log("duplicate");
};

function Circle(radius, color) {
  // Shape(color); // window object
  Shape.call(this, color);
  this.radius = radius;
}

// Circle.prototype = Object.create(Shape.prototype);
// Circle.prototype.constructor = Circle;

const s = new Shape();
const c = new Circle(1, "red");

console.log(c);

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

// prototype equal parent
Person.prototype.getFullName = function () {
  return this.firstName + " " + this.lastName;
};

const john = new Person("John", "Doe");
console.log(john);

const jane = new Person("Jane", "Doe");
console.log(jane);

const array = [];
console.log(Object.getPrototypeOf(array));

class Tool {
  // Tool.findCommon(["apple", "apple pie"]);
  // => "apple"
  static findCommon(arr1) {
    let arr = arr1.concat().sort(),
      a1 = arr[0],
      a2 = arr[arr.length - 1],
      L = a1.length,
      i = 0;
    while (i < L && a1.charAt(i) === a2.charAt(i)) i++;
    return a1.substring(0, i);
  }

  // hide(document.querySelectorAll('img')); => Hides all <img> elements on the page
  // show(...document.querySelectorAll('img')); => Shows all <img> elements on the page
  static hide = (...el) => [...el].forEach((e) => (e.style.display = "none"));
  static show = (...el) => [...el].forEach((e) => (e.style.display = "block"));

  // "qwer" => document.getElementById("qwer")
  // document.getElementById("qwer") => 不變
  static getEle = (ele) =>
    typeof ele === "object" ? ele : document.getElementById(ele);

  static alpArray = (num) => {
    return Array(Number(num))
      .fill()
      .map((_, i) => String.fromCharCode("A".charCodeAt(0) + i));
  };

  // const data = [{id: 1, name: 'john', age: 24},{id: 2, name: 'mike', age: 50}]
  // reducedFilter(data, ['id', 'name'], item => item.age > 24);
  // => [{ id: 2, name: 'mike'}]
  static reducedFilter = (data, keys, fn) =>
    data.filter(fn).map((el) =>
      keys.reduce((acc, key) => {
        acc[key] = el[key];
        return acc;
      }, {})
    );

  // mapObject([1, 2, 3], a => a * a);
  // => { 1: 1, 2: 4, 3: 9 }
  static mapObject = (arr, fn) =>
    arr.reduce((acc, el, i) => {
      acc[el] = fn(el, i, arr);
      return acc;
    }, {});

  // zipWith([1, 2], [10, 20], [100, 200], (a, b, c) => a + b + c);
  // => [111,222]
  //
  // zipWith([1, 2, 3], [10, 20], [100, 200],
  // (a, b, c) => (a != null ? a : 'a') + (b != null ? b : 'b') + (c != null ? c : 'c')
  // => [111, 222, '3bc']
  static zipWith = (...array) => {
    const fn =
      typeof array[array.length - 1] === "function" ? array.pop() : undefined;
    return Array.from(
      { length: Math.max(...array.map((a) => a.length)) },
      (_, i) => (fn ? fn(...array.map((a) => a[i])) : array.map((a) => a[i]))
    );
  };
}

const common = Tool.findCommon(["apple", "apple pie"]);
console.log(["apple", "pineapple"]);
console.log("HELLO => ", common);
