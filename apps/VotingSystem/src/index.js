import makeStore from "./store/store";
import startServer from "./clientServer/server";

export const store = makeStore();
startServer(store);

store.dispatch({
  type: "SET_ENTRIES",
  entries: require("./config/entries.json")
});
store.dispatch({ type: "NEXT" });
