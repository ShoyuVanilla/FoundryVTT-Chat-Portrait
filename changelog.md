## 0.5.33

- Some bug fix on the workflow

## 0.5.32

- Bug fix [[BUG] Module incompatibility with midi qol saving throw panel](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/88)

## 0.5.31

- Bug fix  [Compatibility with roll of fate](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/87)

## 0.5.30

- Add japanese language and set foundry version 9

## 0.5.29

- Bug fix [Image missing from elementItemImageList](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/85)

## 0.5.28

- Patch for tokenized characte on jquery `$()` analyze of message content like .,!,?

## 0.5.27

- Patch for compatibility with enhanced-conditions message of CUB, do not prepend the first image

## 0.5.26

- Add module setting to disable the chat portrait if the alias of the chat message is from a GM user
- Add module setting to set up a default image if the alias of the chat message is from a GM user
- Update the html form

## 0.5.25

- Create new version for clean the cache of old version no change on the code

## 0.5.24

- move ja.json to localized module
- Add [CHANGELOGS & CONFLICTS](https://github.com/theripper93/libChangelogs) hooks for better management of the conflicts

## 0.5.23

- Add compatibility with merchant sheet module for when pick up item
- Bug fix for redundant unkwnonw images with other modules

## 0.5.22

- Add compatibility with new innocenti loot

## 0.5.21

- [add japanese localization (author: tonishi)](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/pull/81)
- Update readme

## 0.5.20

- Bug fix [[BUG] Rolled Tables image bug](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/80)
- Partial patch for fix [Incompatibility with the "Randomize Wildcard Images" option](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/79)

## 0.5.15-16-17-18-19

- bug fix and update module.json

## 0.5.14

- Add github worklow 
- Add new settings for "Do not use token image with specific type of actor"

## 0.5.13

- Apply the "iconizer" format on imagereplacer for future developing

## 0.5.12

- Add check for null promise

## 0.5.11

- Add check for null promise

## 0.5.10

- Some small fix and module compatibility
- Try to fix [Incompatibility with the "Randomize Wildcard Images" option](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/79)
- Try to fix [SWADE/Deadlands Icons and text are truncated at default icon size](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/78)
- Try to fix [[Bug] On Load & New Combat Round Error](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/77)

## 0.5.9

- Bug fix compatibility DND5e Helper 2.X.X

## 0.5.8

- Bug fix function '_onHoverIn' for TokenDocument instead fro 'Token'

## 0.5.7

- Some minor bug fix
- Add prettier plugin

## 0.5.6

- Some performance on chat portrait mechanism to the combat tracker
- Some performance on chat portrait on chat message building

## 0.5.5

- Some performance on chat portrait mechanism to the combat tracker

## 0.5.4

- Some performance on chat portrait mechanism to the combat tracker

## 0.5.3

- Add the feature to add the chat portrait mechanism to the combat tracker, base don the issue [Missing character sheet portraits on initiative rolls](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/75)

## 0.5.2

- Bug fix [Missing character sheet portraits on initiative rolls](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/75)

## 0.5.1

- Integration of the feture request for better hooks [Feature Request: Ability for modules to add custom message-portrait images](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/73)

## 0.5.0

- Some bug fix
- Fix a incompativility with Dmaage Log module
- Add some hooks

## 0.4.9

- Bug fix wildcard image token

## 0.4.8

- Update ko.json lang
- Try to fix [Suggestion: whisper colors](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/72)

## 0.4.7

- Some bug fixing and improvement
- Try to fix [[PF1] Applying damage from a chat card focuses the speaker](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/70)
- Try to fix [Chat images don't show up](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/69)
- Try to fix [Background images obscure roll type colouring](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/68)
- Try to fix [Damage Log compatibility request](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/67)

## 0.4.6

- Small bug fix for Narrator Module multi language [
background color with narrator tools
](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/65)

## 0.4.5

- Bug fix [Initiative roll bugged 0.4.4](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/66)
- Bug fix [background color with narrator tools](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/65)

## 0.4.4

- CCS bug fixing for module settings to "Text next to portrait"
- Bug fix [Text unreadable for some chat cards in PF1](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/64)
- Bug fix [Chat flavor text looks a bit wonky and out of place](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/63)
- Bug fix [« Cannot Read property 'id' » when loading & combat state](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/62)
- Bug fix [Latest release breaks PF2E formatting](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/61)

## 0.4.3

- CSS compatibility fir for Chat Images module

## 0.4.2

- Some bug fix
- CSS compatibility fit turnamarker module

## 0.4.1

- Add support for PF2
- Added retrieve image for very old token structure (0.7.X)
- Add support for Imager Replacer with system PF2
- Bug fix get avatar image emthod
- Bug fix on the workflow
- Try to bug fix [Missing portraits + conflict with Monk's Token Bar](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/60)
- Many, many, many other bug fixing on the workflow o

## 0.4.0 [BREAKING CHANGES]

- Every OOC chat message type, try to use the img avatar by default
- Make async tha pai call to rendering of the chat message so world load more fast
- Try to bug fix [BUG: Players' OOC messages use character image instead of player avatar](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/59)
- Try to bug fix [Portait shows a broken image when using token wildcards, and Better Rolls is enabled](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/58)
- Set to false the module settings for "Image Replacer Damage Type"
- Upgrade typescript library to 0.8.8

## 0.3.12 [BREAKING CHANGES]

- Add new module settings and management for dmaage types icons
- Add new style for the visualizations of the damage types
- Try to bug fix [Token portrait does not change even if the token do.](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/57)
- Some small bug fix here and there
  
## 0.3.11

- Small bug fix on 'preCreateMessageChat' hook

## 0.3.10

- Try bug fix for [Scrolling issue](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/53)
- Try a bug fix [Doing Ability Checks/Saves causes Portrait to revert to Player Token, not Actor/Character token.](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/52)
- Added Universal Language Image Replacer (still limited to DnD5e)
- Added Image Replacer for damage type
  
## 0.3.9 (Developing)

- Fixed little incompatibility with midiqol
- Try a bug fix [Doing Ability Checks/Saves causes Portrait to revert to Player Token, not Actor/Character token.](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/52)
- Try a bug fix [Display Chat Flavor Text next to Portrait" has bad formatting](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/51)
- Update ko language [v0.3.8 ko.json](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/pull/50)
- Custom integration of [FVTT-Chat-Message-Accessibility-Indicators](https://github.com/schultzcole/FVTT-Chat-Message-Accessibility-Indicators) for avoid collision between module , add a module settings for enable this

## 0.3.8

- Some bug fix

## 0.3.7

- Some minor update

## 0.3.6

- Add another module setting for use a custom styling for the text and resolved this issue [Font Class of the Styling](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/49)
- 
## 0.3.5

- Add css class for a "better"  display of the text on the chat 

## 0.3.4

- Patch for module narrator [Narrator Chat Module Support](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/pull/45)
- Bug fix [Issue: Initiative Asset Missing](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/46)
- Bug fix [Request: ImageReplacer for Long and Short Rests](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/47)
- Add 'Attack Roll' and 'Damage Roll' to ImageReplacer
- Bug fix and improve to ImageReaplacer mechanism

## 0.3.3

- Some minor bug fix
 
## 0.3.2

- Some minor bug fix

## 0.3.1

- Add an other module setting for make optional to visualize the name of the player on the chat 'displayPlayerName'
- Set some module setting to 'client' instead of 'world'

## 0.3.0

- Add other module settings 'displaySettingOTHER', 'displaySettingOOC', 'displaySettingIC', 'displaySettingEMOTE',
'displaySettingWHISPER', 'displaySettingROLL', 'displaySettingWhisperToOther'
- Add other module settings 'displayUnknownPlaceHolderActorName', displayUnknownPlaceHolderItemName', 'displayUnknownPlaceHolderItemIcon', 'useTokenName'
- Check for the issue [Name appears as "Unknown Actor" and portrait still appears when styling is disabled](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/40)
- Add some minor feature and bug fix.
- Add feature [Feature request: Don't display portrait on out-of-character messages](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/42)

## 0.2.16 

- Set default value of unknwon to 'none' instead 'allCards' because make sense

## 0.2.15 [Breaking changes]

- Bug fix [Name appears as "Unknown Actor" and portrait still appears when styling is disabled](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/40)

## 0.2.14

- Add ko language transaltion [https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/pull/37](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/pull/37) ty to jbblily
- Bug fix [Portrait Border Shape always resets to "square" when opening the settings](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/39)
- Bug fix [Name appears as "Unknown Actor" and portrait still appears when styling is disabled](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/40)

## 0.2.13

- Some bug fix to the ImageReplace and add support for multi language
- Add ko language transaltion [https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/pull/36](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/pull/36) ty to jbblily
- Some minor bug fix
- Whisper message are ignored from the moduel for avoid other people to read the content

## 0.2.12

- Bug fix [Bug: Portraits disappear from chatlog when refreshed](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/35)
- Bug fix [Feature suggestion : OOC portrait as player avatar](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/32)
- Start base code for multisystem

## 0.2.11

- Minor update

## 0.2.10 

- Added [Add an object-fit: cover option in the window configuration](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/21), replace the object-fit:contains in object-fit:cover
- Bug fix on 'useAvatarImage' setting related to [Feature suggestion : OOC portrait as player avatar](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/32)

## 0.2.9

- Bug fix loading scene without any token

## 0.2.8

- Add support for webm and solved [Thumbnails brake when animated](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/28)

## 0.2.7

- Add "Hide" chat message detail [Feature Suggestion: Option to hide portrait for GM rolls](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/24)
- Solved [Feature suggestion : chat text color as player color](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/30)
- Solved [Feature suggestion : OOC portrait as player avatar](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/32)

## 0.2.6

- Add module settings for change text font size on the name next to the portrait

## 0.2.5

- Some minor improvement for Foundry 0.8.6

## 0.2.4

- Integration for Foundry 0.8.6
- Integration with [Token Chat Link](https://github.com/espositos/fvtt-tokenchatlink) on the portrait element

## 0.2.3

- Preparation for foundry 0.8.0
- Bootstrapped with League of Extraordinary FoundryVTT Developers  [foundry-vtt-types](https://github.com/League-of-Foundry-Developers/foundry-vtt-types)
- Added [Bug Reporter Module](https://foundryvtt.com/packages/bug-reporter/)
- [New Feature: Configurable option to use the player's color as blended background color of the message. by @Biggles](https://github.com/MOAM-Biggles/FoundryVTT-Chat-Portrait/) 
- [Translation: Updated German translation by @Biggles](https://github.com/MOAM-Biggles/FoundryVTT-Chat-Portrait/) 
- [Added option to use player's color as blended background color of the](https://github.com/MOAM-Biggles/FoundryVTT-Chat-Portrait/commit/420f018bdcb5a37cf0e5e3ad5a61e6dccc318abd)

## 0.2.2

- Integration with [Nick's East foundry-pc-types](https://gitlab.com/foundry-projects/foundry-pc/foundry-pc-types/-/tree/master)
- Some minor upgrade of the structure of the project
- [Fix: no token img if no token selected](https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/pull/22)

## 0.2.1

- Fix: Fixed the bug that the configuration window is not opened
- Translation: Spanish translation by @lozalojo
- Translation: German translation by @envy

## 0.2.0

- Migrated to TypeScript
- New Feature: Separated configuration window
- New Feature: Configurable option for portrait border's color and width
- New Feature: Configurable option for placing chat flavor text next to portrait
- Fixed various issues
- Translation: Castilian translation by @HonzoNebro

## 0.1.4

- New Feature: Configurable option for using the player's color on chat message border. by @gatesvp
- New Feature: Configurable option for portrait image size
- Fix: Fixed the problem that non-square images are squeezed. by @megastruktur
