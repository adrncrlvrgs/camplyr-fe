import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";

export default function GoogleLoginButton() {
  const clientId  = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;

  const onSuccess =(response) => {
    console.log("Login Success", response.profileObj);
  }

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        onSuccess={onSuccess}
      />
    </div>
  );
}
