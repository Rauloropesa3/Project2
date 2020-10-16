
const fetch = require("node-fetch");
const queryTemp = (resource, params, callBack) => {


    const baseUrl = `https://priaid-symptom-checker-v1.p.rapidapi.com/${resource}`;
    const query = `?format=json&language=en-gb&${params}`

    fetch(baseUrl + query, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "priaid-symptom-checker-v1.p.rapidapi.com",
            "x-rapidapi-key": "441f5fff35msh66538a1f641bd16p1624c8jsnf551a30cbe66"
        }
        
    })
        .then((resp) => {
            if (resp.ok) {
                return resp.json()
            } else {
                console.log(resp.statusText);

            }

        }).then((data) => {
            callBack(data)
        })

}

module.exports= queryTemp;