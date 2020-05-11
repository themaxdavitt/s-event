import {loopWhile} from 'deasync';

/**
 * Constructs a tuple of arguments from function `T` (used with event handler types). Stolen from [`typed-emitter`](https://github.com/andywer/typed-emitter/blob/2942782ce940518e2e0841ac117ef178268ef493/index.d.ts#L1-L3). Similar to builtin [`Parameters<T>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterst) and `ArgsN` from [`tsargs`](https://github.com/Morglod/tsargs)?
 */
export type Arguments<T> = [T] extends [(...args: infer U) => any]
	? U
	: [T] extends [void]
	? []
	: [T];

/**
 * Untyped synchronous function to wait on an event from an emitter.
 * @param emitter Anything with synchronously callable properties `on` and `off` (unchecked), invoked like: `emitter.on(event, listener)` and `emitter.off(event, listener)` where `listener: (...args: any[]) => void`. 
 * @param event Anything that can be used as a valid event type (unchecked), invoked like: `emitter.on(event, ...)` and `emitter.off(event, ...)`.
 * @returns An array of the arguments the event was emitted with.
 */
export default function on(emitter: any, event: any): any {
	let values: any[] | undefined;
	let emitted = false;

	const listener = (...args: any[]): void => {
		values = emitted ? values : args;
		emitted = true;
	};

	// The call signature for .once isn't universal amongst custom emitters, but .on/.off typically are
	emitter.on(event, listener);

	loopWhile(() => !emitted);

	emitter.off(event, listener);

	return values;
}
