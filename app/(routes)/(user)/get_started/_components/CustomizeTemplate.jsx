import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button";
import useTemplateStore from "@/stores/useTemplateStore";

function CustomizeTemplate({ onFinish, loading, onBack }) {
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
  // Vertical Scroll Logic
  const scrollContainerRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        scrollContainerRef.current;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setShowScrollButton(!isAtBottom);
    }
  };

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  // Header Horizontal Scroll Logic
  const headerScrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleHeaderScroll = () => {
    if (headerScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = headerScrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const scrollHeaderLeft = () => {
    if (headerScrollRef.current) {
      headerScrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollHeaderRight = () => {
    if (headerScrollRef.current) {
      headerScrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Color Horizontal Scroll Logic
  const colorScrollRef = useRef(null);
  const [showColorLeftArrow, setShowColorLeftArrow] = useState(false);
  const [showColorRightArrow, setShowColorRightArrow] = useState(true);

  const handleColorScroll = () => {
    if (colorScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = colorScrollRef.current;
      setShowColorLeftArrow(scrollLeft > 0);
      setShowColorRightArrow(scrollLeft + clientWidth < scrollWidth - 50);
    }
  };

  const scrollColorLeft = () => {
    if (colorScrollRef.current) {
      colorScrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollColorRight = () => {
    if (colorScrollRef.current) {
      colorScrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Font Horizontal Scroll Logic
  const fontScrollRef = useRef(null);
  const [showFontLeftArrow, setShowFontLeftArrow] = useState(false);
  const [showFontRightArrow, setShowFontRightArrow] = useState(true);

  const handleFontScroll = () => {
    if (fontScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = fontScrollRef.current;
      setShowFontLeftArrow(scrollLeft > 0);
      setShowFontRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const scrollFontLeft = () => {
    if (fontScrollRef.current) {
      fontScrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollFontRight = () => {
    if (fontScrollRef.current) {
      fontScrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  useEffect(() => {
    handleScroll();
    handleHeaderScroll();
    handleColorScroll();
    handleFontScroll();
  }, []);

  console.log(header, colors, font, buttons);

  return (
    <div className="relative flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">Customize template</h1>
      </div>
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute right-1/2 bottom-22 z-10 flex h-10 w-10 translate-x-1/2 animate-bounce cursor-pointer items-center justify-center rounded-full bg-white shadow-[1px_2px_6px_0px_rgba(0,0,0,0.2)]"
        >
          <FontAwesomeIcon icon={faAngleDown} />
        </button>
      )}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="scrollbar-hide relative my-2 max-h-[65vh] space-y-8 overflow-y-auto px-1"
      >
        {/* Header Style */}
        <section className="relative">
          <h3 className="mb-3 text-sm font-bold text-gray-900">Header style</h3>

          {showLeftArrow && (
            <button
              onClick={scrollHeaderLeft}
              className="absolute top-1/2 left-0 z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
            </button>
          )}

          {showRightArrow && (
            <button
              onClick={scrollHeaderRight}
              className="absolute top-1/2 right-0 z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50"
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
            </button>
          )}

          <div
            ref={headerScrollRef}
            onScroll={handleHeaderScroll}
            className="scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth pb-4"
          >
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
                    {/* <div className="absolute mx-auto h-8 w-full bg-gray-200" /> */}
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
              if (opt === 6) {
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
                    {/* <div className="absolute mx-auto h-8 w-full bg-gray-200" /> */}
                    <div className="h-full w-full bg-gray-50 p-2 pt-3">
                      <div className="relative mx-auto h-6 w-6 rounded-full bg-gray-300" />
                      <div className="mx-auto mt-2 h-1.5 w-16 rounded bg-gray-200" />
                      <div className="mx-auto mt-1 h-1 w-10 rounded bg-gray-200" />
                      <div className="relative flex gap-2 pt-4">
                        <div className="absolute -right-[32%] mx-auto h-9 w-10 rounded bg-gray-200" />
                        <div className="mx-auto h-9 w-10 rounded bg-gray-200" />
                        <div className="absolute -left-[32%] mx-auto h-9 w-10 rounded bg-gray-200" />
                      </div>
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </section>

        {/* Color Scheme */}
        <section className="relative">
          <h3 className="mb-3 text-sm font-bold text-gray-900">
            Choose a color scheme
          </h3>

          {showColorLeftArrow && (
            <button
              onClick={scrollColorLeft}
              className="absolute top-1/2 left-0 z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
            </button>
          )}

          {showColorRightArrow && (
            <button
              onClick={scrollColorRight}
              className="absolute top-1/2 right-0 z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50"
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
            </button>
          )}

          <div
            ref={colorScrollRef}
            onScroll={handleColorScroll}
            className="scrollbar-hide flex gap-3 overflow-x-auto scroll-smooth pb-4"
          >
            {colorOptions.map((opt, idx) => (
              <div
                style={{
                  backgroundColor: opt.bg,
                }}
                key={idx}
                onClick={() => setSelectedColor(idx)}
                className={`flex h-16 w-12 min-w-12 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 p-1 transition-all ${
                  selectedColor === idx
                    ? "border-black ring-2 ring-blue-100"
                    : "border-gray-200 hover:border-gray-300"
                } ${opt.bg}`}
              >
                <div
                  style={{ backgroundColor: opt.accent }}
                  className={`h-4 w-4 rounded-full`}
                />
                <div
                  style={{ backgroundColor: opt.accent }}
                  className={`h-[5px] w-8 rounded`}
                />
                <div
                  style={{ backgroundColor: opt.accent }}
                  className={`h-[5px] w-8 rounded`}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Font */}
        <section className="relative">
          <h3 className="mb-3 text-sm font-bold text-gray-900">Font</h3>

          {showFontLeftArrow && (
            <button
              onClick={scrollFontLeft}
              className="absolute top-1/2 left-0 z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
            </button>
          )}

          {showFontRightArrow && (
            <button
              onClick={scrollFontRight}
              className="absolute top-1/2 right-0 z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50"
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
            </button>
          )}

          <div
            ref={fontScrollRef}
            onScroll={handleFontScroll}
            className="scrollbar-hide flex gap-3 overflow-x-auto scroll-smooth pb-4"
          >
            {fontOptions.map((font, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedFont(idx)}
                className={`flex h-16 w-16 min-w-16 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 p-1 transition-all ${
                  selectedFont === idx
                    ? "border-black bg-gray-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className={`text-3xl font-bold ${font}`}>Aa</span>
              </div>
            ))}
          </div>
        </section>

        {/* Buttons Style */}
        <section>
          <h3 className="mb-3 text-sm font-bold text-gray-900">
            Buttons style
          </h3>
          <div className="flex gap-3">
            {buttonOptions.map((style, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedButton(idx)}
                className={`flex h-16 w-16 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 transition-all ${
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
                          className="h-2 w-[70%] rounded-full border border-black bg-white py-1 text-xs font-bold text-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]"
                        />
                      );
                    }
                    if (style === "btns_style_2") {
                      return (
                        <div
                          key={i}
                          className="h-2 w-[70%] rounded-full border border-black bg-white py-1 text-xs font-bold text-black"
                        />
                      );
                    }
                    if (style === "btns_style_3") {
                      return (
                        <div
                          key={i}
                          className="h-2 w-[70%] rounded-full bg-black py-1 text-xs font-bold"
                        />
                      );
                    }
                    if (style === "btns_style_4") {
                      return (
                        <div
                          key={i}
                          className="h-2 w-[70%] rounded-full border-black bg-linear-to-r from-black to-[#adadad] py-1 text-xs font-bold text-black"
                        />
                      );
                    }
                    if (style === "btns_style_5") {
                      return (
                        <div
                          key={i}
                          className="h-2 w-[70%] rounded-full border-black bg-linear-to-r from-[#adadad] to-[#3e3e3e] py-1 text-xs font-bold text-black"
                        />
                      );
                    }
                  })}
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-gray-100 pt-6">
        <Button loading={loading} onClick={onFinish} className="px-8">
          Use this template
        </Button>
      </div>
    </div>
  );
}

export default CustomizeTemplate;
