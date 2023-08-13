import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

export const App = () => {
  const { isLoaded, userId } = useAuth();
  const navigate = useNavigate();
  // if user already not logged in
  if (!userId) {
    navigate("/sign-in");
  }
  return !isLoaded ? <Spin /> : <div>Aditya Gupta</div>;
};
