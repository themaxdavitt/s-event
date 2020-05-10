import {EventEmitter} from 'events';

import fallback from './util';

export default function on(
	emitter: EventEmitter,
	event: string | symbol
): any[] {
	return fallback(emitter, event);
}
