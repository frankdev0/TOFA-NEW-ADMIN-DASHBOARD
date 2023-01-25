import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MessageCenter from "./pages/buyershub/message-center/MessageCenter";
import Orders from "./pages/buyershub/orders/Orders";
import COrders from "./pages/buyershub/orders/COrders";
import Navbar from "./pages/components/navbar/Navbar";
import Sidebar from "./pages/components/sidebar/Sidebar";
import Login from "./pages/Authentication/Login";
import Overview from "./pages/overview/Overview";
import CommodityInsight from "./pages/website-settings/commodityInsight/CommodityInsight";
import NewCommodity from "./pages/website-settings/commodityInsight/NewCommodity";
import CreateFaq from "./pages/website-settings/faqs/CreateFaq";
import Faqs from "./pages/website-settings/faqs/Faqs";
import CreateTestimonial from "./pages/website-settings/testimonial/CreateTestimonial";
import Testimonial from "./pages/website-settings/testimonial/Testimonial";
import CreateUser from "./pages/users/CreateUser";
import Products from "./pages/buyershub/products/Products";
import CreateProducts from "./pages/buyershub/products/CreateProducts";
import CreateBanner from "./pages/website-settings/bannners/CreateBanners";
import Banners from "./pages/website-settings/bannners/Banners";
import Disputes from "./pages/buyershub/disputes/Disputes";
import Inquiries from "./pages/buyershub/inquiries/Inquiries";
import Applicants from "./pages/tofaacademy/applicants/Applicants";
import EditProducts from "./pages/buyershub/products/EditProducts";
import Buyers from "./pages/buyershub/buyers/Buyers";
import EditFaq from "./pages/website-settings/faqs/EditFaq";
import EditTestimonial from "./pages/website-settings/testimonial/EditTestimonial";
import EditCommodity from "./pages/website-settings/commodityInsight/EditCommodity";
import EditBanner from "./pages/website-settings/bannners/EditBannner";

import Users from "./pages/users/Users";
import ConfirmPassword from "./pages/Authentication/ConfirmPassword";
import SecurityQuestion from "./pages/Authentication/SecurityQuestion";
// import { AuthContext, AuthContextProvider } from "./utils/contexts/AuthContext";
import Unauthorized from "./pages/components/unauthorized/Unauthorized";
import AppState from "./utils/contexts/AppState";
import Tractions from "./pages/website-settings/traction/Traction";
import CreateTraction from "./pages/website-settings/traction/CreateTraction";
import EditTraction from "./pages/website-settings/traction/EditTraction";
import Bar from "./pages/components/sidebar/Bar";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import Page404 from "./pages/components/page404/Page404";
import Partnerships from "./pages/website-settings/partnerships/Partnerships";
import CreatePartner from "./pages/website-settings/partnerships/CreatePartner";
import EditPartner from "./pages/website-settings/partnerships/EditPartner";
import MarketBuyers from "./pages/marketplace/buyers/MarketBuyers";
import ResetPassword from "./pages/Authentication/ResetPassword";
// import Protected from "./pages/components/Protected";

function App() {
  // const [loading, setLoading] = useState(false)

  // const { user, userLoading } = useContext(AppContext);

  // if (userLoading) {
  //   setTimeout(() => {}, 3000);
  //   return (
  //     <div
  //       className="spinner mx-auto"
  //       align="center"
  //       id="spinner"
  //       style={{
  //         position: "absolute",
  //         top: "calc(50% - 60px)",
  //         left: "calc(50% - 60px)",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         textAlign: "center",
  //         margin: "auto",
  //       }}
  //     ></div>
  //   );
  // }

  return (
    <AppState>
      <div className="App">
        {/* <BrowserRouter> */}
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/set-password/:userId/:setPasswordToken"
            element={<ConfirmPassword />}
          />

          <Route
            exact
            path="/securityquestion"
            element={<SecurityQuestion />}
          />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route
            exact
            path="/passwordreset/:resetToken"
            element={<ResetPassword />}
          />

          <Route path="page" element={<Page404 />} />
          <Route exact path="/newcommodity" element={<NewCommodity />} />
          <Route exact path="/orders" element={<Orders />} />
          <Route exact path="/corders" element={<COrders />} />
          <Route exact path="/message" element={<MessageCenter />} />
          <Route exact path="/overview" element={<Overview />} />
          <Route exact path="/testimonial" element={<Testimonial />} />
          <Route exact path="/banners" element={<Banners />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/createbanner" element={<CreateBanner />} />
          <Route exact path="/faq" element={<Faqs />} />
          <Route exact path="/traction" element={<Tractions />} />
          <Route exact path="bar" element={<Bar />} />
          <Route exact path="/partnerships" element={<Partnerships />} />
          <Route exact path="/create-partner" element={<CreatePartner />} />
          <Route exact path="/market-buyers" element={<MarketBuyers />} />

          <Route
            exact
            path="edit-partner/:myPartnerId"
            element={<EditPartner />}
          />

          <Route
            exact
            path="/edittraction/:tractionId"
            element={<EditTraction />}
          />
          <Route exact path="/createtraction" element={<CreateTraction />} />
          <Route exact path="/createproduct" element={<CreateProducts />} />
          <Route exact path="/disputes" element={<Disputes />} />
          <Route exact path="/inquiry" element={<Inquiries />} />
          <Route exact path="/applicants" element={<Applicants />} />
          <Route
            exact
            path="/editproduct/:productId"
            element={<EditProducts />}
          />
          <Route exact path="/buyers" element={<Buyers />} />
          <Route exact path="/editfaq/:myFaqId" element={<EditFaq />} />
          <Route
            exact
            path="/edittestimonial/:myTestimonialId"
            element={<EditTestimonial />}
          />
          <Route
            exact
            path="/createtestimonial/"
            element={<CreateTestimonial />}
          />
          <Route exact path="/editbanner/:bannerId" element={<EditBanner />} />
          <Route
            exact
            path="/editcommodity/:commodityId"
            element={<EditCommodity />}
          />
          <Route exact path="/unauthorized" element={<Unauthorized />} />
          <Route exact path="/nav" element={<Navbar />} />
          <Route exact path="/createuser" element={<CreateUser />} />
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/sidebar" element={<Sidebar />} />

          <Route exact path="/createfaq" element={<CreateFaq />} />
          <Route
            exact
            path="/commodityInsight"
            element={<CommodityInsight />}
          />

          {/* </Route> */}
        </Routes>
        {/* </BrowserRouter> */}
      </div>
    </AppState>
  );
}

export default App;
