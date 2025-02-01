import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes} from 'react-router'
import { MENU_AVAILABLE } from './constants/menu.ts'
import BackgroundChanger from './project/background-changer/Background_Changer'
import CurrencyConverterRaw from './project/currency-converter/Currency_Converter'
import PasswordGenerator from './project/password-genrator/Password_Generator'
import Todo from './project/todo/Todo.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { withNoContentState } from './utils/with/withNoContentState.tsx'

const CurrencyConverter = withNoContentState(CurrencyConverterRaw);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <Provider store = {store}>
    {/* Theme provider to be removed once Redux is implemented */}
    {/* <ThemeProvider> */}
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />}>
                <Route path='/project'>
                    <Route path= {MENU_AVAILABLE.CURRENCY_CONVERTER.toLowerCase()} element= {<CurrencyConverter />} />
                    <Route path= {MENU_AVAILABLE.PASSWORD_GENERATOR.toLowerCase()} element= {<PasswordGenerator />} />
                    <Route path= {MENU_AVAILABLE.BACKGROUND_UPDATER.toLowerCase()} element= {<BackgroundChanger /> } />
                    <Route path= {MENU_AVAILABLE.TODO.toLowerCase()} element= {<Todo /> } />
                </Route>
            </Route>
        </Routes>
      </BrowserRouter>
    {/* </ThemeProvider> */}
    </Provider>
  </StrictMode>,
)
