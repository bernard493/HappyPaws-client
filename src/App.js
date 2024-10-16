import { useEffect } from "react";
import "./App.css";
import { AuthProvider, useAuth } from "./CustomHooks/AuthProvider ";
import Layouts from "./StackNavigation/Layouts/Layouts";
import { ChakraProvider } from "@chakra-ui/react";

// import { Auth0Provider } from "@auth0/auth0-react";

function App() {
 

  return (
    <AuthProvider>
      <ChakraProvider>
        <Layouts />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
