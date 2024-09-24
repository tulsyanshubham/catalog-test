const fs = require('fs');

function decodeYValue(value, base) {
    return parseInt(value, base);
}

function lagrangeInterpolation(points) {
    let k = points.length;
    let constantTerm = 0;

    for (let i = 0; i < k; i++) {
        let xi = points[i].x;
        let yi = points[i].y;
        let li = 1;

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let xj = points[j].x;
                li *= -xj / (xi - xj);
            }
        }

        constantTerm += yi * li;
    }

    return constantTerm;
}

function findConstantTerm(jsonData) {
    const points = [];
    const n = jsonData.keys.n;
    const k = jsonData.keys.k;

    for (let key in jsonData) {
        if (key !== "keys") {
            let x = parseInt(key);
            let base = parseInt(jsonData[key].base);
            let value = jsonData[key].value;
            let y = decodeYValue(value, base);
            points.push({ x, y });
        }
    }

    points.sort((a, b) => a.x - b.x);

    let constantTerm = lagrangeInterpolation(points.slice(0, k));
    return constantTerm;
}

// Read the input JSON file
const run = (file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const jsonData = JSON.parse(data);
        const constantTerm = findConstantTerm(jsonData);
        console.log("The constant term (c) is:", constantTerm);
    });
}

run('testcase1.json')
run('testcase2.json')