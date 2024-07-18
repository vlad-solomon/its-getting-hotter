import React from "react";
import ReactDOM from "react-dom/client";
import "../src/assets/root.scss";
import "../src/assets/fonts.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Year from "./pages/Year";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter(
	[
		{
			path: "/",
			element: <Home />,
		},
		{
			path: "/:year",
			element: <Year />,
			errorElement: <NotFound />,
		},
	],
	{
		basename: "/vlad-solomon.github.io",
	}
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
