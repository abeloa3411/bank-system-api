# bank-system-api

The bank system api is a REST API implemented with node js, express and mongodb. The api enables a user to do do the following:

- Create an account
- Add funds to their accounts
- Transfer funds to another user's account
- Withdraw funds from their account
- Check account balance

## Resources

- Create account: api to posted
- AddFunds: api to be posted
- Transfer funds: api to be posted
- Withdraw funds: api to posted
- Get all accounts in the bakn: api to be posted
- Get account balance

### usage

You can use any method to fetch data from the api

### Signup

Before you use the api you must signup so as to recieve an authentication token that will be
used to create an account and during transactions.
Sign up using name, date of birth and pin(string)

```js
fetch("api to be posted", {
  method: "POST",
  body: JSON.stringify({
    name: "Izolah Machengiator",
    brth: "10 may 1998",
    pin: "mypin",
  }),
})
  .then((res) => res.json())
  .then((json) => console.log(json));

/* response
{
   "user": {
        "name": "Izolah Machengiator",
        "birth": "10 may 1998",
        "pin": "$2a$10$8tfcNuDBvavokOR7HaIh0uOJ0ACF0drd8JMDeBPwEKr7.75uHsHSG",
        "_id": "63e3fc240a03ad3a11d90258",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzZmMyNDBhMDNhZDNhMTFkOTAyNTgiLCJpYXQiOjE2NzU4ODU2MDUsImV4cCI6MTY3NjA1ODQwNX0.y6dF75gBdvXYpd-qPLWClY5R1pctZoiGtaQjtrdN_3U"
}
*/
```

### signin

Since the authentication tokens expire after some specified period of time you will need to signin
to get an acces token to use during transactions.
Sign in using your pin(string) only

```js
fetch("api to be posted", {
  method: "POST",
  body: JSON.stringify({
    name: "Izolah Machengiator",
    pin: "mypin",
  }),
})
  .then((res) => res.json())
  .then((json) => console.log(json));

/* response
{
    "user": {
        "_id": "63e3fc240a03ad3a11d90258",
        "name": "Izolah Machengiator",
        "birth": "10 may 1998",
        "pin": "$2a$10$8tfcNuDBvavokOR7HaIh0uOJ0ACF0drd8JMDeBPwEKr7.75uHsHSG",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzZmMyNDBhMDNhZDNhMTFkOTAyNTgiLCJpYXQiOjE2NzYxNDIyOTcsImV4cCI6MTY3NjMxNTA5N30.Schi1_bcpVdbk4OuaeCzmIj6XWd38PFxDso2Cj7Keag"
}
*/
```

### create an account

After signing in to the bank you have to ceate an account for you to be able to make transactions.
You need to have an authentication token(json web token) to be able to create your account, this helps
in identifying who is creating the account.

```js
fetch("api to be posted", {
  method: "POST",
  body: JSON.stringify({
    accountType: "savings",
  }),
})
  .then((res) => res.json())
  .then((json) => console.log(json));

/* response
{
    "isSaved": {
        "user": "63e3fc240a03ad3a11d90258",
        "balance": 100,
        "_id": "63f0f010175b47012ba784ac",
        "__v": 0
    },
    "response": "Account created succesfully"
}
*/
```

### deposit to your account

```js
fetch("api to be posted", {
  method: "POST",
  body: JSON.stringify({
    balance: 2000,
  }),
})
  .then((res) => res.json())
  .then((json) => console.log(json));

/* response
{
    "newAmnt": {
        "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
    },
    "response": "You have succesfully deposited $ 2000 in your account"
}
*/
```

if you get this response then, the funds have been succesfully deposited to your account

### Withdraw from your account

```js
fetch("api to be posted", {
  method: "POST",
  body: JSON.stringify({
    balance: 2000,
  }),
})
  .then((res) => res.json())
  .then((json) => console.log(json));

/* response
{
    "newAmnt": {
        "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
    },
    "response": "You have succesfully withdraw $ 2000 from your account"
}
```

### Transfer funds

For transfering of fund you need too have the id of source of the funds(sender) and the id of
the reciever of the funds.
senders id: we shall get it from req.params
reciever id: we shall get it from req.query
note: I think there are more efficient and simple way to do this but this is how i did it but am
also working to get a more efficient way to do it.

```js

fetch("api to be posted", {
  method: "POST",
  body: JSON.stringify({
    balance: 2000, //amount to be sent
  }),
})
  .then((res) => res.json())
  .then((json) => console.log(json));

/* response
{
    "recieverNewBal": {
        "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
    },
    "updatedBal": {
        "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
    },
    "response": "You have succesfully transfered $ 2000"
}
```

### Get account balance

### GEt all accounts in the bank
