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
    <GoogleOAuthProvider clientId="254412738059-n7c755k5so031eodq19m6p9867d0i1t3.apps.googleusercontent.com">
      <ThemeContextProvider>
        <Notifications position="bottom-center" limit={5} />
        <App />
      </ThemeContextProvider>
    </GoogleOAuthProvider>
  </QueryClientProvider>
);
