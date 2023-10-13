import { GoogleOAuthProvider } from '@react-oauth/google';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import './index.css';
import { ThemeContextProvider } from './contexts/ThemeContext.tsx';
import { Notifications } from '@mantine/notifications';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId="470926837429-oim1evs83qp3r1ceusj3n9irisoieduu.apps.googleusercontent.com">
      <ThemeContextProvider>
        <Notifications position="bottom-center" limit={5} />
        <App />
      </ThemeContextProvider>
    </GoogleOAuthProvider>
  </QueryClientProvider>
);
