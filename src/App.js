import { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

//Layout
import Layout from "./components/layout/Layout";

//Import Components
import LoadingSpinner from "./components/UI/LoadingSpinner";
// import AllQuotes from "./pages/AllQuotes";
// import NewQuote from "./pages/NewQuote";
// import SingleQuote from "./pages/SingleQuote";
// import NotFound from "./pages/NotFound";

// Optimize Routes With Lazy Loading
const AllQuotes = lazy(() => import("./pages/AllQuotes"));
const NewQuote = lazy(() => import("./pages/NewQuote"));
const SingleQuote = lazy(() => import("./pages/SingleQuote"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
            
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" component={AllQuotes} exact />
          <Route path="/quotes/:quoteID" component={SingleQuote} />
          <Route path="/new-quote" component={NewQuote} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
