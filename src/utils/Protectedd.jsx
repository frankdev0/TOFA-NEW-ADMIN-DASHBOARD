import React, { useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { axios } from "../pages/components/baseUrl";
import { AppContext } from "./contexts/AppState";

export const Protectedd = (WrappedComponent, roles) => {
  return (props) => {
    const navigate = useNavigate();
    const [verified, setVerified] = useState(false);
    const [userLoading, setUserLoading] = useState(true)


    const {setUser} = useContext(AppContext)

    useEffect(() => {
      axios
        .get("http://ec2-18-221-181-52.us-east-2.compute.amazonaws.com:8081/api/v2/auth/current-user")
        .then((response) => {
          const user = response.data.currentUser;
          setUserLoading(false);
          setUser(user)

          if (!roles && user) {
            return setVerified(true);
          }

          const filterRoles = roles.filter((role) => {
            return role === user.type;
          });

          if (filterRoles.length > 0) {
            setVerified(true);
          } else {
            setVerified(false);
            navigate("/unauthorized");
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          navigate("/");
          setUserLoading(false);
        });
    }, []);


   

    if (userLoading)
      return (
        <div
          className="spinner mx-auto"
          align="center"
          id="spinner"
          style={{
            position: "absolute",
            top: "calc(50% - 60px)",
            left: "calc(50% - 60px)",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            margin: "auto",
          }}
        ></div>
      );

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};
