import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Link,
  Trash2,
  X,
  Image,
  Mail,
  Phone,
  MessageCircle,
  ChevronRight,
  GripVertical,
  Pencil,
  MapPin,
} from "lucide-react";
import AnimatedTab from "@/app/(routes)/(user)/dashboard/_components/AnimatedTab";
import { useSideBarTabsStore } from "@/stores/useSideBarTabsStore";
import Button from "@/components/Button";
import useBlocksStore from "@/stores/useBlocksStore";
import { updateLinkBioData } from "@/utils/client/user/linkBioApi";

function PageTab() {
  const [selectedPage, setSelectedPage] = useState("");
  const [editingBlock, setEditingBlock] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const { setTab } = useSideBarTabsStore();

  const handleAddBlockClick = () => {
    setEditingBlock(null);
    setSelectedPage("choose_block");
  };

  const handleEditBlockClick = (block) => {
    setEditingBlock(block);
    setSelectedType({ type: block.type, subType: block.data?.subType });
    setSelectedPage("block_form");
  };

  return (
    <AnimatedTab className="absolute bottom-24 left-1/2 w-[calc(100vw-2rem)] max-w-[425px] -translate-x-1/2 md:relative md:bottom-auto md:left-auto md:w-[425px] md:translate-x-0">
      {selectedPage === "" ? (
        <Tab
          setTab={setTab}
          handleAddBlockClick={handleAddBlockClick}
          handleEditBlockClick={handleEditBlockClick}
        />
      ) : (
        <TabPages
          setTab={setTab}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          editingBlock={editingBlock}
        />
      )}
    </AnimatedTab>
  );
}

const BlockForm = ({ selectedType, setSelectedPage, editingBlock }) => {
  const { blocks, setBlocks } = useBlocksStore();

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    url: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (editingBlock) {
      setFormData({
        title: editingBlock.title || "",
        subtitle: editingBlock.subtitle || "",
        url: editingBlock.data?.url || "",
        address: editingBlock.data?.address || "",
        email: editingBlock.data?.email || "",
        phone: editingBlock.data?.phone || "",
      });
    } else if (selectedType) {
      setFormData((prev) => ({
        ...prev,
        title: selectedType.subType
          ? `${selectedType.subType}`
          : selectedType.type,
      }));
    }
  }, [editingBlock, selectedType]);

  const handleSave = async (e) => {
    e.preventDefault();

    const newBlockData = {
      type: selectedType.type,
      title: formData.title,
      subtitle: formData.subtitle,
      data: {
        subType: selectedType.subType,
        url: formData.url,
        address: formData.address,
        email: formData.email,
        phone: formData.phone,
      },
    };

    let updatedBlocks;
    if (editingBlock) {
      updatedBlocks = blocks.map((b) =>
        b._id === editingBlock._id ? { ...b, ...newBlockData } : b,
      );
    } else {
      const tempId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      updatedBlocks = [...blocks, { ...newBlockData, _id: tempId }];
    }

    setBlocks(updatedBlocks);
    setSelectedPage("");
  };

  const renderSpecificFields = () => {
    const subType = selectedType?.subType?.toLowerCase();
    const type = selectedType?.type?.toLowerCase();

    if (type === "gallery") {
      return null;
    }

    if (subType === "email" || type === "email") {
      return (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            required
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="name@example.com"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
          />
        </div>
      );
    }

    if (subType === "call" || subType === "whatsapp") {
      return (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            required
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="+1234567890"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
          />
        </div>
      );
    }
    if (subType === "location" || type === "location") {
      return (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Address</label>
          <input
            required
            type="url"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            placeholder="Address or Location Url"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
          />
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Url</label>
        <input
          required
          type="url"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          placeholder="https://example.com"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
        />
      </div>
    );
  };
  return (
    <form onSubmit={handleSave} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Button Title"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Subtitle</label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) =>
              setFormData({ ...formData, subtitle: e.target.value })
            }
            placeholder="Subtitle (optional)"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
          />
        </div>
        {renderSpecificFields()}
      </div>

      <Button type="submit" className="w-full py-3!">
        {editingBlock ? "Save Changes" : "Add Block"}
      </Button>
    </form>
  );
};

const ChooseBlock = ({ setSelectedPage, setSelectedType }) => {
  const [view, setView] = useState("main");

  const handleSelect = (type, subType = null) => {
    setSelectedType({ type, subType });
    setSelectedPage("block_form");
  };

  const blockOptions = {
    links: [
      {
        id: "button",
        name: "Button",
        icon: <Link size={24} />,
        description: "Add buttons that link directly to sites or apps.",
        onClick: () => setView("button_options"),
      },
    ],
    media: [
      {
        id: "gallery",
        name: "Media gallery",
        icon: <Image size={24} />,
        description: "Promote a gallery of images or videos.",
        onClick: () => handleSelect("Gallery"),
      },
    ],
    contact: [
      {
        id: "contact",
        name: "Contact",
        icon: <Mail size={24} />,
        description: "Add a contact form or contact buttons.",
        onClick: () => handleSelect("Email"),
      },
    ],
  };

  const buttonOptions = [
    {
      id: "link",
      name: "Link",
      icon: <Link size={20} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: "email",
      name: "Email",
      icon: <Mail size={20} />,
      color: "bg-orange-100 text-orange-600",
    },
    {
      id: "location",
      name: "Location",
      icon: <MapPin size={20} />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: "call",
      name: "Call",
      icon: <Phone size={20} />,
      color: "bg-red-100 text-red-600",
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: <MessageCircle size={20} />,
      color: "bg-green-100 text-green-600",
    },
  ];

  if (view === "button_options") {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("main")}
            className="rounded-full p-1 transition-colors hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-lg font-bold">Button</h2>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {buttonOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect("button", option.name)}
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 text-left transition-all hover:border-gray-300 hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${option.color}`}
                >
                  {option.icon}
                </div>
                <span className="font-medium text-gray-900">{option.name}</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-gray-500">
          Links or Buttons
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {blockOptions.links.map((option) => (
            <button
              key={option.id}
              onClick={option.onClick}
              className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left transition-all hover:border-gray-300 hover:shadow-sm"
            >
              <div className="flex h-42 w-full items-center justify-center rounded-lg bg-gray-100 py-8">
     
                <div className="flex h-10 min-w-10/12 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                  My Website Link
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{option.name}</h4>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <p className="text-center text-gray-400">More Blocks Soon..</p>
      {/* <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-gray-500">Media</h3>
        <div className="grid grid-cols-1 gap-4">
          {blockOptions.media.map((option) => (
            <button
              key={option.id}
              onClick={option.onClick}
              className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left transition-all hover:border-gray-300 hover:shadow-sm"
            >
              <div className="flex h-12 w-full items-center justify-center rounded-lg bg-gray-100 py-8">
                <div className="flex gap-2">
                  <div className="h-10 w-14 rounded bg-gray-300"></div>
                  <div className="h-10 w-14 rounded bg-gray-300"></div>
                  <div className="h-10 w-14 rounded bg-gray-300"></div>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{option.name}</h4>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div> */}

      {/* <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-gray-500">Contact</h3>
        <div className="grid grid-cols-1 gap-4">
          {blockOptions.contact.map((option) => (
            <button
              key={option.id}
              onClick={option.onClick}
              className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left transition-all hover:border-gray-300 hover:shadow-sm"
            >
              <div className="flex h-12 w-full items-center justify-center rounded-lg bg-gray-100 py-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                  <Mail size={20} />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{option.name}</h4>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div> */}
    </div>
  );
};

const TabPages = ({
  setTab,
  selectedPage,
  setSelectedPage,
  selectedType,
  setSelectedType,
  editingBlock,
}) => {
  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col rounded-[8px] bg-white md:h-[calc(100vh-100px)]">
      <div className="flex shrink-0 items-center gap-4 px-4 py-4">
        <button
          onClick={() => {
            if (selectedPage === "block_form" && !editingBlock) {
              setSelectedPage("choose_block");
            } else {
              setSelectedPage("");
            }
          }}
        >
          <ArrowLeft
            size={20}
            className="hover:text-primary transition-colors duration-200"
          />
        </button>
        <p className="font-medium">
          {selectedPage === "choose_block"
            ? "Add Block"
            : editingBlock
              ? "Edit Block"
              : "Add Details"}
        </p>
      </div>

      <hr className="mb-4 text-gray-200" />
      <div className="custom-scroll flex-1 overflow-y-auto px-4 pb-6">
        {selectedPage === "choose_block" && (
          <ChooseBlock
            setSelectedPage={setSelectedPage}
            setSelectedType={setSelectedType}
          />
        )}
        {selectedPage === "block_form" && (
          <BlockForm
            selectedType={selectedType}
            setSelectedPage={setSelectedPage}
            editingBlock={editingBlock}
          />
        )}
      </div>
    </div>
  );
};

const Tab = ({ setTab, handleAddBlockClick, handleEditBlockClick }) => {
  const { blocks, setBlocks } = useBlocksStore();

  const handleDelete = async (blockId) => {
    const updatedBlocks = blocks.filter((b) => b._id !== blockId);
    setBlocks(updatedBlocks);
  };

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col rounded-[8px] bg-white md:h-[calc(100vh-100px)]">
      <div className="flex shrink-0 items-center justify-between px-4 py-4">
        <p className="font-medium">Page</p>
        <button
          onClick={() => {
            setTab("");
          }}
        >
          <X size={20} />
        </button>
      </div>

      <hr className="mb-4 text-gray-200" />

      <div className="custom-scroll flex-1 overflow-y-auto px-4 pb-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Blocks</p>
          <Button
            onClick={handleAddBlockClick}
            className="w-fit! min-w-[70px] px-4! py-2!"
          >
            Add Block
          </Button>
        </div>


        <div className="flex flex-col gap-4 pt-4">
          {blocks.map((item, i) => (
            <div key={i} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div
                  className={`rounded-md p-2 ${
                    item.type === "button" && "bg-green-100 text-green-500"
                  }`}
                >
                  {item.type === "button" && <Link />}
                  {item.type === "gallery" && <GripVertical />}
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleEditBlockClick(item)}
                  className="rounded-full p-2 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-700"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="rounded-full p-2 text-gray-400 transition-all hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {blocks.length === 0 && (
            <div className="py-8 text-center text-sm text-gray-400">
              No blocks added yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageTab;
