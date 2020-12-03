// Fonction affichage produit au panier
function affichagePanier() {
    //je récupére mon produit dans local storage "panier"
    let panier = JSON.parse(localStorage.getItem("panier"))
    let prixTotal = JSON.parse(localStorage.getItem("prixTotal"))
    let prixPanier = document.getElementById('affichageTotal')

    let tableauPanier = document.getElementById("afficheProduitPanier")

    // affichage du prix total du panier
    if (prixTotal != null) {
        prixPanier.textContent = 'Le montant total de votre commande est de : ' + prixTotal + ' €';
        prixPanier.id = 'prixTotal';
        let div = document.createElement("div")

        afficheProduitPanier.appendChild(div)
    } else {
        prixPanier.textContent = 'Le montant de votre commande est de : 0 €';
    }

    // s'il n'y a rien dans le panier cela affiche "Le panier est vide dans la console"
    if (panier == null) {
        let div = document.createElement("div")
        afficheProduitPanier.appendChild(div)
        console.log("Le panier est vide")
    } else {
        //s'il y a qq chose, créé un tableau contenant chaque produit
        tableauPanier.innerHTML = ''
        Object.values(panier).map((cameras) => {
            let tr = document.createElement("tr")
            afficheProduitPanier.appendChild(tr)

            let name = document.createElement("td")
            name.textContent = cameras.name
            tr.appendChild(name)

            let lenses = document.createElement("td")
            lenses.textContent = cameras.lenses
            tr.appendChild(lenses)


            let quantite = document.createElement("td")
            quantite.textContent = cameras.quantity
            tr.appendChild(quantite)

            let prix = document.createElement("td")
            prix.textContent = cameras.price / 100 + " €"
            tr.appendChild(prix)

            let prixTotalCam = document.createElement("td")
            prixTotalCam.textContent = cameras.price / 100 * cameras.quantity + " €"
            tr.appendChild(prixTotalCam)

            const emptyButton = document.getElementById("empty")

            emptyButton.addEventListener("click", function () { // Sur un click de "emptyButton"
                localStorage.clear("prixPanier");
                window.location.reload()
            })

            console.log("Contenu du panier :")
            console.log(panier)
        })
    }
}
affichagePanier() // appel de la fonction




//création des variables d'informations client
let orderButton = document.querySelector(".order-submit");
let validationButton = document.querySelector(".validation");
let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let eMail = document.querySelector("#inputEmail");
let telephoneNumber = document.querySelector("#telephoneNumber");
let address = document.querySelector("#inputAddress");
let city = document.querySelector("#inputCity");


// création de l'objet général client
function Client(firstName, lastName, eMail, telephoneNumber, address, city) {
    (this.firstName = firstName),
    (this.lastName = lastName),
    (this.eMail = eMail),
    (this.telephoneNumber = telephoneNumber),
    (this.address = address),
    (this.city = city);
}

//création d'un tableau avec les articles commandés
let panier = JSON.parse(localStorage.getItem("panier"))
let listIdProduct = [];
for (let i = 0; i < panier.length; i++) {
    listIdProduct.push(panier[i].iD);
}
localStorage.setItem("products", JSON.stringify(listIdProduct));
listIdProduct = localStorage.getItem("products");
listIdProduct = JSON.parse(listIdProduct);


// fonction qui permet de valider chaque input
function validationInput() {
    let regexEmail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/
    if (firstName.value.length === 0) {
        alert("Merci d'entrer un prénom valide.")
    } else if (lastName.value.length === 0) {
        alert("Merci d'entrer un nom valide.")
    } else if (eMail.value.length === 0 || !regexEmail.test(eMail.value)) {
        alert("Merci d'entrer une adresse email valide")
        eMail.style.borderColor = "red"
    } else if (address.value.length === 0) {
        alert("Merci d'entrer une adresse valide.")
    } else if (telephoneNumber.value.length === 0) {
        alert("Merci d'entrer un numéro valide.")
    } else if (city.value.length === 0) {
        alert("Merci d'entrer une ville valide.")
    } else {
        alert("Vos informations ont bien été enregistrées! \nVous pouvez valider votre commande ✅ ");
        validationButton.classList.remove("disabled");
        send() // si tous les champs sont bons => créé un nouveau client et on envoie au serveur
    }
}

// function event au clic sur confirmer
orderButton.addEventListener("click", function (event) {
    event.preventDefault();
    validationInput() // appel de la fonction on vérfie les inputs
});

//création fonction send
function send() {
    // Création nouveau client
    let newClient = new Client(
        firstName.value,
        lastName.value,
        eMail.value,
        telephoneNumber.value,
        address.value,
        city.value
    );
    // POST API
    fetch("http://localhost:3000/api/cameras/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contact: {
                    firstName: newClient.firstName,
                    lastName: newClient.lastName,
                    address: newClient.address,
                    city: newClient.city,
                    email: newClient.eMail,
                },
                products: listIdProduct,
            }),
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((data) => {
            localStorage.setItem("orderInfos", JSON.stringify(data));
        })
        .catch((error) => console.log("erreur de type : ", error));
}
