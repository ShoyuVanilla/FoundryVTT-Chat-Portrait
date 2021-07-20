import { ChatMessageData } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/module.mjs";

/**
 * Data passed by renderChatMessage Hook
 */
export interface MessageRenderData extends ChatMessageData{

	alias: string;
	author: User;
	borderColor: string;
	cssClass: string;
	isWhisper: boolean;
	message: {
		content?: string;
		flags: object;
		flavor?: string;
		roll?: string;
		sound?: string;
		speaker: {
			scene?: string;
			actor?: string;
			token?: string;
			alias?: string;
		};
    blind?: string;
		timestamp: number;
		type: number;
		user: string;
		whisper: string[];
		_id: string;
	};
	user: string;
	whisperTo: string;
	document:any;
}
