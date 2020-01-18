import { CtorOpts } from './types/ctorOpts';
import { Options } from './types/options';
import mitt from 'mitt';

let defaultOptions: Options = {
  embedHost: 'http://embed.changes.blue'
};

class CoreSDK {
  private id: string;
  private key: string;
  private mode?: string;
  private options: Options;
  private emitter: mitt.Emitter;
  public iframe: HTMLIFrameElement;
  public removed: boolean = false;

  constructor(opts: CtorOpts) {
    if (typeof opts.id != 'string' || typeof opts.key != 'string') {
      throw new TypeError('`id` and `key` are required and must be a string');
    } 

    this.id = opts.id;
    this.key = opts.key;
    this.mode = opts.mode;
    this.options = Object.assign({}, defaultOptions, opts.options);
    this.emitter = mitt();

    this.createIframe();

    setTimeout(() => {
      this.emit('init');
    }, 30);
  }

  public emit(event: string, data?: any) {
    this.emitter.emit(event, data);
  }

  public on(event: string, cb: any) {
    this.emitter.on(event, cb);
  }

  public off(event: string, cb: any) {
    this.emitter.off(event, cb);
  }

  public remove(): boolean {
    if (!this.iframe) return false;

    // Remove iframe from the dom
    this.iframe.remove();
    this.removed = true;
    this.emit('remove');

    return true;
  }

  private getUrl() {
    // Construct the iframe url
    return `${ this.options.embedHost }/${ this.id }?key=${ this.key }&d=${ new Date().getTime() }&mode=${ this.mode || 'default' }`
  }

  public reload(): boolean {
    if (!this.iframe) return false;

    let loaded = () => {
      this.iframe.removeEventListener('load', loaded);
      this.emit('updated');
    };

    this.iframe.addEventListener('load', loaded);

    // Load the iframe
    this.iframe.src = this.getUrl();
    this.emit('update');

    return true;
  }

  private createIframe() {
    this.iframe = document.createElement('iframe');

    // Set attributes of iframe
    this.iframe.setAttribute('changes-embed', '');
    this.iframe.src = this.getUrl();
    this.iframe.id = this.id;
    this.iframe.width = '100%';
    this.iframe.height = '100%';
    this.iframe.frameBorder = '0';
    this.iframe.setAttribute('allowtransparency', '');
    this.iframe.setAttribute('sandbox', 'allow-modals allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation');
    window.addEventListener('message', (e) => {
      let data, type, json;

      try {
        [type, json] = e.data.split(';');
        data = JSON.parse(json);
      } catch (err) {}

      // Make sure that the message has been sent by this project's iframe
      if (data.id != this.id) return;

      this.emit('message', {
        type,
        data
      });
    })

    this.iframe.addEventListener('load', () => {
      this.emit('loaded');
    });
  }
}

export default CoreSDK;
