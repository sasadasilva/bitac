let personsDiv = document.querySelector(".persons");
document.body.append(personsDiv);

const treinStations = [
    ["Delft", 8400170],
    ["Amsterdam", 8400058],
    ["Alkmaar", 8400050],
    ["Deventer", 8400173],
    ["Venlo", 8400644],
    ["Utrecht", 8400621],
];

const myheaders = {
    "Ocp-Apim-Subscription-Key": "3cee46d2bcd44b0184778f84056c2fcb",
    "Content-Type": "application/json",
};


function addFlag(countries, iteration) {
    const countrylist = countries;
    let homecountry = document.getElementById(`country${iteration}`).innerText;

    let countryIndex = countrylist.findIndex((countryname) => countryname.name.common == homecountry);
    let flagImg = countrylist[countryIndex].flags.svg;

    let flag = document.createElement("img");
    flag.src = flagImg;
    let flagdiv = document.getElementById("countryflag" + iteration);

    flagdiv.appendChild(flag);
}

function addUser(user, iteration) {
    let userInfo = user["results"][0];
    let userDiv = document.createElement("div");
    userDiv.id = iteration;
    let nametitle = document.createElement("h3");
    nametitle.innerText = userInfo["name"]["first"] + " " + userInfo["name"]["last"];
    userDiv.appendChild(nametitle);
    let thumbnail = document.createElement("img");
    thumbnail.src = userInfo["picture"]["large"];
    userDiv.appendChild(thumbnail);
    let countrydiv = document.createElement("div");
    countrydiv.className = `flagdiv`;
    countrydiv.id = `countryflag${iteration}`;
    userDiv.appendChild(countrydiv);
    let email = document.createElement("p");
    email.innerText = userInfo["email"];
    userDiv.appendChild(email);
    let country = document.createElement("p");
    country.id = `country${iteration}`;
    country.innerText = userInfo["location"]["country"];
    userDiv.appendChild(country);
    personsDiv.appendChild(userDiv);
    let bezoek = document.createElement("p");
    bezoek.id = `bezoek${iteration}`;
    bezoek.innerText = `Op bezoek in ${treinStations[iteration][0]}`;
    userDiv.appendChild(bezoek);
    let eind = document.createElement("p");
    eind.id = `eind${iteration}`;
    userDiv.appendChild(eind);
}

async function fetchUsers(iteration) {
    const requestUrl = "https://randomuser.me/api/";

    fetch(requestUrl).then(async (response) => {
        let x = await response.json();
        addUser(x, iteration);
    });
}

async function fetchFlags(iteration) {
    const requestUrl = "https://restcountries.com/v3.1/all";

    fetch(requestUrl).then(async (response) => {
        let x = await response.json();
        addFlag(x, iteration);
    });
}

function addDest(iteration, direction) {
    const eindp = document.getElementById(`eind${iteration}`);
    eindp.innerText = `Eindbestemming: ${direction}`;
}

async function fetchDest(iteration) {
    const departure = treinStations[iteration][1];
    const requestUrl = `https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/departures?uicCode=${departure}`;

    fetch(requestUrl, {
        method: 'GET',
        headers: myheaders,
    }).then(async (response) => {
        let x = await response.json();
        let direction = x.payload.departures[0].direction;
        setTimeout(addDest(iteration, direction), 10);
    });
}

for (let i = 0; i < 6; i++) {
    fetchUsers(i);
}

setTimeout(() => {
    for (let i = 0; i < 6; i++) {
        fetchFlags(i);
        fetchDest(i);
    }
}, 1000);
