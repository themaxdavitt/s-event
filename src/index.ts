import {EventEmitter} from 'events';

import fallback from './util';

/**
 * Synchronous function to wait on an event from an `EventEmitter`.
 * @param emitter The emitter to temporarily attach a listener for the event on.
 * @param event The event to listen for.
 * @returns An array of the arguments the event was emitted with.
 */
export default function on(
	emitter: EventEmitter,
	event: string | symbol
): any[] {
	return fallback(emitter, event);
}
