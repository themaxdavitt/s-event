import TypedEmitter from 'typed-emitter';

import fallback, {Arguments} from './util';

/**
 * Untyped synchronous function to wait on an event from an emitter and return its arguments.
 *
 * @param emitter Anything with a callable property named `once` (unchecked), invoked as: `emitter.once(event, (...args: any[]): void => { ... })`
 * @param event Anything that can be used as a valid event type (unchecked), used for: `emitter.once(event, ...)`
 */
export default function on<Events, E extends keyof Events>(
	emitter: TypedEmitter<Events>,
	event: E
): Arguments<Events[E]> {
	return fallback(emitter, event);
}
