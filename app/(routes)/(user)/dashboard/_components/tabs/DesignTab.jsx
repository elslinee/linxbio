import React, { useEffect, useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import AnimatedTab from "@/app/(routes)/(user)/dashboard/_components/AnimatedTab";
import { useSideBarTabsStore } from "@/stores/useSideBarTabsStore";
import CustomBtn from "@/app/(routes)/(user)/dashboard/_components/CustomBtn";
import useTemplateStore from "@/stores/useTemplateStore";
import { getLinkBioData } from "@/utils/client/user/linkBioApi";

function DesignTab() {
  const { setTab } = useSideBarTabsStore();

  const {
    selectedHeader,
    selectedColor,
    selectedFont,
    selectedButton,

    headerOptions,
    colorOptions,
    fontOptions,
    buttonOptions,

    setSelectedHeader,
    setSelectedColor,
    setSelectedFont,
    setSelectedButton,

    header,
    colors,
    font,
    buttons,
  } = useTemplateStore();

  const [selectedPage, setSelectedPage] = useState("");

  useEffect(() => {
    const headerIndex = headerOptions.findIndex((opt) => opt === header);
    const colorIndex = colorOptions.findIndex(
      (opt) =>
        opt.bg === colors?.bg &&
        opt.text === colors?.text &&
        opt.accent === colors?.accent,
    );
    const fontIndex = fontOptions.findIndex((opt) => opt === font);
    const buttonIndex = buttonOptions.findIndex((opt) => opt === buttons);

    if (headerIndex >= 0) setSelectedHeader(headerIndex);
    if (colorIndex >= 0) setSelectedColor(colorIndex);
    if (fontIndex >= 0) setSelectedFont(fontIndex);
    if (buttonIndex >= 0) setSelectedButton(buttonIndex);
  }, []);

  return (
    <AnimatedTab className="absolute bottom-24 left-1/2 w-[calc(100vw-2rem)] max-w-[425px] -translate-x-1/2 md:relative md:bottom-auto md:left-auto md:w-[425px] md:translate-x-0">
      {selectedPage === "" ? (
        <Tab
          setTab={setTab}
          setSelectedPage={setSelectedPage}
          header={header}
          colors={colors}
          font={font}
          buttons={buttons}
        />
      ) : (
        <TabPages
          headerOptions={headerOptions}
          setSelectedHeader={setSelectedHeader}
          selectedHeader={selectedHeader}
          colorOptions={colorOptions}
          setSelectedColor={setSelectedColor}
          selectedColor={selectedColor}
          fontOptions={fontOptions}
          setSelectedFont={setSelectedFont}
          selectedFont={selectedFont}
          buttonOptions={buttonOptions}
          setSelectedButton={setSelectedButton}
          selectedButton={selectedButton}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
      )}
    </AnimatedTab>
  );
}

const LayoutChanges = ({
  headerOptions,
  setSelectedHeader,
  selectedHeader,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 scroll-smooth pb-4">
      {headerOptions.map((opt, idx) => {
        if (opt === 1) {
          return (
            <div
              key={idx}
              onClick={() => setSelectedHeader(idx)}
              className={`relative h-40 w-24 min-w-24 cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${
                selectedHeader === idx
                  ? "border-black ring-2 ring-blue-100"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="absolute mx-auto h-8 w-full bg-gray-200" />
              <div className="h-full w-full bg-gray-50 p-2 pt-4">
                <div className="relative mx-auto h-8 w-8 rounded-full bg-gray-300" />
                <div className="mx-auto mt-2 h-2 w-16 rounded bg-gray-200" />
                <div className="mx-auto mt-1 h-1.5 w-10 rounded bg-gray-200" />
              </div>
            </div>
          );
        }

        if (opt === 2) {
          return (
            <div
              key={idx}
              onClick={() => setSelectedHeader(idx)}
              className={`relative h-40 w-24 min-w-24 cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${
                selectedHeader === idx
                  ? "border-black ring-2 ring-blue-100"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="absolute mx-auto h-8 w-full bg-gray-200" />
              <div className="h-full w-full bg-gray-50 p-2 pt-5">
                <div className="relative mx-auto h-6 w-6 rounded-full bg-gray-300" />
                <div className="mx-auto mt-2 h-1.5 w-16 rounded bg-gray-200" />
                <div className="mx-auto mt-1 h-1 w-10 rounded bg-gray-200" />
              </div>
            </div>
          );
        }
        if (opt === 3) {
          return (
            <div
              key={idx}
              onClick={() => setSelectedHeader(idx)}
              className={`relative h-40 w-24 min-w-24 cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${
                selectedHeader === idx
                  ? "border-black ring-2 ring-blue-100"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="h-full w-full bg-gray-50 p-2 pt-3">
                <div className="relative mx-auto h-6 w-6 rounded-full bg-gray-300" />
                <div className="mx-auto mt-2 h-1.5 w-16 rounded bg-gray-200" />
                <div className="mx-auto mt-1 h-1 w-10 rounded bg-gray-200" />
              </div>
            </div>
          );
        }
        if (opt === 4) {
          return (
            <div
              key={idx}
              onClick={() => setSelectedHeader(idx)}
              className={`relative h-40 w-24 min-w-24 cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${
                selectedHeader === idx
                  ? "border-black ring-2 ring-blue-100"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="absolute mx-auto h-12 w-full bg-linear-to-b from-gray-300 to-white" />
              <div className="h-full w-full bg-gray-50 p-2 pt-4">
                <div className="relative mx-auto h-6 w-6 rounded-full bg-gray-300" />
                <div className="mx-auto mt-2 h-1.5 w-16 rounded bg-gray-200" />
                <div className="mx-auto mt-1 h-1 w-10 rounded bg-gray-200" />
              </div>
            </div>
          );
        }
        if (opt === 5) {
          return (
            <div
              key={idx}
              onClick={() => setSelectedHeader(idx)}
              className={`relative h-40 w-24 min-w-24 cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${
                selectedHeader === idx
                  ? "border-black ring-2 ring-blue-100"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="absolute mx-auto h-12 w-full bg-gray-200" />
              <div className="h-full w-full bg-gray-50 p-2 pt-8">
                <div className="relative mx-auto h-6 w-6 rounded-full bg-gray-300" />
                <div className="mx-auto mt-2 h-1.5 w-16 rounded bg-gray-200" />
                <div className="mx-auto mt-1 h-1 w-10 rounded bg-gray-200" />
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};
const ColorsChanges = ({ colorOptions, setSelectedColor, selectedColor }) => {
  return (
    <div className="grid grid-cols-3 items-center justify-center gap-4 scroll-smooth pb-4">
      {colorOptions.map((opt, idx) => (
        <div
          style={{
            backgroundColor: opt.bg,
          }}
          key={idx}
          onClick={() => setSelectedColor(idx)}
          className={`flex h-26 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 p-1 transition-all md:h-28 md:w-26 ${
            selectedColor === idx
              ? "border-black ring-2 ring-blue-100"
              : "border-gray-200 hover:border-gray-300"
          } ${opt.bg}`}
        >
          <div
            style={{ backgroundColor: opt.accent }}
            className={`mb-1 h-8 w-8 rounded-full`}
          />
          <div
            style={{ backgroundColor: opt.accent }}
            className={`h-[8px] w-18 rounded`}
          />
          <div
            style={{ backgroundColor: opt.accent }}
            className={`h-[8px] w-18 rounded`}
          />
        </div>
      ))}
    </div>
  );
};
const FontChanges = ({ fontOptions, setSelectedFont, selectedFont }) => {
  return (
    <div className="grid grid-cols-3 gap-4 scroll-smooth pb-4">
      {fontOptions.map((font, idx) => (
        <div
          key={idx}
          onClick={() => setSelectedFont(idx)}
          className={`flex h-24 w-24 min-w-16 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 p-1 transition-all ${
            selectedFont === idx
              ? "border-black bg-gray-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <span className={`text-[40px] font-bold ${font}`}>Aa</span>
        </div>
      ))}
    </div>
  );
};
const ButtonsChanges = ({
  buttonOptions,
  setSelectedButton,
  selectedButton,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 scroll-smooth pb-4">
      {buttonOptions.map((style, idx) => (
        <div
          key={idx}
          onClick={() => setSelectedButton(idx)}
          className={`flex h-26 w-25 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 transition-all ${
            selectedButton === idx
              ? "border-black bg-gray-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          {Array(3)
            .fill(0)
            .map((_, i) => {
              if (style === "btns_style_1") {
                return (
                  <div
                    key={i}
                    className="h-3 w-[75%] rounded-full border border-black bg-white py-1 text-xs font-bold text-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]"
                  />
                );
              }
              if (style === "btns_style_2") {
                return (
                  <div
                    key={i}
                    className="h-3 w-[75%] rounded-full border border-black bg-white py-1 text-xs font-bold text-black"
                  />
                );
              }
              if (style === "btns_style_3") {
                return (
                  <div
                    key={i}
                    className="h-3 w-[75%] rounded-full bg-black py-1 text-xs font-bold"
                  />
                );
              }
              if (style === "btns_style_4") {
                return (
                  <div
                    key={i}
                    className="h-3 w-[75%] rounded-full border-black bg-linear-to-r from-black to-[#adadad] py-1 text-xs font-bold text-black"
                  />
                );
              }
              if (style === "btns_style_5") {
                return (
                  <div
                    key={i}
                    className="h-3 w-[75%] rounded-full border-black bg-linear-to-r from-[#adadad] to-[#3e3e3e] py-1 text-xs font-bold text-black"
                  />
                );
              }
            })}
        </div>
      ))}
    </div>
  );
};
const TabPages = ({
  selectedPage,
  setSelectedPage,
  headerOptions,
  setSelectedHeader,
  selectedHeader,
  colorOptions,
  setSelectedColor,
  selectedColor,
  fontOptions,
  setSelectedFont,
  selectedFont,
  buttonOptions,
  setSelectedButton,
  selectedButton,
}) => {
  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col rounded-[8px] bg-white md:h-[calc(100vh-100px)]">
      <div className="flex shrink-0 items-center gap-4 px-4 py-4">
        <button
          onClick={() => {
            setSelectedPage("");
          }}
        >
          <ArrowLeft
            size={20}
            className="hover:text-primary transition-colors duration-200"
          />
        </button>
        <p className="font-medium">Back</p>
      </div>

      <hr className="mb-4 text-gray-200" />

      <div className="custom-scroll flex-1 overflow-y-auto px-4 pb-6">
        {selectedPage === "layout" && (
          <LayoutChanges
            headerOptions={headerOptions}
            setSelectedHeader={setSelectedHeader}
            selectedHeader={selectedHeader}
          />
        )}
        {selectedPage === "colors" && (
          <ColorsChanges
            colorOptions={colorOptions}
            setSelectedColor={setSelectedColor}
            selectedColor={selectedColor}
          />
        )}
        {selectedPage === "font" && (
          <FontChanges
            fontOptions={fontOptions}
            setSelectedFont={setSelectedFont}
            selectedFont={selectedFont}
          />
        )}
        {selectedPage === "buttons" && (
          <ButtonsChanges
            buttonOptions={buttonOptions}
            setSelectedButton={setSelectedButton}
            selectedButton={selectedButton}
          />
        )}
      </div>
    </div>
  );
};
const Tab = ({ setTab, setSelectedPage }) => {
  const opt = { bg: "#ffffff", text: "#000000", accent: "#000000" };
  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col rounded-[8px] bg-white md:h-[calc(100vh-100px)]">
      <div className="flex shrink-0 items-center justify-between px-4 py-4">
        <p className="font-medium">Design</p>
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
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium">Layout</p>
            <div
              className={`relative h-36 w-24 min-w-24 cursor-pointer overflow-hidden rounded-xl border border-gray-200 transition-all`}
            >
              <div className="absolute mx-auto h-8 w-full bg-gray-200" />
              <div className="h-full w-full bg-gray-50 p-2 pt-4">
                <div className="relative mx-auto h-8 w-8 rounded-full bg-gray-300" />
                <div className="mx-auto mt-2 h-2 w-16 rounded bg-gray-200" />
                <div className="mx-auto mt-1 h-1.5 w-10 rounded bg-gray-200" />
              </div>
            </div>
          </div>
          <CustomBtn
            outLine={true}
            name="Edit"
            onClick={() => setSelectedPage("layout")}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium">Colors</p>
            <div
              style={{
                backgroundColor: opt.bg,
              }}
              className={`flex h-28 w-24 min-w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-gray-200 p-1 transition-all hover:border-gray-300`}
            >
              <div
                style={{ backgroundColor: opt.accent }}
                className={`mb-1 h-8 w-8 rounded-full`}
              />
              <div
                style={{ backgroundColor: opt.accent }}
                className={`h-[8px] w-18 rounded`}
              />
              <div
                style={{ backgroundColor: opt.accent }}
                className={`h-[8px] w-18 rounded`}
              />
            </div>
          </div>
          <CustomBtn
            outLine={true}
            name="Edit"
            onClick={() => setSelectedPage("colors")}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium">Font</p>
            <div
              className={`flex h-24 w-24 min-w-16 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-gray-200 p-1 transition-all hover:border-gray-300`}
            >
              <span className={`text-4xl font-bold`}>Aa</span>
            </div>
          </div>
          <CustomBtn
            outLine={true}
            name="Edit"
            onClick={() => setSelectedPage("font")}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium">Buttons</p>
            <div
              className={`flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-gray-200 transition-all hover:border-gray-300`}
            >
              <div className="h-2 w-[60%] rounded-full border border-black bg-white py-1 text-xs font-bold text-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]" />
              <div className="h-2 w-[60%] rounded-full border border-black bg-white py-1 text-xs font-bold text-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]" />
              <div className="h-2 w-[60%] rounded-full border border-black bg-white py-1 text-xs font-bold text-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]" />
            </div>
          </div>
          <CustomBtn
            outLine={true}
            name="Edit"
            onClick={() => setSelectedPage("buttons")}
          />
        </div>
      </div>
    </div>
  );
};
export default DesignTab;
