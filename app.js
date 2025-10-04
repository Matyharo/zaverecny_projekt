"use strict";

// Seznam pojištěnců (uchovává se jen v paměti)
const pojistenci = [];
let upravovanyIndex = null; // index pojištěnce, který se momentálně edituje

// Funkce pro zobrazení krátké notifikace uživateli
// text = obsah zprávy, typ = "success" nebo "error"
function zobrazZpravu(text, typ = "success") {
  const zprava = document.getElementById("zprava");
  zprava.textContent = text;
  zprava.className = typ;
  zprava.style.display = "block";

  // Zpráva zmizí po 3 vteřinách
  setTimeout(() => {
    zprava.style.display = "none";
  }, 3000);
}

// Přidá nového pojištěnce do seznamu
function pridejPojistence(jmeno, prijmeni, vek, telefon) {
  try {
    const novy = new Pojistenec(jmeno, prijmeni, vek, telefon);
    pojistenci.push(novy);
    vykresliSeznam();
    zobrazZpravu("Pojištěnec byl úspěšně přidán.", "success");
  } catch (e) {
    zobrazZpravu("Chyba: " + e.message, "error");
  }
}

// Předvyplní formulář údaji vybraného pojištěnce pro úpravu
function upravPojistence(index) {
  const p = pojistenci[index];
  document.getElementById("jmeno").value = p.jmeno;
  document.getElementById("prijmeni").value = p.prijmeni;
  document.getElementById("vek").value = p.vek;
  document.getElementById("telefon").value = p.telefon;

  upravovanyIndex = index; // uloží se, kdo se edituje
  document.getElementById("odeslatBtn").textContent = "Uložit změny";
}

// Uloží změny u pojištěnce, který se edituje
function ulozUpravy(jmeno, prijmeni, vek, telefon) {
  try {
    const aktualizovany = new Pojistenec(jmeno, prijmeni, vek, telefon);
    pojistenci[upravovanyIndex] = aktualizovany;
    upravovanyIndex = null;
    document.getElementById("odeslatBtn").textContent = "Přidat";
    vykresliSeznam();
    zobrazZpravu("Údaje pojištěnce byly upraveny.", "success");
  } catch (e) {
    zobrazZpravu("Chyba: " + e.message, "error");
  }
}

// Smaže pojištěnce podle indexu
function smazPojistence(index) {
  pojistenci.splice(index, 1);
  vykresliSeznam();
  zobrazZpravu("Pojištěnec byl smazán.", "success");
}

// Vykreslí seznam pojištěnců do <div id="seznam">
// - pokud je prázdný, zobrazí hlášku
// - jinak vypíše seznam a přidá tlačítka Upravit/Smazat
function vykresliSeznam() {
  const seznamDiv = document.getElementById("seznam");
  seznamDiv.innerHTML = "";

  if (pojistenci.length === 0) {
    seznamDiv.textContent = "Seznam je prázdný.";
    return;
  }

  const ul = document.createElement("ul");
  pojistenci.forEach((p, index) => {
    const li = document.createElement("li");
    li.textContent = p.toString() + " ";

    // Tlačítko pro úpravu
    const btnUpravit = document.createElement("button");
    btnUpravit.textContent = "Upravit";
    btnUpravit.addEventListener("click", () => upravPojistence(index));

    // Tlačítko pro smazání
    const btnSmazat = document.createElement("button");
    btnSmazat.textContent = "Smazat";
    btnSmazat.addEventListener("click", () => smazPojistence(index));

    li.appendChild(btnUpravit);
    li.appendChild(btnSmazat);
    ul.appendChild(li);
  });
  seznamDiv.appendChild(ul);
}

// Obsluha odeslání formuláře
// - načte hodnoty z polí
// - provede základní validace
// - podle stavu buď přidá nového pojištěnce, nebo uloží změny
document.getElementById("formular").addEventListener("submit", function (e) {
  e.preventDefault();

  const jmeno = document.getElementById("jmeno").value.trim();
  const prijmeni = document.getElementById("prijmeni").value.trim();
  const vek = parseInt(document.getElementById("vek").value);
  const telefon = document.getElementById("telefon").value.trim();

  // Validace vstupů
  if (jmeno.length < 2 || prijmeni.length < 2) {
    zobrazZpravu("Jméno a příjmení musí mít alespoň 2 znaky.", "error");
    return;
  }
  if (isNaN(vek) || vek < 0 || vek > 120) {
    zobrazZpravu("Věk musí být číslo od 0 do 120.", "error");
    return;
  }
  if (telefon.replace(/\s+/g, "").length < 9) {
    zobrazZpravu("Telefon musí mít alespoň 9 číslic.", "error");
    return;
  }

  // Rozhodnutí, zda přidat nebo uložit změny
  if (upravovanyIndex === null) {
    pridejPojistence(jmeno, prijmeni, vek, telefon);
  } else {
    ulozUpravy(jmeno, prijmeni, vek, telefon);
  }

  this.reset(); // vymazání formuláře
});

// Po načtení stránky se seznam vykreslí (i když je prázdný)
vykresliSeznam();
