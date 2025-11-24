import { axiosClient } from "@/utils/client/axiosClient";

export async function upload(file) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await axiosClient.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // لازم ترجع res.data.data.url
    return res.data.url;
  } catch (err) {
    console.error("Upload failed:", err);
    throw err;
  }
}
