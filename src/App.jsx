import React, { useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import RouteIndex from "./routes";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { fetchAuthData } from "./utils/helper";
import SuspenseLoader from "./features/SuspenseLoader";
import { setAuthData, setAuthError } from "./redux/slices/cacheSlice";
import { useDispatch } from "react-redux";

const queryClient = new QueryClient();

const App = () => {
  const dispatch = useDispatch();
  const {
    data: authData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["authPage", "admin", "en"],
    queryFn: fetchAuthData,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (authData) {
      dispatch(setAuthData(authData));
    } else if (isError) {
      dispatch(setAuthError());
    }
  }, [authData, isError, dispatch]);

  if (isLoading) return <SuspenseLoader />;
  if (isError) return <SuspenseLoader />;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouteIndex />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
