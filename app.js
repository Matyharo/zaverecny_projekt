"use strict";

const pojistenci = [];
let upravovanyIndex = null; // index pojištěnce, který se právě upravuje

// Zobrazí dočasnou zprávu (notifikaci)
function zobrazZpravu(text, typ = "success") {
  const zprava = document.getElementById("zprava");
  zprava.textContent = text;
  zprava.className = typ;
  zprava.style.display = "block";

  setTimeout(() => {
    zprava.style.display = "none";
  }, 3000);
}

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

function upravPojistence(index) {
  const p = pojistenci[index];
  document.getElementById("jmeno").value = p.jmeno;
  document.getElementById("prijmeni").value = p.prijmeni;
  document.getElementById("vek").value = p.vek;
  document.getElementById("telefon").value = p.telefon;

  upravovanyIndex = index;
  document.getElementById("odeslatBtn").textContent = "Uložit změny";
}

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

function smazPojistence(index) {
  pojistenci.splice(index, 1);
  vykresliSeznam();
  zobrazZpravu("Pojištěnec byl smazán.", "success");
}

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

    const btnUpravit = document.createElement("button");
    btnUpravit.textContent = "Upravit";
    btnUpravit.addEventListener("click", () => upravPojistence(index));

    const btnSmazat = document.createElement("button");
    btnSmazat.textContent = "Smazat";
    btnSmazat.addEventListener("click", () => smazPojistence(index));

    li.appendChild(btnUpravit);
    li.appendChild(btnSmazat);
    ul.appendChild(li);
  });
  seznamDiv.appendChild(ul);
}

// Ošetření odeslání formuláře
document.getElementById("formular").addEventListener("submit", function (e) {
  e.preventDefault();

  const jmeno = document.getElementById("jmeno").value.trim();
  const prijmeni = document.getElementById("prijmeni").value.trim();
  const vek = parseInt(document.getElementById("vek").value);
  const telefon = document.getElementById("telefon").value.trim();

  // validace
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

  if (upravovanyIndex === null) {
    pridejPojistence(jmeno, prijmeni, vek, telefon);
  } else {
    ulozUpravy(jmeno, prijmeni, vek, telefon);
  }

  this.reset();
});

vykresliSeznam();
