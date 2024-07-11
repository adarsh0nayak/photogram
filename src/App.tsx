import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { UserAuthProvider } from "./context/userAuthContext";

export default function App() {
  return (
    <UserAuthProvider>
      <RouterProvider router={routes}></RouterProvider>
    </UserAuthProvider>
  );
}
