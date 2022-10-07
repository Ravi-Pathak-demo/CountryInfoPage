'use strict';

////////////////////////////////MAIN CODE

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// get location
const getPosition = () => {
  return new Promise(
    (resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // )
  );
};

// // adding data in page
const renderCountryData = function (data, className = '') {
  const html = `
              <article class="country ${className}">
                      <img class="country__img" src="${data.flag}" />
                      <div class="country__data">
                        <h3 class="country__name">${data.name}</h3>
                        <h4 class="country__region">${data.region}</h4>
                        <p class="country__row"><span>👫</span>${(
                          data.population / 10000000
                        ).toFixed(1)} M people</p>
                        <p class="country__row"><span>🗣️</span>${
                          data.languages[0].name
                        }</p>
                        <p class="country__row"><span>💰</span>${
                          data.currencies[0].name
                        }</p>
                      </div>
                    </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  // adding new html
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const whereAmI = async function () {
  try {
    const loc = await getPosition();
    const { latitude: lat, longitude: lng } = loc.coords;
    // USE AUTH CODE IN PLACE OF 000000
    const geo = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=000000`
    );
    const dataGeo = await geo.json();
    console.log(dataGeo);
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );
    const data = await res.json();

    let number = 0;

    if (data[0].name === 'British Indian Ocean Territory') number = 1;

    renderCountryData(data[number]);
  } catch (err) {
    console.error('something went wrong');
    renderError(`something went wrong ${err.message}`);
  }
};
whereAmI();

// OLD METHOD
///////////////////////////////////////
// making new xml request

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   // opened new get request with given url
//   request.send();
//   // sending the request data ( asking server/ endpoint )

//   // GETTING DATA
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     //   data = data[0];
//     console.log(data);

//     renderCountryData(data);
//   });
// };

// getCountryData('Bharat');
// getCountryData('usa');

// // get neighbour countries
// const getCountryAndNeighborData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   // opened new get request with given url
//   request.send();
//   // sending the request data ( asking server/ endpoint )

//   // GETTING DATA
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     //   data = data[0];
//     console.log(data);

//     renderCountryData(data);

//     const neighbour = data.borders[1];

//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();

//     // GETTING NEIGHBOR DATA
//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       //   data = data[0];
//       console.log(data2);

//       renderCountryData(data2, 'neighbour');
//     });
//   });
// };

// getCountryAndNeighborData('Bharat');

// NEW METHOD USING PROMISE
////////////////////////////////

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response =>
//       response.json().then(data => {
//         let number = 0;
//         if (country === 'india') number = 1;

//         console.log(data[number]);
//         renderCountryData(data[number]);
//         const neighbour = data[number].borders[0];

//         if (!neighbour) return;

//         return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//       })
//     )
//     .then(response => response.json())
//     .then(data => renderCountryData(data, 'neighbour'))
//     .catch(err => {
//       console.error(`Something went wrong ${err}`);
//       renderError(
//         `Something went wrong, could'nt fetch data 🧯🧯, ${err.message} Try Again`
//       );
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('india');
// });

// Coding Challenge #1

// const whereAmI = function (lat, lng) {
//   fetch(
//     `https://geocode.xyz/${lat},${lng}?geoit=json&auth=645553942966957405998x38300`
//   )
//     .then(response => response.json())
//     .then(data => {
//       console.log(`you are in ${data.city}, ${data.country}`);
//       console.log(data);
//     })
//     .catch(err => {
//         console.log(err);
//     })
// };

// whereAmI(52.508, 13.381);

// coding challenge #2

// const imageContainer = document.querySelector('.images');

// const createImage = function (img) {
//   return new Promise(function (resolve, reject) {
//     let Img = document.createElement('img');
//     Img.src = img;
//     Img.addEventListener('load', function () {
//       imageContainer.append(Img);
//       resolve(Img);
//     });

//     Img.addEventListener('error', function () {
//       reject('Error');
//     });
//   });
// };

// let currImg;
// createImage('img/img-1.jpg')
//   .then(img => {
//     currImg = img;
//     console.log('Img 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currImg = img;
//     console.log('Img 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currImg.style.display = 'none';
//     return createImage('img/img-3.jpg');
//   })
//   .then(() => {
//     console.log('Img 3 loaded');
//   })
//   .catch(err => console.error(err));

// // producing promise
// const lottery = new Promise(function (resolve, reject) {
//   console.log('lottery drawing has started');
//   setTimeout(function () {
//     if (Math.random() * 11 > 5) resolve('you won lottery 💸');
//     else reject(new Error('you lost all money ＞﹏＜'));
//   }, 2000);
// });

// lottery.then(result => console.log(result));

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// // with promise
// wait(2)
//   .then(() => {
//     console.log('waited for 1 sec');
//     return wait(2);
//   })
//   .then(() => {
//     console.log('waited for 2 sec');
//     return wait(2);
//   })
//   .then(() => {
//     console.log('waited for 3 sec');
//     return wait(2);
//   })
//   .then(() => console.log('waited for 4 sec'));

// //   with callback hell
// setTimeout(() => {
//   console.log('waited for 1 sec');
//   setTimeout(() => {
//     console.log('waited for 2 sec');
//     setTimeout(() => {
//       console.log('waited for 3 sec');
//       setTimeout(() => {
//         console.log('waited for 4 sec');
//       }, 2000);
//     }, 2000);
//   }, 2000);
// }, 2000);

/////////////////////////////////////////////////////////

// const getJSON = function (url, errorMsg = 'Something Went Wrong') {
//   // fetch url
//   return fetch(url).then(response => {
//     // if response is false
//     if (!response.ok) {
//       throw new Error(`${errorMsg} (${response.status})`);
//     }

//     // pass the response json promise to next then  method
//     return response.json();
//   });
// };

// const getCountryData = function (country) {
//   // method to fetch and return response
//   getJSON(`https://restcountries.com/v2/name/${country}`, 'Country Not Found')
//     .then(data => {
//       // if not india, use 0 based index
//       let number = 0;
//       if (country === 'india') number = 1;

//       console.log(data[number]);
//       renderCountryData(data[number]);
//       const neighbour = data[number].borders[0];

//       //   if no neighbour found ( guard clause )
//       if (!neighbour) throw new Error(`No neighbour found !`);

//       return getJSON(
//         `https://restcountries.com/v2/alpha/${neighbour}`,
//         'Country Not Found'
//       );
//     })
//     .then(data => renderCountryData(data, 'neighbour'))
//     .catch(err => {
//       // catch error
//       console.error(`Something went wrong ${err}`);

//       //   error message
//       renderError(
//         `Something went wrong, could'nt fetch data 🧯🧯, ${err.message} Try Again`
//       );
//     })
//     .finally(() => {
//       // execute in all conditions
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('india');
// });

// // get location
// const getPosition = () => {
//   return new Promise(
//     (resolve, reject) =>
//       navigator.geolocation.getCurrentPosition(resolve, reject)
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // )
//   );
// };

// get address
// const whereAmI = function () {
//   let number = 0;

//   getPosition()
//     .then(position => {
//       const { latitude: lat, longitude: lng } = position.coords;
//       return fetch(
//         `https://geocode.xyz/${lat},${lng}?geoit=json&auth=645553942966957405998x38300`
//       );
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       if (data.country === 'India') {
//         return fetch(`https://restcountries.com/v2/name/${'Bharat'}`);
//       } else {
//         return fetch(`https://restcountries.com/v2/name/${data.country}`);
//       }
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);

//       return res.json();
//     })
//     .then(data => {
//       if (data.country === 'India') number = 1;
//       renderCountryData(data[0]);
//     })
//     .catch(err => {
//       console.error(`${err.message} {{{(>_<)}}}`);
//     });
// };

// stater
// btn.addEventListener('click', whereAmI);

// // async function
// // adding async to normal function, make function async
// // await makes the function wait in background like promise

// get 3 countries
// Promise.all(), will cause to run all promises (array) at same time

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v2/name/${c1}`),
//       getJSON(`https://restcountries.com/v2/name/${c2}`),
//       getJSON(`https://restcountries.com/v2/name/${c3}`),
//     ]);

//     // console.log([data1.capital, data2.capital, data3.capital]);
//     // console.log(data);
//     console.log(data.map(d => d[0].capital));

//     // if any promise rejects all will reject
//   } catch (err) {
//     console.log(err);
//   }
// };
// get3Countries('India', 'Bharat', 'usa');

// promise other methods
// promise race
// which ever promise comes first, their data will be shown not others
// even if a promise fails it will show that it is first to come

// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v2/name/Bharat`),
//     getJSON(`https://restcountries.com/v2/name/usa`),
//     getJSON(`https://restcountries.com/v2/name/spain`),
//   ]);

//   console.log(res[0]);
// })();

// const timeout = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('too long'));
//     }, sec * 1000);
//   });
// };

// Promise.race([getJSON(`https://restcountries.com/v2/name/Bharat`), timeout(1)])
//   .then(res => console.log(res[0]))
//   .catch(err => console.log(err));

// // promise.allSettled()
// // return an array of all promises , even if any one has
// // error it will still go on, for all to complete
// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Another success'),
// ]).then(res => console.log(res));
// // VS

// // all will short circuit as error occur
// Promise.all([
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Another success'),
// ]).then(res => console.log(res));

// // Promise.any()
// // ignore all rejected promise
// // gives the first full filled promise
// Promise.any([
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Another success'),
// ]).then(res => console.log(res));
