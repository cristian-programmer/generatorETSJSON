let fs = require('fs');



function readFileCsv() {
    return fs.readFileSync('./ARA.xml.csv');
}

function parserToString(data) {
    return data.toString();
}


function generateAnArrayForCsv(data) {
    let CSV = data.split('\n');
    let NewObject = {};
    let labelprimary;
    let labelsecondary;
    let labeltertiary;
    let dg;
    let count = 0;
    // console.log(CSV);
    for (let i = 0; i <= CSV.length; i++) {

        if (CSV[i] && CSV[i].split(' ').join('') != '') {
            // console.log(doblequote);
            if (CSV[i][0] == '"') {

                labelprimary = CSV[i].split('"')[1];
                // console.log(labelprimary);
                if (!NewObject.hasOwnProperty(labelprimary)) NewObject[labelprimary] = {};
            }
            else if (CSV[i].split(';')[0] == ' ' && CSV[i].split(';')[1] !== ' ') {
                labelsecondary = CSV[i].split(';')[1].split('"')[1];
                // console.log(CSV[i].split(';')[1].split('"')[1]);
                if (!NewObject[labelprimary].hasOwnProperty(labelsecondary))
                    NewObject[labelprimary][labelsecondary] = {};

            }
            else if (CSV[i].split(';')[0] == ' ' && CSV[i].split(';')[1] == ' ') {

                labeltertiary = CSV[i].split(';')[2].split('"')[1];

                dg = getDG(CSV[i]);
                dpt = getDPT(CSV[i]);
                if (dpt) {
                    if (NewObject[labelprimary][labelsecondary].hasOwnProperty(labeltertiary)) {
                        count++;
                        NewObject[labelprimary]
                        [labelsecondary]
                        [`${labeltertiary}_${count}`]
                            = { dg: dg, dpt: dpt };

                    }
                    NewObject[labelprimary]
                    [labelsecondary]
                    [labeltertiary]
                        = { dg: dg, dpt: dpt };
                }
            }

        }
    }
    fs.writeFileSync('test.json', JSON.stringify(NewObject));
}

function getDG(CSV) {

    let dg = CSV.split(';');
    return `${dg[3].split('"')[1]}/${dg[4].split('"')[1]}/${dg[5].split('"')[1]}`;

}



function getDPT(CSV) {

    let temp_dpt = CSV.split(';');
    let dpt = undefined;
    if (temp_dpt[9].split('"')[1] !== '') {
        gendpt = temp_dpt[9].split('"')[1].split('-')[1];

        if (temp_dpt[9].split('"')[1].split('-').length > 2) {
            espdt = temp_dpt[9].split('"')[1].split('-')[2];

            switch (espdt.length) {
                case 1: dpt = `${gendpt}.00${Number(espdt)}`; break;
                case 2: dpt = `${gendpt}.0${Number(espdt)}`; break;
                case (espdt.length >= 3): `${gendpt}.${Number(espdt)}`; break;
                default: console.log(`no se ha tenido en cuenta ese caso ${espdt}`);
            }
        } else {
            dpt = gendpt;
        }

    }
    return dpt;
}

function generateAnArrayForEsf(data) {
    let contentObject = []
    let object = {}
    let reply = [];
    x = data.split('\r');
    console.log(x);
    for (let i = 0; i < x.length; i++) {
        //    console.log(x[i]);
        reply.push(x[i]);
    }
    for (let j = 0; j < reply.length; j++) {
        try {
            object = {
                primary: reply[j].split('.')[0].split('\n')[1],
                secondary: reply[j].split('.')[1],
                tertiary: reply[j].split('\t')[1],
                dg: reply[j].split('.')[2].split('\t')[0],
                dpt_gen: reply[j].split('\t')[2].split('(')[1].split(')')[0]
            };
            contentObject.push(JSON.stringify(object));
        } catch (error) {
            console.log(error);
        }


    }

    console.log(contentObject);
}

file = readFileCsv();
data = parserToString(file);
generateAnArrayForCsv(data);