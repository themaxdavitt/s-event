import {loopWhile} from 'deasync';

/**
 * Constructs a tuple of arguments from function `T` (used with event handler types). Stolen from [`typed-emitter`](https://github.com/andywer/typed-emitter/blob/2942782ce940518e2e0841ac117ef178268ef493/index.d.ts#L1-L3). Smarter than builtin [`Parameters<T>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterst), similar to `ArgsN` from [`tsargs`](https://github.com/Morglod/tsargs)?
 */
export type Arguments<T> = [T] extends [(...args: infer U) => any]
	? U
	: [T] extends [void]
	? []
	: [T];

/**
 * Untyped synchronous function to wait on an event from an emitter.
 * @param emitter Anything with a callable property named `once` (unchecked), invoked as: `emitter.once(event, (...args: any[]): void => { ... })`
 * @param event Anything that can be used as a valid event type (unchecked), used for: `emitter.once(event, ...)`
 * @returns An array of the arguments the event was emitted with.
 */
export default function on(emitter: any, event: any): any {
	let values: any[] | undefined;
	let emitted = false;

	emitter.once(event, (...args: any[]): void => {
		emitted = true;
		values = args;
	});

	loopWhile(() => !emitted);

	return values;
}
