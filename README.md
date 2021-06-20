# Chat Portrait

A Foundry VTT module that displays the Actor's portrait images on the chat messages.

This is a upgrade of the project [Chat Portrait by ShoyuVanilla](https://github.comShoyuVanilla/FoundryVTT-Chat-Portrait) ty to [ShoyuVanilla](https://github.com/ShoyuVanilla)

![Settings]((./images/image01.png)

![Preview](./images/image02.png)

## Installation

It's always easiest to install modules from the in game add-on browser.

To install this module manually:
1.  Inside the Foundry "Configuration and Setup" screen, click "Add-on Modules"
2.  Click "Install Module"
3.  In the "Manifest URL" field, paste the following url:
`https://raw.githubusercontent.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/master/src/module.json`
1.  Click 'Install' and wait for installation to complete
2.  Don't forget to enable the module in game using the "Manage Module" button

## Features/Settings

- Use Token Image: Use the actor's Token image instead of the actor's standard image.
- Portrait Size (px): Configure portrait image size on the chat messages. Default is 36 px
- Portrait Border Shape: Configure border shape of the portraits displayed on the chat messages. Setting this as None disables other border options
    - Square
    - Circle
    - None
- Use Player Color for Portrait Border
  - Portrait Border Color
  - Portrait Border Width (px)
- Configure portrait border width. Default is 2 px
- Change Color of Message Border: Use the actor's player's color for the border of the entire chat message
- Change Color of Message Background: Use the actor's player's color for the background of the entire chat message

![background](./images/background_color_feature.png)

- Display Chat Flavor Text next to Portrait
- Force Name Search: If there is no Actor matching with chat message data, search for an actor of which name corresponds to the message speaker's alias. This option is needed for the compatibility with Theatre Insert module.
- Portrait Size for item (px): Configure portrait image size for item on the chat messages. Default is 36 px
- Double Click on the image portrait or the name of the token "pan to token" on the current scene
- Configure which chat message should receive custom styling, and which ones should be left as default. Changing this may require you to refresh your window.
  - allCards : Affect every message.
  - selfAndGM : Affect own messages and GM messages.
  - self : Only affect own messages.
  - gm : Only affect GM messages.
  - player : Only affect player messages.
  - none : Don't affect any messages.

**TODO:** Better integration with midi-qol and CUB for their mechanism of Unknown creature, but there is no conflict because it's just css and html modification on the chat message so you can use without any issue beyween this modules

![Unknown](./images/unknown_actor_and_weapon_feature.png)

- Use Avatar Player Image: Use the player's Token image instead of the token/actor standard image. Note if true ignore the first option if a avatr is found or else go back to the standard actor/token image feature.

## Known issue

## [Changelog](./changelog.md)

## Issues

Any issues, bugs, or feature requests are always welcome to be reported directly to the [Issue Tracker](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues ), or using the [Bug Reporter Module](https://foundryvtt.com/packages/bug-reporter/).

## Acknowledgements

Bootstrapped with League of Extraordinary FoundryVTT Developers  [foundry-vtt-types](https://github.com/League-of-Foundry-Developers/foundry-vtt-types).

Mad props to the 'League of Extraordinary FoundryVTT Developers' community which helped me figure out a lot.

## Credit

Thanks to anyone who helps me with this code! I appreciate the user community's feedback on this project!

- [foundryvtt-typescript-types](https://github.com/ShoyuVanilla/foundryvtt-typescript-types) ty to [ShoyuVanilla](https://github.com/ShoyuVanilla)
- [Chat Portrait](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait) ty to [ShoyuVanilla](https://github.com/ShoyuVanilla)
- [Token Chat Link](https://github.com/espositos/fvtt-tokenchatlink)
- [Deepflame's Chat Cards](https://gitlab.com/TimToxopeus/df-chat-cards)
