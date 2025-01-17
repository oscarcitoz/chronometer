import Chronometer from "../models/chronometer.ts";

export async function sendRequest(chronometer: Chronometer): Promise<Response> {
    return await fetch(
        chronometer.request_config.url,
        {
            method: chronometer.request_config.method,
            body: chronometer.request_config.body
                ? JSON.stringify(chronometer.request_config.body)
                : undefined,
            headers: chronometer.request_config.headers,
        },
    );
}
