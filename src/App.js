import "./App.css";
import Layouts from "./StackNavigation/Layouts/Layouts";
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <Layouts />
    </ChakraProvider>
  );
}

export default App;
