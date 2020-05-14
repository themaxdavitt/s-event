# s-event

[![NPM link](https://img.shields.io/npm/v/s-event?style=flat-square)](https://npmjs.com/package/s-event) [![Package license](https://img.shields.io/npm/l/s-event?style=flat-square)](LICENSE) [![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

Synchronously wait for an event - please invoke responsibly

## Background

Despite being almost _irredeemably_ unidiomatic, sometimes being able to synchronously listen for an event is convenient. Please don't do this unless you're sure you can't use [promises](https://github.com/sindresorhus/p-event). You probably can.

## Install

```sh
npm install s-event
```

Support for multiple "typed emitter" packages is included among separate modules:

- `s-event`: the Node.js [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)
- `s-event/strict-event-emitter-types`: the [strict-event-emitter-types](https://www.npmjs.com/package/strict-event-emitter-types) package
- `s-event/tsee`: the [tsee](https://www.npmjs.com/package/tsee) package
- `s-event/typed-emitter`: the [typed-emitter](https://www.npmjs.com/package/typed-emitter) package

These are included as optional dependencies for this package.

Additionally, `s-event/util`'s default export is `on(emitter: any, event: any) => any` - see the doc comment for the assumptions it makes.

## Usage

The default exported function from each module takes 2 parameters:

1. The emitter to temporarily attach a listener for the event on
2. The event to listen for

It will synchronously listen for the event on the emitter and, when it's emitted, will return a tuple (internally an array) of that first event's arguments.

An example using the Node.js EventEmitter:

```typescript
import {strict as assert} from 'assert';
import {EventEmitter} from 'events';
import onEventEmitter from 's-event';

const ee = new EventEmitter();

setTimeout(() => ee.emit('e', 1, 2), 1000);

assert(onEventEmitter(ee, 'e').length === 2);
```

Additional examples are in [`src/test.ts`](src/test.ts).

**NOTE**: Support for type-safe `Symbol` events not using the standard EventEmitter is pending on [this issue](https://github.com/microsoft/TypeScript/issues/1863).

## Contributing

Feel free to submit issues if you have any, and pull requests if you want to implement something!

## License

MIT License. Copyright © 2020 Max Davitt.

See [`LICENSE`](LICENSE).
