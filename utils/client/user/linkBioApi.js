import { axiosClient } from "@/utils/client/axiosClient";
const createLinkBioData = async (
  userId,
  profile,
  socials,
  { colors, font, buttons, header },
) => {
  return await axiosClient.post("/linkbio", {
    userId,
    profile,
    socials,
    template: { colors, font, buttons, header },
  });
};
const getLinkBioData = async () => {
  return await axiosClient.get(`/linkbio/me`);
};
const getLinkBioByUsername = async (username) => {
  return await axiosClient.get(`/linkbio/${username}`);
};
const updateLinkBioData = async (data) => {
  return await axiosClient.patch(`/linkbio/me`, data);
};

const updateSocialOrder = async (order) => {
  return await axiosClient.patch(`/linkbio/me/social-order`, { order });
};
const deleteLinkBioData = async () => {
  return axiosClient.delete("/linkbio/me");
};

export {
  createLinkBioData,
  getLinkBioData,
  getLinkBioByUsername,
  updateLinkBioData,
  deleteLinkBioData,
  updateSocialOrder,
};
