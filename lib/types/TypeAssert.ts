function debugValue(value: unknown): string {
	if (value === undefined) {
		return 'undefined';
	}
	let asStirng = '';
	asStirng = typeof (value) === 'function' ? value.toString() : JSON.stringify(value);
	if (asStirng.length < 100)
	{return asStirng;}
	return asStirng.slice(0, 97) + '...';
}

class TypeAssert {
	constructor() {
		throw new Error('do not constuct me');
	}

	dummy(): void {}

	static assertNotArray<T>(arg: T | T[], name = 'parameter'): asserts arg is T {
		if (Array.isArray(arg)) {
			throw new TypeError(`E001 ${name} cannot be an array. current value is ${debugValue(arg)}.`);
		}
	}

	static assertIsArray2D<T>(arg: unknown, name = 'parameter'): asserts arg is T[][] {
		if (!Array.isArray(arg)) {
			throw new TypeError(`E002 ${name} is not an array. current value is ${debugValue(arg)}.`);
		}
		if (arg.length === 0)
		{return;}
		if (!Array.isArray(arg[0])) {
			throw new TypeError(`E003 ${name} must be an array of array. current value is ${debugValue(arg)}.`);
		}
		// Allow type number[][][]
	}

	static assertIsArray2DOrFnc<T>(arg: unknown, name = 'parameter'): asserts arg is T[][] | Function {
		if (typeof (arg) === 'function')
		{return;}
		TypeAssert.assertIsArray2D(arg, name);
	}

	/**
     * ensure that the provided arg is a number, number[], or number[][]
     * @param arg
     * @param name
     * @returns
     */
	static assertIsNumbersArray(arg: unknown, name = 'parameter'): asserts arg is number[][] | number[] | number {
		if (typeof arg === 'number') {
			return;
		}
		if (!TypeAssert.isArray(arg)) {
			throw new TypeError(`E004 ${name} is not an array. current value is ${debugValue(arg)}.`);
		}
		if (arg.length === 0) {
			return;
		}
		if (typeof arg[0] === 'number') {
			return;
		}
		if (!TypeAssert.isArray(arg[0])) {
			throw new TypeError(`E005 ${name} is not an array of array. current value is ${debugValue(arg)}.`);
		}
		if (typeof (arg[0][0]) !== 'number') {
			throw new TypeError(`E006 ${name} is not an array of array of number. current value is ${debugValue(arg)}.`);
		}
	}

	static isArray2D(obj: unknown): obj is number[][] {
		if (!Array.isArray(obj)) {
			return false;
		}
		return (Array.isArray(obj[0]));
	}

	static isArray1D(obj: unknown): obj is number[] {
		if (!Array.isArray(obj)) {
			return false;
		}
		return (typeof (obj[0]) === 'number');
	}

	static isArray<T>(obj: T | T[]): obj is T[] {
		if (!Array.isArray(obj)) {
			return false;
		}
		return true;
	}

	static isFunction(arg: unknown):  arg is Function {
		if (typeof (arg) === 'function') {
			return true;
			// throw new TypeError(`E000 ${name} cannot be a fucntion. current value is ${debugValue(arg)}.`);
		}
		return false;
	}

}

export default TypeAssert;

