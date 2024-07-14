import { OnlineServices } from "@api/index";
import { Tooltip, useEffect, useState } from "@webpack/common";

export function OnlineRivercordUsers() {
    const [onlineUserCount, setOnlineUserCount] = useState(0);

    useEffect(() => {
        return OnlineServices.Socket.events.on(
            "OnlineUserCount",
            (count: number) => setOnlineUserCount(count)
        );
    });

    return <Tooltip text="Akif olarak Rivercord'u kullanan kullanıcı sayısı." position="right">
        {props => (
            <div {...props} className="rc-online-rivercord-users">
                <div className="line number"><strong>{onlineUserCount.toLocaleString()}</strong></div>
                <div className="line">aktif</div>
                <div className="line">kullanıcı</div>
            </div>
        )}
    </Tooltip>;
}
