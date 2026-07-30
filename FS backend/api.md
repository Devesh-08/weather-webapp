 fetch('http://api.weatherapi.com/v1/current.json?key=e08cc7c0f90f48ff975122023260307&q=London&aqi=no')
fetch("http://localhost:5000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "your_registered_email@example.com",
    password: "your_password"
  }),
  credentials: "include" // ensures cookies are stored in Edge
})
  .then(res => res.json())
  .then(data => {
    console.log("Login response:", data);
    // Save the accessToken for later use
    localStorage.setItem("accessToken", data.accessToken);
  })
  .catch(err => console.error(err));


const token = localStorage.getItem("accessToken");

fetch("http://localhost:5000/api/weather/london", {
  headers: {
    "Authorization": `Bearer ${token}`
  },
  credentials: "include"
})
  .then(res => res.json())
  .then(data => console.log("Weather data:", data))
  .catch(err => console.error(err));
