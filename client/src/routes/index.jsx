import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import OfferPage from "../pages/OfferPage";
import NeedPage from "../pages/NeedPage";
import ProjectPage from "../pages/ProjectPage";
import ConnectionPage from "../pages/ConnectionPage";
import CreateUser from "../components/Users/CreateUser";
import CreateOffer from "../components/Offers/CreateOffer";
import CreateProject from "../components/Projects/CreateProject";
import UserPage from "../pages/UserPage";
import CreateNeedForm from "../components/Needs/CreateNeedForm";
import SingleOffer from "../components/Offers/SingleDisplayOffer";
import ProjectDetailsPage from "../components/Projects/ProjectDetailsPage";
import AllOffers from "../components/Offers/AllOffers";
import SingleUser from "../components/Users/SingleUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <UserPage /> },
      { path: "users", element: <UserPage /> },
      { path: "single/:id", element: <SingleUser /> },
      { path: "users/create", element: <CreateUser /> },
      { path: "offers", element: <OfferPage /> },
      { path: "offers/create", element: <CreateOffer /> },
      { path: "single-offer/:id", element: <SingleOffer /> },
      { path: "All-offer", element: <AllOffers /> },

      { path: "needs", element: <NeedPage /> },
      { path: "needs/create", element: <CreateNeedForm /> },
      { path: "projects", element: <ProjectPage /> },
      { path: "projects/create", element: <CreateProject /> },
      { path: "project-details/:id", element: <ProjectDetailsPage /> },

      { path: "connections", element: <ConnectionPage /> },
    ],
  },
]);

export default router;
