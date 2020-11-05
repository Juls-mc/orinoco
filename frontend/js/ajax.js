class Ajax {
    get(url, callable) {
        const promise = new Promise(function (resolve, reject) {
            const request = new XMLHttpRequest();
            request.open("GET", url);
            request.onreadystatechange = function () {
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        resolve(JSON.parse(request.responseText));
                    } else {
                        reject(request.status);
                    }
                }
            };
            request.send();
        });
        return promise;
    }
}


let ajax = new Ajax();
ajax.get('http://localhost:3000/api/cameras', (response) => {
    //afficher rep dans console
    console.log(response);
});



/////////////////////////////////////////////////////////////


// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}


"http://localhost:3000/api/cameras"
