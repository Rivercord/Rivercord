import { filters, findByPropsLazy, waitFor } from "@webpack";

import { waitForComponent } from "./internal";
import * as t from "./types/components";

export let Forms = {} as {
    FormTitle: t.FormTitle,
    FormSection: t.FormSection,
    FormDivider: t.FormDivider,
    FormText: t.FormText,
};

export let Card: t.Card;
export let Button: t.Button;
export let Switch: t.Switch;
export let Tooltip: t.Tooltip;
export let TooltipContainer: t.TooltipContainer;
export let TextInput: t.TextInput;
export let TextArea: t.TextArea;
export let Text: t.Text;
export let Heading: t.Heading;
export let Select: t.Select;
export let SearchableSelect: t.SearchableSelect;
export let Slider: t.Slider;
export let ButtonLooks: t.ButtonLooks;
export let Popout: t.Popout;
export let Dialog: t.Dialog;
export let TabBar: any;
export let Paginator: t.Paginator;
export let ScrollerThin: t.ScrollerThin;
export let Clickable: t.Clickable;
export let Avatar: t.Avatar;
export let FocusLock: t.FocusLock;
// token lagger real
/** css colour resolver stuff, no clue what exactly this does, just copied usage from Discord */
export let useToken: t.useToken;

export const MaskedLink = waitForComponent<t.MaskedLink>("MaskedLink", filters.componentByCode("MASKED_LINK)"));
export const Timestamp = waitForComponent<t.Timestamp>("Timestamp", filters.byCode(".Messages.MESSAGE_EDITED_TIMESTAMP_A11Y_LABEL.format"));
export const Flex = waitForComponent<t.Flex>("Flex", ["Justify", "Align", "Wrap"]);

export const { OAuth2AuthorizeModal } = findByPropsLazy("OAuth2AuthorizeModal");

waitFor(["FormItem", "Button"], m => {
    ({
        useToken,
        Card,
        Button,
        FormSwitch: Switch,
        Tooltip,
        TooltipContainer,
        TextInput,
        TextArea,
        Text,
        Select,
        SearchableSelect,
        Slider,
        ButtonLooks,
        TabBar,
        Popout,
        Dialog,
        Paginator,
        ScrollerThin,
        Clickable,
        Avatar,
        FocusLock,
        Heading
    } = m);
    Forms = m;
});
