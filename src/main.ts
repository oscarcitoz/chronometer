import Server from "./servers/server.ts";
import chronometerListener from "./listeners/chronometerListener.ts";
import chronometerDispatchListener from "./listeners/chronometerDispatchListener.ts";

chronometerListener();
chronometerDispatchListener();

new Server();
