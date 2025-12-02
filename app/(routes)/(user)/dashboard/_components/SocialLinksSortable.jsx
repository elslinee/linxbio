"use client";
import { useState, useRef, useEffect } from "react";
import useUserInfoStore from "@/stores/useUserInfoStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTiktok,
  faInstagram,
  faTwitch,
  faWhatsapp,
  faXTwitter,
  faThreads,
  faGithub,
  faLinkedin,
  faPinterest,
  faBehance,
  faYoutube,
  faDiscord,
  faTelegram,
  faSnapchat,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faEarthAmericas,
  faGripVertical,
} from "@fortawesome/free-solid-svg-icons";
import { Trash2, Pencil } from "lucide-react";
import { useAlertDialog } from "@/components/AlertDialogProvider";

function EditSocialDialog({ initialValue, onSave, onCancel }) {
  const [value, setValue] = useState(initialValue);

  return (
    <div className="flex flex-col gap-2 text-center">
      <h3 className="text-lg font-bold">Edit Social Link</h3>
      <p className="text-gray-500">Update your social link below.</p>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="mt-2 w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
        placeholder="Enter URL or username"
      />
      <div className="mt-4 flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="rounded-full border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(value)}
          className="bg-primary hover:bg-primary/80 rounded-full px-6 py-2 text-sm font-medium text-black"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default function SocialLinksSortable() {
  const socialIcons = [
    { key: "instagram", icon: faInstagram },
    { key: "tiktok", icon: faTiktok },
    { key: "x", icon: faXTwitter },
    { key: "threads", icon: faThreads },
    { key: "twitch", icon: faTwitch },
    { key: "facebook", icon: faFacebook },
    { key: "github", icon: faGithub },
    { key: "linkedin", icon: faLinkedin },
    { key: "pinterest", icon: faPinterest },
    { key: "behance", icon: faBehance },
    { key: "youtube", icon: faYoutube },
    { key: "discord", icon: faDiscord },
    { key: "telegram", icon: faTelegram },
    { key: "whatsapp", icon: faWhatsapp },
    { key: "snapchat", icon: faSnapchat },
    { key: "email", icon: faEnvelope },
    { key: "website", icon: faEarthAmericas },
  ];
  const { socials, setSocials, socialsOrder, setSocialsOrder } =
    useUserInfoStore();
  const { showDialog, closeDialog } = useAlertDialog();

  const [items, setItems] = useState([]);

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  useEffect(() => {
    // Self-healing: Ensure all supported socials are in socialsOrder
    const supportedKeys = socialIcons.map((s) => s.key);
    const missingKeys = supportedKeys.filter(
      (key) => !socialsOrder.includes(key),
    );

    if (missingKeys.length > 0) {
      const updatedOrder = [...socialsOrder, ...missingKeys];
      setSocialsOrder(updatedOrder);
      setItems(updatedOrder);
    } else {
      setItems(socialsOrder);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socialsOrder]);

  const onDragStart = (index) => {
    dragItem.current = index;
  };

  const onDragOverEvent = (e, index) => {
    e.preventDefault();
    dragOverItem.current = index;
  };

  const onDragEnd = () => {
    const arr = [...items];
    const dragged = arr[dragItem.current];

    arr.splice(dragItem.current, 1);
    arr.splice(dragOverItem.current, 0, dragged);

    dragItem.current = null;
    dragOverItem.current = null;

    setItems(arr);
    setSocialsOrder(arr);
  };

  const handleRemove = (key) => {
    showDialog({
      content: (
        <div className="flex flex-col gap-2 text-center">
          <h3 className="text-lg font-bold">Remove Social Link?</h3>
          <p className="text-gray-500">
            Are you sure you want to remove this link? This action cannot be
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
                setSocials({ [key]: "" });
                closeDialog();
              }}
              className="bg-primary hover:bg-primary/80 rounded-full px-6 py-2 text-sm font-medium text-white"
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

  const handleEdit = (key) => {
    showDialog({
      content: (
        <EditSocialDialog
          initialValue={socials[key]}
          onSave={(newValue) => {
            setSocials({ [key]: newValue });
            closeDialog();
          }}
          onCancel={closeDialog}
        />
      ),
      confirmText: "Save",
      cancelText: "Cancel",
      onConfirm: () => {},
    });
  };

  return (
    <div className="flex flex-col gap-3">
      {items.map((key, index) => {
        if (!socials[key]) return null;

        return (
          <div
            key={key}
            draggable
            onDragStart={() => onDragStart(index)}
            onDragOver={(e) => onDragOverEvent(e, index)}
            onDragEnd={onDragEnd}
            className="group flex cursor-grab items-center gap-3 rounded-xl bg-white p-4 text-black transition-all hover:shadow-md active:cursor-grabbing"
          >
            <span className="cursor-grab text-gray-400 active:cursor-grabbing">
              <FontAwesomeIcon icon={faGripVertical} />
            </span>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[18px]">
              <FontAwesomeIcon
                icon={socialIcons.find((s) => s.key === key)?.icon}
              />
            </span>
            <div className="min-w-0 flex-1">
              <p className="overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap">
                {socials[key]}
              </p>
            </div>
            <div className="flex items-center gap-1 opacity-0 transition-all group-hover:opacity-100">
              <button
                onClick={() => handleEdit(key)}
                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-black"
                title="Edit link"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => handleRemove(key)}
                className="rounded-full p-2 text-gray-400 hover:bg-red-50 hover:text-red-500"
                title="Remove link"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
