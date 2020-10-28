"use strict";
exports.__esModule = true;
exports.nameof = void 0;
function cleanseAssertionOperators(parsedName) {
    return parsedName.replace(/[?!]/g, "");
}
function nameof(nameFunction, options) {
    var fnStr = nameFunction.toString();
    // ES6 class name:
    // "class ClassName { ..."
    if (fnStr.startsWith("class ")
        // Theoretically could, for some ill-advised reason, be "class => class.prop".
        && !fnStr.startsWith("class =>")) {
        return cleanseAssertionOperators(fnStr.substring("class ".length, fnStr.indexOf(" {")));
    }
    // ES6 prop selector:
    // "x => x.prop"
    if (fnStr.includes("=>")) {
        return cleanseAssertionOperators(fnStr.substring((options === null || options === void 0 ? void 0 : options.lastProp) ? fnStr.lastIndexOf(".") + 1 : fnStr.indexOf(".") + 1));
    }
    // Invalid function.
    throw new Error("nameof-ts: Invalid function.");
}
exports.nameof = nameof;
