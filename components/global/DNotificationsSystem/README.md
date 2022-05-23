# Global notification system

The notification system is registered globally in the project, which means you can emit notifications without having to import anything in your components/pages.

## How to emit a notification

A notification will be added to the notifications queue by calling `this.$notif.emit(options)`.

## Options

You should at least provide the following options:

-   **content** (String): the textual content of the notification.
-   **title** (String): the title of the notification.

Additionnally, you can customize the notification by providing any of these options:

-   **action** (Object):
    -   **link** (String): can be a URL (relative or absolute); if it's an external link, please also provide `target` as explained hereafter.
    -   **target** (Function|String): can be a function to execute on click of the "action" section of the notification, or `_blank` if an external URL is provided in `link`.
-   **type** (String): can be either of the following: `default`, `success`, `warning`, `danger`. It will set a special color scheme based on the type (green for success, orange for warning, red for danger).
-   **icon1** ({ name: String, class: String }): if you want to override the first icon that shows up.
-   **icon2** ({ name: String, class: String }): if you want to override the second icon that shows up.

## Example

```
// myComponent.vue
<template>
	<button @click="showNotif">Click to show a notification</button>
</template>

<script src="myComponent.index.js"></script>
```

```js
// myComponent.index.js
export default {
	methods: {
		showNotif() {
			this.$notif.emit({
				action: {
					target: () => {
						console.log('something was done by clicking')
					},
					text: 'Click to action',
				},
				content:
					'Amet magna sunt Lorem cupidatat et laborum proident culpa.',
				title: 'Lorem Ipsum dolor sit amet',
				type: 'success',
			})
		},
	},
}
```
