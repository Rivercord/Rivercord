import { OnlineServices } from "@api/index";
import { ModalCloseButton, ModalContent, ModalHeader, ModalRoot } from "@utils/modal";
import { Clipboard, ContextMenuApi, Menu, Text, TextInput, useEffect, useState } from "@webpack/common";

interface OnlineUser {
    id: string;
    username: string;
    avatar?: string;
}

export function OnlineUsersModal({ modalProps }: { modalProps: any; }) {
    const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<OnlineUser[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        OnlineServices.Socket.send("OnlineUsers");
        OnlineServices.Socket.events.waitFor("OnlineUsers", () => true).then(([d]: any[]) => {
            setOnlineUsers(d);
        });
    });

    useEffect(() => {
        const searchLower = search.toLowerCase().trim();
        setFilteredUsers(onlineUsers.filter(u => u.username.toLowerCase().includes(searchLower) || u.id === searchLower));
    }, [search, onlineUsers]);

    return <ModalRoot {...modalProps}>
        <ModalHeader>
            <Text variant="heading-lg/semibold" style={{ flexGrow: 1 }}>Aktif Kullanıcılar</Text>
            <ModalCloseButton onClick={modalProps.onClose} />
        </ModalHeader>
        <ModalContent>
            <div className="rc-online-users">
                <TextInput
                    value={search}
                    onChange={(value: string) => setSearch(value)}
                    placeholder="Kullanıcı ara..."
                ></TextInput>
                <div className="list">
                    {filteredUsers.map(user => (
                        <div className="item" onContextMenu={e => {
                            ContextMenuApi.openContextMenu(
                                e,
                                props => <Menu.Menu {...props}>
                                    <Menu.MenuItem
                                        id="copy-id"
                                        label="Kullanıcı ID'sini Kopyala"
                                        action={() => {
                                            Clipboard.copy(user.id);
                                        }}
                                    />
                                </Menu.Menu>
                            );
                        }}>
                            <div className="avatar" style={{ backgroundImage: `url("https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128")` }} ></div>
                            <Text variant="text-lg/normal" selectable>{user.username}</Text>
                        </div>
                    ))}
                </div>
            </div>
        </ModalContent>
    </ModalRoot>;
}
