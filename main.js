const btnSearch = document.querySelector(".btnSearch");
const search = document.querySelector(".search");
const ip = document.querySelector(".ip");
const timezone = document.querySelector(".timezone");
const isp = document.querySelector(".isp");
const loc = document.querySelector(".location");

var key = 'at_AVwajVnxuIuA2wVeBFq8IQCScc1KI'
btnSearch.addEventListener("click",function(){
    var ipAddress = search.value;
    fetchData(ipAddress,key)
});
var map = L.map('map', {
    zoomControl: false,
    attributionControl: false
})
async function fetchData(ip,key) {
    try {
        const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${key}&ipAddress=${ip}`);
        const data = await res.json();
        printData(data)
        console.log(data);
        const lat = data.location.lat
        const lng = data.location.lng
        L.marker([lat, lng], './images/icon-location.bg').addTo(map);

        map.setView([lat, lng], 13)
        const mapToken = 'pk.eyJ1Ijoia2d6aW5oZWluIiwiYSI6ImNsMTdmNjFiMDAwZ3IzanFzMHJlY29ucTYifQ.LJGs2NYK7GdFgZ_CMa6Yjw';
        L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapToken}`, {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'your.mapbox.access.token'
        }).addTo(map);
            } catch (error) {
        console.log(error);
    }
}
function printData(data) {
    ip.innerHTML = data.ip;
    loc.innerHTML = `${data.location.region}, ${data.location.city} ${data.location.postalCode}`
    timezone.innerHTML = `UTC${data.location.timezone}`;
    isp.innerHTML = data.isp;
}
fetchData("",key);

