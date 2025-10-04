"use strict";

// Třída pro správu pojištěnců (uchovává se jen v paměti)
class Databaze {
  constructor() {
    this.pojistenci = [];
  }

  // Přidání nového pojištěnce
  pridej(jmeno, prijmeni, vek, telefon) {
    const novy = new Pojistenec(jmeno, prijmeni, vek, telefon);
    this.pojistenci.push(novy);
  }

  // Úprava pojištěnce podle indexu
  uprav(index, jmeno, prijmeni, vek, telefon) {
    const aktualizovany = new Pojistenec(jmeno, prijmeni, vek, telefon);
    this.pojistenci[index] = aktualizovany;
  }

  // Smazání pojištěnce podle indexu
  smaz(index) {
    this.pojistenci.splice(index, 1);
  }

  // Vrátí všechny pojištěnce
  getAll() {
    return this.pojistenci;
  }
}

// zpřístupníme globálně, aby ho šlo použít v app.js
window.Databaze = Databaze;
