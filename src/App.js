import "./App.scss";
import { AuthProvider } from "./CustomHooks/AuthProvider ";
import Layouts from "./StackNavigation/Layouts/Layouts";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./store/store";


function App() {
 
  return (
    <Provider store={store}>
      <AuthProvider>
        <ChakraProvider>
          <Layouts />
        </ChakraProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
