export const isMonkTokenBarXP = function (html) {
    const check = html.find('.message-content')[0]?.firstElementChild?.classList;
    if (check && check.length > 0) {
        if (check.contains('monks-tokenbar') && ('assignxp')) {
            return true;
        }
    }
    return false;
};
// export const isNarrator = function(html:JQuery<HTMLElement>){
//     const check = html.find('.message-content .monks-tokenbar .assignxp');  
//     return !!check;
// }
