import {EventEmitter} from 'events';

import on from '.';

describe('on(...)', () => {
	test('waits for emit', async () => {
		const ee = new EventEmitter();

		setImmediate(() => ee.emit('e', null));

		const emitted = on(ee, 'e');

		expect(emitted).toEqual(expect.arrayContaining([null]));
		expect(emitted).toHaveLength(1);
	});

	test('does not return undefined', async () => {
		const ee = new EventEmitter();

		setImmediate(() => ee.emit('e'));

		const emitted = on(ee, 'e');

		expect(emitted).not.toEqual(undefined);
		expect(emitted).toHaveLength(0);
	});

	test('returns first emitted event', async () => {
		const ee = new EventEmitter();

		setImmediate(() => {
			ee.emit('e', 1);
			ee.emit('e', 2);
		});

		const emitted = on(ee, 'e');

		expect(emitted).toEqual(expect.arrayContaining([1]));
		expect(emitted).toHaveLength(1);
	});

	test('returns all arguments of emitted event', async () => {
		const ee = new EventEmitter();

		setImmediate(() => ee.emit('e', 1, 2));

		const emitted = on(ee, 'e');

		expect(emitted).toEqual(expect.arrayContaining([1, 2]));
		expect(emitted).toHaveLength(2);
	});
});
