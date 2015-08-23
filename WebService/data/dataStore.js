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

/**
 * Defines class abstraction for data queries against the <Time Series Database>.  //TODO
 */
function DataStore()
{
    this.m_temperatureReading = {};
    this.m_hasTemperature = false;
};

/**
 * Adds a timestamped temperature reading to the database data store.
 *
 * @param reading Timestamped temperature reading to add.
 */
DataStore.prototype.addTemperatureReading = function(reading)
{
    this.m_temperatureReading = reading;

    this.m_hasTemperature = true;
};

/**
 * Queries the most recent temperature value from cached data.
 *
 * @remarks Non-Blocking.
 */
DataStore.prototype.getCurrentTemperature = function()
{
    if (this.m_hasTemperature == false)
        throw "No data available";

    return this.m_temperatureReading;
};

//Export this class outside this file.
module.exports = DataStore;
