console.log("Javascript Loaded");

let spendData = [];

const getData = () => {
  fetch("/data.json")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // in here we will populate the chart
    });
};

getData();
