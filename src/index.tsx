import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import '@telefonica/mistica/css/mistica.css';
import { ThemeContextProvider, VIVO_NEW_SKIN, getSkinByName } from '@telefonica/mistica';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  barcodeValue: '',
};
const barcodeSlice = createSlice({
  name: 'barcode',
  initialState,
  reducers: {
      scannedBarcode: (state, action) => {
          state.barcodeValue = action.payload;
      },
  },
});
const store = configureStore({
  reducer: {
    barcode: barcodeSlice.reducer
  },
});
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeContextProvider theme={{
    skin: getSkinByName(VIVO_NEW_SKIN),
    colorScheme: 'light',
    i18n: {
      locale: 'pt-BR',
      phoneNumberFormattingRegionCode: 'BR',
    },

  }}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeContextProvider>
);

export const { scannedBarcode } = barcodeSlice.actions;
//export type RootState = ReturnType<typeof store.getState>;
//export type AppDispatch = typeof store.dispatch;