import { api } from "../instance/instance";
//import { ApiResponse, OnboardRecruiter } from "../constant/types";
import { RecruiterForm } from "../validation/validation.schema";

export const onboardSeeker = async (data: object) => {
  return await api("PATCH", `/onboard/seeker`, data);
};

export const onboardRecruiter = async (data: RecruiterForm) => {
  return await api("PATCH", "/onboard/recruiter", data);
};
