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
 * Defines a class abstraction for the iButton T-Probe DS18B20 sensor.
 *
 * @remarks Sensor is attached via a RJ-45 patch cable to an iButton LinuUSB
 *          converter specifically designed to match impedenences.
 * @see http://www.ibuttonlink.com/collections/t-probes
 * @seealso http://www.ibuttonlink.com/products/linkusb
 * @seealso http://datasheets.maximintegrated.com/en/ds/DS18B20.pdf
 */
function iButtonTProbe()
{
    //Constants for the DS18B20 temperature sensor.
    this.MIN_TEMPERATURE_CELSIUS = -55.0;
    this.MAX_TEMPERATURE_CELSIUS = +125.0;

    this.POLL_INTERVAL_MS = 750;

    //Private Variables and Methods.
    this.m_numberOfOutOfRangeReadings = 0;
};

/**
 * Asynchronously queries the iButton T-Probe sensor via USB for the current reading.
 *
 * @param Callback to invoke which takes a floating point argument for temperature celsius result.
 * @return Temperature value, in Celsius.
 * @remarks Temperature is coerced in the event that an out of range value is queried.
 */
iButtonTProbe.prototype.readAsync = function(readCallback)
{
    ///////////////////////////////////////////////////
    //TODO:  Actual sensor logic when hardware arrives.
    var temperatureCelsius = Math.floor((Math.random() * 150) + 1)
    ///////////////////////////////////////////////////

    //Invoke the callback with the current temperature value.
    readCallback(temperatureCelsius);
};

//Export this class outside this file.
module.exports = iButtonTProbe;
