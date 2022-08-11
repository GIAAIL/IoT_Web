const localURL = "http://localhost:3000/devices";
const herokuURL = "https://iotapinodejs.herokuapp.com/devices";
const fireBaseURL = "https://us-central1-iot-cloud-functions-a3398.cloudfunctions.net/post/"

// const dataFetch = async () => {
//   const dataFetch = await fetch(initialURL);
//   let parsedData = await dataFetch.json();
//   console.log(parsedData);
// };

// let devicesBox = document.getElementById("devicesBox");

// let iotName = document.querySelector(".iotName");
// let humidity = document.querySelector(".humidity");
// let temp = document.querySelector(".temp");
// let weather = document.querySelector(".weather");

const btn = document.querySelector("#getDataBtn");
btn.addEventListener("click", getData());

async function getData() {
  const dataFetch = await fetch(fireBaseURL);
  let parsedDataObj = await dataFetch.json();
  let parsedData = await parsedDataObj.features;
  console.log(parsedData);
  let dataCount = parsedData.length;

  for (let i = 0; i < dataCount; i++) {
    let id = parsedData[i].id;
    let deviceName = parsedData[i].deviceName;
    let geometry = parsedData[i].geometry.coordinates;
    let temp = parsedData[i].temp;
    let event = parsedData[i].event;
    let str = `DeviceName:  ${deviceName}  Temperature  ${temp}  Event  ${event}`;
    let randomNum = Math.random();

    let row = document.getElementById("deviceRow");

    const col = document.createElement("div");
    col.classList.add("col", "mb-2");

    const card = document.createElement("div");
    card.classList.add("card", "text-white", "bg-dark");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const img = document.createElement("img");
    img.src = `https://picsum.photos/200/200?random=${randomNum}`;
    img.classList.add("card-img-top", "w-100", "my-2");

    let h5 = document.createElement("h5");
    h5.classList.add("card-title", "text-info", "fw-bold", "my-1");
    let h5Content = document.createTextNode(`${deviceName}`);
    h5.appendChild(h5Content);

    let p0 = document.createElement("p");
    p0.classList.add("card-text", "fw-light", "my-2");
    let p0Content = document.createTextNode(`ID:  ${id}`);
    p0.appendChild(p0Content);

    let p1 = document.createElement("p");
    p1.classList.add("card-text", "fw-light", "my-2");
    console.log(geometry);
    let p1Content = document.createTextNode(`Geometry:  ${geometry}`);
    p1.appendChild(p1Content);

    let p2 = document.createElement("p");
    p2.classList.add("card-text", "fw-light", "my-2");
    let p2Content = document.createTextNode(`Temperature:  ${temp}`);
    p2.appendChild(p2Content);

    let p3 = document.createElement("p");
    p3.classList.add("card-text", "fw-light", "my-2");
    let p3Content = document.createTextNode(`Event:  ${event}`);
    p3.appendChild(p3Content);

    let deleteBtn = document.createElement("a");
    deleteBtn.classList.add(
      "btn",
      "btn-outline-danger",
      "mt-2",
      "deleteDevice"
    );
    let aContent = document.createTextNode(`Delete device`);
    deleteBtn.appendChild(aContent);

    cardBody.appendChild(img);
    cardBody.appendChild(h5);
    cardBody.appendChild(p0);
    cardBody.appendChild(p1);
    cardBody.appendChild(p2);
    cardBody.appendChild(p3);
    cardBody.appendChild(deleteBtn);
    card.appendChild(cardBody);
    col.appendChild(card);
    row.appendChild(col);
  }

  console.log("Loading Data Sucessfully!!!")
  getDeleteBtns();
}

function getDeleteBtns() {
  const delBtns = document.getElementsByClassName("deleteDevice");
  for (b of delBtns) {
    b.addEventListener("click", async function (e) {
      let delID = e.target.parentElement.children[2].innerText;
      console.log(delID)
      let numID = parseInt(delID.substr(4, 5));
      console.log(numID);

      let url = `https://us-central1-iot-cloud-functions-a3398.cloudfunctions.net/post/${numID}`;

      await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify()
      });

      location.reload();
    });
  }
}
