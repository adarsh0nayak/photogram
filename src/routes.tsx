import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Error } from "./pages/Error";
import { Post } from "./pages/Post";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/Signup";
import { MyPhotos } from "./pages/MyPhotos";
import { Profile } from "./pages/Profile";
import { ProtectedRoutes } from "./components/ProtectedRoutes";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/home",
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: "/post",
        element: <Post />,
        errorElement: <Error />,
      },
      {
        path: "/photos",
        element: <MyPhotos />,
        errorElement: <Error />,
      },
      {
        path: "/profile",
        element: <Profile />,
        errorElement: <Error />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <Error />,
  },
]);
