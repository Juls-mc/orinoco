const container = document.getElementById("single_product")

/// récupération de l'id produit dans l'url grace à méthode URLSearchParams
let urlSearchParams = new URLSearchParams(document.location.search)
let id = urlSearchParams.get("id")

//  affichage d'un produit dans la page
let request = new XMLHttpRequest() //crée un nouvel objet de type  XMLHttpRequest  qui correspond à notre objet AJAX
request.onreadystatechange = function () { // gestionnaire d'événement si l'attribut readyState change
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) { // si la réponse est prête et le statut est OK
        cameras = JSON.parse(this.responseText) // renvoie la réponse sous la forme d'un string
        affichageProduit() // appel de la fonction
    }
};
request.open("GET", "http://localhost:3000/api/cameras/" + id) // initialisation de la requête
request.send() // envoi de la requête

// création de la fonction d'affichage du produit
function affichageProduit() {

    let titre = document.getElementById("titre")
    titre.textContent = cameras.name
    let prix = document.getElementById("prix")
    prix.textContent = cameras.price / 100 + " €"
    let description = document.getElementById("description")
    description.textContent = cameras.description
    let image = document.getElementById("image")
    image.src = cameras.imageUrl

    //Création des couleurs
    let lenses = document.getElementById("lense-select")
    let options = cameras.lenses
    options.forEach(function (element, lense) {
        lenses[lense] = new Option(element, element)
    })

    //bouton retour à la liste
    let retour_liste = document.getElementById("btn-liste")
    retour_liste.textContent = "Retour à la liste"
    retour_liste.addEventListener("click", function () {
        window.location.href = "index.html"
    })


    //sélection de la couleur
    let selectionLense = document.getElementById("lense-select").addEventListener("change", function (e) {
        selectionCouleur = e.target.value;
    });

    // sélection de la quantité
    let quantiteProduit = document.getElementById("quantiteProduit").addEventListener('change', function (e) {
        quantiteProduit = e.target.value
    })


    //bouton ajouter au panier
    let ajouter_panier = document.getElementById("btn-ajouter")
    ajouter_panier.textContent = "Ajouter au panier"
    ajouter_panier.addEventListener("click", function () {
        if (selectionCouleur != undefined && quantiteProduit != undefined) {
            cameras.lenses = selectionLense
            cameras.quantity = quantiteProduit
            prixTotal()
            ajoutLocalStorage()
            openMoadl()
        } else if (selectionLense == undefined && quantiteProduit != undefined) {
            cameras.lenses = cameras.lenses[0]
            teddies.quantity = quantiteProduit
            prixTotal()
            ajoutLocalStorage()
            openMoadl()
        } else if (selectionLense != undefined && quantiteProduit == undefined) {
            cameras.lenses = selectionLense
            cameras.quantity = 1
            prixTotal()
            ajoutLocalStorage()
            openMoadl()
        } else {
            cameras.lenses = cameras.lenses[0]
            cameras.quantity = 1
            prixTotal()
            ajoutLocalStorage()
            openMoadl()
        }
    })
}

//enregistrement du prix total dans localstorage pour le proposer dans la page panier et commande
function prixTotal() {
    let price = parseInt(cameras.price); // je récupère le prix des ourson et le stock dans une variable
    let prixDuPanier = JSON.parse(localStorage.getItem('prixTotal')); // je recupère le prix total dans le storage et le stocke dans la variable

    if (prixDuPanier != null) { // s'il y a queque chose dans le panier
        localStorage.setItem("prixTotal", prixDuPanier + (price / 100 * cameras.quantity)); // alors créé une donnée prix Total qui va correspondre à la somme de ce qu'il y a déjà dans le panier + du prix de l'ourson x la quantité
    } else { // alors créé un prix total qui corresponde au prix de l'ourson x sa quantité
        localStorage.setItem("prixTotal", price / 100 * cameras.quantity);
    }
}

// création de la fonction ajout dans localstorage
function ajoutLocalStorage() {
    let panier = localStorage.getItem('panier'); // variable stock la donnée panier
    panier = JSON.parse(panier); // conversion format js

    let name = cameras.name + cameras.colors;
    if (panier != null) { // s'il y a quelque chose dans le panier
        let element = panier[name] // la variable element se créé et correspond au panier
        if (element === undefined) { // si l'élement a ajouté dans le panier n'est pas le même
            panier = {
                ...panier,
                [name]: cameras
            } // ajoute au panier tous les caractéristiques de teddies
        } else { // sinon ne créé pas un nouvel objet mais ajoute + le nombre de quantité dans la colonne quantité
            let quantity = parseInt(element.quantity);
            quantity += parseInt(teddies.quantity);
            element.quantity = quantity;
        }
    } else {
        panier = {
            [name]: cameras
        }

    }
    localStorage.setItem("panier", JSON.stringify(panier));
}
