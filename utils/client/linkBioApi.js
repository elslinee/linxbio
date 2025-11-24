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
const updateLinkBioData = async (
  profile,
  socials,
  { colors, font, buttons, header },
) => {
  return await axiosClient.patch(`/linkbio/me`, {
    profile,
    socials,
    template: { colors, font, buttons, header },
  });
};
const deleteLinkBioData = async () => {
  return axiosClient.delete("/linkbio/me");
};

export {
  createLinkBioData,
  getLinkBioData,
  updateLinkBioData,
  deleteLinkBioData,
};
