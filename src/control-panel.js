import { Dispatcher, Store } from "./flux";

const USER_NAME_UPDATE_ACTION = `USER_NAME_UPDATE_ACTION`;
const FONT_SIZE_UPDATE_ACTION = `FONT_SIZE_UPDATE_ACTION`;

/**
 * initiiase the dispatcher
 */
const controlPanelDispatcher = new Dispatcher();
//console.log(controlPanelDispatcher.__listeners);

/**
 * create action for user name
 * @param {*} name
 * @returns
 */
const userNameUpdateAction = (name) => {
  return {
    type: USER_NAME_UPDATE_ACTION,
    value: name,
  };
};

/**
 * create action for fontsize
 * @param {*} size
 * @returns
 */
const fontSizeUpdateAction = (size) => {
  return {
    type: FONT_SIZE_UPDATE_ACTION,
    value: size,
  };
};

/**
 * on the method input
 * call the function with argument target
 */
document
  .getElementById(`userNameInput`)
  .addEventListener(`input`, ({ target }) => {
    const name = target.value;
    console.log("Dispatching .....", name);
    //controlPanelDispatcher.dispatch(`TODO_USER_NAME_ACTION`);
    controlPanelDispatcher.dispatch(userNameUpdateAction(name));
    //console.log(controlPanelDispatcher.__listeners);
  });

document.forms.fontSizeForm.fontSize.forEach((element) => {
  element.addEventListener(`change`, ({ target }) => {
    //controlPanelDispatcher.dispatch(`TODO_FONT_SIZE_ACTION`);
    controlPanelDispatcher.dispatch(fontSizeUpdateAction(target.value));
    //console.log(controlPanelDispatcher.__listeners);
  });
});

/**
 * First crate a Store. then create its subclass
 */
class UserPrefsStore extends Store {
  //override the method
  //   getInitialState() {
  //     return {
  //       userName: "User Name",
  //       fontSize: "small",
  //     };
  //   }

  /**
   * this is for local storage implementation
   * @returns
   */
  getInitialState() {
    return localStorage[`preferences`]
      ? JSON.parse(localStorage[`preferences`])
      : {
          userName: "User Name",
          fontSize: "small",
        };
  }

  //override the method
  __onDispatch(action) {
    console.info("store received the action...", action);
    //each time when changes happen it should persist the change to store
    //this.__emitChange();
    switch (action.type) {
      case USER_NAME_UPDATE_ACTION:
        this.__state.userName = action.value;
        this.__emitChange();
        break;
      case FONT_SIZE_UPDATE_ACTION:
        this.__state.fontSize = action.value;
        this.__emitChange();
        break;
    }
  }

  getUserPreferences() {
    return this.__state;
  }
}

//create the object of state
//and passing dispatcher as construtor argument
const userPrefsStore = new UserPrefsStore(controlPanelDispatcher);

/**
 * add listener to store
 */
userPrefsStore.addListener((state) => {
  console.info(`this current state is ....`, state);
  render(state);
  //below code for local storage
  localStorage[`preferences`] = JSON.stringify(state);
});

/**
 * add fucntion which called to change
 */
const render = ({ userName, fontSize }) => {
  document.getElementById("userName").innerHTML = userName;
  document.getElementsByClassName("container")[0].style.fontSize =
    fontSize === "small" ? "16px" : "24px";
  document.forms.fontSizeForm.fontSize.value = fontSize;
};

/**
 * impementing localstorage to persist data from referesh.
 * to do comment the code of dispatcher.register()
 * below code commented for localstorage
 */
// controlPanelDispatcher.register((action) => {
//   console.log("Receiving the action...", action);
// });

render(userPrefsStore.getUserPreferences());
