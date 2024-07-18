import { OnlineServices } from "@api/index";
import { openModal } from "@utils/modal";
import { Tooltip, useEffect, useState } from "@webpack/common";
import { OnlineUsersModal } from "./OnlineUsersModal";

export function OnlineUsersCounter() {
    const [onlineUserCount, setOnlineUserCount] = useState(0);

    useEffect(() => {
        OnlineServices.Socket.send("OnlineUserCount");
        return OnlineServices.Socket.events.on(
            "OnlineUserCount",
            (count: number) => setOnlineUserCount(count)
        );
    });

    return <Tooltip text="Akif olarak Rivercord'u kullanan kullanıcılar. Tıklayarak listeyi görünteleyebilirsin." position="right">
        {props => (
            <div {...props} className="rc-online-users-counter" onClick={() => {
                openModal(modalProps => <OnlineUsersModal modalProps={modalProps} />);
            }}>
                <div className="line number"><strong>{onlineUserCount.toLocaleString()}</strong></div>
                <div className="line">aktif</div>
                <div className="line">kullanıcı</div>
            </div>
        )}
    </Tooltip>;
}
