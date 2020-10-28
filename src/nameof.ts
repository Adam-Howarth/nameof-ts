import { NameofOptions } from "./interfaces/nameof-options.interface";

function cleanseAssertionOperators(parsedName: string): string {
	return parsedName.replace(/[?!]/g, "");
}

export function nameof<T extends Object>(nameFunction: ((obj: T) => any) | { new(...params: any[]): T }, options?: NameofOptions): string {
	const fnStr = nameFunction.toString();

	// ES6 class name:
	// "class ClassName { ..."
	if (
		fnStr.startsWith("class ")
		// Theoretically could, for some ill-advised reason, be "class => class.prop".
		&& !fnStr.startsWith("class =>")
	) {
		return cleanseAssertionOperators(
			fnStr.substring(
				"class ".length,
				fnStr.indexOf(" {")
			)
		);
	}

	// ES6 prop selector:
	// "x => x.prop"
	if (fnStr.includes("=>")) {
		return cleanseAssertionOperators(
			fnStr.substring(
				options?.lastProp ? fnStr.lastIndexOf(".") + 1 : fnStr.indexOf(".") + 1
			)
		);
	}

	// Invalid function.
	throw new Error("ts-nameof: Invalid function.");
}
