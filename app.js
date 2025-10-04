"use strict";

// Vytvoření nové "databáze" (správce pojištěnců)
// - ukládá seznam pojištěnců
// - zajišťuje přidávání, úpravy a mazání
const db = new Databaze();   

// Uchovává index pojištěnce, který se právě edituje (null = nic se needituje)
let upravovanyIndex = null;  

// =========================
// Funkce pro zobrazování zpráv (notifikací)
// =========================
function zobrazZpravu(text, typ = "success") {
  const zprava = document.getElementById("zprava");
  zprava.textContent = text;
  zprava.className = typ;
  zprava.style.display = "block";
  // zpráva se po 3 vteřinách automaticky skryje
  setTimeout(() => zprava.style.display = "none", 3000);
}

// =========================
// Přidání pojištěnce
// =========================
function pridejPojistence(jmeno, prijmeni, vek, telefon) {
  try {
    db.pridej(jmeno, prijmeni, vek, telefon);
    vykresliSeznam(); // aktualizace seznamu na stránce
    zobrazZpravu("Pojištěnec byl úspěšně přidán.");
  } catch (e) {
    zobrazZpravu("Chyba: " + e.message, "error");
  }
}

// =========================
// Úprava existujícího pojištěnce
// =========================
function upravPojistence(index) {
  const p = db.getAll()[index];

  // Předvyplnění formuláře daty vybraného pojištěnce
  document.getElementById("jmeno").value = p.jmeno;
  document.getElementById("prijmeni").value = p.prijmeni;
  document.getElementById("vek").value = p.vek;
  document.getElementById("telefon").value = p.telefon;

  // uložíme si, že teď editujeme konkrétního pojištěnce
  upravovanyIndex = index;
  document.getElementById("odeslatBtn").textContent = "Uložit změny";
}

// Uloží změny pojištěnce, který je právě v režimu úpravy
function ulozUpravy(jmeno, prijmeni, vek, telefon) {
  try {
    db.uprav(upravovanyIndex, jmeno, prijmeni, vek, telefon);
    upravovanyIndex = null; // po uložení už nic needitujeme
    document.getElementById("odeslatBtn").textContent = "Přidat";
    vykresliSeznam();
    zobrazZpravu("Údaje pojištěnce byly upraveny.");
  } catch (e) {
    zobrazZpravu("Chyba: " + e.message, "error");
  }
}

// =========================
// Smazání pojištěnce
// =========================
function smazPojistence(index) {
  db.smaz(index);
  vykresliSeznam();
  zobrazZpravu("Pojištěnec byl smazán.");
}

// =========================
// Vykreslení seznamu pojištěnců na stránku
// =========================
function vykresliSeznam() {
  const seznamDiv = document.getElementById("seznam");
  seznamDiv.innerHTML = "";

  const pojistenci = db.getAll();
  if (pojistenci.length === 0) {
    seznamDiv.textContent = "Seznam je prázdný.";
    return;
  }

  const ul = document.createElement("ul");

  // projdeme všechny pojištěnce a vykreslíme do <li>
  pojistenci.forEach((p, index) => {
    const li = document.createElement("li");
    li.textContent = p.toString() + " ";

    // tlačítko "Upravit"
    const btnUpravit = document.createElement("button");
    btnUpravit.textContent = "Upravit";
    btnUpravit.addEventListener("click", () => upravPojistence(index));

    // tlačítko "Smazat"
    const btnSmazat = document.createElement("button");
    btnSmazat.textContent = "Smazat";
    btnSmazat.addEventListener("click", () => smazPojistence(index));

    li.appendChild(btnUpravit);
    li.appendChild(btnSmazat);
    ul.appendChild(li);
  });

  seznamDiv.appendChild(ul);
}

// =========================
// Obsluha odeslání formuláře
// =========================
document.getElementById("formular").addEventListener("submit", function (e) {
  e.preventDefault();

  // Načteme hodnoty z polí formuláře
  const jmeno = document.getElementById("jmeno").value.trim();
  const prijmeni = document.getElementById("prijmeni").value.trim();
  const vek = parseInt(document.getElementById("vek").value);
  const telefon = document.getElementById("telefon").value.trim();

  // Validace vstupů
  if (jmeno.length < 2 || prijmeni.length < 2) {
    return zobrazZpravu("Jméno a příjmení musí mít alespoň 2 znaky.", "error");
  }
  if (isNaN(vek) || vek < 0 || vek > 120) {
    return zobrazZpravu("Věk musí být číslo od 0 do 120.", "error");
  }
  if (telefon.replace(/\s+/g, "").length < 9) {
    return zobrazZpravu("Telefon musí mít alespoň 9 číslic.", "error");
  }

  // Rozhodnutí: přidat nového nebo uložit změny
  if (upravovanyIndex === null) {
    pridejPojistence(jmeno, prijmeni, vek, telefon);
  } else {
    ulozUpravy(jmeno, prijmeni, vek, telefon);
  }

  // vymazání formuláře
  this.reset();
});


// při načtení stránky rovnou vykreslí seznam
vykresliSeznam();
