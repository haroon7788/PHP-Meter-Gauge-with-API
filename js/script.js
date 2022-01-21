// This file is not used in this project. Its alternate is in jQuery.

const gaugeElement = document.querySelector(".gauge");

function setGaugeValue(gauge, value) {
  if (value < 0 || value > 100) {
    return;
  }
  gauge.querySelector(".gauge__fill").style.transform = `rotate(${
    value / 200
  }turn)`;

  // gauge.querySelector(".gauge__cover").textContent = `${Math.round(value * 100)}%`;
  gauge.querySelector(".gauge__cover").textContent = `${value}%`;
}

setGaugeValue(gaugeElement, 60);
