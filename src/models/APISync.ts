import axios, { AxiosPromise } from 'axios';

interface HasID {
  id?: number;
}

export class APISync<T extends HasID> {
  constructor(public rooLink: string) {}
  fetch = (id: number): AxiosPromise => {
    return axios.get(`${this.rooLink}/${id}`);
  };

  save = (data: T): AxiosPromise => {
    console.log(this.rooLink);
    const { id } = data;
    console.log(id);
    if (typeof id === 'number') {
      return axios.put(`${this.rooLink}/${id}`, data);
    } else {
      return axios.post(this.rooLink, data);
    }
  };
}
