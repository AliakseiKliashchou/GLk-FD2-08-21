// const block = document.getElementById('block');

// const block = document.querySelector('#block');
// const x = block.style.width;

// var theCSSprop = window.getComputedStyle(block, null).getPropertyValue("background-image");

// console.log(theCSSprop);
// console.log('chewckj');

// const summ = function(a) {
//     return function(b) {
//         return a + b;
//     }
// }

// const summ = a => b => a + b;

// // console.log(summ(1)(3));

// const add_with_1 = summ(1);

// // console.log(add_with_1(2));
// // console.log(add_with_1(9));

// const add_with_2 = summ(2);

// console.log(add_with_2(8));

// const btns = document.getElementsByTagName('button');

// const counter = () => {
//     let count = 0;

//     return () => {
//         count++;
//         return count;
//     }
// }

// for (let i = 0; i < btns.length; i++) {
//     const btnCounter =  counter();

//     btns[i].onclick = () => {
//         btns[i].innerText = btnCounter();
//     }

// }

// sum(3)(6)(5); //14

const user = {
    name: 'Alex',
    age: 31
}

const arr = [1, 2, 3];

const str = new String('Hello');

// console.log(user.sayHello());
Object.prototype.sayHello = function() {
    this.name ? console.log(this.name) : console.log('This is array');
}

// String.prototype.sayHello = ksmnrg;bs



const user_2 = {
    name: 'Gasilov',
    age: 29
}

// user.sayHello();
// console.log(user.__proto__);
// user_2.sayHello();

// arr.sayHello();




//1//0cppsMyzaJRXvCgYIARAAGAwSNwF-L9IrqZFvkJLgcN8mjlAsuVhYf-NuxsKSZF3f5G_4BgfcZV0k8soa1DpX532fRVNUonmM_W4