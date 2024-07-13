import { RIVERCORD_HTTP_API_BASE } from "./constants";

export async function spawnWorker(jsCode: string, options?: WorkerOptions): Promise<Worker> {
    const req = await fetch(
        `${RIVERCORD_HTTP_API_BASE}/utils/text`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: jsCode,
                contentType: "application/javascript"
            })
        }
    );
    if (!req.ok) throw new Error(`Failed to spawn worker. ${req.status}: ${req.statusText}`);
    const { id } = await req.json();
    return new Worker(`data:text/javascript;base64,${window.btoa(`importScripts("${RIVERCORD_HTTP_API_BASE}/utils/text/${id}")`)}`, options);
}
