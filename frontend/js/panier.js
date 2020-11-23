// Fonction affichage produit au panier
function affichagePanier() {
    //je récupére mon produit dans local storage "panier"
    let panier = JSON.parse(localStorage.getItem("panier"))
    let prixTotal = JSON.parse(localStorage.getItem("prixTotal"))
    let prixPanier = document.getElementById('affichageTotal')


    let tableauPanier = document.getElementById("afficheProduitPanier")

    // affichage du prix total du panier si le panier:
    if (prixTotal != null) {
        prixPanier.textContent = 'Le montant total de votre commande est de : ' + prixTotal + ' €';
        prixPanier.id = 'prixTotal';
        let div = document.createElement("div")
        div.textContent = "Votre panier est vide!"
        afficheProduitPanier.appendChild(div)
    } else {
        prixPanier.textContent = 'Le montant de votre commande est de : 0 €';
    }

    // si il n'y a rien dans le panier, affiche "Le panier est vide!"
    if (panier == null) {
        let div = document.createElement("div")
        div.textContent = "Votre panier est vide!"
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
            prix.textContent = cameras.price / 100 + "€"
            tr.appendChild(prix)

            console.log("Voici le panier :")
            console.log(panier)
        })
    }
}
affichagePanier() // appel de la fonction
