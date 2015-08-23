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
var temperatureSensor = require('./data/temperatureSensor.js');

/**
 * Defines a class abstraction to group common logic for sensor data acquisitions.
 *
 * @param sensors Object containing all sensors used by Project Reindeer.
 * @param dataStore Instance of master database data store.
 * @remarks Currently (Aug2015) there is only one sensor (i.e. temperature); however, we 
 *          anticipate adding more sensors as this project matures (e.g. camera, LEDs, etc).
 *          Sensor data goes to the database.
 * @remarks Configures data subscriptions.
 */ 
function SensorHandlers(sensors, dataStore)
{
    //Save off the datastore.
    this.m_dataStoreRef = dataStore;

    //Subscribe to sensor data events.
    sensors.temperatureSensor.on('dataReceived', this.OnTemperatureSensorDataReceived.bind(this));
};

/**
 * Handler for event driven temperature data (Celsius).
 *
 * @param reading Object containing timestamped reading.
 */
SensorHandlers.prototype.OnTemperatureSensorDataReceived = function(reading)
{
    //Save this reading in the data store.
    this.m_dataStoreRef.addTemperatureReading(reading);
}

//Export this class outside this file.
module.exports = SensorHandlers;
