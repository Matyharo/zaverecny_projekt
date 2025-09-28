"use strict";

class Pojistenec {
  constructor(jmeno, prijmeni, vek, telefon) {
    if (!jmeno || !prijmeni) {
      throw new Error("Jméno i příjmení jsou povinná.");
    }
    if (!Number.isInteger(vek) || vek < 0 || vek > 120) {
      throw new Error("Věk musí být celé číslo od 0 do 120.");
    }
    if (!telefon || String(telefon).trim().length < 5) {
      throw new Error("Telefonní číslo není platné.");
    }

    // Uložíme jméno a příjmení vždy velkými písmeny
    this.jmeno = jmeno.trim().toUpperCase();
    this.prijmeni = prijmeni.trim().toUpperCase();
    this.vek = vek;
    this.telefon = String(telefon).trim();
  }

  toString() {
    return `${this.jmeno} ${this.prijmeni} (věk: ${this.vek}, telefon: ${this.telefon})`;
  }
}


window.Pojistenec = Pojistenec;
