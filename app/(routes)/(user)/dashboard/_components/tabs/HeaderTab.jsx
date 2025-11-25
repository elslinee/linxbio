import React from "react";
import Button from "@/components/Button";
import { useAlertDialog } from "@/components/AlertDialogProvider";
import { Link, Trash, X } from "lucide-react";
import AnimatedTab from "@/app/(routes)/(user)/dashboard/_components/AnimatedTab";
import { useSideBarTabsStore } from "@/stores/useSideBarTabsStore";
function HeaderTab() {
  const { showDialog } = useAlertDialog();
  const CustomBtn = ({ name }) => (
    <Button
      onClick={() => {
        showDialog({
          content: (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Publish Article</h2>
              <p className="text-sm text-neutral-500">
                Add a quick message before publishing.
              </p>
              <textarea
                placeholder="Write your message..."
                className="w-full rounded-lg border p-2"
              />
            </div>
          ),
          confirmText: "Add",
          cancelText: "Cancel",
          onConfirm: () => console.log("Published!"),
        });
      }}
      className={"w-fit! px-3! py-[4.5px]! text-sm font-normal"}
    >
      {name}
    </Button>
  );
  const { setTab } = useSideBarTabsStore();
  return (
    <AnimatedTab className="absolute bottom-24 left-1/2 w-[calc(100vw-2rem)] max-w-[400px] -translate-x-1/2 md:relative md:bottom-auto md:left-auto md:w-[360px] md:translate-x-0">
      <div className="flex h-[calc(100vh-200px)] w-full flex-col rounded-[8px] bg-white md:h-[calc(100vh-100px)]">
        <div className="flex shrink-0 items-center justify-between px-4 py-4">
          <p className="font-medium">Header</p>
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
            <CustomBtn name="Add Block" />
          </div>

          {/* BLOCKS LIST */}
          <div className="flex flex-col gap-4 pt-4">
            {/* مثال واحد — كرره كما تريد */}
            {[
              "Blog",
              "Contact Me",
              "Subscribe",
              "Blog",
              "Contact Me",
              "Subscribe",
              "Blog",
              "Contact Me",
              "Subscribe",
              "Blog",
              "Contact Me",
              "Subscribe",
              "Blog",
              "Contact Me",
              "Subscribe",
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="from-primary to-secondary rounded bg-linear-to-tr p-3">
                    <Link size={18} className="text-white" />
                  </span>
                  <p className="uppercase">{item}</p>
                </div>
                <button className="hover:text-red-600">
                  <Trash size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedTab>
  );
}

export default HeaderTab;
