import { axiosClient } from "@/utils/client/axiosClient";
const getAllLinkBios = () => {
  return axiosClient.get("/admin/linkbio");
};

const getLinkBioById = (id) => {
  return axiosClient.get(`/admin/linkbio/${id}`);
};

const getLinkBioByUsername = (username) => {
  return axiosClient.get(
    `/admin/linkbio/username/${encodeURIComponent(username)}`,
  );
};

const updateLinkBio = (id, data) => {
  return axiosClient.patch(`/admin/linkbio/${id}`, data);
};

const deleteLinkBio = (id) => {
  return axiosClient.delete(`/admin/linkbio/${id}`);
};

export {
  getAllLinkBios,
  getLinkBioById,
  getLinkBioByUsername,
  updateLinkBio,
  deleteLinkBio,
};
