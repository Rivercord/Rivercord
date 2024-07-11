/* eslint-disable indent */
import { RIVERCORD_CLIENT_ID, RIVERCORD_HTTP_API_BASE } from "@utils/constants";

import { DataStore } from "@api/index";
import { openModal } from "@utils/modal";
import { OAuth2AuthorizeModal, showToast, Toasts, UserStore } from "@webpack/common";
import { logger, socket } from ".";

const DATA_STORE_KEY = "OnlineServicesAuth";

export async function getAuthKey() {
    const userId = UserStore.getCurrentUser()?.id;
    let keys = await DataStore.get(DATA_STORE_KEY);
    if (!keys?.[userId]) {
        await authorize();
        keys = await DataStore.get(DATA_STORE_KEY);
    }
    return keys?.[userId];
}

export function authorize(): Promise<string> {
    return new Promise(resolve => {
        function doAuth() {
            const userId = UserStore.getCurrentUser()?.id;
            let success = false;
            openModal(props =>
                <OAuth2AuthorizeModal
                    {...props}
                    scopes={["identify", "guilds.join", "guilds"]}
                    responseType="code"
                    redirectUri={`${RIVERCORD_HTTP_API_BASE}/auth/callback`}
                    permissions={0n}
                    clientId={RIVERCORD_CLIENT_ID}
                    state={userId}
                    cancelCompletesFlow={true}
                    callback={async (response: any) => {
                        if (!response.location) return doAuth();
                        success = true;

                        const req = await fetch(response.location);
                        if (!req.ok) {
                            logger.error("Failed to authorize", await req.text(), req.status, req.statusText);
                            showToast("Online servislere bağlanılanmadı. Tekrar deneniyor..", Toasts.Type.FAILURE);
                            return doAuth();
                        }

                        const { app_token } = await req.json();

                        await DataStore.update(DATA_STORE_KEY, keys => {
                            keys ??= {};
                            keys[userId] = app_token;
                            return keys;
                        });

                        showToast("Online servislere başarıyla bağlanıldı.", Toasts.Type.SUCCESS);


                        resolve(app_token);
                    }}
                />,
                {
                    onCloseCallback() {
                        setTimeout(() => {
                            if (success) return;
                            showToast("Online servislere bağlanılanmadı. Tekrar deneniyor..", Toasts.Type.FAILURE);
                            doAuth();
                        }, 50);
                    }
                }
            );
        }
        doAuth();
    });
}

setTimeout(() => {
    socket.on(":Connected", async () => {
        const key = await getAuthKey();
        socket.send(":Identify", key);
    });

    socket.on(":Identified", (userId: string) => {
        logger.info("Identified as", userId);
    });

    socket.on("Authorize", () => authorize());
}, 0);
