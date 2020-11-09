class Ajax {
    get("http://localhost:3000/api/cameras", callable) {
        const request = new XMLHttpRequest();
        request.open("GET", "http://localhost:3000/api/cameras");
        request.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE &&
                this.status === 200) {
                let response = JSON.parse(this.responseText);
            } else {
                reject(request.status);
            }
        }
        console.log(response.current_condition.condition)
    };
    request.open("GET", "http://localhost:3000/api/cameras");
    request.send();
    return promise;
}


const ajax = new Ajax();
ajax.get('http://localhost:3000/api/cameras', (response) => {

    console.log(response);
});
