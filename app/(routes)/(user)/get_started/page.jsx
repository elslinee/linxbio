"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PhonePreview from "@/components/PhonePreview";
import CustomizeTemplate from "@/app/(routes)/(user)/get_started/_components/CustomizeTemplate";
import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTiktok,
  faXTwitter,
  faThreads,
  faTwitch,
  faFacebook,
  faWhatsapp,
  faGithub,
  faLinkedin,
  faPinterest,
  faBehance,
  faYoutube,
  faDiscord,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faArrowLeft,
  faUser,
  faEarthAmericas,
} from "@fortawesome/free-solid-svg-icons";
import useTemplateStore from "@/stores/useTemplateStore";
import useUserInfoStore from "@/stores/useUserInfoStore";
import { useAuthStore } from "@/stores/useAuthStore";
import Image from "next/image";
import { checkUsername } from "@/utils/client/user/usersApi";
import { createLinkBioData } from "@/utils/client/user/linkBioApi";
import { upload } from "@/utils/client/user/upload";
import { me } from "@/utils/client/user/auth";

function GetStartedPage() {
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [usernameError, setUsernameError] = useState("");
  const [linkBioUploadLoading, setLinkBioUploadLoading] = useState(false);
  const { header, colors, font, buttons } = useTemplateStore();
  const profile = useUserInfoStore((state) => state.profile);
  const socials = useUserInfoStore((state) => state.socials);
  const setProfile = useUserInfoStore((state) => state.setProfile);
  const setSocials = useUserInfoStore((state) => state.setSocials);
  const errors = useUserInfoStore((state) => state.errors);
  const setError = useUserInfoStore((state) => state.setError);
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const router = useRouter();
  const [step, setStep] = useState(1);
  const validateField = (name, value) => {
    let error = "";
    if (value) {
      switch (name) {
        case "displayName":
          if (value.length < 2)
            error = "Display name must be at least 2 characters";
          break;
        case "username":
          if (!/^[a-z0-9-]+$/.test(value))
            error = "Only letters, numbers, and hyphens allowed";
          break;
        case "whatsapp":
          const raw = value.replace(/\s+/g, "");

          if (raw.length === 0) {
            error = "";
            break;
          }

          if (!raw.startsWith("+")) {
            error = "Number must start with +";
            break;
          }

          const digits = raw.slice(1);

          if (!/^[0-9]+$/.test(digits)) {
            error = "Only numbers are allowed";
            break;
          }

          if (digits.length < 10 || digits.length > 20) {
            error = "Phone number must be 10–20 digits";
            break;
          }

          error = "";
          break;
        case "website":
        case "discord":
        case "youtube":
          if (
            !/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(
              value,
            )
          ) {
            error = "Invalid URL";
          }
          break;
        case "email":
          if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
            error = "Invalid email address";
          }
          break;
        default:
          break;
      }
    }
    setError(name, error);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    let updateData = { [name]: value };

    if (name === "displayName") {
      const username = value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      updateData.username = username;

      validateField("username", username);
    }
    if (name === "username") {
      setProfile({ username: value });
      checkUsername(value, setIsChecking, setIsAvailable, setUsernameError);
    }
    validateField(name, value);

    setProfile(updateData);
  };
  useEffect(() => {
    if (profile.username) {
      checkUsername(
        profile.username,
        setIsChecking,
        setIsAvailable,
        setUsernameError,
      );
    }
  }, [profile.username]);
  const handleSocialChange = (e) => {
    let { name, value } = e.target;
    if (name === "whatsapp") {
      let cleaned = value.replace(/\s+/g, "");

      if (cleaned === "") {
        setSocials({ whatsapp: "" });
        validateField("whatsapp", "");
        return;
      }

      if (!cleaned.startsWith("+")) {
        cleaned = "+" + cleaned.replace(/^\+/, "");
      }

      setSocials({ whatsapp: cleaned });
      validateField("whatsapp", cleaned);
      return;
    }

    setSocials({ [name]: value });
    validateField(name, value);
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (step === 3) {
      setStep(2);
    } else if (step === 2) {
      setStep(1);
    } else {
      router.back();
    }
  };

  const [disableBtn, setDisableBtn] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setDisableBtn(false);
    }, 500);
  }, []);
  const step1Fields = ["displayName", "username"];
  const step2Fields = [
    "instagram",
    "tiktok",
    "x",
    "threads",
    "twitch",
    "facebook",
    "email",
    "whatsapp",
    "website",
    "github",
    "linkedin",
    "pinterest",
    "behance",
    "youtube",
    "discord",
    "telegram",
  ];

  const hasStepErrors = (step) => {
    if (step === 1) {
      return step1Fields.some((f) => errors[f] && errors[f].trim() !== "");
    }
    if (step === 2) {
      return step2Fields.some((f) => errors[f] && errors[f].trim() !== "");
    }
    return false;
  };
  const createLinkBioDataRequest = async () => {
    try {
      setLinkBioUploadLoading(true);
      const res = await createLinkBioData(user?.id, profile, socials, {
        colors,
        font,
        buttons,
        header,
      });

      if (res?.data?.statusCode === 200) {
        useUserInfoStore.getState().resetUserInfo();
        useTemplateStore.getState().resetTemplateInfo();

        const updated = await me();

        useAuthStore.getState().setUser(updated.data.data);

        router.replace("/dashboard");
      }
    } catch (err) {
    } finally {
      setLinkBioUploadLoading(false);
    }
  };
  const [uploadLoading, setUploadLoading] = useState(false);
  const upload_ = async (file) => {
    try {
      setUploadLoading(true);
      const url = await upload(file);
      return url;
    } catch (err) {
      return null;
    } finally {
      setUploadLoading(false);
    }
  };
  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.isGetStartedDone === true) {
      router.replace("/dashboard");
      return;
    }
  }, [loading, user, router]);

  if (loading) return null;
  if (!user) return null;
  if (user.isGetStartedDone) return null;

  return (
    <div className="flex min-h-screen w-full overflow-y-hidden">

      <div className="flex w-full flex-col justify-center overflow-y-hidden bg-white px-4 lg:w-1/2">
        <div className="mx-auto w-full max-w-lg">
          <button
            onClick={handleBack}
            className="mb-6 flex cursor-pointer items-center gap-1.5 rounded-2xl bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-600 hover:text-black"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-[13px]" />
            Back
          </button>
          {step === 1 ? (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-black">
                  Customize your Profile Details
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                  Enter your display name. It will be used throughout your
                  Link-in-Bio.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Profile Picture
                  </label>
                  <div className="flex items-center gap-4 md:flex-row">
                    {uploadLoading ? (
                      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-center">
                          <div
                            className="h-6 w-6 animate-spin rounded-full border-3 border-black border-t-transparent"
                            aria-label="Loading"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="relative h-20 w-20 overflow-hidden rounded-full border border-gray-200 bg-gray-50">
                        {profile.avatar ? (
                          <Image
                            src={profile.avatar}
                            alt="Avatar"
                            fill
                            className="object-cover"
                            onError={() =>
                              setProfile({
                                avatar: "/hero/hero-avatar.png",
                              })
                            }
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-gray-400">
                            <FontAwesomeIcon
                              icon={faUser}
                              className="h-8 w-8"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    <label
                      htmlFor="avatar-upload"
                      className="cursor-pointer rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
                    >
                      Upload
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;

                        try {
                          const imageUrl = await upload_(file);

                          if (imageUrl) {
                            setProfile({ avatar: imageUrl });
                          } else {
                          }
                        } catch (err) {}
                      }}
                      className="hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Display Name
                  </label>
                  <input
                    type="text"
                    name="displayName"
                    value={profile.displayName}
                    onChange={handleProfileChange}
                    placeholder="Enter your display name"
                    className={`w-full rounded-xl border ${
                      errors.displayName ? "border-red-500" : "border-gray-200"
                    } bg-gray-50 px-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black`}
                  />
                  {errors.displayName && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.displayName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Customize your Link in Bio URL
                  </label>
                  <p className="mb-2 text-xs text-gray-500">
                    Choose how your URL will look to your page visitors
                  </p>
                  <div
                    className={`flex items-center rounded-xl border ${
                      errors.username ? "border-red-500" : "border-gray-200"
                    } bg-gray-50 px-4 py-3 focus-within:border-black focus-within:ring-1 focus-within:ring-black`}
                  >
                    <span className="text-gray-500">linxbio.vercel.app/</span>
                    <input
                      type="text"
                      name="username"
                      value={profile.username}
                      onChange={handleProfileChange}
                      placeholder="username"
                      className="flex-1 bg-transparent outline-none"
                    />
                  </div>
                  {isChecking && (
                    <p className="mt-1 text-xs text-gray-500">
                      Checking username…
                    </p>
                  )}

                  {usernameError && !isChecking && (
                    <p className="mt-1 text-xs text-red-500">{usernameError}</p>
                  )}

                  {isAvailable && !isChecking && profile.username && (
                    <p className="mt-1 text-xs text-green-600">
                      ✓ Username is available
                    </p>
                  )}

                  {errors.username && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.username}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <Button
                  onClick={handleNext}
                  className="w-full sm:w-auto sm:px-12"
                  disabled={
                    disableBtn ||
                    !isAvailable ||
                    isChecking ||
                    !profile.displayName ||
                    !profile.username ||
                    hasStepErrors(1)
                  }
                >
                  Next
                </Button>
              </div>
            </div>
          ) : step === 2 ? (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-black">
                  Add social icons to your page
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                  You can always add more later.
                </p>
              </div>

              <div className="scrollbar-hide my-2 max-h-[60vh] space-y-4 overflow-y-auto px-1 py-2 md:px-4">
                <SocialInput
                  icon={faInstagram}
                  name="instagram"
                  placeholder="Instagram (@username) or Url"
                  value={socials.instagram}
                  onChange={handleSocialChange}
                  error={errors.instagram}
                />
                <SocialInput
                  icon={faTiktok}
                  name="tiktok"
                  placeholder="TikTok (@username) or Url"
                  value={socials.tiktok}
                  onChange={handleSocialChange}
                  error={errors.tiktok}
                />
                <SocialInput
                  icon={faXTwitter}
                  name="x"
                  placeholder="X (@username) or Url"
                  value={socials.x}
                  onChange={handleSocialChange}
                  error={errors.x}
                />
                <SocialInput
                  icon={faThreads}
                  name="threads"
                  placeholder="Threads (@username) or Url"
                  value={socials.threads}
                  onChange={handleSocialChange}
                  error={errors.threads}
                />
                <SocialInput
                  icon={faTwitch}
                  name="twitch"
                  placeholder="Twitch (@username) or Url"
                  value={socials.twitch}
                  onChange={handleSocialChange}
                  error={errors.twitch}
                />
                <SocialInput
                  icon={faFacebook}
                  name="facebook"
                  placeholder="Facebook Profile / Page (@username) or Url"
                  value={socials.facebook}
                  onChange={handleSocialChange}
                  error={errors.facebook}
                />
                <SocialInput
                  icon={faGithub}
                  name="github"
                  placeholder="GitHub (@username) or Url"
                  value={socials.github}
                  onChange={handleSocialChange}
                  error={errors.github}
                />
                <SocialInput
                  icon={faLinkedin}
                  name="linkedin"
                  placeholder="LinkedIn (@username) or Url"
                  value={socials.linkedin}
                  onChange={handleSocialChange}
                  error={errors.linkedin}
                />
                <SocialInput
                  icon={faPinterest}
                  name="pinterest"
                  placeholder="Pinterest (@username) or Url"
                  value={socials.pinterest}
                  onChange={handleSocialChange}
                  error={errors.pinterest}
                />
                <SocialInput
                  icon={faBehance}
                  name="behance"
                  placeholder="Behance (@username) or Url"
                  value={socials.behance}
                  onChange={handleSocialChange}
                  error={errors.behance}
                />
                <SocialInput
                  icon={faYoutube}
                  name="youtube"
                  placeholder="YouTube Channel URL"
                  value={socials.youtube}
                  onChange={handleSocialChange}
                  error={errors.youtube}
                />
                <SocialInput
                  icon={faDiscord}
                  name="discord"
                  placeholder="Discord Server Url"
                  value={socials.discord}
                  onChange={handleSocialChange}
                  error={errors.discord}
                />
                <SocialInput
                  icon={faTelegram}
                  name="telegram"
                  placeholder="Telegram (@username) or Url"
                  value={socials.telegram}
                  onChange={handleSocialChange}
                  error={errors.telegram}
                />
                <SocialInput
                  icon={faEnvelope}
                  name="email"
                  placeholder="Email (you@example.com)"
                  value={socials.email}
                  onChange={handleSocialChange}
                  error={errors.email}
                />
                <SocialInput
                  icon={faWhatsapp}
                  name="whatsapp"
                  placeholder="WhatsApp Phone Number"
                  value={socials.whatsapp}
                  onChange={handleSocialChange}
                  error={errors.whatsapp}
                />
                <SocialInput
                  icon={faEarthAmericas}
                  name="website"
                  placeholder="Website (www.my-website.com)"
                  value={socials.website}
                  onChange={handleSocialChange}
                  error={errors.website}
                />
              </div>

              <div className="flex items-center gap-4 px-1 pt-4 md:px-4">
                <Button
                  onClick={handleNext}
                  className="px-12"
                  disabled={hasStepErrors(2)}
                >
                  Next
                </Button>
              </div>
            </div>
          ) : (
            <CustomizeTemplate
              loading={linkBioUploadLoading}
              onFinish={() => createLinkBioDataRequest()}
              onBack={() => setStep(2)}
            />
          )}
        </div>
      </div>


      <div className="hidden min-h-full w-1/2 overflow-hidden bg-[#d5f75815] lg:flex">
        <div className="sticky mx-auto flex items-center justify-center">
          <PhonePreview
            font={font}
            buttons={buttons}
            type={header}
            colors={colors}
            profile={profile}
            socials={socials}
          />
        </div>
      </div>
    </div>
  );
}

const SocialInput = ({ icon, name, placeholder, value, onChange, error }) => (
  <div className="w-full">
    <div
      className={`flex items-center gap-3 rounded-xl border ${
        error ? "border-red-500" : "border-gray-200"
      } bg-gray-50 px-4 py-3 focus-within:border-black focus-within:ring-1 focus-within:ring-black`}
    >
      <FontAwesomeIcon icon={icon} className="h-5 w-5 text-gray-600" />
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm outline-none"
      />
    </div>
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

export default GetStartedPage;
