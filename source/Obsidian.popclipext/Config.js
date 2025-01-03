// #popclip
// name: Obsidian
// identifier: obsidian-capture
// description: Capture text to Obsidian.
// after: copy
// icon: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0xMC41IDIxbC03LjUtNC4zdi04LjRMMTAgNC4ybDcuNSA0LjF2OC40TDEwLjUgMjFabTEuOC0zLjJsNC41LTIuNlY4LjhsLTQuNSAyLjZ2Ni40Wk0xMiA4LjVMNy41IDExdjUuMmw0LjUgMi42VjEzTDE2LjUgMTB2LTEuNUwxMiA4LjVaIi8+PC9zdmc+

define({
	options: [
		{
			identifier: "info",
			type: "heading",
			label: "Important!",
			description: "See the extension's README about required preparation steps in Obsidian."
		},
		{
			identifier: "vaultName",
			label: "Vault Name (required)",
			type: "string",
			description: "Name of the vault in Obsidian."
		},
		{
			identifier: "fileName",
			label: "File Name",
			type: "string",
			description: "Optional destination file. Leave blank to use Daily Note."
		},
		{
			identifier: "newFile",
			label: "Always create new file",
			type: "boolean",
			defaultValue: false,
			description: "Add each capture to its own file, appending an incrementing number to the file name."
		},
		{
			identifier: "heading",
			label: "Heading",
			type: "string",
			description: "Optional heading to insert captures under. Leave blank to append at the bottom of the file."
		},
		{
			identifier: "captureOptionsHeading",
			type: "heading",
			label: "Capture Options"
		},
		{
			identifier: "sourceLink",
			type: "boolean",
			label: "Include source link"
		}
	],
	actions: [
		{
			title: "Send to Obsidian",
			captureHtml: true,
			code: function(selection, options) {
				const url = new URL("obsidian://advanced-uri");
				url.searchParams.append("vault", options.vaultName);
				if (options.fileName) {
					url.searchParams.append("filename", options.fileName);
				} else {
					url.searchParams.append("daily", "true");
				}
				if (options.heading) {
					url.searchParams.append("heading", options.heading);
				}
				let content = "";
				if (options.heading) {
					content += "- ";
				}
				content += selection.markdown.trim();
				if (options.sourceLink && selection.browserUrl) {
					content += `\n[${selection.browserTitle || "Source"}](${selection.browserUrl})`;
				}
				url.searchParams.append("data", content);
				url.searchParams.append("mode", options.newFile ? "new" : "append");
				popclip.openUrl(url, { activate: false });
			}
		}
	]
});
