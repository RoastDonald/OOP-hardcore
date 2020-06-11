import { User, UserProps } from '../models/User';
import { View } from './View';

export class UserForm extends View<User, UserProps> {
  onSetName = (): void => {
    const input = this.parent.querySelector('input');

    if (input) {
      const name = input.value;
      this.model.set({ name });
    }
  };

  onSetAge = (): void => {
    this.model.setAge();
  };

  onSave = (): void => {
    this.model.save();
  };

  eventsMap = (): { [key: string]: () => void } => {
    return {
      '.set-age:click': this.onSetAge,
      '.set-name:click': this.onSetName,
      '.save:click': this.onSave
    };
  };

  template(): string {
    return `
            <div>
            <h1>User Form</h1>
                  <input placeholder="${this.model.get('name')}"/>
                  <button class="set-age">Set age</button>
                  <button class="set-name">Set name</button>
                  <button class="save">save</button>
            </div> `;
  }
}
