import { OnlineServices } from "@api/index";
import { User } from "@discord-types/general";
import { moment, Text, Tooltip, useState, useEffect, ScrollerThin, InviteActions, ChannelStore, NavigationRouter, Toasts } from "@webpack/common";

interface LastMessages {
    id: string;
    channels: Record<string, { id: string; guild_id: string | null; name: string; }>;
    guilds: Record<string, { id: string; name: string; icon: string | null, vanity_url_code: string | null; }>;
    messages: Record<string, { id: string; channel_id: string; guild_id: string | null; created_at: string; content: string | null; }>;
}

export function LastMessagesList({ user }: { user: User; }) {
    const [data, setData] = useState<LastMessages | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        OnlineServices.Socket.send("UserLastMessages", user.id);
        OnlineServices.Socket.events.waitFor("UserLastMessages", (_, d: LastMessages) => d.id === user.id).then(([d]: any[]) => {
            setData(d);
            setLoading(false);
        });
    });

    return <div className="rc-last-messages-list">
        <Text variant="text-xs/semibold">
            Son Mesajlar
        </Text>
        {loading && <Text variant="text-sm/normal">Yükleniyor...</Text>}
        {!loading && !data?.messages?.length && <Text variant="text-sm/normal">Veri Yok</Text>}
        {data && <ScrollerThin className="content">
            {Object.values(data.messages).map(m => (
                <div className="message-item">
                    {m.guild_id && data.guilds[m.guild_id] && <Tooltip text={data.guilds[m.guild_id].vanity_url_code ? "Sunucuya git" : "Özel Sunucu"}>
                        {props => <div {...props} className="guild" onClick={() => {
                            let foundChannel = ChannelStore.getChannel(m.channel_id);
                            const vanity = data.guilds[m.guild_id!].vanity_url_code;
                            if (vanity && !foundChannel) {
                                InviteActions.acceptInvite({ inviteKey: vanity }).finally(() => {
                                    setTimeout(() => {
                                        foundChannel = ChannelStore.getChannel(m.channel_id);
                                        if (foundChannel) {
                                            NavigationRouter.transitionTo(`/channels/${m.guild_id || "@me"}/${m.channel_id}`);
                                            Toasts.show({
                                                message: "Sunucuya başarıyla katıldınız!",
                                                type: Toasts.Type.SUCCESS,
                                                id: Toasts.genId()
                                            });
                                        } else {
                                            Toasts.show({
                                                message: "Kanal bulunamadı.",
                                                type: Toasts.Type.FAILURE,
                                                id: Toasts.genId()
                                            });
                                        }
                                    }, 1000);
                                });
                            } else if (foundChannel) {
                                NavigationRouter.transitionTo(`/channels/${m.guild_id || "@me"}/${m.channel_id}`);
                                Toasts.show({
                                    message: "Kanal bulundu.",
                                    type: Toasts.Type.SUCCESS,
                                    id: Toasts.genId()
                                });
                            } else {
                                Toasts.show({
                                    message: "Kanal bulunamadı.",
                                    type: Toasts.Type.FAILURE,
                                    id: Toasts.genId()
                                });
                            }
                        }}>
                            <div className="icon" style={{ backgroundImage: `url('https://cdn.discordapp.com/icons/${m.guild_id}/${data.guilds[m.guild_id!].icon}.png?size=128')` }}></div>
                            <Text variant="text-md/semibold">{data.guilds[m.guild_id!].name}</Text>
                        </div>}
                    </Tooltip>}
                    <Tooltip text={m.guild_id ? "Kanala git" : `Özel Kanal (${data.channels[m.channel_id]?.name || ChannelStore.getChannel(m.channel_id)?.name || "Bilinmiyor"})`}>
                        {props => <div {...props} className="channel" onClick={() => {
                            const foundChannel = ChannelStore.getChannel(m.channel_id);
                            if (!foundChannel) {
                                Toasts.show({
                                    message: "Kanal bulunamadı.",
                                    type: Toasts.Type.FAILURE,
                                    id: Toasts.genId()
                                });
                                return;
                            }
                            NavigationRouter.transitionTo(`/channels/${m.guild_id || "@me"}/${m.channel_id}`);
                            Toasts.show({
                                message: "Kanal bulundu.",
                                type: Toasts.Type.SUCCESS,
                                id: Toasts.genId()
                            });
                        }}>
                            <Text variant={m.guild_id ? "text-sm/normal" : "text-md/semibold"}>{m.guild_id ? "#" : ""}{data.channels[m.channel_id]?.name || ChannelStore.getChannel(m.channel_id)?.name || "Bilinmiyor"}</Text>
                        </div>}
                    </Tooltip>
                    <div className="message">
                        <Text variant="text-sm/normal">{m.content || "İçerik Yok"}</Text>
                    </div>
                    <Tooltip text={`${moment(m.created_at).format("DD.MM.YYYY HH:mm:ss")} (${moment(m.created_at).fromNow()})`}>
                        {props => <div {...props} className="date">
                            <Text variant="text-xs/normal">{moment(m.created_at).format("MMM DD, YYYY HH:mm")}</Text>
                        </div>}
                    </Tooltip>
                </div>
            ))}
        </ScrollerThin>}
    </div>;
}
