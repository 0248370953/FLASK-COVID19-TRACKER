let countriesElem = document.getElementById("countries"),

    // countriesElem.addEventListener("click", function () {alert("Drop down clicked")
    // });

    totalElem = document.getElementById("total"),
    activeElem = document.getElementById("active"),
    recoveredElem = document.getElementById("recovered"),
    deathsElem = document.getElementById("deaths"),
    allcountriesElem = document.getElementById("all-countries");
let listOfCountries;

window.onload = function () {
    fetchCovidData("Ghana", false);
    populateTableData(listOfCountries);
    populateCountryList(listOfCountries);
};
countriesElem.addEventListener("change", function () 
{
     fetchCovidData(this.value, true);
});

function fetchCovidData(country, async) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            listOfCountries = JSON.parse(xhr.response);

            let ctry = listOfCountries.Countries.filter((c) => c.Country === country);

            displayCountryData(ctry);
          
        }

    };
    xhr.open("GET", "https://api.covid19api.com/summary", async);
    xhr.send();

}   

function populateTableData(list) {
    let count = 1;
    allcountriesElem.innerHTML = list.Countries.map(
        (c) => 

         `
             <tr>
             <td> ${count++}</td>
             <td> ${c.Country}</td>
             <td> ${c.TotalRecovered}</td>
             <td> ${c.TotalConfirmed}</td>
             <td> ${c.NewConfirmed}</td>
             <td> ${c.TotalDeaths}</td>

            <tr/>
            `
            ).join("");
}

function displayCountryData(country) {

    countriesElem.innerHTML = `<strong>${country[ 0 ].country} 's Stats</strong>`;

    totalElem.innerText = country[0].TotalConfirmed;
    recoveredElem.innerText = country[0].TotalRecovered;
    activeElem.innerText = country[0].NewConfirmed;
    deathsElem.innerText = country[0].TotalDeaths;

}

function populateCountryList(data) {
    let list = data.Countries.map((c) => c.Country);
    countriesElem.innerHTML = list.map(
        (c) => `<option value="${c}">${c}</option>`
    );
 }

// totalcasesElem.innerText = "Total Changed";
// recoveredcasesElem.innerText = "1b";

// const covid = {
//   Global: {
//     NewConfirmed: 257911,
//     TotalConfirmed: 18539385,
//     NewDeaths: 6956,
//     TotalDeaths: 700634,
//     NewRecovered: 221735,
//     TotalRecovered: 11134084,
//   },
//   Countries: [
//     {
//       Country: "Afghanistan",
//       CountryCode: "AF",
//       Slug: "afghanistan",
//       NewConfirmed: 35,
//       TotalConfirmed: 36782,
//       NewDeaths: 0,
//       TotalDeaths: 1288,
//       NewRecovered: 0,
//       TotalRecovered: 25669,
//       Date: "2020-08-05T09:44:54Z",
//       Premium: {},
//     },
//     {
//       Country: "Albania",
//       CountryCode: "AL",
//       Slug: "albania",
//       NewConfirmed: 130,
//       TotalConfirmed: 5750,
//       NewDeaths: 4,
//       TotalDeaths: 176,
//       NewRecovered: 0,
//       TotalRecovered: 3031,
//       Date: "2020-08-05T09:44:54Z",
//       Premium: {},
//     },
//     {
//       Country: "Algeria",
//       CountryCode: "DZ",
//       Slug: "algeria",
//       NewConfirmed: 532,
//       TotalConfirmed: 32504,
//       NewDeaths: 9,
//       TotalDeaths: 1248,
//       NewRecovered: 474,
//       TotalRecovered: 22375,
//       Date: "2020-08-05T09:44:54Z",
//       Premium: {},
//     },
//   ],
// };


// // alert(covid.Countries[2].Country);
// // alert(covid.Countries[1].TotalDeaths);

