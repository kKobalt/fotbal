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
function getMaxPower() { console.log(Math.max(...powers)); }

function kurz(_team1, _team2) {
  return parseFloat(_team1 / _team2).toFixed(2);
}


function drawTab(arr) {
  var tabString = "<tr><th>#</th>";

  // 1. řádek - záhlaví <th>
  for (let r = 0; r < tymy.length; r++) {
    tabString += `<th>${getTeamAbbr(tymy[r])}</th>`;
  }
  tabString += "</tr>";

  // zbytek tab
  for (let row = 1; row <= tymy.length; row++) {
    tabString += "<tr>";
    for (let col = 0; col <= tymy.length; col++) {
      if (row != col) {
        switch (col) {
          case 0: tabString += `<td class="th">${getTeamAbbr(tymy[row - 1])}</td>`; break;
          // [row/col - 1] protože tabulka (resp. indexy pole) začínají až od 2.ř./sl.
          case tymy.length: tabString += `<td>${arr[row - 1][col - 1]} </td></tr>`; break;
          default: tabString += `<td>${arr[row - 1][col - 1]} </td>`; break;
        }
      }
      else tabString += `<td class="th"> - </td>`;

      // tabString += "</tr>";
    }
  }


  // tabString += "<th>";



  // tabString += "<td>aaa</td>";

  // vykresli do elementu
  document.getElementById('tab').innerHTML = tabString;
}

function battle(_team1, _team2) {

}

// jeden hraje se všemi ostatními najednou, bez střídání, bez kol, nehraje se na domácí/hosté, kurzy jsou podílem týmových power 
function consoleTest() {
  for (let t = 0; t < tymy.length; t++) {
    for (let z = t; z < tymy.length; z++) {
      if (t != z) {
        // console.log(`${t}-${z} \t ${getTeamAbbr(tymy[t])}-${getTeamAbbr(tymy[z])} \t ${kurz(tymy[t].power, tymy[z].power)} \t ${battle(tymy[t], tymy[z])}`);

      }
    }
  }
}

function testFillArray(arrayName, content) {
  // console.log(arr);
  arrayName = arrayName.map((subarray) => subarray.map((item) => content));
  return arrayName;
}

function faktorialPlus(num) {
  if (num < 0) return -1;
  else if (num == 0) return 0;
  else return num + faktorialPlus(num - 1);
}
function faktorial(num) {
  if (num < 0) return -1;
  else if (num == 0) return 1;
  else return (num * faktorial(num - 1));
}

function vypisZapasy() {
  let max = pocet;
  let d, h;

  // 15 kol - část I.
  // for (let k = 1; k < max; k++) {

  //   // každé 8 zápasů
  //   for (let z = 1; z <= max / 2; z++) {
  //     // pokud je součet vyšší než 15, odečti 15; nejde přes modulo ?!
  //     d = (k - 1) + z > (max - 1) ? k + z - max : (k - 1) + z;
  //     h = (z == 1) ? max : (max + k) - z > (max - 1) ? k - z + 1 : (max + k) - z;

  //     console.log(`${k}\t${d}\t${h}\t${teamsAbbr[d - 1]}\t${teamsAbbr[h - 1]}`);
  //     // console.log(`${k}\t${d}\t`);
  //     // console.log(`${k}\t${h}\t`);

  //   }

  // }

  // // 15 kol - část II.
  // for (let k = 1; k < max; k++) {

  //   // každé 8 zápasů
  //   for (let z = 1; z <= max / 2; z++) {
  //     // pokud je součet vyšší než 15, odečti 15; nejde přes modulo ?!
  //     h = (k - 1) + z > (max - 1) ? k + z - max : (k - 1) + z;
  //     d = (z == 1) ? max : (max + k) - z > (max - 1) ? k - z + 1 : (max + k) - z;

  //     // console.log(`${k}\t${d}\t${h}\t${teamsAbbr[d - 1]}\t${teamsAbbr[h - 1]}`);
  //     console.log(`${k}\t${d}\t${h}`);
  //     // console.log(`${k}\t${d}\t`);
  //     // console.log(`${k}\t${h}\t`);

  //   }

  // }

  // dvě části po 15(k)olech; 
  // střídání rozepsaných zápasů z podzimu a jara (z1, z17, z3, z19, ...) 
  // po 15kolech se střídají sudé zápasy (z16, z2, z18, z4, ...)
  // aby se daný tým prostřídal venku a doma, jinak hraje většinou 1. část
  // doma (nebo venku) a jiný tým naopak
  // např. tým1 má podzimní rozpis Doma/Venku: D V V V V V V V (7×) a D D D D D D D (7×) za sebou
  for (let k = 1; k <= (max - 1) * 2; k++) {

    // každé (k)olo má 8 (z)ápasů
    for (let z = 1; z <= max / 2; z++) {

      // pokud je součet vyšší než 15, odečti 15; nejde přes modulo ?!
      if (k <= max - 1) {
        d = (k - 1) + z > (max - 1) ? k + z - max : (k - 1) + z;
        h = (z == 1) ? max : (max + k) - z > (max - 1) ? k - z + 1 : (max + k) - z;
      }
      else {
        d = (z == 1) ? max : (k + 1) - z > (max - 1) ? k - max - z + 2 : (k + 1) - z;
        h = (k - max) + z > (max - 1) ? k + 1 + z - (2 * max) : (k - max) + z;
      }


      // console.log(`${k}\t${d}\t${h}\t${teamsAbbr[d - 1]}\t${teamsAbbr[h - 1]}`);
      if (k > max - 1) console.log(`${k}\t${d}\t${h}`);
      // console.log(`${k}\t${d}\t`);
      // console.log(`${k}\t${h}\t`);

    }

  }


  // console.log(max);
}


// APP -----------------------------------------------

// getTeams();
// getPowers();
// getMaxPower();

// console.log(faktorialPlus(5));
// console.log(faktorial(5));

drawTab(vysledky);
// console.log(vysledky);
// vysledky = testFillArray(vysledky, '');
vypisZapasy();

// po vteřině znovu vykresli
// setTimeout(() => {
//   drawTab(vysledky);
//   console.log(testFillArray(vysledky, ''));
// }, 1000);





// consoleTest();


// console.log(Math.max.apply(null, powers));
// console.log(Math.max(...powers));
// console.log(powers[2]);
