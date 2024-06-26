/*
 * Rivercord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function TimerText({ text, className }: Readonly<{ text: string; className: string; }>) {
    return <div className={`timeCounter ${className}`} style={{
        fontWeight: "normal",
        fontSize: 10,
        position: "relative",
        lineHeight: 1
    }}>{text}</div>;
}
