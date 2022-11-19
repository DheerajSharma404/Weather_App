const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector(".time");
const icon = document.querySelector(".icon img");

//* Update the UI.
const updateUI = (data) => {
   //* destructure properties
   const { cityStats, weatherStats } = data;

   details.innerHTML = `
      <h5 class="my-3">${cityStats.EnglishName}</h5>
         <div class="my-3">${weatherStats.WeatherText}</div></div>
         <div class="display-4 my-4">
            <span>${weatherStats.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
         </div>
   `;
   //* Remove the d-none class from the cards if its present
   if (card.classList.contains("d-none")) {
      card.classList.remove("d-none");
   }
   //* setting the source for icon
   const iconSrc = `img/icons/${weatherStats.WeatherIcon}.svg`;
   icon.setAttribute("src", iconSrc);

   //* settin the day and night image
   let timeSrc = weatherStats.IsDayTime ? "img/day.svg" : "img/night.svg";
   time.setAttribute("src", timeSrc);
};

const newCity = async (city) => {
   const cityStats = await getCity(city);
   const weatherStats = await getWeather(cityStats.Key);

   return {
      cityStats,
      weatherStats,
   };
};

cityForm.addEventListener("submit", (e) => {
   //* prevent default action
   e.preventDefault();

   //* get cityForm  value
   const city = cityForm.city.value.trim();
   cityForm.reset();

   //* update the ui with weather information
   newCity(city)
      .then((data) => updateUI(data))
      .catch((err) => console.log(err));

   //* Setting up the localStorage
   localStorage.setItem("city", city);
});
if (localStorage.getItem("city")) {
   newCity(localStorage.getItem("city"))
      .then((data) => updateUI(data))
      .catch((err) => console.log(err));
}
