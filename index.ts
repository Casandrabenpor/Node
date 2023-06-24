// Include fs module
import fs from 'fs';

type Country = {
    name: string;
    population: number;
    area: number;
    density: number;
}

function extractCountryName(countrySplit: string[]) {
    let i = 1;
    let countryName = countrySplit[0];
    while (isNaN(+countrySplit[i][0])) {
        countryName += " " + countrySplit[i];
        i++;
    }

    return countryName;
}
function isValid(countrySplit: string[]) {
    let counter = 0;
    let i = countrySplit.length - 1;
    while (!isNaN(+countrySplit[i][0])) {
        counter++;
        i--;
    }
    if (counter === 2) {
        return true;
    } else {
        return false;
    }
}
// Para leer countries.txt
const data = fs.readFileSync('./countries.txt',
    { encoding: 'utf8', flag: 'r' });
//Hacemos un array vacio para meter el calculo de la densidad
let countries: Country[] = [];

data.split(/\r?\n/).forEach((line, idx) => {
    if (idx != 0 && line != "") {
        let country = line.split(' ');
        if (isValid(country)) {
            let name = extractCountryName(country);
            let population = parseInt(country[country.length - 2].replaceAll(",", ""));
            let area = parseInt(country[country.length - 1].replaceAll(',', ''));
            let density = population / area;
            countries.push({
                name: name,
                population: population,
                area: area,
                density: density
            });
        }
    }
});
let countriesOrder = countries.sort((a, b) => b.density - a.density);
// console.log(countriesOrder[0].density);
// console.log(countriesOrder[0].name);
// console.log(countriesOrder[5].density);
// console.log(countriesOrder[5].name);

fs.writeFileSync(
    "countries.csv",
    "country,population,area,density\r\n", {
    encoding: "utf8",
    flag: "w",
})

for (let i = 0; i < countriesOrder.length; i++) {
    fs.writeFileSync("countries.csv",
        `${countriesOrder[i].name},${countriesOrder[i].population},${countriesOrder[i].area},${countriesOrder[i].density}\r\n`,
        {
            encoding: "utf8",
            flag: "a+"
        });
}
