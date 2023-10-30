"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IframeManager = void 0;
var IframeManager = /** @class */ (function () {
    function IframeManager() {
        var _this = this;
        this.listener = function (event) {
            var data = event.data;
            var message = data.message;
            var _data = data.data;
            var stack = _this.event.get(message);
            if (!stack) {
                return;
            }
            stack.forEach(function (func) {
                func(_data);
            });
        };
        console.log('init iframe manager');
        this.event = new Map();
        if (typeof window == 'undefined') {
            console.log('window is undefined');
            return;
        }
        window.addEventListener('message', this.listener);
    }
    IframeManager.prototype.subscribe = function (eventName, func) {
        if (!this.event.has(eventName)) {
            this.event.set(eventName, new Set([func]));
            return;
        }
        var stack = this.event.get(eventName) || new Set();
        if (stack.has(func)) {
            console.error('has same function');
            return;
        }
        stack.add(func);
        this.event.set(eventName, stack);
    };
    IframeManager.prototype.unSubscribe = function (eventName, func) {
        if (!this.event.has(eventName)) {
            console.error('there are no subscribe');
            return;
        }
        var stack = this.event.get(eventName) || new Set();
        stack.delete(func);
        this.event.set(eventName, stack);
    };
    IframeManager.prototype.unSubscribeAll = function () {
        this.event = new Map();
    };
    IframeManager.prototype.triggerEvent = function (_a) {
        var _b;
        var iframeRef = _a.iframeRef, eventName = _a.eventName, data = _a.data;
        (_b = iframeRef === null || iframeRef === void 0 ? void 0 : iframeRef.contentWindow) === null || _b === void 0 ? void 0 : _b.postMessage({
            msg: eventName,
            data: data
        }, '*');
    };
    return IframeManager;
}());
exports.IframeManager = IframeManager;
