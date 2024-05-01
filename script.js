//infix is a mathematical operator like + - *
const infixToFunction = {
  //the below function is defining + that can be used later for addition without writing the whole equation
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => x / y,
};
//evaluating the functions
const infixEval = (str, regex) => str.replace(regex, (_match, arg1, operator, arg2) => infixToFunction[operator](parseFloat(arg1), parseFloat(arg2)));

//regular expression that matches a number including a decimal followed by * or / operator followed by another number
const highPrecedence = (str) => {
  const regex = /([\d.]+)([*\/])([\d.]+)/;
  const str2 = infixEval(str, regex);
  return str === str2 ? str : highPrecedence(str2);
};

//isEven function takes num as parameter and returns true if number is even and false if not. The === is the strictly equal operator
const isEven = (num) => num % 2 === 0;

//takng the sum of the numbers acc adds up the numbers in el and starts at 0
const sum = nums => nums.reduce((acc, el) => acc + el, 0) ;

//finding the average of the numbers using the length of the numbers
const average = nums => sum(nums) / nums.length;

//.slice() makes a copy of the array .sort sorts the array
//((a, b) => a - b) this function arranges a before b if b is a negative value

const median = nums => {
    const sorted = nums.slice().sort((a, b)=> a-b);
    const length = sorted.length;
    const middle = length / 2 -1;
    return isEven(length)
    ? average([sorted[middle], sorted[middle+1]])
    : sorted[Math.ceil(middle)]
}
//using shorthand property to declare an object literal spredsheetFunctions is the object with properties sum, average and median

const spreadsheetFunctions = {
    sum,
    average,
    median
}

const applyFunction = (str) => {
  const noHigh = highPrecedence(str);
  const infix =  /([\d.]+)([+-])([\d.]+)/
  const str2 = infixEval(noHigh, infix);
  const functionCall = /([a-z0-9]*)\(([0-9., ]*)\)(?!.*\()/i;
  const toNumberList = (args) => args.split(",").map(parseFloat);
  const apply = (fn, args) => spreadsheetFunctions[fn.toLowerCase()](toNumberList(args));
  return str2.replace(functionCall, (match, fn, args) => spreadsheetFunctions.hasOwnProperty(fn.toLowerCase()) ? apply(fn, args) : match);
}

const range = (start, end) => Array(end - start + 1).fill(start).map((element, index) => element + index);
const charRange = (start, end) => range(start.charCodeAt(0), end.charCodeAt(0)).map(code => String.fromCharCode(code));
const evalFormula = (x, cells) => {
  const idToText = id => cells.find(cell => cell.id === id).value;
  //regex range A-J 0-99 last number optional. Colon for seprating two capture groups. gi makes it global and case-insensitive
  const rangeRegex = /([A - J])([1-9][0-9]?):([A - J])([1-9][0-9]?)/gi;
  //parsInt passes number as integer below
  const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2));
   //currying - returning a function within a function
  const elemValue = num => character => idToText(character + num);  
  const addCharacters = character1 => character2 => num => charRange(character1, character2).map(elemValue(num));
  const rangeExpanded = x.replace(rangeRegex, (match, char1, num1, char2, num2) => rangeFromString(num1, num2).map(addCharacters(char1)(char2)));
  const cellRegex = /[A-J][1-9][0-9]?/gi;
  const cellExpanded = rangeExpanded.replace(cellRegex, match => idToText(match.toUpperCase()));
}

window.onload = () => {
  const container = document.getElementById("container");
  const createLabel = (name) => {
    const label = document.createElement("div");
    label.className = "label";
    label.textContent = name;
    container.appendChild(label);
  }
  const letters = charRange("A", "J");
  letters.forEach(createLabel);
  range(1, 99).forEach(number => {
    createLabel(number);
    letters.forEach(letter => {
        const input = document.createElement("input");
        input.type = "text";
        input.id = letter + number;
        input.ariaLabel = letter + number;
        input.onchange = update;
        container.appendChild(input);
    })
  })
}
const update = (event) => {
  const element = event.target;
  const value = element.value.replace(/\s/g, '');
  if(!value(element.id) && value.startsWith('=') ) {

  }

}