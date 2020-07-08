/*
verze pro 16týmů:
15+15 kol, kolo má 8 zápasů
střídání Doma/Hosté

kurzy jsou podílem týmových power 

*/

const tymy = [
  { team: "Slavia", power: 72 },
  { team: "Plzeň", power: 66 },
  { team: "Sparta", power: 50 },
  { team: "Jablonec", power: 49 },
  { team: "Liberec", power: 47 },
  { team: "Baník", power: 45 },
  { team: "Budějovice", power: 43 },
  { team: "Bohemians", power: 42 },
  { team: "Slovácko", power: 41 },
  { team: "Boleslav", power: 40 },
  { team: "Olomouc", power: 37 },
  { team: "Teplice", power: 35 },
  { team: "Zlín", power: 33 },
  { team: "Karviná", power: 27 },
  { team: "Opava", power: 25 },
  { team: "Příbram", power: 24 }
];
const pocetTymu = tymy.length;  // 16
const pocetKol = (pocetTymu - 1) * 2; // 30 = 15*2
const pocetKolPulka = Math.ceil(pocetTymu - 1); // 15 - v případě lichého čísla je týmů +1, poslední s fiktivním nehraje
const pocetZapasu = pocetTymu / 2;  // 8 - zápasů v jednom kole
const pocetZapasuCelkem = pocetTymu * (pocetTymu - 1);  // 240 = 16 týmů * každý hraje 15×
const vysledky = Array(pocetTymu).fill(1).map(() => new Array(pocetTymu).fill(0));  // [][] výsledkové pole 16×16 vyplněné nulami
const teams = tymy.map(arr => arr.team); // [] název každého týmu (.team)
const teamsAbbr = tymy.map(arr => arr.team.slice(0, 3));  // [] zkratka každého týmu, první 3 písmena (.power)
const powers = tymy.map(arr => arr.power);  // [] síla každého týmu

// ---------------- FUNCTIONS -----------------------------------------------



function getTeams() { console.log(teams); } // název týmu
function getTeamAbbr(_team) { return _team.team.slice(0, 3); } // název týmu, první 3 písmena
function getPowers() { console.log(powers); } // síla týmu
function getMaxPower() { console.log(Math.max(...powers)); }  // maximum z pole powers (síla každého týmu)
function conv2Dec(num2conv) { return `0${num2conv}`; }  // před číslo dá 0
function kurz(_team1, _team2) { return parseFloat(_team1 / _team2).toFixed(2); }  // TODO

function isValidRound(kolo) {
  // vrací TRUE, pokud je počet kol 1..(pocetTymu-1)*2 -> 1..30
  if (isNaN(kolo) || kolo <= 0 || (kolo > pocetKol)) return false;
  else return true;
}
function isValidMatch(zapas) {
  // vrací TRUE, pokud je počet zápasů V JEDNOM KOLE 1..pocetZapasu -> 1..8
  if (isNaN(zapas) || zapas <= 0 || zapas > pocetZapasu) return false;
  else return true;
}
function isValidMatch2(zapas) {
  // vrací TRUE, pokud je počet CELKOVÝCH zápasů 1..pocetZapasuCelkem -> 1..240
  if (isNaN(zapas) || zapas <= 0 || zapas > pocetZapasuCelkem) return false;
  else return true;
}

function drawTabFromArray(arr = vysledky) {

}

function drawTabInto(arr, content) {
  // vypíše do tabulky samé nuly, po použití testFillArray(array, content) vyplní 'content'
  let tabString = "<tr><th>#</th>";

  // 1. řádek - záhlaví <th>
  for (let r = 0; r < tymy.length; r++) tabString += `<th>${getTeamAbbr(tymy[r])}</th>`;
  tabString += "</tr>";

  // zbytek tab
  for (let row = 1; row <= tymy.length; row++) {
    tabString += "<tr>";
    for (let col = 0; col <= tymy.length; col++) {
      if (row != col) {
        switch (col) {
          case 0: tabString += `<td class="th">${getTeamAbbr(tymy[row - 1])}</td>`; break;
          // [row/col - 1] protože tabulka (resp. indexy pole) začínají až od 2.ř./sl.
          case tymy.length: tabString += `<td>${content}</td></tr>`; break;
          default: tabString += `<td>${content}</td>`; break;
        }
      }
      else tabString += `<td class="th"> - </td>`;
      // tabString += "</tr>";
    }
  }

  // vykresli do elementu
  document.getElementById('tab').innerHTML = tabString;
}
function drawTabInit() {
  // (1) !!!!! spustit jako první
  // inicializuje POUZE tabulku, NASTAVÍ VŠEM <td> ID - nutné k vkládání dat z pole
  let tabString = "<tr><th>d/h</th>";

  // 1. řádek - záhlaví <th>
  for (let r = 0; r < pocetTymu; r++) {
    tabString += `<th>${getTeamAbbr(tymy[r])}</th>`;
  }
  tabString += "</tr>";

  // zbytek tab
  for (let row = 1; row <= pocetTymu; row++) {
    tabString += "<tr>";
    for (let col = 0; col <= pocetTymu; col++) {
      if (row != col) {

        let numRow = row.toString().length < 2 ? conv2Dec(row) : row;
        let numCol = col.toString().length < 2 ? conv2Dec(col) : col;

        // [row/col - 1] protože tabulka (resp. indexy pole) začínají až od 2.ř./sl.
        switch (col) {
          case 0: tabString += `<td class="th">${getTeamAbbr(tymy[row - 1])}</td>`; break;
          // do buněk vypíše polohu XY [xxyy] vč. nastavení id každé buňky id='idXXYY'
          // case pocetTymu: tabString += `<td id='td${numRow}${numCol}'>${numRow}${numCol}</td></tr>`; break;
          // default: tabString += `<td id='td${numRow}${numCol}'>${numRow}${numCol}</td>`; break;

          case pocetTymu: tabString += `<td id='td${numRow}${numCol}'></td></tr>`; break;
          default: tabString += `<td id='td${numRow}${numCol}'></td>`; break;

        }
      }
      else tabString += `<td class="th"> - </td>`;

      // tabString += "</tr>";
    }
  }

  document.getElementById('tab').innerHTML = tabString;
}
function drawTabCoords() {
  // (2a) vykreslení do buněk tabulky souřadnice XY - z ID buněk <td>

  var td = document.getElementsByTagName('td').length;
  // var te = document.getElementsByTagName('td').map();

  var tf = document.getElementsByName('td').length;

  // console.log('Coords drawed');
  console.log(td);
  // console.log(te);
  console.log(tf);
}
function drawTabMatchOrder() {
  generovaniZapasu();
}



function battle(_team1, _team2) {

}


function generovaniZapasu(kolo, zapas, cisloZapasu) {
  /*
  // vygenerování (k)ol a (z)ápasů dle algoritmu, stále stejný výsledek
  // testováno na 16týmů; dvě části po 15(k)olech; 
  // střídání rozepsaných zápasů z podzimu a jara (z1, z17, z3, z19, ...) 
  // po 15kolech se střídají sudé zápasy (z16, z2, z18, z4, ...)
  // aby se daný tým prostřídal venku a doma, jinak hraje většinou 1. část
  // (d)oma nebo venku jako (h)osté a jiný tým naopak
  // např. tým1 má podzimní rozpis Doma/Venku: D V V V V V V V (7×) a D D D D D D D (7×) za sebou
  */
  let d, h;
  let iter = 0;
  let numRow, numCol;

  for (let k = 1; k <= pocetKol; k++) {

    // každé (k)olo má 8 (z)ápasů
    for (let z = 1; z <= pocetZapasu; z++) {
      iter++;
      // console.log(iter + " " + cisloZapasu);

      // pokud je součet vyšší než 15, odečti 15; nejde přes modulo !!
      if (k <= pocetKolPulka) {
        d = (k - 1) + z > (pocetKolPulka) ? k + z - pocetTymu : (k - 1) + z;
        h = (z == 1) ? pocetTymu : (pocetTymu + k) - z > (pocetKolPulka) ? k - z + 1 : (pocetTymu + k) - z;
      }
      else {
        d = (z == 1) ? pocetTymu : (k + 1) - z > (pocetKolPulka) ? k - pocetTymu - z + 2 : (k + 1) - z;
        h = (k - pocetTymu) + z > (pocetKolPulka) ? k + 1 + z - (2 * pocetTymu) : (k - pocetTymu) + z;
      }

      // parametr fce 'cisloZapasu' - vrátí zápas (týmy a jejich čísla), když dojde k danému číslu zápasu
      if (iter == cisloZapasu) return `${teamsAbbr[d - 1]} vs ${teamsAbbr[h - 1]} (${d}-${h})`;

      // parametry fce 'kolo' a 'zapas' - vrátí vrátí zápas (týmy a jejich čísla), když dojde k danému kolu a zápasu
      if (k == kolo && z == zapas) return `${teamsAbbr[d - 1]} vs ${teamsAbbr[h - 1]} (${d}-${h})`;

      // document.getElementById('tab').innerHTML = "aaa";

      // if (row != col)
      // document.getElementById(`tab`).innerHTML = "aaa";
      // console.log(`${iter}\t${d}-${h}`);


      numRow = d.toString().length < 2 ? conv2Dec(d) : d;
      numCol = h.toString().length < 2 ? conv2Dec(h) : h;
      console.log(numRow + "" + numCol + " " + iter);
      document.getElementById(`td${numRow}${numCol}`).innerHTML = `${iter}`;


      // if (iter == cisloZapasu) return `${teamsAbbr[d - 1]} vs ${teamsAbbr[h - 1]} (${d}-${h})`;
      // vypisZapasuDoTabulky(iter, d, h);


    }

  }

  // 



}
function dh(k, z) {

  let d, h;
  let d2, h2;
  let dhar = [];
  let dhar2 = [];

  if (k <= pocetKolPulka) {
    d = (k - 1) + z > (pocetKolPulka) ? k + z - pocetTymu : (k - 1) + z;
    h = (z == 1) ? pocetTymu : (pocetTymu + k) - z > (pocetKolPulka) ? k - z + 1 : (pocetTymu + k) - z;
  }
  else {
    d = (z == 1) ? pocetTymu : (k + 1) - z > (pocetKolPulka) ? k - pocetTymu - z + 2 : (k + 1) - z;
    h = (k - pocetTymu) + z > (pocetKolPulka) ? k + 1 + z - (2 * pocetTymu) : (k - pocetTymu) + z;
  }

  dhar[0] = d;
  dhar[1] = h;


  if (k <= pocetKolPulka) {
    d2 = (k - 1) + z > (pocetKolPulka) ? k + z - pocetTymu : (k - 1) + z;
    h2 = (z == 1) ? pocetTymu : (pocetTymu + k) - z > (pocetKolPulka) ? k - z + 1 : (pocetTymu + k) - z;
  }
  else {
    d2 = (z == 1) ? pocetTymu : (k + 1) - z > (pocetKolPulka) ? k - pocetTymu - z + 2 : (k + 1) - z;
    h2 = (k - pocetTymu) + z > (pocetKolPulka) ? k + 1 + z - (2 * pocetTymu) : (k - pocetTymu) + z;
  }

  dhar2[0] = d;
  dhar2[1] = h;


  // return dhar;
  console.log(dhar);


}


function rozpisZapasuDoKonzole() {
  // let max = pocetTymu;
  let d, h;
  let iter = 0;

  // dvě části po 15(k)olech; 
  // střídání rozepsaných zápasů z podzimu a jara (z1, z17, z3, z19, ...) 
  // po 15kolech se střídají sudé zápasy (z16, z2, z18, z4, ...)
  // aby se daný tým prostřídal venku a doma, jinak hraje většinou 1. část
  // doma (nebo venku) a jiný tým naopak
  // např. tým1 má podzimní rozpis Doma/Venku: D V V V V V V V (7×) a D D D D D D D (7×) za sebou
  for (let k = 1; k <= pocetKol; k++) {

    // každé (k)olo má 8 (z)ápasů
    for (let z = 1; z <= pocetZapasu; z++) {
      iter++;
      // pokud je součet vyšší než 15, odečti 15; nejde přes modulo ?!
      if (k <= pocetKolPulka) {
        d = (k - 1) + z > (pocetKolPulka) ? k + z - pocetTymu : (k - 1) + z;
        h = (z == 1) ? pocetTymu : (pocetTymu + k) - z > (pocetKolPulka) ? k - z + 1 : (pocetTymu + k) - z;
      }
      else {
        d = (z == 1) ? pocetTymu : (k + 1) - z > (pocetKolPulka) ? k - pocetTymu - z + 2 : (k + 1) - z;
        h = (k - pocetTymu) + z > (pocetKolPulka) ? k + 1 + z - (2 * pocetTymu) : (k - pocetTymu) + z;
      }


      // console.log(`${k}\t${d}\t${h}\t${teamsAbbr[d - 1]}\t${teamsAbbr[h - 1]}`);
      // if (k > pocetKolPulka) console.log(`${iter}\t${k}\t${d}\t${h}`);
      console.log(`${iter}\t${k}\t${d}\t${h}`);
      // if (iter <= (pocetZapasuCelkem)) vypisZapasuDoTabulky(iter, d, h);
      // vypisZapasuDoTabulky(iter, d, h);

      // console.log(`${k}\t${d}\t`);
      // console.log(`${k}\t${h}\t`);

    }
  }
}

function vypisZapasuDoTabulky(i, tymDomacich, tymHostu) {
  // TODO
  // console.log(`${i}   ${tymDomacich}-${tymHostu}`);
}

function kdoHrajeKoloZapas(kolo = 1, zapas = 1) {
  // kdo hraje v daném kole a zápase; neošetřeno nečíslo 
  // console.log(`${kolo}.kolo, ${zapas}(${(kolo - 1) * (pocetZapasu) + zapas}).zápas: ${generovaniZapasu(kolo, zapas, undefined)}`);
  kolo = parseInt(kolo);
  zapas = parseInt(zapas);
  if (isValidRound(kolo) && isValidMatch(zapas)) console.log(`${kolo}.kolo, ${zapas}(${(kolo - 1) * (pocetZapasu) + zapas}).zápas: ${generovaniZapasu(kolo, zapas, undefined)}`);
  // else if (!isValidRound(kolo)) console.log(`ERR: ${kolo}.kolo / ${zapas}.zápas (max ${pocetKol}.k/${pocetZapasu}.z)`);
  if (!isValidRound(kolo)) console.log(`ERR: ${kolo}.kolo - zadej [1-${pocetKol}]`);
  if (!isValidMatch(zapas)) console.log(`ERR: ${zapas}.zápas - zadej [1-${pocetZapasu}]`);
}

function kdoHrajeCisloZapasu(cisloZapasu = 1) {
  // kdo hraje v n-tém zápase? [1..pocetTymu*(pocetTymu-1)] -> 1-240 pro 16 týmů (16*15)
  cisloZapasu = parseInt(cisloZapasu);
  if (isValidMatch2(cisloZapasu)) console.log(`${cisloZapasu}.zápas: ${generovaniZapasu(undefined, undefined, cisloZapasu)}`);
  else console.log(`ERR: ${cisloZapasu}.zápas - zadej [1-${pocetZapasuCelkem}]`);
}


// ---------------- APP -----------------------------------------------

// getTeams();
// getPowers();
// getMaxPower();


drawTabInit();
drawTabCoords();
// drawTabMatchOrder();

// kdoHrajeKoloZapas(30, 5);
// dh(30, 5);

// console.log(Math.ceil(17 / 2));

// console.log(pocetKolPulka);

// drawTabInto(vysledky, '-');
// generovaniZapasu();



// console.log(vysledky);

// po vteřině znovu vykresli
// setTimeout(() => {
// console.log(testFillArray(vysledky, 'x'));
// drawTabInto(vysledky);
// drawTabCoords();
// drawTabInto(vysledky);
// }, 1000);

// console.log(testFillArray(vysledky, 'y'));
// drawTabInto(vysledky);
// console.log(testFillArray(vysledky, 'z'));
// drawTabMatchOrder(vysledky);



// console.log(vysledky);
// vysledky = testFillArray(vysledky, '');
// rozpisZapasuDoKonzole();
// vypisZapasuDoTabulky();

// kdoHrajeCisloZapasu(40);






// consoleTest();


// console.log(Math.pocetTymu.apply(null, powers));
// console.log(Math.pocetTymu(...powers));
// console.log(powers[2]);
