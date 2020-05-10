import StrictEventEmitter from 'strict-event-emitter-types';

import fallback, {Arguments} from './util';

/**
 * Synchronous function to wait on an event from a `StrictEventEmitter<..., ...>` and return an array of the arguments it was emitted with.
 * @param emitter
 * @param event
 * @returns An array of the arguments the event was emitted with.
 */
export default function on<Emitter, Events, Event extends keyof Events>(
	emitter: StrictEventEmitter<Emitter, Events>,
	event: Event
): Arguments<Events[Event]> {
	return fallback(emitter, event);
}
