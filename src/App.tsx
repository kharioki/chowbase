import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

import authProvider from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "./pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";
import { supabaseClient } from "./utility";
import { Title } from "./components/title";
import { Inventory, Item } from "./pages/inventory";
import { Sales, Sale } from "./pages/sales";
import { SuppliersList, Supplier } from "./pages/suppliers";

function App() {
  return (
    <BrowserRouter>
      {/* <GitHubBanner /> */}
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider(supabaseClient)}
              liveProvider={liveProvider(supabaseClient)}
              authProvider={authProvider}
              routerProvider={routerBindings}
              notificationProvider={notificationProvider}
              resources={[
                {
                  name: "items",
                  list: "/inventory",
                  show: "/inventory/item/:id",
                  meta: {
                      label: "Inventory",
                      icon: <StoreMallDirectoryIcon />,
                  },
                },
                {
                  name: "products",
                  list: "/sales",
                  show: "/sales/sale/:id",
                  meta: {
                      label: "Shop sales",
                      icon: <ReceiptOutlinedIcon />,
                  },
                },
                {
                  name: "suppliers",
                  list: "/suppliers",
                  show: "/suppliers/supplier/:id",
                  meta: {
                      label: "Suppliers",
                      icon: <LocalShippingOutlinedIcon />,
                  },
                },
                {
                  name: "blog_posts",
                  list: "/blog-posts",
                  create: "/blog-posts/create",
                  edit: "/blog-posts/edit/:id",
                  show: "/blog-posts/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
                {
                  name: "categories",
                  list: "/categories",
                  create: "/categories/create",
                  edit: "/categories/edit/:id",
                  show: "/categories/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                      <ThemedLayoutV2 
                        Header={() => <Header sticky />}
                        Title={Title}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="blog_posts" />}
                  />
                  <Route path="/inventory">
                    <Route index element={<Inventory />} />
                    <Route path="item/:id" element={<Item />} />
                  </Route>
                  <Route path="/sales">
                    <Route index element={<Sales />} />
                    <Route path="sale/:id" element={<Sale />} />
                  </Route>
                  <Route path="/suppliers">
                    <Route index element={<SuppliersList />} />
                    <Route path="supplier/:id" element={<Supplier />} />
                  </Route>

                  <Route path="/blog-posts">
                    <Route index element={<BlogPostList />} />
                    <Route path="create" element={<BlogPostCreate />} />
                    <Route path="edit/:id" element={<BlogPostEdit />} />
                    <Route path="show/:id" element={<BlogPostShow />} />
                  </Route>
                  <Route path="/categories">
                    <Route index element={<CategoryList />} />
                    <Route path="create" element={<CategoryCreate />} />
                    <Route path="edit/:id" element={<CategoryEdit />} />
                    <Route path="show/:id" element={<CategoryShow />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
                <Route
                  element={
                    <Authenticated fallback={<Outlet />}>
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route
                    path="/login"
                    element={
                      <AuthPage
                        title="Welcome to Chowbase"
                        type="login"
                        formProps={{
                          defaultValues: {
                            email: "info@refine.dev",
                            password: "refine-supabase",
                          },
                        }}
                        wrapperProps={{
                          style: {
                            backgroundImage: `url(https://res.cloudinary.com/khariokitony/image/upload/v1688877556/chowbase-bg.jpg)`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            color: "white",
                          }
                        }}
                      />
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      <AuthPage
                        title="Welcome to Chowbase"
                        type="register"
                        wrapperProps={{
                          style: {
                            backgroundImage: `url(https://res.cloudinary.com/khariokitony/image/upload/v1688877556/chowbase-bg.jpg)`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            color: "white",
                          }
                        }}
                      />
                    }
                  />
                  <Route
                    path="/forgot-password"
                    element={
                      <AuthPage
                        type="forgotPassword"
                        title="Forgot Password"
                        wrapperProps={{
                          style: {
                            backgroundImage: `url(https://res.cloudinary.com/khariokitony/image/upload/v1688877556/chowbase-bg.jpg)`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            color: "white",
                          }
                        }}
                      />
                    }
                  />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
