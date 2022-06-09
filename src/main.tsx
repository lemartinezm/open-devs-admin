import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript, extendTheme, ThemeConfig } from '@chakra-ui/react';
import App from './App';

//  Customize theme
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true
};

const theme = extendTheme({ config });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
