export class Dispatcher {
  constructor() {
    /**
     * creating property __linsteners to listen
     */
    this.__listeners = [];
  }
  /**
   * creating a dispatch method
   * action as argument
   */
  dispatch(action) {
    //passing linstner as arrow function with argument action
    this.__listeners.forEach((listener) => listener(action));
  }
  /**
   * creating register function will push
   * the listener to __linsteners array
   */
  register(linstner) {
    this.__listeners.push(linstner);
  }
}
