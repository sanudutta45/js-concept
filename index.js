//binding
const name = {
  firstName: "Sanu",
  lastName: "Dutta",
};

function fullName(town, state) {
  console.log(this.firstName, " ", this.lastName, " ", town, " ", state);
}

Function.prototype.myBind = function (...args) {
  const obj = this;
  const params = args.slice(1);
  return function (...args2) {
    obj.apply(args[0], [...params, ...args2]);
  };
};

const fullName2 = fullName.myBind(name, "Dimapur");
fullName2("Nagaland");

//debounce
const debounce = function (fn, delay) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(context, args), delay);
  };
};

const handleClick = debounce(function () {
  console.log(this);
  console.log("clicked");
}, 1000);

const throttle = function (fn, delay) {
  let prev = 0;
  return function (...args) {
    const now = new Date().getTime();
    const context = this;
    if (now - prev >= delay) {
      prev = now;
      return fn(this, ...args);
    }
  };
};

const throttlingClick = throttle(function () {
  console.log(this);
  console.log("clicked");
}, 5000);

document
  .getElementById("debounce_button")
  .addEventListener("click", handleClick);

//throttling
document
  .getElementById("throttle_button")
  .addEventListener("click", throttlingClick);


// recursive thinking

function sum(a) {
  return function (b) {
    if (b) return sum(a + b);
    return a;
  };
}

const sumOfNo = sum(1)(2)(5)();

console.log(sumOfNo);

const user = {
  name: "Sanu",
  address: {
    ward: "05",
    pinCode: "797112",
    colony: "Bank Colony",
    district: "Dimapur",
    postOffice: "Dimapur SO",
    state: "Nagaland",
    Country: "India",
  },
  idProof: {
    adhaar: "503445565657",
    fingerPrint: "gergdf454fggf",
    DOB: "28/02/1994",
  },
  education: {
    hsc: {
      school: "Assembly of god hr. sec. school",
      address: {
        state: "nagaland",
        district: "dimapur",
        pin: "797112",
      },
      percentage: "80",
    },
  },
};

const finalObj = {};

function ObjCreator(obj,parent){
    for(x in obj){
        if(obj[x].constructor === Object){
            ObjCreator(obj[x],`${parent}_${x}`)
        }
        else{
            finalObj[`${parent}_${x}`] = obj[x];
        }
    }
}

ObjCreator(user,"user");

console.log(finalObj);
