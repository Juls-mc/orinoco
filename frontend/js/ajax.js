class Ajax {
    //methode d'appeler une URL avec GET, exécute la fonction callback à la réception de la réponse
    get(url, callback) {
        const request = new XMLHttpRequest();
        request.open("GET", url);
        request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE &&
                request.status === 200) {
                let response = JSON.parse(request.responseText);
                callback(response);
            }
        }
        request.send();
    };

}
