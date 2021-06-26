import io from "socket.io-client";
import { DB_URL } from "./db-url";

export const socket = io(`${DB_URL}`);
