import "./App.css";
import { AuthProvider } from "./CustomHooks/AuthProvider ";
import Layouts from "./StackNavigation/Layouts/Layouts";
import { ChakraProvider } from "@chakra-ui/react";


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
