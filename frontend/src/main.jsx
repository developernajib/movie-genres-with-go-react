import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "@/assets/css/global.css";
import App from "@/App.jsx";
import Error from "@/pages/Error.jsx";
import Home from "@/pages/Home.jsx";
import Movies from "@/pages/Movies.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <Error />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "movies", element: <Movies /> },
		],
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
