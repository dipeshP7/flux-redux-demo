import { Store } from "./Store";
export class ReduceStroe extends Store {
  /**
   * extending super constructor
   * @param {*} dispatcher
   */
  constructor(dispatcher) {
    super(dispatcher);
  }

  reduce(statue, action) {
    throw new Error("Subclass must implement method");
  }

  /**
   * override method
   * check if new state is different then older
   * if different then persist new state
   * @param {*} action
   */
  __onDispatch(action) {
    const newState = this.reduce(this.__state, action);
    if (newState !== this.__state) {
      this.__state = newState;
      this.__emitChange();
    }
  }
}
