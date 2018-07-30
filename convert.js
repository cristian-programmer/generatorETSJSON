var CSV = require('fs').readFileSync('ARA.xml.csv');
CSV = (CSV.toString()).split('\n');
var NewJSON = {};
var lvl1;
var lvl2;
var lvl3;
var clvl3 = 0;

for (let i = 0; i <= CSV.length; i++) {
	if (CSV[i] && CSV[i].split(' ').join('') !== '') {
		if (CSV[i][0] == '"') {
			lvl1 = CSV[i].split('"')[1];
			if (!NewJSON.hasOwnProperty(lvl1)) {
				NewJSON[lvl1] = {};
			}
		}
		else if (CSV[i].split(';')[0] == ' ' && CSV[i].split(';')[1] !== ' ') {
			lvl2 = CSV[i].split(';')[1].split('"')[1];
			if (!NewJSON[lvl1].hasOwnProperty(lvl2)) {
				NewJSON[lvl1][lvl2] = {};
			}
		}
		else if (CSV[i].split(';')[0] == ' ' && CSV[i].split(';')[1] == ' ') {
			lvl = CSV[i].split(';')
			lvl3 = lvl[2].split('"')[1];
			DG = lvl[3].split('"')[1] + '/' + lvl[4].split('"')[1] + '/' + lvl[5].split('"')[1];
			DPT = '';

			if (lvl[9].split('"')[1] !== '') {
				DPTG = lvl[9].split('"')[1].split('-')[1];

				if (lvl[9].split('"')[1].split('-').length > 2) {
					DPTS = lvl[9].split('"')[1].split('-')[2];

					// console.log(lvl[9].split('"').length);
					// console.log(lvl[9].split('"')[1]);
					// console.log(DPTG, DPTS);

					if (DPTS.length == 1) {
						DPT = DPTG + '.00' + Number(DPTS);
					} else if (DPTS.length == 2) {
						DPT = DPTG + '.0' + Number(DPTS);
					} else if (DPTS.length >= 3) {
						DPT = DPTG + '.' + Number(DPTS);
					}
				} else {
					DPT = DPTG
				}
			}
			if (DPT !== '') {
				if (NewJSON[lvl1][lvl2].hasOwnProperty(lvl3)) {
					clvl3 += 1;
					NewJSON[lvl1][lvl2][lvl3 + `_${clvl3}`] = { DG: DG, DPT: DPT };
				}
				NewJSON[lvl1][lvl2][lvl3] = { DG: DG, DPT: DPT };
			}
		}
	}
}
// console.log(NewJSON);

require('fs').writeFileSync('JSON.json', JSON.stringify(NewJSON));