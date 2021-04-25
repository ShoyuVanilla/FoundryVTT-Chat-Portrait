/**
 * Data passed by renderChatMessage Hook
 */
export interface MessageRenderData extends ChatMessage.MessageData{

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
		timestamp: number;
		type: number;
		user: string;
		whisper: string[];
		_id: string;
	};
	user: User;
	whisperTo: string;
}
