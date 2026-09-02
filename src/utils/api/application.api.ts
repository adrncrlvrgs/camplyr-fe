import { api } from "../instance/instance";

export const sendApplication = async (data: object, jobId: string) => {
  return await api("POST", `/application/apply/${jobId}`, data);
};

export const getSeekerApplication = async () => {
  return await api("GET", "/application/me");
};

export const getJobApplications = async (jobId: string) => {
  return await api("GET", `/application/job/${jobId}`);
};

export const updateApplicationStatus = async (
  applicationId: string,
  data: object
) => {
  return await api("PATCH", `/application/${applicationId}/status`, data);
};

export const withdrawApplication = async (applicationId: string) => {
  return await api("DELETE", `/application/${applicationId}`);
};