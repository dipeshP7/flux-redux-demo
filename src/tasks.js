import { generate as id } from "shortid";
import { Dispatcher, ReduceStroe } from "./flux";

const tasksDispatcher = new Dispatcher();

class TasksStore extends ReduceStroe {
  getInitialState() {
    return {
      tasks: [
        {
          id: id(),
          content: "Update CSS styles",
          complete: false,
        },
        {
          id: id(),
          content: "Add unit tasks",
          complete: false,
        },
        {
          id: id(),
          content: "Post on social media",
          complete: false,
        },
        {
          id: id(),
          content: "Install hard drive",
          complete: true,
        },
      ],
      showComplete: true,
    };
  }

  reduce(state, action) {
    console.log("Reducing...", state, action);
    return state;
  }

  getState() {
    return this.__state;
  }
}

const tasksStore = new TasksStore(tasksDispatcher);
tasksDispatcher.dispatch(`TEST_DISPATCH`);
