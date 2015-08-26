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
var exec = require('child_process').exec;

/**
 * Defines a class abstraction for controlling the YepKit YKUSH USB Switch.
 * Open hardware unit allows developers to programmatically enable power 
 * via a command-line interface supplied by YepKit (i.e. software).
 *
 * @see https://www.yepkit.com/products/ykush
 * @seealso https://www.yepkit.com/uploads/documents/09c6d_YKUSH_ProductManual_v1.1.1.pdf
 */
function YKUSHUSBSwitch()
{
    //Declare constants.
    this.NUM_USB_PORTS = 3;

    //Configure all ports as powered off.
    this.m_powerStates = [ false, false, false ];

    for (i = 0; i < this.NUM_USB_PORTS; i++)
        this.powerAsync(i, false);
}

/**
 * Powers or unpowers one of the supported USB ports on the YepKit YKUSH
 * USB Switch hardware.
 *
 * @param port USB port number to power; 0-based.
 * @param powerOn true to enable power; false otherwise.
 */
YKUSHUSBSwitch.prototype.powerAsync = function(port, powerOn)
{
    var YKUSH_CMD_BIN = "ykush";

    var YKUSH_CMD_POWER_ON_OPT = "-u";
    var YKUSH_CMD_POWER_OFF_OPT = "-d";

    //Parameter Validations.
    if (port < 0 || port >= this.NUM_USB_PORTS)
        throw "Invalid port number. Count: " + String(port);

    //Build the command-line string.
    var cmd = "";

    if (powerOn == true)
        cmd = YKUSH_CMD_BIN + " " + YKUSH_CMD_POWER_ON_OPT + " " + String(port);
    else
        cmd = YKUSH_CMD_BIN + " " + YKUSH_CMD_POWER_OFF_OPT + " " + String(port);

    //Asynchronously invoke the command-line.
    exec(cmd, function(error, stdout, stderr)
        {
            //TODO:  Parse error / stdout / stderr to ascertain errors.

            //Update state.
            this.m_powerStates[port] = enable;
        });
}

/**
 * Gets the current power state of a YKUSH USB Switched port.
 *
 * @param port USB port to query.
 * @return true if powered; false otherwise.
 */
YKUSHUSBSwitch.prototype.isPowered = function(port)
{
    //Parameter Validations.
    if (port < 0 || port >= this.NUM_USB_PORTS)
        throw "Invalid port number. Count: " + String(port);

    //Lookup the state and return it.
    return this.m_powerStates[port];
}

//Export this class outside this file.
module.exports = YKUSHUSBSwitch;
