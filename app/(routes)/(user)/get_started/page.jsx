"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PhonePreview from "@/components/PhonePreview";
import CustomizeTemplate from "./_components/CustomizeTemplate";
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
import Link from "next/link";
import { checkUsername, finishGetStarted } from "@/utils/client/usersApi";
import { createLinkBioData } from "@/utils/client/linkBioApi";
import { upload } from "@/utils/client/upload";

function GetStartedPage() {
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [usernameError, setUsernameError] = useState("");

  const { header, colors, font, buttons } = useTemplateStore();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const profile = useUserInfoStore((state) => state.profile);
  const socials = useUserInfoStore((state) => state.socials);
  const setProfile = useUserInfoStore((state) => state.setProfile);
  const setSocials = useUserInfoStore((state) => state.setSocials);
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const [errors, setErrors] = useState({});
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
          if (!/^\+?[0-9\s-]{10,20}$/.test(value))
            error = "Invalid phone number";
          break;
        case "facebook":
        case "website":
        case "linkedin":
        case "pinterest":
        case "behance":
        case "discord":
        case "youtube":
          // Stricter URL validation
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
    setErrors((prev) => ({ ...prev, [name]: error }));
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
    const { name, value } = e.target;

    setSocials({ [name]: value }); // ← الصح مع Zustand
    validateField(name, value);
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      // Finish
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
  const createLinkBioDataRequest = () => {
    createLinkBioData(user?.id, profile, socials, {
      colors,
      font,
      buttons,
      header,
    })
      .then((res) => {
        console.log(res);
        if (res?.data?.statusCode === 200) {
          finishGetStarted(true);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        // router.push("/dashboard");
      });
  };
  if (loading) return null;

  // 🟩 2) لو خلص الـ Get Started → روح داشبورد فوراً بدون فلاش
  if (user?.isGetStartedDone) {
    router.replace("/dashboard");
    return null;
  }
  return (
    <div className="flex min-h-screen w-full overflow-y-hidden">
      {/* Left Side - Form */}
      <div className="flex w-full flex-col justify-center overflow-y-hidden bg-white px-4 lg:w-1/2">
        <button
          onClick={handleBack}
          className="mb-6 flex cursor-pointer items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-[14px]" />
          Go Back
        </button>

        <div className="mx-auto w-full max-w-lg">
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
                          <FontAwesomeIcon icon={faUser} className="h-8 w-8" />
                        </div>
                      )}
                    </div>
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
                          // 🔥 ارفع الصورة للسيرفر
                          const imageUrl = await upload(file);

                          // 🔥 احفظ الرابط فقط
                          setProfile({ avatar: imageUrl });
                        } catch (err) {
                          console.error("Upload failed:", err);
                        }
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
                    Object.values(errors).some((err) => err)
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
                  placeholder="Instagram Username (@username)"
                  value={socials.instagram}
                  onChange={handleSocialChange}
                  error={errors.instagram}
                />
                <SocialInput
                  icon={faTiktok}
                  name="tiktok"
                  placeholder="TikTok Username (@username)"
                  value={socials.tiktok}
                  onChange={handleSocialChange}
                  error={errors.tiktok}
                />
                <SocialInput
                  icon={faXTwitter}
                  name="x"
                  placeholder="X Username (@username)"
                  value={socials.x}
                  onChange={handleSocialChange}
                  error={errors.x}
                />
                <SocialInput
                  icon={faThreads}
                  name="threads"
                  placeholder="Threads Username (@username)"
                  value={socials.threads}
                  onChange={handleSocialChange}
                  error={errors.threads}
                />
                <SocialInput
                  icon={faTwitch}
                  name="twitch"
                  placeholder="Twitch Username (@username)"
                  value={socials.twitch}
                  onChange={handleSocialChange}
                  error={errors.twitch}
                />
                <SocialInput
                  icon={faFacebook}
                  name="facebook"
                  placeholder="Facebook Page URL"
                  value={socials.facebook}
                  onChange={handleSocialChange}
                  error={errors.facebook}
                />
                <SocialInput
                  icon={faGithub}
                  name="github"
                  placeholder="GitHub Username (@username)"
                  value={socials.github}
                  onChange={handleSocialChange}
                  error={errors.github}
                />
                <SocialInput
                  icon={faLinkedin}
                  name="linkedin"
                  placeholder="LinkedIn Profile URL"
                  value={socials.linkedin}
                  onChange={handleSocialChange}
                  error={errors.linkedin}
                />
                <SocialInput
                  icon={faPinterest}
                  name="pinterest"
                  placeholder="Pinterest Profile URL"
                  value={socials.pinterest}
                  onChange={handleSocialChange}
                  error={errors.pinterest}
                />
                <SocialInput
                  icon={faBehance}
                  name="behance"
                  placeholder="Behance Profile URL"
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
                  placeholder="Discord Server/User Url"
                  value={socials.discord}
                  onChange={handleSocialChange}
                  error={errors.discord}
                />
                <SocialInput
                  icon={faTelegram}
                  name="telegram"
                  placeholder="Telegram Username/Link"
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
                  disabled={Object.values(errors).some((err) => err)}
                >
                  Next
                </Button>
              </div>
            </div>
          ) : (
            <CustomizeTemplate
              onFinish={() => createLinkBioDataRequest()}
              onBack={() => setStep(2)}
            />
          )}
        </div>
      </div>

      {/* Right Side - Preview */}
      <div className="hidden min-h-full w-1/2 overflow-hidden bg-red-50 lg:flex">
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
