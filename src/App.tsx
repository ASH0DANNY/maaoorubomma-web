import { RouterProvider } from "react-router-dom"
import { router } from "./routes/main-routes"
import { LocationProvider } from "./context/LocationContext"

function App() {
  return (
    <LocationProvider>
      <RouterProvider router={router} />
    </LocationProvider>
  )
}

export default App
