import React from "react";
import Link from "next/link";

const Button = ({
  buttons,
  blocks,
  colors,
  baseClasses,
  enableTracking = false,
  onTrackClick,
  isPreview = false,
}) => {
  if (!buttons) return null;

  const getStyles = (style) => {
    switch (style) {
      case "btns_style_1":
        return (colors) => ({
          color: colors.accent,
          backgroundColor: colors.bg,
          borderColor: colors.accent,
          boxShadow: isPreview
            ? `4px 4px 0px 0px ${colors.accent}`
            : `6px 6px 0px 0px ${colors.accent}`,
        });

      case "btns_style_2":
        return (colors) => ({
          color: colors.accent,
          backgroundColor: colors.bg,
          borderColor: colors.accent,
        });

      case "btns_style_3":
        return (colors) => ({
          color: colors.bg,
          backgroundColor: colors.accent,
          borderColor: colors.accent,
        });

      case "btns_style_4":
        return (colors) => ({
          color: colors.bg,
          background: `linear-gradient(90deg, ${colors.accent}, ${colors.bg})`,
          borderColor: colors.bg,
        });

      case "btns_style_5":
        return (colors) => ({
          color: colors.accent,
          background: `linear-gradient(90deg, ${colors.bg}, ${colors.accent})`,
          borderColor: colors.bg,
        });

      default:
        return () => ({});
    }
  };

  const styleFn = getStyles(buttons);

  const handleClick = (blockTitle) => {
    if (enableTracking && onTrackClick) {
      onTrackClick(`button-${blockTitle}`);
    }
  };

  return (
    <div className="mt-6 mb-6 w-full space-y-4 px-2">
      {blocks.map((block) => {
        switch (block?.data?.subType) {
          case "Link":
            return (
              <Link
                title={block?.subtitle}
                target="_blank"
                href={block?.data?.url || "/"}
                key={block._id}
                style={styleFn(colors)}
                className={baseClasses}
                onClick={() => handleClick(block.title)}
              >
                {block?.title}
              </Link>
            );
          case "Email":
            return (
              <Link
                title={block?.subtitle}
                target="_blank"
                href={`mailto:${block?.data?.email}`}
                key={block._id}
                style={styleFn(colors)}
                className={baseClasses}
                onClick={() => handleClick(block.title)}
              >
                {block?.title}
              </Link>
            );
          case "Call":
            return (
              <Link
                title={block?.subtitle}
                target="_blank"
                href={`tel:${block?.data?.phone}`}
                key={block._id}
                style={styleFn(colors)}
                className={baseClasses}
                onClick={() => handleClick(block.title)}
              >
                {block?.title}
              </Link>
            );
          case "Location":
            return (
              <Link
                title={block?.subtitle}
                target="_blank"
                href={`${block?.data?.address}`}
                key={block._id}
                style={styleFn(colors)}
                className={baseClasses}
                onClick={() => handleClick(block.title)}
              >
                {block?.title}
              </Link>
            );
          case "WhatsApp":
            return (
              <Link
                title={block?.subtitle}
                target="_blank"
                href={`https://wa.me/${block?.data?.phone}`}
                key={block._id}
                style={styleFn(colors)}
                className={baseClasses}
                onClick={() => handleClick(block.title)}
              >
                {block?.title}
              </Link>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default Button;
