import React, { useEffect, useState } from "react";
import { ArrowLeft, Trash2, X } from "lucide-react";
import AnimatedTab from "@/app/(routes)/(user)/dashboard/_components/AnimatedTab";
import { useSideBarTabsStore } from "@/stores/useSideBarTabsStore";
import CustomBtn from "@/app/(routes)/(user)/dashboard/_components/CustomBtn";
import useTemplateStore from "@/stores/useTemplateStore";
import useUserInfoStore from "@/stores/useUserInfoStore";
import { checkUsername } from "@/utils/client/user/usersApi";
import { useAlertDialog } from "@/components/AlertDialogProvider";
import { deleteLinkBioData } from "@/utils/client/user/linkBioApi";

const languages = [
  { code: "en", name: "English", native: "English" },
  { code: "ar", name: "Arabic", native: "العربية" },
  { code: "es", name: "Spanish", native: "Español" },
  { code: "fr", name: "French", native: "Français" },
  { code: "de", name: "German", native: "Deutsch" },
  { code: "it", name: "Italian", native: "Italiano" },
  { code: "pt", name: "Portuguese", native: "Português" },
  { code: "zh", name: "Chinese", native: "中文" },
  { code: "ja", name: "Japanese", native: "日本語" },
  { code: "ko", name: "Korean", native: "한국어" },
  { code: "ru", name: "Russian", native: "Русский" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "tr", name: "Turkish", native: "Türkçe" },
  { code: "nl", name: "Dutch", native: "Nederlands" },
  { code: "pl", name: "Polish", native: "Polski" },
  { code: "id", name: "Indonesian", native: "Bahasa Indonesia" },
  { code: "ms", name: "Malay", native: "Bahasa Melayu" },
  { code: "th", name: "Thai", native: "ไทย" },
  { code: "vi", name: "Vietnamese", native: "Tiếng Việt" },
  { code: "he", name: "Hebrew", native: "עברית" },
  { code: "sv", name: "Swedish", native: "Svenska" },
  { code: "no", name: "Norwegian", native: "Norsk" },
  { code: "da", name: "Danish", native: "Dansk" },
  { code: "fi", name: "Finnish", native: "Suomi" },
];

function DesignTab() {
  const { setTab } = useSideBarTabsStore();

  return (
    <AnimatedTab className="absolute bottom-24 left-1/2 w-[calc(100vw-2rem)] max-w-[425px] -translate-x-1/2 md:relative md:bottom-auto md:left-auto md:w-[425px] md:translate-x-0">
      <Tab setTab={setTab} />
    </AnimatedTab>
  );
}

const Tab = ({ setTab }) => {
  const { setProfile, profile } = useUserInfoStore();
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [usernameError, setUsernameError] = useState("");
  const [inputValue, setInputValue] = useState(profile?.username || "");
  const language = profile?.language || "en";

  const { errors, setError } = useUserInfoStore();
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
      setInputValue(username);
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
  const { showDialog, closeDialog } = useAlertDialog();
  const DeleteLinxBioProfile = () => {
    deleteLinkBioData().then((res) => {
      if (res.status === 200) {
        closeDialog();
      }
    });
  };
  const handleDeleteProfile = (key) => {
    showDialog({
      content: (
        <div className="flex flex-col gap-2 text-center">
          <h3 className="text-lg font-bold">Remove LinxBio Profile?</h3>
          <p className="text-gray-500">
            Are you sure you want to remove this Profile? This action cannot be
            undone.
          </p>
          <div className="mt-4 flex justify-end gap-3">
            <button
              onClick={closeDialog}
              className="rounded-full border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                DeleteLinxBioProfile();
              }}
              className="rounded-full bg-red-600! px-6 py-2 text-sm font-medium text-white hover:bg-red-600/80"
            >
              Remove
            </button>
          </div>
        </div>
      ),
      confirmText: "Remove",
      cancelText: "Cancel",
      onConfirm: () => {
        setSocials({ [key]: "" });
      },
    });
  };
  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col rounded-[8px] bg-white md:h-[calc(100vh-100px)]">
      <div className="flex shrink-0 items-center justify-between px-4 py-4">
        <p className="font-medium">Settings</p>
        <button
          onClick={() => {
            setTab("");
          }}
        >
          <X size={20} />
        </button>
      </div>

      <hr className="mb-4 text-gray-200" />

      <div className="px-4 pb-4">
        <label className="mb-1 block text-sm font-bold text-gray-700">
          Language
        </label>
        <p className="mb-2 text-xs text-gray-500">
          Select the language for your page
        </p>
        <div className="relative">
          <select
            name="language"
            value={profile.language || "en"}
            onChange={handleProfileChange}
            className="focus:border-primary focus:ring-primary w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:ring-1"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name} - {lang.native}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>
      {/* Profile userName Check */}
      <div className="custom-scroll flex flex-1 flex-col gap-4 overflow-y-auto px-4 pb-6">
        <div className="flex w-full items-center justify-center gap-4">
          <div className="flex flex-1 flex-col gap-3">
            <div>
              <label className="mb-1 block text-sm font-bold text-gray-700">
                Customize your Link in Bio URL
              </label>
              <p className="mb-2 text-xs text-gray-500">
                Choose how your URL will look to your page visitors
              </p>
              <div
                className={`flex items-center rounded-xl border ${
                  errors.username ? "border-red-500" : "border-gray-200"
                } focus-within:border-primary focus-within:ring-primary bg-gray-50 px-4 py-3 focus-within:ring-1`}
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

              {inputValue !== profile.username && (
                <>
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
                </>
              )}

              {errors.username && (
                <p className="mt-1 text-xs text-red-500">{errors.username}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr className="mb-4 text-gray-200" />
      <div className="px-4 pb-4">
        <label className="mb-2 block text-sm font-bold text-gray-700">
          Danger zone
        </label>
        <button
          onClick={handleDeleteProfile}
          className="mb-2 flex w-full items-center justify-center gap-2 rounded-xl bg-red-100 p-4 text-sm font-bold text-red-500"
        >
          Remove Profile <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};
export default DesignTab;
