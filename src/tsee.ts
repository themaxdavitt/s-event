import {DefaultEventMap, EventEmitter} from 'tsee';

import fallback, {Arguments} from './util';

/**
 * Synchronous function to wait on an event from an `EventEmitter<...>` (from [`tsee`](https://github.com/Morglod/tsee)).
 * @param emitter The emitter to temporarily attach a listener for the event on.
 * @param event The event to listen for.
 * @returns A tuple (internally an array) of the arguments the event was emitted with.
 */
export default function on<
	Events extends DefaultEventMap,
	Event extends keyof Events
>(emitter: EventEmitter<Events>, event: Event): Arguments<Events[Event]> {
	return fallback(emitter, event);
}
