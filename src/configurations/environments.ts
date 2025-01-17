import { load } from "$std/dotenv/mod.ts";

let env: Record<string, string>;

export async function getEnv(): Promise<Record<string, string>> {
    if (!env) {
        env = await load();
    }

    return env;
}
