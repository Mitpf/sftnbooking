# sftnbooking

## describtion:
```
using back4app

``` 
#### class level security:

![class level sec image](mdAssets/claslevelsec.png)

![Alt text](mdAssets/shema%20level%20security.png)

## API Back4APP 
### BASICS requests headers:

```js
headers: {
            'X-Parse-Application-Id': appId,
            'X-Parse-REST-API-Key': restApiKey,
            'X-Parse-JavaScript-Key': apiKey,

        }

        .........

        if (userData) {
        options.headers['X-Parse-Session-Token'] = userData.sessionToken;
    }
```


## -> API reference:

### > https://dashboard.back4app.com/apidocs/oiDa2v8HOqZIwqdJoMeWVfTiDtUdL2SpT05Sc9Fj#Room-custom-class

`example json:`

```JSON
{
  "name": "A string",
  "beds": 1,
  "location": "A string",
  "owner": { "__type": "Pointer", "className": "_User", "objectId": "<THE_REFERENCED_OBJECT_ID>" },
  "openForBooking": true
}
```

`use this:`
>  "owner": { "__type": "Pointer", "className": "_User", "objectId": "<THE_REFERENCED_OBJECT_ID>" },


#### owner:
![Alt text](mdAssets/ownerPointer.png)

