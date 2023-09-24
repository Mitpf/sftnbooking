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
            throw new Error(result.message);
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

/* 

Application ID
oiDa2v8HOqZIwqdJoMeWVfTiDtUdL2SpT05Sc9Fj

Client key
3cz2s9k0uBcJujg6K7aL2dwO9T0HJWM4CdbGwIji

JavaScript key
cf2ha62NkCjWyJ0imCc4g5L7gVKVlrDSLcB4zeGJ

.NET key
rZNAvplblzkL5NUA3zE7pdwrdjSkRBXnZzFIDcHV

REST API key
s2STXM9vodNcA8DG28i04ln1l1CFk0Lpx8htmzju

Webhook key
rA8R6PB1w7qA4Ln08A2qu78Q3X2SKGAMGadROKYY

File key
59040ce2-a77a-4a57-aff3-e7a916f20fa3

Master key
GbwK7lvjuOW5DTWgjt3cDMfeOWehdL2aXvTGpVnL

*/