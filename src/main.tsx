import { GoogleOAuthProvider } from '@react-oauth/google';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App.tsx';
import './index.css';
import { ThemeContextProvider } from './contexts/ThemeContext.tsx';

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
        <App />
      </ThemeContextProvider>
    </GoogleOAuthProvider>
  </QueryClientProvider>
);
