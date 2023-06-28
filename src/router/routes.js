const routes = [
	{
		path: "/",
		component: () => import("layouts/MainLayout.vue"),
		children: [
			{
				path: "",
				name: "trending",
				component: () => import("pages/IndexPage.vue"),
			},
			{
				path: "/search",
				name: "search",
				component: () => import("pages/SearchPage.vue"),
			},
		],
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: "/:catchAll(.*)*",
		component: () => import("pages/ErrorNotFound.vue"),
	},
];

export default routes;
