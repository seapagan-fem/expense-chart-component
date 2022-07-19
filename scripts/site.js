const weekday = new Date()
  .toLocaleDateString("default", { weekday: "short" })
  .toLowerCase();

const createBar = ({ day, amount }, maxSpend) => {
  bar = document.createDocumentFragment();

  barWrapper = document.createElement("div");
  barWrapper.className = "bar-wrapper";

  dayName = document.createElement("div");
  dayName.className = "bar-axis";
  dayName.innerText = day;

  spendBar = document.createElement("div");
  spendBar.className = "spend-bar";
  if (day === weekday) {
    // colour today differently
    spendBar.classList.add("today");
  }

  toolTip = document.createElement("div");
  toolTip.className = "tooltip";
  toolTip.innerText = `$${amount}`;

  // we take 150px as being the largest bar, then normalize the other values to
  // this.
  spendBar.style.height = `${Math.round(150 * (amount / maxSpend))}px`;

  barWrapper.append(toolTip);
  barWrapper.append(spendBar);
  barWrapper.append(dayName);

  bar.append(barWrapper);

  return bar;
};

const getData = () => {
  fetch("data.json")
    .then((res) => res.json())
    .then((data) => {
      const graph = document.querySelector(".bar-graph");
      maxSpend = Math.max(...data.map((day) => day.amount));
      data.map((item) => {
        graph.append(createBar(item, maxSpend));
      });
    });
};

getData();
