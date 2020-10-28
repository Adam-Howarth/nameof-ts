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
    // ES5 prop selector:
    // "function (x) { return x.prop; }"
    var matchRegex = /function\s*\(\w+\)\s*\{[\r\n\s]*return\s+\w+\.((\w+\.)*(\w+))/i;
    var es5Match = fnStr.match(matchRegex);
    if (es5Match) {
        return (options && options.lastProp)
            ? es5Match[3]
            : es5Match[1];
    }
    // ES5 class name:
    // "function ClassName() { ..."
    if (fnStr.startsWith("function ")) {
        return cleanseAssertionOperators(fnStr.substring("function ".length, fnStr.indexOf("(")));
    }
    // Invalid function.
    throw new Error("nameof-ts: Invalid function.");
}
exports.nameof = nameof;
