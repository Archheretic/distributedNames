# Distributed Name List

## Table of Contents

- [About](#about)
- [Installation](#installation)
- [How to run](#how-to-run)
- [API Overview](#api-overview)
- [API Documentation](#api-documentation)
    - [Get Names](#get-names)
    - [Register name](#register-names)
    - [Get Nodes](#get-nodes)
    - [Add Node](#add-node)
- [Tests](#tests)

## About

In this project...

## Installation

This application requires Node.js. If you dont have Node.js go to https://nodejs.org/en/ for further instruction.

If you have Node installed:

```sh
$ npm install
```

## How to run

On some Linux distros the command below will work.

```sh
$ npm start
```

To start on the ubuntu cloud server provided by UH-IaaS:
```sh
$ NODE_ENV=dev nodejs --use_strict src/server.js
```
To change from default port, use the env variable PORT as in the example below, 
keep in mind that only port 8000-8999 is supported.
```sh
$ NODE_ENV=dev PORT=8020 node --use_strict src/server.js
```



## API Overview

API Endpoint | Description
------------ | -------------
/list | GET - A list containing all registered names
/list | POST - Adds the new name to the list.
/nodes | GET - Updates a parkinglot
/nodes | POST - Adds a new node to the list.

## API Documentation

### Get Names

  Returns the list of names in json data format.

* **URL**

  /list

* **Method:**

  `GET`

* **Headers:**

    * **Content-Type** application/json

*  **URL Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"users":[{"name":"Ole"},{"name":"Dole"},{"name":"Doffen"}]}`
    
* **Error Response:**

  There are no error handling, so don't crash it!
 
* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/list",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
  
###  Register Name

  Registers a new name, adds the new name to the list of names.

* **URL**

  /list

* **Method:**

  `POST`
  
* **Headers:**

    * **Content-Type** application/json    
  
*  **URL Params**

   None

* **Data Params**

  `{ "name": "John Doe" }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"Message":"Name John Doe Added"}`
 
* **Error Response:**

  There are no error handling, so don't crash it!

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/list",
      dataType: "json",
      type : "POST",
      data: '{"name": "John Doe"}',
      success : function(r) {
        console.log(r);
      }
    });
  ```

### Get Nodes

  Returns the list of nodes in json data format.

* **URL**

  /nodes

* **Method:**

  `GET`
  
* **Headers:**

    * **Content-Type** application/json
      
*  **URL Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"nodes":[{"ip":"158.37.63.8","port":8000},{"ip":"100.00.12.4","port":8080}`
    
* **Error Response:**

  There are no error handling, so don't crash it!
 
* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/nodes",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```

### Add Node

Adds the node to the list of nodes.

* **URL**

  /nodes

* **Method:**

  `POST`
  
* **Headers:**

    * **Content-Type** application/json
  
*  **URL Params**

   None

* **Data Params**

  `{"ip":"10.10.10.10","port":8010}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"Message":"Name John Doe Added"}`
 
* **Error Response:**

  There are no error handling, so don't crash it!

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/list",
      dataType: "json",
      type : "POST",
      Data: '{"ip":"10.10.10.10","port":8010}',
      success : function(r) {
        console.log(r);
      }
    });
  ```

## Tests

No written tests atm.