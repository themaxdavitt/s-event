import StrictEventEmitter from 'strict-event-emitter-types';

import fallback, {Arguments} from './util';

/**
 * Synchronous function to wait on an event from a `StrictEventEmitter<..., ...>`.
 * @param emitter The emitter to temporarily attach a listener for the event on.
 * @param event The event to listen for.
 * @returns A tuple (internally an array) of the arguments the event was emitted with.
 */
export default function on<Emitter, Events, Event extends keyof Events>(
	emitter: StrictEventEmitter<Emitter, Events>,
	event: Event
): Arguments<Events[Event]> {
	return fallback(emitter, event);
}
