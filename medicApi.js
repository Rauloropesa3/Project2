
const fetch = require("node-fetch");
const queryTemp = (resource, params, callBack) => {


    const baseUrl = `https://priaid-symptom-checker-v1.p.rapidapi.com/${resource}`;
    const query = `?format=json&language=en-gb&${params}`

    fetch(baseUrl + query, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "priaid-symptom-checker-v1.p.rapidapi.com",
            "x-rapidapi-key": "538ca44cb2mshb349b3d9b5ae52ep188907jsncb73a8fa752c"
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