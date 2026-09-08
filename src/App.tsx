import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import ProtectedRoute from "@/components/ProtectedRoute";
import LandingPage from "@/pages/Landing";
import AuthPage from "@/pages/Auth";
import AppPage from "@/pages/Dashboard";
import NotFoundPage from "@/pages/NotFound";

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Combined sign-in/sign-up page, unchanged from the original design.
            /sign-in and /sign-up deep-link into the matching tab. */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/sign-in" element={<AuthPage initialMode="signin" />} />
        <Route path="/sign-up" element={<AuthPage initialMode="signup" />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/app" element={<AppPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
  );
}
