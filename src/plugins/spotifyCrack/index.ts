/*
 * Rivercord, a modification for Discord's desktop app
 * Copyright (c) 2022 Vendicated and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { definePluginSettings } from "@api/Settings";
import { Devs } from "@utils/constants";
import definePlugin, { OptionType } from "@utils/types";

const settings = definePluginSettings({
    noSpotifyAutoPause: {
        description: "Spotify otomatik durdurmayı devre dışı bırak.",
        type: OptionType.BOOLEAN,
        default: true,
        restartNeeded: true
    },
    keepSpotifyActivityOnIdle: {
        description: "Boştayken bile spotify aktivitesine devam edin.",
        type: OptionType.BOOLEAN,
        default: false,
        restartNeeded: true
    }
});

export default definePlugin({
    name: "SpotifyCrack",
    description: "Ücretsiz başkalarıyla dinleme, sesli sohbette otomatik duraklatma yok ve boştayken bile oynatılmaya devam etmesine izin veriyor.",
    authors: [Devs.Cyn, Devs.Nuckyz],
    settings,

    patches: [
        {

            find: 'dispatch({type:"SPOTIFY_PROFILE_UPDATE"',
            replacement: {
                match: /SPOTIFY_PROFILE_UPDATE.+?isPremium:(?="premium"===(\i)\.body\.product)/,
                replace: (m, req) => `${m}(${req}.body.product="premium")&&`
            },
        },
        {
            find: '"displayName","SpotifyStore")',
            replacement: [
                {
                    predicate: () => settings.store.noSpotifyAutoPause,
                    match: /(?<=function \i\(\){)(?=.{0,200}SPOTIFY_AUTO_PAUSED\))/,
                    replace: "return;"
                },
                {
                    predicate: () => settings.store.keepSpotifyActivityOnIdle,
                    match: /(shouldShowActivity\(\){.{0,50})&&!\i\.\i\.isIdle\(\)/,
                    replace: "$1"
                }
            ]
        }
    ]
});
