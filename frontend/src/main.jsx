import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "@/assets/css/global.css";
import App from "@/App.jsx";
import Error from "@/pages/Error.jsx";
import Home from "@/pages/Home.jsx";
import Movies from "@/pages/Movie/Movies.jsx";
import ShowMovie from "@/pages/Movie/ShowMovie.jsx";
import CreateMovie from "@/pages/Movie/CreateMovie.jsx";
import EditMovie from "@/pages/Movie/EditMovie.jsx";
import Catalogue from "@/pages/Admin/Catalogue/Catalogue.jsx";
import Login from "@/pages/Login/Login.jsx";
import Genres from "@/pages/Genres/Genres.jsx";
import GraphQL from "@/pages/GraphQL/GraphQL.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <Error />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "movies", element: <Movies /> },
            { path: "movies/:id", element: <ShowMovie /> },
            { path: "admin/movie/0", element: <CreateMovie /> },
            { path: "movie/edit/:id", element: <EditMovie /> },
            { path: "catalogue", element: <Catalogue /> },
            { path: "login", element: <Login /> },
            { path: "genres", element: <Genres /> },
            { path: "graphql", element: <GraphQL /> },
		],
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
