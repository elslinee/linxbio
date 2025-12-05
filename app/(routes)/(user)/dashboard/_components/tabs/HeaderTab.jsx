import React, { useEffect, useRef, useState } from "react";
import { useAlertDialog } from "@/components/AlertDialogProvider";
import { Trash2, X } from "lucide-react";
import AnimatedTab from "@/app/(routes)/(user)/dashboard/_components/AnimatedTab";
import { useSideBarTabsStore } from "@/stores/useSideBarTabsStore";
import CustomBtn from "@/app/(routes)/(user)/dashboard/_components/CustomBtn";
import useUserInfoStore from "@/stores/useUserInfoStore";
import { upload } from "@/utils/client/user/upload";
import Image from "next/image";
import ToggleSwitch from "@/components/ToggleSwitch";
import { VerifiedIcon } from "@/components/VerifiedIcon";
import { redeemSerialKey } from "@/utils/client/user/serialKeysApi";
import { updateLinkBioData } from "@/utils/client/user/linkBioApi";
import ImageCropModal from "@/components/ImageCropModal";
function HeaderTab({ desktop }) {
  const { setTab } = useSideBarTabsStore();
  const cover = useUserInfoStore((state) => state.profile.cover);
  const avatar = useUserInfoStore((state) => state.profile.avatar);
  const displayName = useUserInfoStore((state) => state.profile.displayName);
  const verified = useUserInfoStore((state) => state.profile.verifiedBadge);
  const showName = useUserInfoStore((state) => state.profile.showName);
  const bio = useUserInfoStore((state) => state.profile.bio);
  const showBio = useUserInfoStore((state) => state.profile.showBio);
  const profile = useUserInfoStore((state) => state.profile);
  const setProfile = useUserInfoStore((state) => state.setProfile);

  return (
    <AnimatedTab className="absolute bottom-24 left-1/2 w-[calc(100vw-2rem)] max-w-[425px] -translate-x-1/2 md:relative md:bottom-auto md:left-auto md:w-[425px] md:translate-x-0">
      <Tab
        desktop={desktop}
        setTab={setTab}
        cover={cover}
        avatar={avatar}
        profile={profile}
        setProfile={setProfile}
        displayName={displayName}
        showName={showName}
        verified={verified}
        bio={bio}
        showBio={showBio}
      />
    </AnimatedTab>
  );
}

const Tab = ({
  setTab,
  avatar,
  cover,
  profile,
  setProfile,
  displayName,
  showName,
  verified,
  bio,
  showBio,
  desktop,
}) => {
  const fileInputCoverRef = useRef(null);
  const fileInputAvatarRef = useRef(null);
  const [colorPicker, setColorPicker] = useState(true);
  const [color, setColor] = useState("#ff0000");
  const [backgroundColor, setBackgroundColor] = useState("#ff0000");
  useEffect(() => {
    setColor(profile.cover);
    setBackgroundColor(profile.backgroundColor);
  }, []);
  const handleUploadCoverClick = () => {
    fileInputCoverRef.current.click();
  };
  const handleUploadAvatarClick = () => {
    fileInputAvatarRef.current.click();
  };

  const [uploadCoverLoading, setUploadCoverLoading] = useState(false);

  const handleCoverCropComplete = async (croppedBlob) => {
    try {
      setUploadCoverLoading(true);
      const url = await upload(croppedBlob);
      setProfile({ cover: url });
      closeDialog();
    } catch (err) {
      console.error(err);
    } finally {
      setUploadCoverLoading(false);
    }
  };

  const uploadCover_ = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        showDialog({
          content: (
            <ImageCropModal
              imageSrc={reader.result}
              aspect={16 / 10}
              onCropComplete={handleCoverCropComplete}
              onCancel={closeDialog}
            />
          ),
          hideActions: true,
          maxWidth: "max-w-2xl",
        });
      };
      reader.readAsDataURL(file);
    }
    e.target.value = null;
  };

  const [uploadAvatarLoading, setUploadAvatarLoading] = useState(false);

  const handleAvatarCropComplete = async (croppedBlob) => {
    try {
      setUploadAvatarLoading(true);
      const url = await upload(croppedBlob);
      setProfile({ avatar: url });
      closeDialog();
    } catch (err) {
      console.error(err);
    } finally {
      setUploadAvatarLoading(false);
    }
  };

  const uploadAvatar_ = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        showDialog({
          content: (
            <ImageCropModal
              imageSrc={reader.result}
              aspect={1}
              onCropComplete={handleAvatarCropComplete}
              onCancel={closeDialog}
            />
          ),
          hideActions: true,
          maxWidth: "max-w-2xl",
        });
      };
      reader.readAsDataURL(file);
    }
    e.target.value = null;
  };

  const handleColorDrag = (e) => {
    setColor(e.target.value);
  };
  const handleColorCommit = () => {
    setProfile({ cover: color });
  };
  const handleBackgroundColorDrag = (e) => {
    setBackgroundColor(e.target.value);
  };
  const handleBackgroundColorCommit = () => {
    setProfile({ backgroundColor: backgroundColor });
  };
  const coverIsImage =
    cover?.startsWith("http") ||
    cover?.startsWith("https") ||
    cover?.startsWith("blob");
  const { showDialog, closeDialog } = useAlertDialog();

  const EnterKeyDiv = () => {
    const [value, setValue] = useState("");
    const [err, setErr] = useState("");
    const handleKey = async () => {
      await redeemSerialKey(value)
        .then((res) => {
          const success = res?.data?.status === "success";

          if (success) {
            updateLinkBioData({
              profile: {
                verifiedBadge: true,
                keyEntered: true,
              },
            })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
            setProfile({ verifiedBadge: true });
            setProfile({ keyEntered: true });
            closeDialog();
          }
        })
        .catch((err) => {
          setErr(err?.response?.data?.message);
        });
    };

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold"> Enter The Key</h2>
          <button
            onClick={closeDialog}
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            You Don't Have One ? Contact
            <a
              target="_blank"
              className="text-primary ml-2 font-bold underline"
              href={`https://wa.me/+201001077694`}
            >
              Admin
            </a>
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={""}
            className="focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-1"
            autoFocus
          />
          {err && <p className="text-red-500">{err}</p>}
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={closeDialog}
            className="rounded-full border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleKey}
            className="bg-primary hover:bg-primary/80 rounded-full px-6 py-2 text-sm font-medium text-white"
          >
            Done
          </button>
        </div>
      </div>
    );
  };
  const handleKey = () => {
    showDialog({
      content: <EnterKeyDiv />,
      hideActions: true,
    });
  };

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col rounded-[8px] bg-white md:h-[calc(100vh-100px)]">
      <div className="flex shrink-0 items-center justify-between px-4 py-4">
        <p className="font-medium">Headers</p>
        <button
          onClick={() => {
            setTab("");
          }}
        >
          <X size={20} />
        </button>
      </div>

      <hr className="mb-4 text-gray-200" />

      <div className="custom-scroll flex flex-1 flex-col gap-4 overflow-y-auto px-4 pb-6">
        {desktop && (
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium">Desktop Background Color </p>

              <div
                className={`relative h-20 w-34 min-w-24 cursor-pointer overflow-hidden rounded-xl border border-gray-200 transition-all`}
              >
                <div
                  style={{
                    backgroundImage: backgroundColor
                      ? `linear-gradient(to bottom, ${backgroundColor || "#dedede"}, ${backgroundColor || "#dedede"})`
                      : `linear-gradient(to bottom, #dedede, #dedede)`,
                  }}
                  className="h-full w-full p-2 pt-4"
                ></div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <input
                  type="color"
                  value={backgroundColor || "#dedede"}
                  onChange={handleBackgroundColorDrag}
                  onBlur={handleBackgroundColorCommit}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white transition hover:scale-105 hover:border-gray-400">
                  <div
                    className="h-5 w-5 rounded-full shadow-inner"
                    style={{ backgroundColor: backgroundColor || "#dedede" }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium">Cover Image </p>
            {uploadCoverLoading ? (
              <div className="flex h-20 w-34 min-w-24 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                <div className="flex items-center justify-center">
                  <div
                    className="h-6 w-6 animate-spin rounded-full border-3 border-black border-t-transparent"
                    aria-label="Loading"
                  />
                </div>
              </div>
            ) : (
              <div
                className={`relative h-20 w-34 min-w-24 cursor-pointer overflow-hidden rounded-xl border border-gray-200 transition-all`}
              >
                {coverIsImage ? (
                  <Image
                    width={100}
                    height={100}
                    src={cover}
                    alt="Cover"
                    onError={(e) => {
                      e.target.src = "/hero/hero-avatar2.png";
                    }}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    style={{
                      backgroundImage: color
                        ? `linear-gradient(to bottom, ${profile?.cover}, ${profile?.cover})`
                        : `linear-gradient(to bottom, #f4a8d4, #f64eff)`,
                    }}
                    className="h-full w-full p-2 pt-4"
                  ></div>
                )}
              </div>
            )}
          </div>
          <div className="flex gap-4">
            <div className="flex items-center">
              <input
                ref={fileInputCoverRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={uploadCover_}
              />

              <CustomBtn
                outLine={true}
                name="Replace"
                onClick={handleUploadCoverClick}
              />
            </div>
            {!colorPicker ? (
              <button
                className="rounded-full p-1.5 text-gray-400 transition-all hover:bg-red-50 hover:text-red-500"
                onClick={() => {
                  setProfile({ cover: "" });
                  setColorPicker(true);
                }}
              >
                <Trash2 size={20} />
              </button>
            ) : (
              <div className="relative">
                <input
                  type="color"
                  value={color || "#ff0000"}
                  onChange={handleColorDrag}
                  onBlur={handleColorCommit}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />

                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white transition hover:scale-105 hover:border-gray-400">
                  <div
                    className="h-5 w-5 rounded-full shadow-inner"
                    style={{ backgroundColor: profile?.cover }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium">Profile Image </p>
            {uploadAvatarLoading ? (
              <div className="flex h-24 w-24 min-w-24 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                <div className="flex items-center justify-center">
                  <div
                    className="h-6 w-6 animate-spin rounded-full border-3 border-black border-t-transparent"
                    aria-label="Loading"
                  />
                </div>
              </div>
            ) : (
              <div
                className={`relative h-24 w-24 min-w-24 cursor-pointer overflow-hidden rounded-xl border border-gray-200 transition-all`}
              >
                <Image
                  src={avatar || "/hero/hero-avatar2.png"}
                  onError={(e) => {
                    e.target.src = "/hero/hero-avatar2.png";
                  }}
                  width={100}
                  height={100}
                  className="h-full w-full object-cover"
                  alt={"avatar"}
                />
              </div>
            )}
          </div>
          <div className="flex gap-4">
            <div className="flex items-center">
              <input
                ref={fileInputAvatarRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={uploadAvatar_}
              />

              <CustomBtn
                outLine={true}
                name="Replace"
                onClick={handleUploadAvatarClick}
              />
            </div>
            <button
              className="rounded-full p-1.5 text-gray-400 transition-all hover:bg-red-50 hover:text-red-500"
              onClick={() => {
                setProfile({ avatar: "" });
              }}
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>

        <p className="text-sm font-medium">Profile Name </p>
        <div className="flex w-full items-center justify-center gap-4">
          <div className="flex flex-1 flex-col gap-3">
            <div className={`w-full cursor-pointer transition-all`}>
              <input
                onChange={(e) => {
                  setProfile({ displayName: e.target.value });
                }}
                value={displayName}
                type="text"
                className="focus:border-primary h-full w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-0"
              />
            </div>
          </div>
          <div className="flex">
            <ToggleSwitch
              checked={showName}
              setChecked={(value) => setProfile({ showName: value })}
            />
          </div>
        </div>

        {showName && (
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <p className="flex items-center gap-1 text-sm font-medium">
                Verified Badge{" "}
                <span className="flex size-5">{VerifiedIcon}</span>
              </p>
              <p className="text-xs text-gray-500">
                A verified account badge helps people be sure that your account
                is yours and doesn't represent anyone else.
              </p>
            </div>
            <div className="flex">
              {profile?.keyEntered ? (
                <ToggleSwitch
                  checked={verified}
                  setChecked={(value) => setProfile({ verifiedBadge: value })}
                />
              ) : (
                <button onClick={handleKey}>
                  <ToggleSwitch checked={false} setChecked={() => {}} />
                </button>
              )}
            </div>
          </div>
        )}

        <p className="text-sm font-medium"> Bio </p>
        <div className="flex w-full items-center justify-center gap-4">
          <div className="flex flex-1 flex-col gap-3">
            <div className={`w-full cursor-pointer transition-all`}>
              <textarea
                onChange={(e) => {
                  setProfile({ bio: e.target.value });
                }}
                value={bio}
                type="textarea"
                className="focus:border-primary w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-xs focus:outline-0"
              />
            </div>
          </div>
          <div className="flex">
            <ToggleSwitch
              checked={showBio}
              setChecked={(value) => setProfile({ showBio: value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeaderTab;
