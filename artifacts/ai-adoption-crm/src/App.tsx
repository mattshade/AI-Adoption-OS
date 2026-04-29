import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/app-layout";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import TeamsPage from "@/pages/teams";
import TeamDetailPage from "@/pages/team-detail";
import ToolsPage from "@/pages/tools";
import PipelinePage from "@/pages/pipeline";
import InteractionsPage from "@/pages/interactions";
import InsightsPage from "@/pages/insights";
import DashboardsPage from "@/pages/dashboards";
import GovernancePage from "@/pages/governance";
import DesignSystemPage from "@/pages/design-system";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/teams" component={TeamsPage} />
      <Route path="/teams/:id" component={TeamDetailPage} />
      <Route path="/tools" component={ToolsPage} />
      <Route path="/pipeline" component={PipelinePage} />
      <Route path="/interactions" component={InteractionsPage} />
      <Route path="/insights" component={InsightsPage} />
      <Route path="/dashboards" component={DashboardsPage} />
      <Route path="/governance" component={GovernancePage} />
      <Route path="/design-system" component={DesignSystemPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppLayout>
            <Router />
          </AppLayout>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
