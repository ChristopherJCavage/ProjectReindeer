/****************************************************************************
 * Copyright 2015 Christopher James Cavage (cjcavage@gmail.com)             *
 *                                                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 *     http://www.apache.org/licenses/LICENSE-2.0                           *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 ****************************************************************************/
var bodyParser = require('body-parser');
var dataStore = require('./data/dataStore.js');
var express = require('express');
var restHandlers = require('./restHandlers.js');
var sensorHandlers = require('./sensorHandlers.js');
var temperatureSensor = require('./data/temperatureSensor.js');

//Setup the main app using express and setup parsing.
var app = express();
var port = process.env.PORT || 8080;
var router = express.Router();

//Setup the Data Store.
var dataStore = new dataStore();

//Configure all sensors.
var sensors = {};

sensors.temperatureSensor = new temperatureSensor();
sensors.temperatureSensor.start();

//Configure all REST API routing and sensor handlers.
var restHandlers = new restHandlers(router, sensors, dataStore);
var sensorHandlers = new sensorHandlers(sensors, dataStore);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Prefex all routes with /reindeer and register all routes.
app.use('/reindeer', router);

//Start the server.
console.log('Starting Reindeer Web-Service.')

app.listen(port);
