import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";

export default function GoogleLoginButton() {
  return (
    <div>
      <GoogleLogin onSuccess={() => {}} />
    </div>
  );
}
