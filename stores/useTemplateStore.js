import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const defaultTemplate = {
  header: 1,
  colors: { bg: "#ffffff", text: "#000000", accent: "#000000" },
  font: "font-poppins",
  buttons: "btns_style_1",
};

const useTemplateStore = create(
  persist(
    (set) => ({
      selectedHeader: 0,
      selectedColor: 0,
      selectedFont: 0,
      selectedButton: 0,

      header: defaultTemplate.header,
      colors: defaultTemplate.colors,
      font: defaultTemplate.font,
      buttons: defaultTemplate.buttons,

      headerOptions: [1, 2, 3, 4, 5],

      colorOptions: [
        { bg: "#ffffff", text: "#000000", accent: "#000000" },
        { bg: "#000000", text: "#ffffff", accent: "#d4f758" },
        { bg: "#ff8c82", text: "#000000", accent: "#ffffff" },
        { bg: "#f2fec7", text: "#072b37", accent: "#d7009f" },
        { bg: "#eff6ff", text: "#1A3B67", accent: "#1A3B67" },
        { bg: "#1E293B", text: "#F8FAFC", accent: "#38BDF8" },
        { bg: "#FDE68A", text: "#78350F", accent: "#B45309" },
        { bg: "#0F766E", text: "#ECFDF5", accent: "#34D399" },
        { bg: "#2E1065", text: "#E9D5FF", accent: "#A855F7" },
        { bg: "#FFF7ED", text: "#7C2D12", accent: "#F97316" },
      ],

      fontOptions: [
        "font-poppins",
        "font-inter",
        "font-montserrat",
        "font-playfair-display",
        "font-nunito",
        "font-urbanist",
        "font-mulish",
        "font-caveat",
        "font-fjord-one",
        "font-plus-jakarta-sans",
        "font-saira",
        "font-barlow",
      ],

      buttonOptions: [
        "btns_style_1",
        "btns_style_2",
        "btns_style_3",
        "btns_style_4",
        "btns_style_5",
      ],

      setSelectedHeader: (index) =>
        set((state) => ({
          selectedHeader: index,
          header: state.headerOptions[index],
        })),

      setSelectedColor: (index) =>
        set((state) => ({
          selectedColor: index,
          colors: state.colorOptions[index],
        })),

      setSelectedFont: (index) =>
        set((state) => ({
          selectedFont: index,
          font: state.fontOptions[index],
        })),

      setSelectedButton: (index) =>
        set((state) => ({
          selectedButton: index,
          buttons: state.buttonOptions[index],
        })),

      setHeader: (header) =>
        set({
          header: header ?? defaultTemplate.header,
        }),

      setColors: (colors) =>
        set({
          colors: colors ?? defaultTemplate.colors,
        }),

      setFont: (font) =>
        set({
          font: font ?? defaultTemplate.font,
        }),

      setButtons: (buttons) =>
        set({
          buttons: buttons ?? defaultTemplate.buttons,
        }),

      setTemplate: (template) =>
        set({
          header: template?.header ?? defaultTemplate.header,
          colors: template?.colors ?? defaultTemplate.colors,
          font: template?.font ?? defaultTemplate.font,
          buttons: template?.buttons ?? defaultTemplate.buttons,
        }),

      resetTemplateInfo: () =>
        set({
          selectedHeader: 0,
          selectedColor: 0,
          selectedFont: 0,
          selectedButton: 0,
          ...defaultTemplate,
        }),
    }),
    {
      name: "template-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useTemplateStore;
