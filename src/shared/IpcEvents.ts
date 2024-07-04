/*
 * Rivercord, a modification for Discord's desktop app
 * Copyright (c) 2023 Vendicated and contributors
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

export const enum IpcEvents {
    QUICK_CSS_UPDATE = "RivercordQuickCssUpdate",
    THEME_UPDATE = "RivercordThemeUpdate",
    GET_QUICK_CSS = "RivercordGetQuickCss",
    SET_QUICK_CSS = "RivercordSetQuickCss",
    UPLOAD_THEME = "RivercordUploadTheme",
    DELETE_THEME = "RivercordDeleteTheme",
    GET_THEMES_DIR = "RivercordGetThemesDir",
    GET_THEMES_LIST = "RivercordGetThemesList",
    GET_THEME_DATA = "RivercordGetThemeData",
    GET_THEME_SYSTEM_VALUES = "RivercordGetThemeSystemValues",
    GET_SETTINGS_DIR = "RivercordGetSettingsDir",
    GET_SETTINGS = "RivercordGetSettings",
    SET_SETTINGS = "RivercordSetSettings",
    OPEN_EXTERNAL = "RivercordOpenExternal",
    OPEN_QUICKCSS = "RivercordOpenQuickCss",
    GET_UPDATES = "RivercordGetUpdates",
    IS_UPDATE_REQUIRED = "RivercordIsUpdateRequired",
    GET_REPO = "RivercordGetRepo",
    UPDATE = "RivercordUpdate",
    BUILD = "RivercordBuild",
    OPEN_MONACO_EDITOR = "RivercordOpenMonacoEditor",

    GET_PLUGIN_IPC_METHOD_MAP = "RivercordGetPluginIpcMethodMap",

    OPEN_IN_APP__RESOLVE_REDIRECT = "RivercordOIAResolveRedirect",
    VOICE_MESSAGES_READ_RECORDING = "RivercordVMReadRecording",
}
