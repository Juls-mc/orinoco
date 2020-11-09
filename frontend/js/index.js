let container = document.getElementById("cam_list") // Création variable container qui correspond à la div "cam_list" du fichier index.html
let url = "http://localhost:3000/api/cameras"

// ci dessous teste d'utilisation
const ajax = new Ajax();
ajax.get('http://localhost:3000/api/cameras', (response) => {

console.log(response);
});
