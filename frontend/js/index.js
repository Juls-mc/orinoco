let container = document.getElementById("cam_list") // Création variable container qui correspond à la div "cam_list" du fichier index.html
let url = "http://localhost:3000/api/cameras"


// ci dessous teste d'utilisation
const ajax = new Ajax();
ajax.get('http://localhost:3000/api/cameras', (response) => {

    console.log(response);
});



// Récupération données de l'API avec fetch
fetch(url)
    .then(cameras => cameras.json()) // Retourner une promesse
    .then(cameras => {
        // récupère chaque élément du tableau
        cameras.forEach(({
            _id,
            name,
            price,
            description,
            imageUrl,
        }) => {
            // Création des nouveaux éléments avec createElement et createTextNode
            let div = document.createElement("div")
            let img = document.createElement("img")
            let h3 = document.createElement("h3")
            let h4 = document.createElement("h4")
            let p = document.createElement("p")
            let a = document.createElement("a")

            let eleName = document.createTextNode(name)
            let elePrice = document.createTextNode(price / 100 + " €")
            let eleDescription = document.createTextNode(description)

            // Etape 2: Définition des informations des éléments
            a.href = 'product.html?id=' + _id;
            a.textContent = "Voir ce produit";
            img.src = imageUrl;

            // Etape 3: Insertion des nouveaux éléments dans le DOM grâce à appendChild
            container.appendChild(div)
            div.appendChild(img)
            div.appendChild(h3)
            div.appendChild(h4) /
                div.appendChild(p)
            div.appendChild(a)
            h3.appendChild(eleName)
            h4.appendChild(elePrice)
            p.appendChild(eleDescription)

            img.style.height = "25%";
            img.style.width = "35%";

        })
    })
    .catch(function (error) {
        console.log(error);
    });
