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
const pocet = tymy.length;

// var vysledky = Array(15).fill('b');
// var vysledk0 = [[5], [5]];
var vysledky = Array(pocet).fill(1).map(() => new Array(pocet).fill(0));
// vysledk0.fill('c');
// var vysledk0 = [Array(5), Array(5)].fill('c');
// var vysledky = [...Array(15)];
// var vysledky1 = [];
// Array.apply(9, vysledky);
// Array().fill('a').map((vysledky1, i) => i);
// vysledky.fill('a');
const teams = tymy.map(arr => arr.team);
const teamsAbbr = tymy.map(arr => arr.team.slice(0, 3));
const powers = tymy.map(arr => arr.power);

// FUNCTIONS -----------------------------------------------

function getTeams() { console.log(teams); }
function getTeamAbbr(_team) { return _team.team.slice(0, 3); }
function getPowers() { console.log(powers); }
function getpocetPower() { console.log(Math.pocet(...powers)); }

function kurz(_team1, _team2) {
  return parseFloat(_team1 / _team2).toFixed(2);
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

function drawTabCoords() {
  // !!! spustit jako první, inicializuje tabulku, nastaví všem <td> id, nutné k vkládání
  // vykreslení do buněk tabulky souřadnice XY
  let tabString = "<tr><th>d/h</th>";

  // 1. řádek - záhlaví <th>
  for (let r = 0; r < pocet; r++) {
    tabString += `<th>${getTeamAbbr(tymy[r])}</th>`;
  }
  tabString += "</tr>";

  // zbytek tab
  for (let row = 1; row <= pocet; row++) {
    tabString += "<tr>";
    for (let col = 0; col <= pocet; col++) {
      if (row != col) {

        let numRow = row.toString().length < 2 ? conv2Dec(row) : row;
        let numCol = col.toString().length < 2 ? conv2Dec(col) : col;

        // [row/col - 1] protože tabulka (resp. indexy pole) začínají až od 2.ř./sl.
        switch (col) {
          case 0: tabString += `<td class="th">${getTeamAbbr(tymy[row - 1])}</td>`; break;
          // do buněk vypíše polohu XY [xxyy] vč. nastavení id každé buňky id='idXXYY'
          case pocet: tabString += `<td id='td${numRow}${numCol}'>${numRow}${numCol}</td></tr>`; break;
          default: tabString += `<td id='td${numRow}${numCol}'>${numRow}${numCol}</td>`; break;

        }
      }
      else tabString += `<td class="th"> - </td>`;

      // tabString += "</tr>";
    }
  }

  document.getElementById('tab').innerHTML = tabString;
}

/* 
function drawTabMatchOrder() {
  // vykreslení do buněk tabulky
  let tabString = "<tr><th>d/h</th>";
  let iter = 0;

  // 1. řádek - záhlaví <th>
  for (let r = 0; r < pocet; r++) {
    tabString += `<th>${getTeamAbbr(tymy[r])}</th>`;
  }
  tabString += "</tr>";

  // zbytek tab
  for (let row = 1; row <= pocet; row++) {
    tabString += "<tr>";
    for (let col = 0; col <= pocet; col++) {
      iter++;
      if (row != col) {

        let numRow = row.toString().length < 2 ? conv2Dec(row) : row;
        let numCol = col.toString().length < 2 ? conv2Dec(col) : col;

        // [row/col - 1] protože tabulka (resp. indexy pole) začínají až od 2.ř./sl.
        switch (col) {
          case 0: tabString += `<td class="th">${getTeamAbbr(tymy[row - 1])}</td>`; break;
          case pocet: tabString += `<td id='td${numRow}${numCol}'>.</td></tr>`; break;
          default: tabString += `<td id='td${numRow}${numCol}'>-</td>`; break;

          // do buněk vypíše polohu XY [xxyy] vč. nastavení id každé buňky id='idXXYY'
          // case pocet: tabString += `<td id='td${numRow}${numCol}'>${numRow}${numCol}</td></tr>`; break;
          // default: tabString += `<td id='td${numRow}${numCol}'>${numRow}${numCol}</td>`; break;
          
        }

        // document.getElementById(`td${numRow}${numCol}`).innerHTML = `${iter}`;
      }
      else tabString += `<td class="th"> - </td>`;

      // tabString += "</tr>";
    }
  }

  document.getElementById('tab').innerHTML = tabString;
}
*/

// convert to 2 decimals
function conv2Dec(num2conv) {
  return `0${num2conv}`;
}

function battle(_team1, _team2) {

}

// function testFillArray(arrayName, content) {
//   // do všech buněk 2Dpole 'arrayName' vloží 'content' ;
//   arrayName = arrayName.map((subarray) => subarray.map((item) => content));
//   return arrayName;
// }

function generovaniZapasu(kolo, zapas, cisloZapasu) {
  // vygenerování (k)ol a (z)ápasů dle algoritmu, stále stejný výsledek
  // testováno na 16týmů; dvě části po 15(k)olech; 
  // střídání rozepsaných zápasů z podzimu a jara (z1, z17, z3, z19, ...) 
  // po 15kolech se střídají sudé zápasy (z16, z2, z18, z4, ...)
  // aby se daný tým prostřídal venku a doma, jinak hraje většinou 1. část
  // (d)oma nebo venku jako (h)osté a jiný tým naopak
  // např. tým1 má podzimní rozpis Doma/Venku: D V V V V V V V (7×) a D D D D D D D (7×) za sebou
  let d, h;
  let iter = 0;
  let numRow, numCol;

  for (let k = 1; k <= (pocet - 1) * 2; k++) {

    // každé (k)olo má 8 (z)ápasů
    for (let z = 1; z <= pocet / 2; z++) {
      iter++;
      // console.log(iter + " " + cisloZapasu);

      // pokud je součet vyšší než 15, odečti 15; nejde přes modulo !!
      if (k <= pocet - 1) {
        d = (k - 1) + z > (pocet - 1) ? k + z - pocet : (k - 1) + z;
        h = (z == 1) ? pocet : (pocet + k) - z > (pocet - 1) ? k - z + 1 : (pocet + k) - z;
      }
      else {
        d = (z == 1) ? pocet : (k + 1) - z > (pocet - 1) ? k - pocet - z + 2 : (k + 1) - z;
        h = (k - pocet) + z > (pocet - 1) ? k + 1 + z - (2 * pocet) : (k - pocet) + z;
      }

      if (iter == cisloZapasu) return `${teamsAbbr[d - 1]} vs ${teamsAbbr[h - 1]} (${d}-${h})`;
      if (k == kolo && z == zapas) return `${teamsAbbr[d - 1]} vs ${teamsAbbr[h - 1]} (${d}-${h})`;

      // document.getElementById('tab').innerHTML = "aaa";

      // if (row != col)
      // document.getElementById(`tab`).innerHTML = "aaa";
      // console.log(`${iter}\t${d}-${h}`);

      numRow = d.toString().length < 2 ? conv2Dec(d) : d;
      numCol = h.toString().length < 2 ? conv2Dec(h) : h;
      // console.log(numRow + "" + numCol);
      document.getElementById(`td${numRow}${numCol}`).innerHTML = `${iter}`;


      // if (iter == cisloZapasu) return `${teamsAbbr[d - 1]} vs ${teamsAbbr[h - 1]} (${d}-${h})`;
      // vypisZapasuDoTabulky(iter, d, h);


    }

  }
  if (!isNaN(kolo) && !isNaN(zapas)) return `Neplatné číslo kola (${kolo}) nebo zápasu (${zapas}))`;
  if (!isNaN(cisloZapasu)) return `Neplatné číslo zápasu (${cisloZapasu}). Zadej [1-${pocet * (pocet - 1)}]`;



}

function vypisZapasuDoKonzole() {
  // let max = pocet;
  let d, h;
  let iter = 0;

  // dvě části po 15(k)olech; 
  // střídání rozepsaných zápasů z podzimu a jara (z1, z17, z3, z19, ...) 
  // po 15kolech se střídají sudé zápasy (z16, z2, z18, z4, ...)
  // aby se daný tým prostřídal venku a doma, jinak hraje většinou 1. část
  // doma (nebo venku) a jiný tým naopak
  // např. tým1 má podzimní rozpis Doma/Venku: D V V V V V V V (7×) a D D D D D D D (7×) za sebou
  for (let k = 1; k <= (pocet - 1) * 2; k++) {

    // každé (k)olo má 8 (z)ápasů
    for (let z = 1; z <= pocet / 2; z++) {
      iter++;
      // pokud je součet vyšší než 15, odečti 15; nejde přes modulo ?!
      if (k <= pocet - 1) {
        d = (k - 1) + z > (pocet - 1) ? k + z - pocet : (k - 1) + z;
        h = (z == 1) ? pocet : (pocet + k) - z > (pocet - 1) ? k - z + 1 : (pocet + k) - z;
      }
      else {
        d = (z == 1) ? pocet : (k + 1) - z > (pocet - 1) ? k - pocet - z + 2 : (k + 1) - z;
        h = (k - pocet) + z > (pocet - 1) ? k + 1 + z - (2 * pocet) : (k - pocet) + z;
      }


      // console.log(`${k}\t${d}\t${h}\t${teamsAbbr[d - 1]}\t${teamsAbbr[h - 1]}`);
      // if (k > pocet - 1) console.log(`${iter}\t${k}\t${d}\t${h}`);
      // console.log(`${iter}\t${k}\t${d}\t${h}`);
      // if (iter <= (pocet * (pocet - 1))) vypisZapasuDoTabulky(iter, d, h);
      vypisZapasuDoTabulky(iter, d, h);

      // console.log(`${k}\t${d}\t`);
      // console.log(`${k}\t${h}\t`);

    }
  }
}

function vypisZapasuDoTabulky(i, tymDomacich, tymHostu) {
  // TODO


  // console.log(`${i}   ${tymDomacich}-${tymHostu}`);

}

function kdoHrajeKoloZapas(kolo, zapas) {
  // kdo hraje v daném kole a zápase; neošetřeno nečíslo 
  console.log(`${kolo}.kolo, ${zapas}.zápas: ${generovaniZapasu(kolo, zapas, undefined)}`);
}


function kdoHrajeCisloZapasu(cisloZapasu) {
  // kdo hraje v n-tém zápase? [1..pocet*(pocet-1)] -> 1-240 pro 16 týmů (16*15)
  console.log(`zápas číslo ${cisloZapasu}: ${generovaniZapasu(undefined, undefined, cisloZapasu)}`);
}


// APP -----------------------------------------------

// getTeams();
// getPowers();
// getpocetPower();


drawTabCoords();
// drawTabInto(vysledky, '-');
// generovaniZapasu();
drawTabMatchOrder();



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
// vypisZapasuDoKonzole();
// vypisZapasuDoTabulky();

// kdoHrajeKoloZapas(10, 2);
// kdoHrajeCisloZapasu(100);






// consoleTest();


// console.log(Math.pocet.apply(null, powers));
// console.log(Math.pocet(...powers));
// console.log(powers[2]);
