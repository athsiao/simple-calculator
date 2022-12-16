/* Finds main box to update display */
var result = document.querySelector("#display");

/* By groups */
var numbers = document.querySelectorAll(".number");
var arithmetic = document.querySelectorAll(".operation");

/* By individual buttons */
var zero = document.querySelector("#zero");
var one = document.querySelector("#one");
var two = document.querySelector("#two");
var three = document.querySelector("#three");
var four = document.querySelector("#four");
var five = document.querySelector("#five");
var six = document.querySelector("#six");
var seven = document.querySelector("#seven");
var eight = document.querySelector("#eight");
var nine = document.querySelector("#nine");

var divide = document.querySelector("#divide");
var multiply = document.querySelector("#multiply");
var add = document.querySelector("#add");
var subtract = document.querySelector("#subtract");

var decimal = document.querySelector("#decimal");
var clear = document.querySelector("#clear");
var equals = document.querySelector("#equals");

/* Output class keeps track of current display */
class Output {

    constructor() {
        /* The current displayed number */
        var currentDisplay = "";

        /* By default, the display is blank */
        result.textContent = currentDisplay;

    }

    insert(key) {
        if (key == 0 && result.textContent == "") {
            /* Case: user is trying to enter a zero when the display is empty */
            // Do nothing
        } else if (key == '.' && result.textContent.includes('.')){
            /* Case: user is trying to enter a decimal when there is already one */
            // Do nothing
        } else if (key == '.' && result.textContent == "") {
            /* Case: user is entering a decimal as the first value */
            // Enter a zero before the decimal point
            this.currentDisplay = "0" + String(key);
            result.textContent = this.currentDisplay;
        } 
        else {
            /* Update the display with the appropriate number */
            this.currentDisplay = result.textContent + String(key);
            result.textContent = this.currentDisplay;
        }
    }

    operation(key) {

        /* Add the current number to the history */
        history.push(this.currentDisplay);

        /* Add the current operation to the history */
        history.push(key);

        /* Clear the display so the user can enter a new number */
        this.currentDisplay = "";
        result.textContent = this.currentDisplay;

        console.log(history);

    }

    clear() {
        /* Clear the display */
        this.currentDisplay = "";
        result.textContent = this.currentDisplay;

        /* Clear history of numbers */
        while (history.length != 0) {
            history.pop();
        }

        console.log(history);
    }

    equals() {

        /* If this is the first time equal is being pressed */
        if (history[history.length-1] != "=") {
            var current = parseFloat(this.currentDisplay);
            history.push(current);
        } else {
            history.pop();
        }

        /* Get second number */
        var second = history.pop();

        /* Get operation to perform */
        var op = history.pop();

        /* Get first number */
        var first = parseFloat(history.pop());

        var sol = 0;
        switch (op) {
            case 'div':
                sol = first / second;
                break;
            case 'mul':
                sol = first * second;
                break;
            case 'sub':
                sol = first - second;
                break;
            case 'add':
                sol = first + second;
                break;
            default:
                break;
        }

        /* Display answer */
        this.currentDisplay = sol;
        result.textContent = this.currentDisplay;

        /* Push popped values */
        history.push(this.currentDisplay);
        history.push(op);
        history.push(second);
        history.push("=");

        console.log(history);

    }
}

/* Number buttons cause the appropriate number to be displayed */
numbers.forEach(item => {
    item.addEventListener('click', event => {
        var item = 1;

        switch(event.target) {
            case one:
                item = 1;
                break;
            case two:
                item = 2;
                break;
            case three:
                item = 3;
                break;
            case four:
                item = 4;
                break;
            case five:
                item = 5;
                break;
            case six:
                item = 6;
                break;
            case seven:
                item = 7;
                break;
            case eight:
                item = 8;
                break;
            case nine:
                item = 9;
                break;
            case zero:
                item = 0;
                break;
            case decimal:
                item = '.';
                break;
            default:
                break;
        }

        /* Call the insert function to add the number */
        output.insert(item);

    })
})

arithmetic.forEach(item => {
    item.addEventListener('click', event => {
        switch(event.target) {
            case divide:
                output.operation('div');
                divide.classList.add("selected");
                break;
            case multiply:
                output.operation('mul');
                multiply.classList.add("selected");
                break;
            case add:
                output.operation('add');
                add.classList.add("selected");
                break;
            case subtract:
                output.operation('sub');
                subtract.classList.add("selected");
                break;
            case clear:
                output.clear();
                break;
            case equals:
                output.equals();
                multiply.classList.remove("selected");
                divide.classList.remove("selected");
                add.classList.remove("selected");
                subtract.classList.remove("selected");
                break;
            default:
                break;
        }

    })
})

const history = new Array();
const output = new Output();