import { User } from '../models/User';
import { Model } from '../models/Models';

export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {};
  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }
  abstract template(): string;

  regionsMap(): { [key: string]: string } {
    return {};
  }

  eventsMap = (): { [key: string]: () => void } => {
    return {};
  };

  bindModel(): void {
    this.model.on('change', () => {
      console.log('changed');
      this.render();
    });
  }

  bindMap(fragment: DocumentFragment): void {
    const events = this.eventsMap();
    for (let event in events) {
      let [selector, eventName] = event.split(':');
      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, events[event]);
      });
    }
  }

  mapRegions(fragment: DocumentFragment): void {
    const regions = this.regionsMap();

    for (let key in regions) {
      const selector = regions[key];
      const element = fragment.querySelector(selector);
      if (element) {
        this.regions[key] = element;
      }
    }
  }

  onRender(): void {}

  render(): void {
    this.parent.innerHTML = '';

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindMap(templateElement.content);
    this.mapRegions(templateElement.content);

    this.onRender();

    this.parent.append(templateElement.content);
  }
}
