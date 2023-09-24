const host = 'https://parseapi.back4app.com';
const appId = 'oiDa2v8HOqZIwqdJoMeWVfTiDtUdL2SpT05Sc9Fj'; // Application ID
const apiKey = 'cf2ha62NkCjWyJ0imCc4g5L7gVKVlrDSLcB4zeGJ'; // JavaScript key
const restApiKey = 's2STXM9vodNcA8DG28i04ln1l1CFk0Lpx8htmzju'; //rest api key


async function request(method, url, data) {
    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': appId,
            'X-Parse-REST-API-Key': restApiKey,
            'X-Parse-JavaScript-Key': apiKey,

        }
    };

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    // auth

    try {
        const response = await fetch(host + url, options);

        if (response.status == 204) {
            return response;
        }

        const result = await response.json();

        if (response.ok != true) {
            console.log(result);
            throw new Error(result.message || result.error);
        }

        return result;

    }
    catch (err) {
        alert(err.mesage);
        throw err;
    }
}

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');



