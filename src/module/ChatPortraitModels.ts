export class ImageReplacerData {
  iconMainReplacer = '';
  iconsDamageType: string[] = [];
}

export class ChatPortraitCustomData {
  customIconPortraitImage = '';
  /** @deprecated use instead the 'customImageReplacerData' */
  customImageReplacer?: Record<string, string>;
  customImageReplacerData: ImageReplaceVoiceData[];
}

export class ImageReplaceVoiceData {
  name: string;
  icon: string;
}
