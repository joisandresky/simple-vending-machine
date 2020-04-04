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
              console.log(`Terima kasih sudah belanja ${this.drinks[drinkIdx]['name']} senilai ${this.drinks[drinkIdx]['price']}`);
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
        console.log('Uang Tidak Valid');
    }
  }
}

module.exports = VendingMachine;