export class Store {
  //argument dipatcher
  constructor(dispatcher) {
    this.__linsteners = [];
    this.__state = this.getInitialState();
    //register
    // and bind onDispatch function
    dispatcher.register(this.__onDispatch.bind(this));
  }

  __onDispatch() {
    //we want any class that should override this method
    throw new Error("Subclass must be implemented");
  }
  /**
   * To store a initial values by using public api
   */
  getInitialState() {
    throw new Error("Subclass must be implemented");
  }

  //public api to listener to access
  addListener(listener) {
    this.__linsteners.push(listener);
  }

  /**
   * emit changes to received the dipatch action and emit it
   */
  __emitChange() {
    this.__linsteners.forEach((listener) => listener(this.__state));
  }
}
