import {loopWhile} from 'deasync';

/**
 * Tuple of arguments from function `T` (used with event handler types). Smarter than builtin `Parameters<T>`?
 *
 * Stolen from: https://github.com/andywer/typed-emitter/blob/2942782ce940518e2e0841ac117ef178268ef493/index.d.ts#L1-L3
 */
export type Arguments<T> = [T] extends [(...args: infer U) => any]
	? U
	: [T] extends [void]
	? []
	: [T];

/**
 * Untyped synchronous function to wait on an event from an emitter and return its arguments.
 * @param emitter Anything with a callable property named `once` (unchecked), invoked as: `emitter.once(event, (...args: any[]): void => { ... })`
 * @param event Anything that can be used as a valid event type (unchecked), used for: `emitter.once(event, ...)`
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
