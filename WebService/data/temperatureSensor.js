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
var events = require('events');
var iButtonTProbe = require('../peripherals/iButtonTProbe.js');

/**
 * Defines a class abstraction for an event-driven Temperature Sensor abstraction, 
 * which encapsulates an iButton T-Probe DS18B20 sensor.
 */
function TemperatureSensor()
{
    //Create new DS18B20 sensor instance.
    this.m_iButtonTProbe = new iButtonTProbe();

    //Set state variables.
    this.m_intervalId = 0;
    this.m_isRunning = false;

    //Error statistics.
    this.m_numOutBoundsMinReadings = 0;
    this.m_numOutBoundsMaxReadings = 0;

    //Execute EventEmmitter's constructor...
    events.EventEmitter.call(this);
};

//...and copy all of it's properties to our object instance.
TemperatureSensor.prototype.__proto__ = events.EventEmitter.prototype;

/**
 * Clears error statistics.
 */
TemperatureSensor.prototype.clear = function()
{
    this.m_numOutBoundsMinReadings = 0;
    this.m_numOutBoundsMaxReadings = 0;
};

/**
 * Starts the event driven temperature sensor.
 */
TemperatureSensor.prototype.start = function()
{
    //Start repeated timer at suggested sampling rate for our peripheral.
    if (this.m_isRunning == false)
    {
        this.m_intervalId = setInterval(this.onTimerElapsed.bind(this), this.m_iButtonTProbe.POLL_INTERVAL_MS);

        this.m_isRunning = true;
    }
};

/**
 * Stops the event driven temperature sensor.
 */
TemperatureSensor.prototype.stop = function()
{
    //Stop timer for this instance.
    if (this.m_isRunning == true)
    {
        clearInterval(this.m_intervalId);

        this.m_intervalId = 0;
        this.m_isRunning = false;
    }
};

/**
 * Queries error statistics associated with the temperature sensor.
 */
TemperatureSensor.prototype.getErrorStats = function()
{
    var errorStats = {};

    //Bundle stats in an object.
    errorStats.numOutBoundsMinReadings = this.m_numOutBoundsMinReadings;
    errorStats.numOutBoundsMaxReadings = this.m_numOutBoundsMaxReadings;

    return errorStats;
};

/**
 * Callback handler for timer invocations.
 *
 * @remarks Temperature sensor requires several I/O steps: USB to RJ45 to 
 *          sensor electronics and back.  We must do this asynchronously.
 */
TemperatureSensor.prototype.onTimerElapsed = function()
{
    //Asynchronously get latest temperature reading and publish it to interested parties.
    this.m_iButtonTProbe.readAsync(this.onTemperatureRead.bind(this));
};

/**
 * Callback handler for queried temperature reading from USB/RJ-45 peripheral.
 *
 * @param temperatureCelsius Temperature in degrees Celsius.
 */
TemperatureSensor.prototype.onTemperatureRead = function(temperatureCelsius)
{
    //Coerce data if it fell out of range and update error statistics.
    if (temperatureCelsius < this.m_iButtonTProbe.MIN_TEMPERATURE_CELSIUS)
    {
        temperatureCelsius = this.m_iButtonTProbe.MIN_TEMPERATURE_CELSIUS;

        ++this.m_numOutBoundsMinReadings;
    }
    else if (temperatureCelsius > this.m_iButtonTProbe.MAX_TEMPERATURE_CELSIUS)
    {
        temperatureCelsius = this.m_iButtonTProbe.MAX_TEMPERATURE_CELSIUS;

        ++this.m_numOutBoundsMaxReadings;
    }

    //Create reading object.
    var reading = {};

    reading.timestamp = Date.now();
    reading.temperatureCelsius = temperatureCelsius;

    //Publish.
    this.emit('dataReceived', reading);
}

//Export this class outside this file.
module.exports = TemperatureSensor;
