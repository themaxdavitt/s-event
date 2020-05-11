import {EventEmitter} from 'events';
import StrictEventEmitter from 'strict-event-emitter-types';
import {DefaultEventMap, EventEmitter as TypedEventEmitter} from 'tsee';
import TypedEmitter from 'typed-emitter';

import onEventEmitter from '.';
import onStrictEventEmitter from './strict-event-emitter-types';
import onTypedEventEmitter from './tsee';
import onTypedEmitter from './typed-emitter';

interface TestEventMap extends DefaultEventMap {
	e: (n: number, s: string) => void;
}

describe('on(...)', () => {
	test('waits for emit', () => {
		const ee = new EventEmitter();

		setImmediate(() => ee.emit('e', null));

		const emitted = onEventEmitter(ee, 'e');

		expect(emitted).toEqual(expect.arrayContaining([null]));
		expect(emitted).toHaveLength(1);
	});

	test('does not return undefined', () => {
		const ee = new EventEmitter();

		setImmediate(() => ee.emit('e'));

		const emitted = onEventEmitter(ee, 'e');

		expect(emitted).not.toEqual(undefined);
		expect(emitted).toHaveLength(0);
	});

	test('returns first emitted event', () => {
		const ee = new EventEmitter();

		setImmediate(() => {
			ee.emit('e', 1);
			ee.emit('e', 2);
		});

		const emitted = onEventEmitter(ee, 'e');

		expect(emitted).toEqual(expect.arrayContaining([1]));
		expect(emitted).toHaveLength(1);
	});

	test('returns all arguments of emitted event', () => {
		const ee = new EventEmitter();

		setImmediate(() => ee.emit('e', 1, 2));

		const emitted = onEventEmitter(ee, 'e');

		expect(emitted).toEqual(expect.arrayContaining([1, 2]));
		expect(emitted).toHaveLength(2);
	});

	test('typechecks for StrictEventEmitter<..., ...>', () => {
		const ee: StrictEventEmitter<
			EventEmitter,
			TestEventMap
		> = new EventEmitter();

		setImmediate(() => ee.emit('e', 0, ''));

		const emitted: [number, string] = onStrictEventEmitter(ee, 'e');

		expect(emitted).toEqual(expect.arrayContaining([0, '']));
		expect(emitted).toHaveLength(2);
	});

	test('typechecks for TypedEventEmitter<...>', () => {
		const ee = new TypedEventEmitter<TestEventMap>();

		setImmediate(() => ee.emit('e', 0, ''));

		const emitted: [number, string] = onTypedEventEmitter(ee, 'e');

		expect(emitted).toEqual(expect.arrayContaining([0, '']));
		expect(emitted).toHaveLength(2);
	});

	test('typechecks for TypedEmitter<...>', () => {
		const ee = new EventEmitter() as TypedEmitter<TestEventMap>;

		setImmediate(() => ee.emit('e', 0, ''));

		const emitted: [number, string] = onTypedEmitter(ee, 'e');

		expect(emitted).toEqual(expect.arrayContaining([0, '']));
		expect(emitted).toHaveLength(2);
	});
});
