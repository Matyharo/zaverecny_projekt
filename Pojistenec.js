"use strict";

// Třída reprezentující jednoho pojištěnce
class Pojistenec {
  constructor(jmeno, prijmeni, vek, telefon) {
    // Základní validace vstupních údajů
    if (!jmeno || !prijmeni) {
      throw new Error("Jméno i příjmení jsou povinná.");
    }
    if (!Number.isInteger(vek) || vek < 0 || vek > 120) {
      throw new Error("Věk musí být celé číslo od 0 do 120.");
    }
    if (!telefon || String(telefon).trim().length < 5) {
      throw new Error("Telefonní číslo není platné.");
    }

    // Uložení dat:
    // - jméno a příjmení vždy převést na velká písmena
    // - telefon převést na text (pro jistotu) a ořezat mezery
    this.jmeno = jmeno.trim().toUpperCase();
    this.prijmeni = prijmeni.trim().toUpperCase();
    this.vek = vek;
    this.telefon = String(telefon).trim();
  }

  // Metoda pro textovou reprezentaci pojištěnce
  // Např.: "JAN NOVÁK (věk: 30, telefon: 123456789)"
  toString() {
    return `${this.jmeno} ${this.prijmeni} (věk: ${this.vek}, telefon: ${this.telefon})`;
  }
}

// Zpřístupnění třídy globálně (aby ji šlo použít i v jiných skriptech)
window.Pojistenec = Pojistenec;
