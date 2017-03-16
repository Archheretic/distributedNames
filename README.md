# Distributed Name List

## Table of Contents

- [About](#about)
- [Docker Image](#docker-image)
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

How it works:
At program startup the servers IP and port is sent to the nodes in the pre-existing node list.
Every 6 seconds it pulls down the names from the other nodes, compare it with the existing list and adds the new names.
3 seconds after startup a 6 second interval subroutine will start, this subroutine does a port scan on port 8000-8999 on all 
known nodes to discover potential new nodes running on the same IP.

## Docker Image

Docker image can be found at: https://hub.docker.com/r/archheretic/distributednames/

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
$ NODE_ENV=dev PORT=8020 nodejs --use_strict src/server.js
```



## API Overview

API Endpoint | Description
------------ | -------------
/list | GET - A list containing all registered names
/register | POST - Adds the new name to the list.
/nodes | GET - A list containing all nodes.
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
    
  * **Code:** 304 <br />
    **Content:** `{"users":[{"name":"Ole"},{"name":"Dole"},{"name":"Doffen"}]}`
    
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{Message: "error message"}`
 
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

  /register

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

  * **Code:** 403 <br />
    **Content:** `{Message: "The reason for why it was forbidden"}`

  * **Code:** 500 <br />
    **Content:** `{Message: "error message"}`

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
    
  * **Code:** 304 <br />
    **Content:** `{"nodes":[{"ip":"158.37.63.8","port":8000},{"ip":"100.00.12.4","port":8080}`
    
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{Message: "error message"}`
 
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
    **Content:** `{"status":"new node added"}` or `{"status":"node already exist"}`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{Message: "error message"}`

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