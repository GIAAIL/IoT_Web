const initialURL = "http://localhost:3000/devices";
const sercheURL = "";

// const dataFetch = async () => {
//   const dataFetch = await fetch(initialURL);
//   let parsedData = await dataFetch.json();
//   console.log(parsedData);
// };
let devicesBox = document.getElementById("devicesBox");

let iotName = document.querySelector(".iotName");
let humidity = document.querySelector(".humidity");
let temp = document.querySelector(".temp");
let weather = document.querySelector(".weather");

const btn = document.querySelector("#getDataBtn");
btn.addEventListener("click", async () => {
  const dataFetch = await fetch(initialURL);
  let parsedData = await dataFetch.json();
  console.log(parsedData);
  let dataCount = parsedData.length;

  //   for (let d in parsedData) {
  //     console.log(parsedData[d].name);
  //   }

  //   iotName.textContent = parsedData[0].name;
  //   humidity.textContent = parsedData[0].Humidity;
  //   temp.textContent = parsedData[0].Temperature;
  //   weather.textContent = parsedData[0].Weather;

  for (let i = 0; i < dataCount; i++) {
    let deviceName = parsedData[i].name;
    let humidity = parsedData[i].Humidity;
    let temp = parsedData[i].Temperature;
    let weather = parsedData[i].Weather;
    let str = `DeviceName:  ${deviceName}  Humidiy  ${humidity}  Temperature  ${temp}  Weather  ${weather}`;
    let randomNum = Math.random();

    let row = document.getElementById("deviceRow");

    const col = document.createElement("div");
    col.classList.add("col", "mb-2");

    const card = document.createElement("div");
    card.classList.add("card");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const img = document.createElement("img");
    img.src = `https://picsum.photos/300/300?random=${randomNum}`;
    img.classList.add("card-img-top", "w-100");

    let h4 = document.createElement("h5");
    h4.classList.add("card-title", "my-2");
    let h4Content = document.createTextNode(`DeviceName:  ${deviceName}`);
    h4.appendChild(h4Content);

    let p1 = document.createElement("p");
    p1.classList.add("card-text");
    let p1Content = document.createTextNode(`Humidiy:  ${humidity}`);
    p1.appendChild(p1Content);

    let p2 = document.createElement("p");
    p2.classList.add("card-text");
    let p2Content = document.createTextNode(`Temperature:  ${temp}`);
    p2.appendChild(p2Content);

    let p3 = document.createElement("p");
    p3.classList.add("card-text");
    let p3Content = document.createTextNode(`Weather:  ${weather}`);
    p3.appendChild(p3Content);

    cardBody.appendChild(img);
    cardBody.appendChild(h4);
    cardBody.appendChild(p1);
    cardBody.appendChild(p2);
    cardBody.appendChild(p3);
    card.appendChild(cardBody);
    col.appendChild(card);
    row.appendChild(col);
  }
});
