import { Route, Switch } from "wouter";
import { ThemeProvider } from "./contexts/ThemeProvider";
import { Toaster } from "./components/ui/toaster";

// Pages
import HomePage from "./pages/Home";
import NotFoundPage from "./pages/NotFound";

export default function App() {
  return (
    <ThemeProvider>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Toaster />
    </ThemeProvider>
  );
}