import { axiosClient } from "@/utils/client/axiosClient";

let usernameTimer = null;

const checkUsername = (
  username,
  setIsChecking,
  setIsAvailable,
  setUsernameError,
) => {
  if (usernameTimer) clearTimeout(usernameTimer);

  usernameTimer = setTimeout(async () => {
    if (!username.trim()) return;

    setIsChecking(true);

    try {
      const res = await axiosClient.post("/users/check-username", { username });

      if (res.data.available) {
        setIsAvailable(true);
        setUsernameError("");
      } else {
        setIsAvailable(false);
        setUsernameError("This username is already taken");
      }
    } catch (error) {
      setIsAvailable(false);
      setUsernameError("Error checking username");
    }

    setIsChecking(false);
  }, 500); // debounce 0.5s
};
const finishGetStarted = async (isGetStartedDone) => {
  try {
    const res = await axiosClient.post("/users/get-started", {
      isGetStartedDone,
    });

    return res.data;
  } catch (err) {
    console.log("Finish Error:", err.response?.data || err.message);
    return null;
  }
};

export { checkUsername, finishGetStarted };
