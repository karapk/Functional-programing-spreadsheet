
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

const spreadSheetFunctions = {
    sum,
    average,
    median
}

const range = (start, end) => Array(end - start + 1).fill(start).map((element, index) => element + index);
const charRange = (start, end) => range(start.charCodeAt(0), end.charCodeAt(0)).map(code => String.fromCharCode(code));
const evalFormula = (x, cells) => {
  const idToText = id => cells.find(cell => cell.id === id).value;
  const rangeRegex = /([A - J]);

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