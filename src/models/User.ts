import { Model } from './Models';
import { Eventing } from './Eventing';
import { APISync } from './APISync';
import { Attributes } from './Attributes';
import { Collection } from './Collection';

const rootUrl = 'http://localhost:3000/users';

export interface UserProps {
  id?: number;
  age?: number;
  name?: string;
}

export class User extends Model<UserProps> {
  static createUser(data: UserProps): User {
    return new User(
      new Eventing(),
      new APISync<UserProps>(rootUrl),
      new Attributes<UserProps>(data)
    );
  }
  static createUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(rootUrl, (entry: UserProps) =>
      User.createUser(entry)
    );
  }

  setAge(): void {
    const age = Math.round(Math.random() * 100);
    this.set({ age });
  }
}
