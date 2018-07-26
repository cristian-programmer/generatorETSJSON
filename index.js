
let fs = require('fs');



function readFileCsv() {
    return fs.readFileSync('./ets.esf');
}

function parserToString(data) {
    return data.toString();
}

function generateAnArray(data) {
    let contentObject = []
    let object = {}
    let reply = [];
    x = data.split('\r')
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
generateAnArray(data);