import "./App.css";
import Layouts from "./StackNavigation/Layouts/Layouts";
import { ChakraProvider } from "@chakra-ui/react";
// import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  return (
    <ChakraProvider>
      
        <Layouts />
    </ChakraProvider>
  );
}

export default App;
