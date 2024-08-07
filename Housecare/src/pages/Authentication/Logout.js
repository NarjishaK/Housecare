import  { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/actions";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear local storage items
    localStorage.removeItem("HomecareAdmin");
    localStorage.removeItem("Superadmin");
    localStorage.removeItem("token");

    // Dispatch logout action
    dispatch(logoutUser());

    // Redirect to login or home page
    navigate('/housecare'); // adjust the path according to your routing
  }, [dispatch, navigate]);

  return null; // No need to return an empty fragment
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default Logout;
