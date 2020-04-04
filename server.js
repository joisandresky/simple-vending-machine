/*
Class Config Start
*/

class VendingMachine {

  constructor(drinks) {
    this.drinks = drinks;
  }

  getDrinks() {
    return this.drinks
  }

  transaction(drinkID, money) {
    switch (money) {
      case 2000:
      case 5000:
      case 10000:
      case 200000:
        let drinkIdx = this.drinks.findIndex(drnk => drnk.id === drinkID);

        if (drinkIdx > -1) {
          if (money >= this.drinks[drinkIdx]['price']) {
            if (this.drinks[drinkIdx]['qty'] > 0) {
              this.drinks[drinkIdx]['qty'] -= 1;
              let kembalian = money - this.drinks[drinkIdx]['price'];

              console.log(`Terima kasih sudah belanja ${this.drinks[drinkIdx]['name']} senilai ${this.drinks[drinkIdx]['price']}`);
              console.log(`Kembalian: ${kembalian}`)
              console.log(`Sisa Qty: ${this.drinks[drinkIdx]['qty']}`)
            } else {
              console.log(`${this.drinks[drinkIdx]['name']} sudah habis`);
            }
          } else {
            console.log('Uang Tidak Mencukupi');
          }
        } else {
          console.log('Minuman tidak Ditemukan!');
        }
        break;
      default:
        console.log('Uang tidak valid, uang yang diterima adalah pecahan Rp 2.000, Rp 5.000, Rp 10.000, Rp 20.0000');
    }
  }
}

/*
Class Config End
*/


const clear = require('clear');
const chalk = require('chalk');
const inquirer = require('inquirer');
const figlet = require('figlet');

let finish = false;

var drinks = [
  {
    id: 1,
    name: "Aqua",
    price: 5000,
    qty: 10
  },
  {
    id: 2,
    name: "Teh Botol",
    price: 7000,
    qty: 15
  },
  {
    id: 3,
    name: "Pocari Sweat",
    price: 10000,
    qty: 5
  },
];

let vm = new VendingMachine(drinks);

const questions = [
  {
    name: "drinkID",
    type: 'list',
    message: "Silahkan Masukan No. Minuman:",
    choices: [
      {
        value: 1,
        name: "Aqua (Rp 5.000)"
      },
      {
        value: 2,
        name: "Teh Botol (Rp 7.000)"
      },
      {
        value: 3,
        name: "Pocari Sweat (Rp 10.000)"
      },
    ],
    validate: function (value) {
      return value.length ? true : ' [Silahkan Masukan Minuman dengan Benar]'
    }
  },
  {
    name: "money",
    type: 'input',
    message: "Silahkan Masukan Nominal Uang Pembayaran:",
    validate: function (value) {
      if (value.length) {
        let uang = Number(value);
        if (isNaN(uang)) {
          return 'Nominal uang Harus Berbentuk Angka';
        } else {
          return true;
        }
      } else {
        return 'Silahkan Masukan Nominal Uang!';
      }
    }
  }
]

function mulaiPertanyaan() {
  return inquirer.prompt(questions)
    .then(answers => {
      vm.transaction(answers.drinkID, Number(answers.money));
      console.log('================================================================================')
      console.log('Tekan Ctrl + c untuk Keluar');
      console.log('================================================================================')
      mulaiPertanyaan();

    })
}

clear();

console.log(
  chalk.yellow(
    figlet.textSync('The Amazing Vending Machine', { horizontalLayout: 'full' })
  )
)

mulaiPertanyaan();