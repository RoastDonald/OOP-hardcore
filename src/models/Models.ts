import { AxiosPromise, AxiosResponse } from 'axios';

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Attributes<T> {
  set(props: T): void;
  get<K extends keyof T>(key: K): T[K];
  getAll(): T;
}

interface HasID {
  id?: number;
}

export class Model<T extends HasID> {
  constructor(
    private events: Events,
    private sync: Sync<T>,
    private attributes: Attributes<T>
  ) {}

  get get() {
    return this.attributes.get;
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  set(update: T) {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch(): void | never {
    const id = this.attributes.get('id');
    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without id');
    }
    this.sync.fetch(id).then((res: AxiosResponse) => {
      this.set(res.data);
    });
  }

  save(): void {
    this.sync.save(this.attributes.getAll()).then((res: AxiosResponse) => {
      this.trigger('save');
    });
  }
}
