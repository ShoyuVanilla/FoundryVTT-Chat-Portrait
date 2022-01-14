import { ChatPortrait } from './ChatPortrait';
import { CHAT_PORTRAIT_MODULE_NAME } from './settings';
import { canvas, game } from './settings';

export class ChatLink {
  static clickTimeout = 250;
  static clickCount = 0;
  static clickTimer: any;
  static playerWarning = (data) => ChatLink.i18nFormat(CHAT_PORTRAIT_MODULE_NAME + '.notInSight', data);

  static showTooltip = true;
  static hoverTimeout = 1000;
  static hoverTimer = null;

  static i18n = (toTranslate) => game.i18n.localize(toTranslate);
  static i18nFormat = (toTranslate, data) => game.i18n.format(toTranslate, data);
  static lastHoveredToken: TokenDocument | null;

  static init() {
    ChatLink.updateSettings();
  }

  static updateSettings() {
    ChatLink.showTooltip = <boolean>game.settings.get(CHAT_PORTRAIT_MODULE_NAME, 'hoverTooltip');
  }

  static prepareEvent(message, html, speakerInfo) {
    // let clickable = html.find('.chat-card'); // message-sender
    // if(!clickable){
    //     clickable = html.find('.message-sender');
    // }
    const clickable = html.find('.message-portrait');
    if (!clickable) {
      // Ignored some system as strange behavior
      return;
    }
    const speaker = speakerInfo.message ? speakerInfo.message.speaker : speakerInfo;
    if (!(speaker.actor || speaker.token)) {
      return;
    }
    // Removed 4535992 just a bug i can avoid to manage
    //ChatLink.formatLink(clickable);
    const speakerName =
      clickable[0]?.textContent ?? speaker.alias ?? ChatLink.i18n(CHAT_PORTRAIT_MODULE_NAME + '.genericName');
    const speakerData = { idScene: speaker.scene, idActor: speaker.actor, idToken: speaker.token, name: speakerName };

    if (!speakerData.idScene) {
      if (speakerInfo.author) {
        speakerData.idScene = speakerInfo.author.viewedScene;
      } else {
        speakerData.idScene = game.scenes?.current?.id;
      }
    }

    clickable.hover((event) => {
      ChatLink.hoverIn(event, speaker);
    }, ChatLink.hoverOut);
    clickable.dblclick((event) => ChatLink.panToToken(speakerData));
    // function clicks(e, speakerData) {
    //     ChatLink.clickCount++;
    //     if (ChatLink.clickCount == 1) {
    //         ChatLink.clickTimer = setTimeout(() => {
    //             ChatLink.clickCount = 0;
    //             ChatLink.selectToken(e, speakerData);
    //         }, ChatLink.clickTimeout);
    //     } else {
    //         ChatLink.clickCount = 0;
    //         clearTimeout(ChatLink.clickTimer);
    //         ChatLink.panToToken(speakerData);
    //     }
    // }

    // clickable.on('click', (e) => {
    //     clicks(e, speakerData)
    // }).on('dblclick', (e) => {
    //     e.preventDefault();
    // });
  }

  static prepareEventImage(message, html, speakerInfo) {
    const clickable = html.find('.message-portrait');

    const speaker = speakerInfo.message ? speakerInfo.message.speaker : speakerInfo;
    if (!(speaker.actor || speaker.token)) {
      return;
    }
    // Removed 4535992 just a bug i can avoid to manage
    //ChatLink.formatLink(clickable);
    const speakerName =
      clickable[0]?.textContent ?? speaker.alias ?? ChatLink.i18n(CHAT_PORTRAIT_MODULE_NAME + '.genericName');
    const speakerData = { idScene: speaker.scene, idActor: speaker.actor, idToken: speaker.token, name: speakerName };

    if (!speakerData.idScene) {
      if (speakerInfo.author) {
        speakerData.idScene = speakerInfo.author.viewedScene;
      } else {
        speakerData.idScene = game.scenes?.current?.id;
      }
    }

    clickable.hover((event) => {
      ChatLink.hoverIn(event, speaker);
    }, ChatLink.hoverOut);
    clickable.dblclick((event) => ChatLink.panToToken(speakerData));
    // function clicks(e, speakerData) {
    //     ChatLink.clickCount++;
    //     if (ChatLink.clickCount == 1) {
    //         ChatLink.clickTimer = setTimeout(() => {
    //             ChatLink.clickCount = 0;
    //             ChatLink.selectToken(e, speakerData);
    //         }, ChatLink.clickTimeout);
    //     } else {
    //         ChatLink.clickCount = 0;
    //         clearTimeout(ChatLink.clickTimer);
    //         ChatLink.panToToken(speakerData);
    //     }
    // }

    // clickable.on('click', (e) => {
    //     clicks(e, speakerData)
    // }).on('dblclick', (e) => {
    //     e.preventDefault();
    // });
  }

  // If it's reached this far, assume scene is correct.
  static panToToken(speakerData) {
    const user = game.user;

    const token = ChatLink.getToken(speakerData);
    if (!ChatLink.tokenExists(user, speakerData, token)) {
      return;
    }
    if (!ChatLink.permissionToSee(user, speakerData, token)) {
      return;
    }
    ChatLink.doPanToToken(user, token);
  }

  static selectToken(event, speakerData) {
    const user = game.user;

    const token = ChatLink.getToken(speakerData);
    if (!ChatLink.tokenExists(user, speakerData, token)) return;

    if (!ChatLink.permissionToSee(user, speakerData, token)) return;

    ChatLink.doSelectToken(event, user, token);
  }

  static getToken(speakerData) {
    let token = canvas.tokens?.placeables.find((t) => t.id === speakerData.idToken);
    if (!token) token = canvas.tokens?.placeables.find((t) => t.actor?.id === speakerData.idActor);

    return token;
  }

  static tokenExists(user, speakerData, token) {
    if (token && token.visible) return true;

    if (!ChatLink.isRightScene(user, speakerData)) return;

    const message = user.isGM
      ? ChatLink.playerWarning(speakerData) + ` ${ChatLink.i18n(CHAT_PORTRAIT_MODULE_NAME + '.noTokenFound')}`
      : ChatLink.playerWarning(speakerData);
    ChatLink.warning(message);
  }

  static isRightScene(user, speakerData) {
    if (canvas.scene?.id === speakerData.idScene) return true;

    let sceneNote;
    if (!speakerData.idScene) {
      sceneNote = ` ${ChatLink.i18n(CHAT_PORTRAIT_MODULE_NAME + '.noSceneFound')}`;
    } else {
      const tokenScene = game.scenes?.find((s) => s.data._id === speakerData.idScene);
      sceneNote = ` ${ChatLink.i18nFormat(CHAT_PORTRAIT_MODULE_NAME + '.checkScene', {
        sceneName: tokenScene?.data.name,
      })}`;
    }

    const message = user.isGM ? ChatLink.playerWarning(speakerData) + sceneNote : ChatLink.playerWarning(speakerData);
    ChatLink.warning(message);
  }

  static permissionToSee(user, speakerData, token) {
    if (user.isGM || token.visible) {
      return true;
    }
    ChatLink.warning(ChatLink.playerWarning(speakerData));
  }

  static permissionToControl(user: User, token: Token) {
    return user.isGM || token.actor?.hasPerm(user, 'OWNER');
  }

  static doSelectToken(event, user, token) {
    const ctrlKey = event.ctrlKey;
    if (!ChatLink.permissionToControl(user, token)) {
      ChatLink.targetToken(event, user, token, ctrlKey);
      return;
    }

    const shiftKey = event.shiftKey;

    if (shiftKey) {
      ChatLink.targetToken(event, user, token, ctrlKey);
    } else {
      ChatLink.controlToken(event, user, token, ctrlKey);
    }
  }

  static doPanToToken(user, token) {
    //@ts-ignore
    const scale = canvas.scene?._viewPosition.scale;

    canvas.animatePan({ x: token.x, y: token.y, scale: scale, duration: 500 });
    if (token && token.isVisible) {
      canvas.animatePan({ ...token.center, duration: 250 });
    }
  }

  static controlToken(event, user, token, ctrlKey) {
    const releaseOthers = { releaseOthers: !ctrlKey };
    if (ctrlKey) {
      if (token._controlled) token.release();
      else token.control(releaseOthers);

      return;
    }

    if (token._controlled || canvas.tokens?.controlled.length !== 1) token.control(releaseOthers);
    else if (!token._controlled && canvas.tokens?.controlled.length === 1) token.control(releaseOthers);
    else token.release();
  }

  static targetToken(event, user, token, ctrlKey) {
    const releaseOthers = { releaseOthers: !ctrlKey };
    if (ctrlKey) {
      if (token.isTargeted) token.setTarget(false, releaseOthers);
      else token.setTarget(true, releaseOthers);

      return;
    }

    if (token.isTargeted && game.user?.targets.size !== 1) token.setTarget(true, releaseOthers);
    else if (token.isTargeted && game.user?.targets.size === 1) token.setTarget(false, releaseOthers);
    else token.setTarget(true, releaseOthers);
  }

  static getCoords(token) {
    const result = { x: token.center.x, y: token.center.y, width: 1, height: 1 };
    return result;
  }

  static warning(message) {
    ui.notifications?.warn(message);
  }

  static hoverIn = (event, speaker) => {
    const token = ChatPortrait.getTokenFromSpeaker(speaker);
    if (token && token.visible) {
      event.fromChat = true;
      //@ts-ignore
      token._object._onHoverIn(event);
      ChatLink.lastHoveredToken = token;
    }
  };

  static hoverOut = (event) => {
    //@ts-ignore
    if (ChatLink.lastHoveredToken && ChatLink.lastHoveredToken._hover) {
      event.fromChat = true;
      //@ts-ignore
      ChatLink.lastHoveredToken._onHoverOut(event);
      ChatLink.lastHoveredToken = null;
    }
  };
  // static formatLink(html) {
  //     html.hover(() => {
  //         html.addClass('tokenChatLink')

  //         if (ChatLink.showTooltip) {
  //             ChatLink.hoverTimer = setTimeout(() => {
  //                 // add tooltip
  //                 let tooltip:any = document.createElement("SPAN");
  //                 tooltip.classList.add('tokenChatLink-tooltip');
  //                 let content = TooltipHelper.getContent();
  //                 tooltip.innerHTML = content;
  //                 html.append(tooltip)

  //                 // adjust position of tooltip
  //                 tooltip = $(document).find('.tokenChatLink-tooltip');
  //                 let htmlRect = html[0].getBoundingClientRect();
  //                 let tooltipRect = tooltip[0].getBoundingClientRect();
  //                 tooltip.css('top', htmlRect.y - tooltipRect.height - 10).css('left', 15);
  //             }, ChatLink.hoverTimeout);
  //         }
  //     },
  //     () => {
  //         clearTimeout(ChatLink.hoverTimer);
  //         html.removeClass('tokenChatLink')
  //         let tooltip = $(document).find('.tokenChatLink-tooltip');
  //         tooltip.remove();
  //     });
  // }
}

// export class TooltipHelper {
//     static getContent() {
//         let tips = game.user.isGM ? TooltipHelper.gmTips() : TooltipHelper.playerTips();

//         let tooltipData = {
//             title: game.i18n.localize(CHAT_PORTRAIT_MODULE_NAME+".instructionsTitle"),
//             tips: tips
//         }
//         //let template = Handlebars.compile(`{{> modules/${CHAT_PORTRAIT_MODULE_NAME}/templates/instructions.html}}`);
//         let template = Handlebars.compile(`{{> modules/${CHAT_PORTRAIT_MODULE_NAME}/templates/instructions.hbs }}`);
//         let content = template(tooltipData);

//         return content;
//     }

//     static gmTips() {
//         return [
//             game.i18n.localize(CHAT_PORTRAIT_MODULE_NAME+".gmClick"),
//             game.i18n.localize(CHAT_PORTRAIT_MODULE_NAME+".shiftClick"),
//             game.i18n.localize(CHAT_PORTRAIT_MODULE_NAME+".doubleClick"),
//             game.i18n.localize(CHAT_PORTRAIT_MODULE_NAME+".gmCtrlClick"),
//             game.i18n.localize(CHAT_PORTRAIT_MODULE_NAME+".gmCtrlShiftClick")
//         ]
//     }

//     static playerTips() {
//         return [
//             game.i18n.localize(CHAT_PORTRAIT_MODULE_NAME+".playerClick"),
//             game.i18n.localize(CHAT_PORTRAIT_MODULE_NAME+".shiftClick"),
//             game.i18n.localize(CHAT_PORTRAIT_MODULE_NAME+".doubleClick"),
//             game.i18n.localize(CHAT_PORTRAIT_MODULE_NAME+".playerCtrlClick"),
//             game.i18n.localize(CHAT_PORTRAIT_MODULE_NAME+".playerCtrlShiftClick")
//         ]
//     }
// }
