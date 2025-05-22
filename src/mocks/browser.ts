import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";
import { timeslotHandlers } from "./timeslotHandlers";

export const worker = setupWorker(...handlers, ...timeslotHandlers);
