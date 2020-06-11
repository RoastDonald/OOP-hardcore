import { Eventing } from './Eventing';
import axios, { AxiosResponse } from 'axios';

export class Collection<T, K> {
  models: T[] = [];
  evetns: Eventing = new Eventing();
  constructor(public rootUrl: string, public deserialize: (entry: K) => T) {}
  get on() {
    return this.evetns.on;
  }
  get trigger() {
    return this.evetns.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((res: AxiosResponse) => {
      res.data.forEach((entry: K) => {
        this.models.push(this.deserialize(entry));
      });
    });
    this.trigger('resolve');
  }
}
