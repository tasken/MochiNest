(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SecureDfu = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
/*
* Web Bluetooth DFU
* Copyright (c) 2018 Rob Moran
*
* The MIT License (MIT)
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
/**
 * @hidden
 */
var EventDispatcher = /** @class */ (function (_super) {
    __extends(EventDispatcher, _super);
    function EventDispatcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // tslint:disable-next-line:array-type
    EventDispatcher.prototype.addEventListener = function (event, listener) {
        return _super.prototype.addListener.call(this, event, listener);
    };
    // tslint:disable-next-line:array-type
    EventDispatcher.prototype.removeEventListener = function (event, listener) {
        return _super.prototype.removeListener.call(this, event, listener);
    };
    EventDispatcher.prototype.dispatchEvent = function (eventType, event) {
        return _super.prototype.emit.call(this, eventType, event);
    };
    return EventDispatcher;
}(events_1.EventEmitter));
exports.EventDispatcher = EventDispatcher;

},{"events":4}],2:[function(require,module,exports){
"use strict";
/*
* Web Bluetooth DFU
* Copyright (c) 2018 Rob Moran
*
* The MIT License (MIT)
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
var secure_dfu_1 = require("./secure-dfu");
module.exports = secure_dfu_1.SecureDfu;

},{"./secure-dfu":3}],3:[function(require,module,exports){
"use strict";
/*
* Web Bluetooth DFU
* Copyright (c) 2018 Rob Moran
*
* The MIT License (MIT)
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var dispatcher_1 = require("./dispatcher");
var CONTROL_UUID = "8ec90001-f315-4f60-9fb8-838830daea50";
var PACKET_UUID = "8ec90002-f315-4f60-9fb8-838830daea50";
var BUTTON_UUID = "8ec90003-f315-4f60-9fb8-838830daea50";
var LITTLE_ENDIAN = true;
var PACKET_SIZE = 20;
var OPERATIONS = {
    BUTTON_COMMAND: [0x01],
    CREATE_COMMAND: [0x01, 0x01],
    CREATE_DATA: [0x01, 0x02],
    RECEIPT_NOTIFICATIONS: [0x02],
    CACULATE_CHECKSUM: [0x03],
    EXECUTE: [0x04],
    SELECT_COMMAND: [0x06, 0x01],
    SELECT_DATA: [0x06, 0x02],
    RESPONSE: [0x60, 0x20]
};
var RESPONSE = {
    // Invalid code
    0x00: "Invalid opcode",
    // Success
    0x01: "Operation successful",
    // Opcode not supported
    0x02: "Opcode not supported",
    // Invalid parameter
    0x03: "Missing or invalid parameter value",
    // Insufficient resources
    0x04: "Not enough memory for the data object",
    // Invalid object
    0x05: "Data object does not match the firmware and hardware requirements, the signature is wrong, or parsing the command failed",
    // Unsupported type
    0x07: "Not a valid object type for a Create request",
    // Operation not permitted
    0x08: "The state of the DFU process does not allow this operation",
    // Operation failed
    0x0A: "Operation failed",
    // Extended error
    0x0B: "Extended error"
};
var EXTENDED_ERROR = {
    // No error
    0x00: "No extended error code has been set. This error indicates an implementation problem",
    // Invalid error code
    0x01: "Invalid error code. This error code should never be used outside of development",
    // Wrong command format
    0x02: "The format of the command was incorrect",
    // Unknown command
    0x03: "The command was successfully parsed, but it is not supported or unknown",
    // Init command invalid
    0x04: "The init command is invalid. The init packet either has an invalid update type or it is missing required fields for the update type",
    // Firmware version failure
    0x05: "The firmware version is too low. For an application, the version must be greater than the current application. For a bootloader, it must be greater than or equal to the current version",
    // Hardware version failure
    0x06: "The hardware version of the device does not match the required hardware version for the update",
    // Softdevice version failure
    0x07: "The array of supported SoftDevices for the update does not contain the FWID of the current SoftDevice",
    // Signature missing
    0x08: "The init packet does not contain a signature",
    // Wrong hash type
    0x09: "The hash type that is specified by the init packet is not supported by the DFU bootloader",
    // Hash failed
    0x0A: "The hash of the firmware image cannot be calculated",
    // Wrong signature type
    0x0B: "The type of the signature is unknown or not supported by the DFU bootloader",
    // Verification failed
    0x0C: "The hash of the received firmware image does not match the hash in the init packet",
    // Insufficient space
    0x0D: "The available space on the device is insufficient to hold the firmware"
};
/**
 * Secure Device Firmware Update class
 */
var SecureDfu = /** @class */ (function (_super) {
    __extends(SecureDfu, _super);
    /**
     * Characteristic constructor
     * @param bluetooth A bluetooth instance
     * @param crc32 A CRC32 function
     * @param delay Milliseconds of delay between packets
     */
    function SecureDfu(crc32, bluetooth, delay) {
        if (delay === void 0) { delay = 0; }
        var _this = _super.call(this) || this;
        _this.crc32 = crc32;
        _this.bluetooth = bluetooth;
        _this.delay = delay;
        _this.DEFAULT_UUIDS = {
            service: SecureDfu.SERVICE_UUID,
            button: BUTTON_UUID,
            control: CONTROL_UUID,
            packet: PACKET_UUID
        };
        _this.notifyFns = {};
        _this.controlChar = null;
        _this.packetChar = null;
        if (!_this.bluetooth && window && window.navigator && window.navigator.bluetooth) {
            _this.bluetooth = navigator.bluetooth;
        }
        return _this;
    }
    SecureDfu.prototype.log = function (message) {
        this.dispatchEvent(SecureDfu.EVENT_LOG, {
            message: message
        });
    };
    SecureDfu.prototype.progress = function (bytes) {
        this.dispatchEvent(SecureDfu.EVENT_PROGRESS, {
            object: "unknown",
            totalBytes: 0,
            currentBytes: bytes
        });
    };
    SecureDfu.prototype.connect = function (device) {
        var _this = this;
        device.addEventListener("gattserverdisconnected", function () {
            _this.notifyFns = {};
            _this.controlChar = null;
            _this.packetChar = null;
        });
        return this.gattConnect(device)
            .then(function (characteristics) {
            _this.log("found " + characteristics.length + " characteristic(s)");
            _this.packetChar = characteristics.find(function (characteristic) {
                return (characteristic.uuid === PACKET_UUID);
            });
            if (!_this.packetChar)
                throw new Error("Unable to find packet characteristic");
            _this.log("found packet characteristic (writeWithoutResponse=" + !!_this.packetChar.properties.writeWithoutResponse + ")");
            _this.controlChar = characteristics.find(function (characteristic) {
                return (characteristic.uuid === CONTROL_UUID);
            });
            if (!_this.controlChar)
                throw new Error("Unable to find control characteristic");
            _this.log("found control characteristic");
            if (!_this.controlChar.properties.notify && !_this.controlChar.properties.indicate) {
                throw new Error("Control characteristic does not allow notifications");
            }
            return _this.controlChar.startNotifications();
        })
            .then(function () {
            _this.controlChar.addEventListener("characteristicvaluechanged", _this.handleNotification.bind(_this));
            _this.log("enabled control notifications");
            return device;
        });
    };
    SecureDfu.prototype.gattConnect = function (device, serviceUUID) {
        var _this = this;
        if (serviceUUID === void 0) { serviceUUID = SecureDfu.SERVICE_UUID; }
        return Promise.resolve()
            .then(function () {
            if (device.gatt.connected)
                return device.gatt;
            return device.gatt.connect();
        })
            .then(function (server) {
            _this.log("connected to gatt server");
            return server.getPrimaryService(serviceUUID)
                .catch(function () {
                throw new Error("Unable to find DFU service");
            });
        })
            .then(function (service) {
            _this.log("found DFU service");
            return service.getCharacteristics();
        });
    };
    SecureDfu.prototype.handleNotification = function (event) {
        var view = event.target.value;
        if (OPERATIONS.RESPONSE.indexOf(view.getUint8(0)) < 0) {
            throw new Error("Unrecognised control characteristic response notification");
        }
        var operation = view.getUint8(1);
        if (this.notifyFns[operation]) {
            var result = view.getUint8(2);
            var error = null;
            if (result === 0x01) {
                var data = new DataView(view.buffer, 3);
                this.notifyFns[operation].resolve(data);
            }
            else if (result === 0x0B) {
                var code = view.getUint8(3);
                error = "Error: " + EXTENDED_ERROR[code];
            }
            else {
                error = "Error: " + RESPONSE[result];
            }
            if (error) {
                this.log("notify: " + error);
                this.notifyFns[operation].reject(error);
            }
            delete this.notifyFns[operation];
        }
    };
    SecureDfu.prototype.sendOperation = function (characteristic, operation, buffer) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var size = operation.length;
            if (buffer)
                size += buffer.byteLength;
            var value = new Uint8Array(size);
            value.set(operation);
            if (buffer) {
                var data = new Uint8Array(buffer);
                value.set(data, operation.length);
            }
            _this.notifyFns[operation[0]] = {
                resolve: resolve,
                reject: reject
            };
            characteristic.writeValueWithResponse(value)
                .catch(function (e) {
                _this.log(e);
                return Promise.resolve()
                    .then(function () { return _this.delayPromise(500); })
                    // Retry once
                    .then(function () { return characteristic.writeValueWithResponse(value); });
            });
        });
    };
    SecureDfu.prototype.sendControl = function (operation, buffer) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sendOperation(_this.controlChar, operation, buffer)
                .then(function (resp) {
                setTimeout(function () { return resolve(resp); }, _this.delay);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    SecureDfu.prototype.transferInit = function (buffer) {
        return this.transfer(buffer, "init", OPERATIONS.SELECT_COMMAND, OPERATIONS.CREATE_COMMAND);
    };
    SecureDfu.prototype.transferFirmware = function (buffer) {
        return this.transfer(buffer, "firmware", OPERATIONS.SELECT_DATA, OPERATIONS.CREATE_DATA);
    };
    SecureDfu.prototype.transfer = function (buffer, type, selectType, createType) {
        var _this = this;
        return this.sendControl(selectType)
            .then(function (response) {
            var maxSize = response.getUint32(0, LITTLE_ENDIAN);
            var offset = response.getUint32(4, LITTLE_ENDIAN);
            var crc = response.getInt32(8, LITTLE_ENDIAN);
            if (type === "init" && offset === buffer.byteLength && _this.checkCrc(buffer, crc)) {
                _this.log("init packet already available, skipping transfer");
                return;
            }
            _this.progress = function (bytes) {
                _this.dispatchEvent(SecureDfu.EVENT_PROGRESS, {
                    object: type,
                    totalBytes: buffer.byteLength,
                    currentBytes: bytes
                });
            };
            _this.progress(0);
            return _this.transferObject(buffer, createType, maxSize, offset);
        });
    };
    SecureDfu.prototype.transferObject = function (buffer, createType, maxSize, offset) {
        var _this = this;
        var start = offset - offset % maxSize;
        var end = Math.min(start + maxSize, buffer.byteLength);
        var view = new DataView(new ArrayBuffer(4));
        view.setUint32(0, end - start, LITTLE_ENDIAN);
        return this.sendControl(createType, view.buffer)
            .then(function () {
            var data = buffer.slice(start, end);
            return _this.transferData(data, start);
        })
            .then(function () {
            return _this.sendControl(OPERATIONS.CACULATE_CHECKSUM);
        })
            .then(function (response) {
            var crc = response.getInt32(4, LITTLE_ENDIAN);
            var transferred = response.getUint32(0, LITTLE_ENDIAN);
            var data = buffer.slice(0, transferred);
            if (_this.checkCrc(data, crc)) {
                _this.log("written " + transferred + " bytes");
                offset = transferred;
                return _this.sendControl(OPERATIONS.EXECUTE);
            }
            else {
                _this.log("object failed to validate");
            }
        })
            .then(function () {
            if (end < buffer.byteLength) {
                return _this.transferObject(buffer, createType, maxSize, offset);
            }
            else {
                _this.log("transfer complete");
            }
        });
    };
    SecureDfu.prototype.transferData = function (data, offset, start) {
        var _this = this;
        start = start || 0;
        if (!this.packetChar) return Promise.reject(new Error("Device disconnected during transfer."));
        var end = Math.min(start + PACKET_SIZE, data.byteLength);
        var packet = data.slice(start, end);
        var writeMethod = this.packetChar.properties.writeWithoutResponse ? "writeValueWithoutResponse" : "writeValueWithResponse";
        return this.packetChar[writeMethod](packet)
            .then(function () { return _this.delayPromise(_this.delay); })
            .then(function () {
            _this.progress(offset + end);
            if (end < data.byteLength) {
                return _this.transferData(data, offset, end);
            }
        });
    };
    SecureDfu.prototype.checkCrc = function (buffer, crc) {
        if (!this.crc32) {
            this.log("crc32 not found, skipping CRC check");
            return true;
        }
        return crc === this.crc32(new Uint8Array(buffer));
    };
    SecureDfu.prototype.delayPromise = function (delay) {
        return new Promise(function (resolve) {
            setTimeout(resolve, delay);
        });
    };
    /**
     * Scans for a device to update
     * @param buttonLess Scans for all devices and will automatically call `setDfuMode`
     * @param filters Alternative filters to use when scanning
     * @param uuids Optional alternative uuids for service, control, packet or button
     * @returns Promise containing the device
     */
    SecureDfu.prototype.requestDevice = function (buttonLess, filters, uuids) {
        var _this = this;
        if (uuids === void 0) { uuids = this.DEFAULT_UUIDS; }
        uuids = __assign(__assign({}, this.DEFAULT_UUIDS), uuids);
        if (!buttonLess && !filters) {
            filters = [{ services: [uuids.service] }];
        }
        var options = {
            optionalServices: [uuids.service]
        };
        if (filters)
            options.filters = filters;
        else
            options.acceptAllDevices = true;
        return this.bluetooth.requestDevice(options)
            .then(function (device) {
            if (buttonLess) {
                return _this.setDfuMode(device, uuids);
            }
            return device;
        });
    };
    /**
     * Sets the DFU mode of a device, preparing it for update
     * @param device The device to switch mode
     * @param uuids Optional alternative uuids for control, packet or button
     * @returns Promise containing the device if it is still on a valid state
     */
    SecureDfu.prototype.setDfuMode = function (device, uuids) {
        var _this = this;
        if (uuids === void 0) { uuids = this.DEFAULT_UUIDS; }
        uuids = __assign(__assign({}, this.DEFAULT_UUIDS), uuids);
        return this.gattConnect(device, uuids.service)
            .then(function (characteristics) {
            _this.log("found " + characteristics.length + " characteristic(s)");
            var controlChar = characteristics.find(function (characteristic) {
                return (characteristic.uuid === uuids.control);
            });
            var packetChar = characteristics.find(function (characteristic) {
                return (characteristic.uuid === uuids.packet);
            });
            if (controlChar && packetChar) {
                return device;
            }
            var buttonChar = characteristics.find(function (characteristic) {
                return (characteristic.uuid === uuids.button);
            });
            if (!buttonChar) {
                throw new Error("Unsupported device");
            }
            // Support buttonless devices
            _this.log("found buttonless characteristic");
            if (!buttonChar.properties.notify && !buttonChar.properties.indicate) {
                throw new Error("Buttonless characteristic does not allow notifications");
            }
            return new Promise(function (resolve, _reject) {
                function complete() {
                    this.notifyFns = {};
                    // Resolve with null device as it needs reconnecting
                    resolve(null);
                }
                buttonChar.startNotifications()
                    .then(function () {
                    _this.log("enabled buttonless notifications");
                    device.addEventListener("gattserverdisconnected", complete.bind(_this));
                    buttonChar.addEventListener("characteristicvaluechanged", _this.handleNotification.bind(_this));
                    return _this.sendOperation(buttonChar, OPERATIONS.BUTTON_COMMAND);
                })
                    .then(function () {
                    _this.log("sent DFU mode");
                    complete.call(_this);
                });
            });
        });
    };
    /**
     * Updates a device
     * @param device The device to switch mode
     * @param init The initialisation packet to send
     * @param firmware The firmware to update
     * @returns Promise containing the device
     */
    SecureDfu.prototype.update = function (device, init, firmware) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!device)
                return reject("Device not specified");
            if (!init)
                return reject("Init not specified");
            if (!firmware)
                return reject("Firmware not specified");
            _this.connect(device)
                .then(function () {
                _this.log("transferring init");
                return _this.transferInit(init);
            })
                .then(function () {
                _this.log("transferring firmware");
                return _this.transferFirmware(firmware);
            })
                .then(function () {
                _this.log("complete, disconnecting...");
                device.addEventListener("gattserverdisconnected", function () {
                    _this.log("disconnected");
                    resolve(device);
                });
            })
                .catch(function (error) {
                if (_this.delay === 0) {
                    _this.log("DFU update failed, but delay=0. Trying again with delay=10...");
                    _this.delay = 10;
                    return _this.update(device, init, firmware);
                }
                reject(error);
            });
        });
    };
    /**
     * DFU Service unique identifier
     */
    SecureDfu.SERVICE_UUID = 0xFE59;
    /**
     * Log event
     * @event
     */
    SecureDfu.EVENT_LOG = "log";
    /**
     * Progress event
     * @event
     */
    SecureDfu.EVENT_PROGRESS = "progress";
    return SecureDfu;
}(dispatcher_1.EventDispatcher));
exports.SecureDfu = SecureDfu;

},{"./dispatcher":1}],4:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var objectCreate = Object.create || objectCreatePolyfill
var objectKeys = Object.keys || objectKeysPolyfill
var bind = Function.prototype.bind || functionBindPolyfill

function EventEmitter() {
  if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
    this._events = objectCreate(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

var hasDefineProperty;
try {
  var o = {};
  if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });
  hasDefineProperty = o.x === 0;
} catch (err) { hasDefineProperty = false }
if (hasDefineProperty) {
  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      // check whether the input is a positive number (whose value is zero or
      // greater and not a NaN).
      if (typeof arg !== 'number' || arg < 0 || arg !== arg)
        throw new TypeError('"defaultMaxListeners" must be a positive number');
      defaultMaxListeners = arg;
    }
  });
} else {
  EventEmitter.defaultMaxListeners = defaultMaxListeners;
}

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    if (arguments.length > 1)
      er = arguments[1];
    if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Unhandled "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
      // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
      // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = objectCreate(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
          listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
          prepend ? [listener, existing] : [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
            existing.length + ' "' + String(type) + '" listeners ' +
            'added. Use emitter.setMaxListeners() to ' +
            'increase limit.');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        if (typeof console === 'object' && console.warn) {
          console.warn('%s: %s', w.name, w.message);
        }
      }
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    switch (arguments.length) {
      case 0:
        return this.listener.call(this.target);
      case 1:
        return this.listener.call(this.target, arguments[0]);
      case 2:
        return this.listener.call(this.target, arguments[0], arguments[1]);
      case 3:
        return this.listener.call(this.target, arguments[0], arguments[1],
            arguments[2]);
      default:
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i)
          args[i] = arguments[i];
        this.listener.apply(this.target, args);
    }
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = bind.call(onceWrapper, state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = objectCreate(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else
          spliceOne(list, position);

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = objectCreate(null);
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = objectCreate(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = objectKeys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = objectCreate(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (!events)
    return [];

  var evlistener = events[type];
  if (!evlistener)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function objectCreatePolyfill(proto) {
  var F = function() {};
  F.prototype = proto;
  return new F;
}
function objectKeysPolyfill(obj) {
  var keys = [];
  for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {
    keys.push(k);
  }
  return k;
}
function functionBindPolyfill(context) {
  var fn = this;
  return function () {
    return fn.apply(context, arguments);
  };
}

},{}]},{},[2])(2)
});
