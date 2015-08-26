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
var YKUSHUSBSwitch = require('./YKUSHUSBSwitch.js');

/**
 * Defines a class abstraction for a generic USB powered fan.
 *
 * @remarks USB Fan is assumed to be connected to the YKUSH USB Switch.
 * @see http://www.amazon.com/gp/product/B001NJ27QM?psc=1&redirect=true&ref_=oh_aui_detailpage_o00_s00
 */
function USBFan(ykushPort)
{
    this.m_port = ykushPort;

    this.m_usbSwitch = new YKUSHUSBSwitch();
}

/**
 * Powers or unpowers a USB fan.
 */
USBFan.prototype.powerAsync = function(powerOn)
{
    //Only toggle power if we're in the opposite state.
    if (powerOn != this.m_usbSwitch.isPowered())
        this.m_usbSwitch.powerAsync(powerOn);
}

/**
 * Defines useable USB Fan instances for all known ports and hardware within Project Reindeer.
 */
var USBFan0 = new USBFan(0);
var USBFan1 = new USBFan(1);
var USBFan2 = new USBFan(2);

//Export this class outside this file.
module.exports = USBFan0;
module.exports = USBFan1;
module.exports = USBFan2;
