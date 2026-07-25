import { api } from "../instance/instance";

export const onboardSeeker = async(data: object)=>{
   return await api("PATCH", `/onboard/seeker`, data);
}

export const onboardRecruiter = async(data: object)=>{
   return await api("PATCH", `/onboard/recruiter`, data);
}