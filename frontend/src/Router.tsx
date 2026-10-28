import { createBrowserRouter } from "react-router";
import App from "./App";
import MessageView from "./pages/MessageView";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ index: true, element: <MessageView /> }],
  },
]);
