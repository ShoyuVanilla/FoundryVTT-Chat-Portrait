import { MODULE_NAME } from './settings';

export const preloadTemplates = async function () {
	const templatePaths = [
		// Add paths to "module/XXX/templates"
		//`/modules/${MODULE_NAME}/templates/XXX.html`,
		`/modules/${MODULE_NAME}/templates/chat-portrait-form.html`,
		`/modules/${MODULE_NAME}/templates/instructions.html`,
	];

	return loadTemplates(templatePaths);
}
