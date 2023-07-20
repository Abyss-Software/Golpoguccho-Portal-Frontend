import { Route, Routes } from "react-router-dom";
import ClientLayout from "./layouts/ClientLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import LoginPage from "./pages/Auth/LoginPage";
import ClientDashboard from "./pages/dashboard/ClientDashboard";
import Dashboard from "./pages/dashboard/Dashboard";
import CreateBookingPage from "./pages/Booking/CreateBookingPage";
import AppShellDemo from "./layouts/AppShell";

const Router = () => {
  return (
    <Routes>
      <Route path="/auth" element={<LoginPage />} />

      <Route path="/client" element={<ClientLayout />}>
        <Route path="" element={<ClientDashboard />} />
        <Route path="new-booking" element={<CreateBookingPage />} />
      </Route>

      <Route path="/" element={<AppShellDemo />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
      {/*  />

      <Route path="/register" element={<RegisterPage />} />

      <Route element={<AuthGuard />}>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="profile/:id" element={<ProfilePage />} />

          <Route
            element={
              <AuthGuard allowedRoles={[UserRoles.ADMIN, UserRoles.DIRECTOR]} />
            }
          >
            <Route path="admin-dashboard" element={<AdminDashboardPage />} />
          </Route>

          <Route
            element={
              <AuthGuard
                allowedRoles={[
                  UserRoles.ADMIN,
                  UserRoles.DIRECTOR,
                  UserRoles.OFFICE_MANAGER,
                  UserRoles.OFFICE_OFFICER,
                  UserRoles.STORE_MANAGER,
                  UserRoles.STORE_OFFICER,
                  UserRoles.EMPLOYEE,
                ]}
              />
            }
          >
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="inventory/:id" element={<InventoryProductPage />} />
          </Route>

          <Route
            element={
              <AuthGuard
                allowedRoles={[
                  UserRoles.ADMIN,
                  UserRoles.DIRECTOR,
                  UserRoles.STORE_MANAGER,
                  UserRoles.STORE_OFFICER,
                ]}
              />
            }
          >
            <Route path="distribution" element={<DistributionPage />} />
            <Route
              path="distribution/:id"
              element={<DistributionDetailsPage />}
            />
            <Route
              path="distribution/distribute"
              element={<ProductDistributionPage />}
            />

            <Route path="receive-returns" element={<ReceiveReturnPage />} />
            <Route
              path="receive-returns/:id"
              element={<ReceiveReturnDetailsPage />}
            />
            <Route
              path="receive-returns/receive"
              element={<ProductReturnReceivePage />}
            />
          </Route>

          <Route
            element={
              <AuthGuard
                allowedRoles={[
                  UserRoles.ADMIN,
                  UserRoles.DIRECTOR,
                  UserRoles.OFFICE_MANAGER,
                  UserRoles.OFFICE_OFFICER,
                ]}
              />
            }
          >
            <Route
              path="procurements/create"
              element={<ProcurementCreatePage />}
            />

            <Route path="procurements" element={<ProcurementPage />} />

            <Route
              path="procurements/:procurementId"
              element={<ProcurementDetailsPage />}
            />

            <Route path="purchase-orders" element={<PurchaseOrderPage />} />
            <Route
              path="purchase-orders/:purchaseOrderId"
              element={<PurchaseOrderDetailsPage />}
            />
          </Route>

          <Route
            element={
              <AuthGuard allowedRoles={[UserRoles.ADMIN, UserRoles.SUPPLIER]} />
            }
          >
            <Route path="quotations" element={<QuotationPage />} />

            <Route
              path="quotations/:procurementId"
              element={<QuotationDetailsPage />}
            />

            <Route path="order-requests" element={<OrderRequestPage />} />
            <Route
              path="order-requests/:purchaseOrderId"
              element={<OrderRequestDetailsPage />}
            />
          </Route>

          <Route
            path="unauthorized"
            element={
              <Typography variant="h4">
                You are not authorized to access this page
              </Typography>
            }
          />

          <Route
            path="*"
            element={
              <Typography variant="h4">Sorry! Page Not Found</Typography>
            }
          />
        </Route>
      </Route> */}
    </Routes>
  );
};

export default Router;
