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

    //méthode renvoi de l'API avec POST
    post(url, jsonBody) {
        const request = new XMLHttpRequest();
        request.open("POST", url);
        request.setRequestHeader("Content-Type", "application/json");
        request.onreadystatechange = function () {
            if (request.readyState === 4 &&
                request.status === 201) {
                let response = JSON.parse(request.responseText);
            } else {
                reject(request.status);
            }
        }

        request.send(JSON.stringify(jsonBody));
        return promise;
    }
};
