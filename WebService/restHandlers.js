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
var dataStore = require('./data/dataStore.js');
var express = require('express');

/**
 * Defines class abstraction to group common logic associated with the Reindeer REST API handlers.
 *
 * @param router Express router.
 * @param sensors Object containing all sensors used by Project Reindeer.
 * @param dataStore Instance of master database data store.
 * @remarks Configures routing subscriptions.
 */
function RestHandlers(router, sensors, dataStore)
{
    //Save off datastore; we'll need it later.
    this.m_dataStoreRef = dataStore;

    //Configure routing.
    router.route('/sensors/temperature/current').get(this.onReadCurrentTemperature.bind(this));
};

/**************************************
 * http://localhost/reindeer/sensors/ *
 **************************************/

/**
 * GET http://localhost/reindeer/sensors/temperature/current
 */
RestHandlers.prototype.onReadCurrentTemperature = function(req, res)
{
    //Query the most recent value from the data store; note that, it might not be available.
    try
    {
        var temperatureReading = this.m_dataStoreRef.getCurrentTemperature();

        //Build JSON response object.
        var jsonRes = {};

        jsonRes.TemperatureCelsius = temperatureReading.temperatureCelsius;
        jsonRes.Timestamp = temperatureReading.timestamp;

        //Set response.
        res.json(jsonRes);
    }
    catch(err)
    {
        //Request was too early; no time to acquire data.
        res.status(204).send('No data available.');
    }
};

//Export this class outside this file.
module.exports = RestHandlers;
