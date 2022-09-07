import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MessageCenter from "./pages/buyershub/message-center/MessageCenter";
import Orders from "./pages/buyershub/orders/Orders";
import COrders from "./pages/buyershub/orders/COrders";
import Navbar from "./pages/components/navbar/Navbar";
import Sidebar from "./pages/components/sidebar/Sidebar";
import Login from "./pages/login/Login";
import Overview from "./pages/overview/Overview";
import CommodityInsight from "./pages/website-settings/commodityInsight/CommodityInsight";
import NewCommodity from "./pages/website-settings/commodityInsight/NewCommodity";
import CreateFaq from "./pages/website-settings/faqs/CreateFaq";
import Faqs from "./pages/website-settings/faqs/Faqs";
import CreateTestimonial from "./pages/website-settings/testimonial/CreateTestimonial";
import Testimonial from "./pages/website-settings/testimonial/Testimonial";
import Users from "./pages/users/Users";
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
import ProtectedRoutes from "./pages/components/ProtectedRoutes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route exact path="/createbanner" element={<CreateBanner />} />
            <Route exact path="/banners" element={<Banners />} />
            <Route exact path="/newcommodity" element={<NewCommodity />} />
            <Route exact path="/orders" element={<Orders />} />
            <Route exact path="/orders" element={<Orders />} />
            <Route exact path="/corders" element={<COrders />} />
            <Route exact path="/message" element={<MessageCenter />} />
            <Route exact path="/overview" element={<Overview />} />
            <Route exact path="/testimonial" element={<Testimonial />} />
            <Route exact path="/products" element={<Products />} />
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
              path="/editbanner/:bannerId"
              element={<EditBanner />}
            />
            <Route
              exact
              path="/editcommodity/:commodityId"
              element={<EditCommodity />}
            />
            <Route exact path="/nav" element={<Navbar />} />
            <Route exact path="/user" element={<Users />} />
            <Route exact path="/sidebar" element={<Sidebar />} />
            <Route exact path="/faq" element={<Faqs />} />
            <Route exact path="/createfaq" element={<CreateFaq />} />
            <Route
              exact
              path="/commodityInsight"
              element={<CommodityInsight />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
