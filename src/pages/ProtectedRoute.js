import React from 'react';
import {useSelector} from "react-redux";
import { useLocation } from 'react-router-dom';

function ProtectedRoute({children}) {
const {user}=useSelector ((store) => store.user);
const location = useLocation();

if(!user) {
    window.location.href="/landing"
}

  return children
}

export default ProtectedRoute;
