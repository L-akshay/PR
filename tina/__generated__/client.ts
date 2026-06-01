import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ cacheDir: 'D:/PR/pr/tina/__generated__/.cache/1780313900270', url: 'http://localhost:4001/graphql', token: 'undefined', queries,  });
export default client;
  