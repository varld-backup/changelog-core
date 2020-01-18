<p align="center">
  <img src="https://i.imgur.com/VVdRJEf.png" width="300px" />
</p>

<h2 align="center">Changes Core SDK</h2>

<p align="center">
  The core SDK serves as a reusable platform for embedding a Changes changelog into any website. <br />
  The core SDK is used by <a href="https://github.com/varld/changelog-bar">the Sidebar SDK</a> and <a href="https://github.com/varld/changelog-bar">the Widget SDK</a>.
</p>

## Installation

```bash
# npm
npm install changelog-core

# yarn
yarn add changelog-core
```

## Usage

```js
import CoreSDK from 'changelog-core';

// Instantiate the CoreSDK
let sdk = new CoreSDK({
  id: '5Web2XRF',
  key: 'IK-X2zvTYjp-NCg-3q2Rj'
});

// Delete the CoreSDK iframe
sdk.remove();

// Refresh the CoreSDK iframe
sdk.update();

// Access the iframe
sdk.iframe;

sdk.on('init', ...);
sdk.on('remove', ...);
sdk.on('update', ...);
sdk.on('loaded', ...);
```

## API

### `new CoreSDK(options)`

Create a new instance of a changelog-embed.

#### `options`

Type:

```js
{
  id: string;
  mode?: string;
  options?: {
    embedHost?: string;
  }
}
```

### `sdk.remove()`

Destruct a changelog-iframe.

### `sdk.remove()`

Update the changelog-embed-iframe's contents.

### `sdk.on(event: string, cb: () => any)`

Listen to internal events.

### `sdk.iframe: HTMLIframeElement`

Access the changelog-embed-iframe.
