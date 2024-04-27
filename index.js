let API_KEY = "669fe736ad449ae4740bc9fcef4c825e";
let btn1 = document.querySelector(".btn1");
let btn2 = document.querySelector(".btn2");
let btn3 = document.querySelector(".btn3");
let locate = document.querySelector(".locate");
let longitude = document.querySelector(".longitude");
let latitude = document.querySelector(".latitude");
let description = document.querySelector(".description");
let temp = document.querySelector(".temp");
let feels_like = document.querySelector(".feels_like");
let temp_min = document.querySelector(".temp_min");
let temp_max = document.querySelector(".temp_max");
let humidity = document.querySelector(".humidity");
let pressure = document.querySelector(".pressure");
let wind = document.querySelector(".wind");
let dir = document.querySelector(".dir");
let cloud = document.querySelector(".cloud");
let input1 = document.querySelector(".access_input input");
let input2 = document.querySelector(".search_weather input");
let search1 = document.querySelector(".search_bar1");
let search2 = document.querySelector(".search_bar2");
let interface = document.querySelector(".interface");
let search_weather = document.querySelector(".search_weather");
let main = document.querySelector(".main");
let access = document.querySelector(".access");

interface.classList.add("hidden");
search_weather.classList.add("hidden");
btn3.addEventListener("click", () => {
	console.log("Calling the location function");
	getLocation();
});
search1.addEventListener("click", () => {
	console.log("Calling the weather_city function");
	weather_city(input1.value);
	display(main, interface, main, interface);
	input1.value = "";
});
input1.addEventListener("keydown", function (event) {
	if (event.key == "Enter") {
		weather_city(input1.value);
		display(main, interface, main, interface);
		input1.value = "";
	}
});
search2.addEventListener("click", () => {
	console.log("Calling the weather_city function");
	weather_city(input2.value);
	display2(interface, search_weather, interface);
	input2.value = "";
});

input2.addEventListener("keydown", function (event) {
	if (event.key == "Enter") {
		weather_city(input2.value);
		display2(interface, search_weather, interface);
        input2.value = "";
	}
});
btn1.addEventListener("click", () => {
	// location.reload();
	getLocation();
	if(!search_weather.classList.contains("hidden")){
		search_weather.classList.add("hidden");
	}
});
btn2.addEventListener("click", () => {
	if (!main.classList.contains("hidden")) {
		main.classList.add("hidden");
	}
	if (!interface.classList.contains("hidden")) {
		interface.classList.add("hidden");
	}
	if (search_weather.classList.contains("hidden")) {
		search_weather.classList.remove("hidden");
	}
});

function display(hide, show, sibling, element) {
	if (!hide.classList.contains("hidden")) {
		hide.classList.add("hidden");
	}
	show.classList.remove("hidden");
	sibling.insertAdjacentElement("afterend", element);
}
function display2(show, sibling, element) {
	show.classList.remove("hidden");
	sibling.insertAdjacentElement("afterend", element);
}
function changeUI(data) {
    console.log(data);
	locate.innerText = data.name;
	longitude.innerText = data.coord.lon;
	latitude.innerText = data.coord.lat;
	description.innerText = data.weather[0].description;
	temp.innerText = Math.floor(data.main.temp - 273.5);
	feels_like.innerText = Math.floor(data.main.feels_like - 273.5);
	temp_min.innerText = Math.floor(data.main.temp_min - 273.15);
	temp_max.innerText = Math.floor(data.main.temp_max - 273.15);
	humidity.innerText = data.main.humidity;
	pressure.innerText = data.main.pressure;
	wind.innerText = data.wind.speed;
	dir.innerText = data.wind.deg;
	cloud.innerText = data.clouds.all;
}
async function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		alert("Your browser not supported location detection ");
	}
}

async function showPosition(position) {
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	console.log(latitude);
	console.log(longitude);
	weather_location(latitude, longitude);
}

async function weather_city(city_name) {
	let response = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`
	);
	let data = await response.json();
	// console.dir(data);
	changeUI(data);
}
async function weather_location(latitude, longitude) {
	let response = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
	);
	let data = await response.json();
	// console.dir(data);
	display(main, interface, main, interface);
	changeUI(data);
}