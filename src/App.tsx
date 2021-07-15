import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './components/ErrorBoundry';
import GlobalStateProvider from './contexts/GlobalContext';
import MainLayout from './layouts/MainLayout';
import { AvailableCars } from './pages/AvailableCarsPage';
import { CarDetailPage } from './pages/CarDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <GlobalStateProvider>
        <ErrorBoundary>
          <MainLayout>
            <Switch>
              <Route exact path="/" component={AvailableCars} />
              <Route exact path="/details/:stockNumber" component={CarDetailPage} />
              <Route exact path="*" component={NotFoundPage} />
            </Switch>
          </MainLayout>
        </ErrorBoundary>
      </GlobalStateProvider>
    </BrowserRouter>
  );
}

export default App;
