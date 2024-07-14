/* eslint-disable indent */
import { RIVERCORD_CLIENT_ID, RIVERCORD_HTTP_API_BASE } from "@utils/constants";

import { DataStore } from "@api/index";
import { openModal } from "@utils/modal";
import { OAuth2AuthorizeModal, showToast, Toasts, UserStore } from "@webpack/common";
import { logger } from ".";
import * as Socket from "./socket";

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

let modalIsOpen = false;

export function authorize(): Promise<void> {
    if (modalIsOpen) return Promise.resolve();
    return new Promise(resolve => {
        function doAuth() {
            const userId = UserStore.getCurrentUser()?.id;
            let success = false;
            modalIsOpen = true;
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
                        modalIsOpen = false;

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


                        resolve();
                    }}
                />,
                {
                    onCloseCallback() {
                        modalIsOpen = false;
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
    Socket.on(":Connected", async () => {
        const key = await getAuthKey();
        Socket.send(":Identify", key, true);
    });

    Socket.on(":Identified", (userId: string) => {
        logger.info("Identified as", userId);
        Socket.sendAllPending();
    });

    Socket.on("Authorize", () => authorize());
}, 0);
