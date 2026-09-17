/* @ds-bundle: {"format":4,"namespace":"FORRESTTrinityResortDesignSystem_0f01f7","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"BrandShape","sourcePath":"components/brand/BrandShape.jsx"},{"name":"BRAND_SHAPES","sourcePath":"components/brand/BrandShape.jsx"},{"name":"Icon","sourcePath":"components/brand/Icon.jsx"},{"name":"ICON_NAMES","sourcePath":"components/brand/Icon.jsx"},{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"PatternBand","sourcePath":"components/brand/PatternBand.jsx"},{"name":"Accordion","sourcePath":"components/content/Accordion.jsx"},{"name":"PartnerRow","sourcePath":"components/content/PartnerRow.jsx"},{"name":"Quote","sourcePath":"components/content/Quote.jsx"},{"name":"Timeline","sourcePath":"components/content/Timeline.jsx"},{"name":"WorldBlock","sourcePath":"components/content/WorldBlock.jsx"},{"name":"FormSection","sourcePath":"components/forms/FormSection.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"FooterPhoto","sourcePath":"components/sections/FooterPhoto.jsx"},{"name":"Hero","sourcePath":"components/sections/Hero.jsx"},{"name":"HeroFramed","sourcePath":"components/sections/HeroFramed.jsx"},{"name":"HeroSplit","sourcePath":"components/sections/HeroSplit.jsx"},{"name":"LeadFormSection","sourcePath":"components/sections/LeadFormSection.jsx"},{"name":"SiteFooter","sourcePath":"components/sections/SiteFooter.jsx"},{"name":"SiteHeader","sourcePath":"components/sections/SiteHeader.jsx"},{"name":"StatsRow","sourcePath":"components/sections/StatsRow.jsx"},{"name":"STATS","sourcePath":"components/sections/StatsSection.jsx"},{"name":"StatsSection","sourcePath":"components/sections/StatsSection.jsx"},{"name":"Panel","sourcePath":"components/surfaces/Panel.jsx"},{"name":"Stat","sourcePath":"components/surfaces/Stat.jsx"},{"name":"StatGrid","sourcePath":"components/surfaces/StatGrid.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"9240ecd7e8a0","components/brand/BrandShape.jsx":"5aca3d29602e","components/brand/Icon.jsx":"a467f4966ec6","components/brand/Logo.jsx":"22d8f288f8f3","components/brand/PatternBand.jsx":"6454dc1dcd44","components/content/Accordion.jsx":"2fce11f8a4e5","components/content/PartnerRow.jsx":"6f07f8d488d7","components/content/Quote.jsx":"c45f2d1b424d","components/content/Timeline.jsx":"91ea7767e50b","components/content/WorldBlock.jsx":"421394cb5a3a","components/forms/FormSection.jsx":"1ffb298a4f6f","components/forms/Input.jsx":"63b0b1c4fd44","components/forms/Select.jsx":"2cf10f617d18","components/sections/FooterPhoto.jsx":"2eeac480d5e7","components/sections/Hero.jsx":"e5fc7cb3cbcd","components/sections/HeroFramed.jsx":"ea3dc42b015d","components/sections/HeroSplit.jsx":"4a3cfd4528e3","components/sections/LeadFormSection.jsx":"c68b3ab35d1c","components/sections/SiteFooter.jsx":"e1f80122a4eb","components/sections/SiteHeader.jsx":"2fd6ef6ef7e2","components/sections/StatsRow.jsx":"40b511798c5c","components/sections/StatsSection.jsx":"30bd0d8c7f4c","components/surfaces/Panel.jsx":"777ec96b2a01","components/surfaces/Stat.jsx":"ea361424cf7f","components/surfaces/StatGrid.jsx":"e2fc03154844"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FORRESTTrinityResortDesignSystem_0f01f7 = window.FORRESTTrinityResortDesignSystem_0f01f7 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* §7 Button. Three variants, no others. Labels name the outcome
   ("Отримати інвест-пропозицію"), never the mechanic ("Надіслати"), and never carry an
   arrow glyph. Exactly one primary button is visible per viewport. */
function Button({
  variant = "primary",
  as,
  href,
  onInverse = false,
  disabled = false,
  children,
  className = "",
  ...rest
}) {
  const Tag = as || (href ? "a" : "button");
  const cls = ["fr-btn", "fr-btn--" + variant, onInverse ? "fr-on-inverse" : "", className].filter(Boolean).join(" ");
  const extra = Tag === "button" ? {
    type: rest.type || "button",
    disabled
  } : {
    href,
    "aria-disabled": disabled || undefined
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, extra, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/brand/BrandShape.jsx
try { (() => {
/* The signature device (§2, §6): WIND chevron, SUN twin peaks, ROCK double slab.
   Geometry is the brand-book vector, unmodified. Three permitted modes only:
   fill (solid world color), mask (crops a photo), outline (1.5px stroke over a photo).
   Never rotated, mirrored, gradient-filled, shadowed or distorted. One per composition. */
const SHAPES = {
  wind: {
    viewBox: "496.76 383 258.16 278.69",
    paths: ["M754.92 661.69L648.11 528.71L705.13 516.49L705.13 383L559.96 468.95C546.92 476.67 536.2 487.83 528.97 501.18L496.76 560.59L497.41 560.98L642.77 649.53C655.83 657.5 670.86 661.71 686.17 661.71L754.92 661.69Z"]
  },
  sun: {
    viewBox: "968 383 315 279.39",
    paths: ["M1106.97 624.49L1177.52 662.37L1177.54 662.39L1154.18 554.34L1174.53 588.39C1183.61 603.57 1196.73 616.06 1212.42 624.49L1282.98 662.37L1283 662.39L1230.43 383L1124.98 383L1073.46 383L968 383L1069.08 588.39C1078.15 603.57 1091.27 616.06 1106.97 624.49Z"]
  },
  rock: {
    viewBox: "1469 383 315 272.54",
    paths: ["M1551.74 519.27L1784 456.22L1688.84 383L1469 383L1551.74 519.27Z", "M1551.74 655.54L1784 592.5L1688.84 519.27L1469 519.27L1551.74 655.54Z"]
  }
};
function BrandShape({
  world = "wind",
  mode = "fill",
  color,
  photo,
  alt = "",
  width = "100%",
  height,
  className = "",
  style
}) {
  const shape = SHAPES[world];
  if (!shape) return null;
  const [vx, vy, vw, vh] = shape.viewBox.split(" ").map(Number);
  const id = world + "-" + mode + "-clip";
  const tint = color || "var(--world-accent, var(--accent))";
  if (mode === "mask") {
    return /*#__PURE__*/React.createElement("svg", {
      className: ("fr-shape " + className).trim(),
      viewBox: shape.viewBox,
      width: width,
      height: height,
      preserveAspectRatio: "xMidYMid meet",
      role: alt ? "img" : undefined,
      "aria-label": alt || undefined,
      "aria-hidden": alt ? undefined : true,
      style: style
    }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
      id: id
    }, shape.paths.map((d, i) => /*#__PURE__*/React.createElement("path", {
      key: i,
      d: d
    })))), /*#__PURE__*/React.createElement("g", {
      clipPath: "url(#" + id + ")"
    }, /*#__PURE__*/React.createElement("image", {
      href: photo,
      x: vx,
      y: vy,
      width: vw,
      height: vh,
      preserveAspectRatio: "xMidYMid slice"
    })));
  }
  if (mode === "outline") {
    return /*#__PURE__*/React.createElement("div", {
      className: ("fr-shape-outline " + className).trim(),
      style: {
        color: tint,
        ...style
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: photo,
      alt: alt
    }), /*#__PURE__*/React.createElement("svg", {
      viewBox: shape.viewBox,
      preserveAspectRatio: "xMidYMid meet",
      "aria-hidden": "true"
    }, shape.paths.map((d, i) => /*#__PURE__*/React.createElement("path", {
      key: i,
      d: d
    }))));
  }
  return /*#__PURE__*/React.createElement("svg", {
    className: ("fr-shape fr-shape--fill " + className).trim(),
    viewBox: shape.viewBox,
    width: width,
    height: height,
    preserveAspectRatio: "xMidYMid meet",
    "aria-hidden": "true",
    style: {
      color: tint,
      ...style
    }
  }, shape.paths.map((d, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: d,
    fill: "currentColor"
  })));
}
const BRAND_SHAPES = Object.keys(SHAPES);
Object.assign(__ds_scope, { BrandShape, BRAND_SHAPES });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/BrandShape.jsx", error: String((e && e.message) || e) }); }

// components/brand/Icon.jsx
try { (() => {
/* Functional icons only (§6): phone, social, chevron, close, form states.
   Geometry copied verbatim from Lucide (ISC) — 24x24 grid, currentColor, 1.5px stroke. */
const PATHS = {
  "chevron-down": '<path d="m6 9 6 6 6-6" />',
  "x": '<path d="M18 6 6 18" /> <path d="m6 6 12 12" />',
  "menu": '<path d="M4 5h16" /> <path d="M4 12h16" /> <path d="M4 19h16" />',
  "phone": '<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />',
  "mail": '<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /> <rect x="2" y="4" width="20" height="16" rx="2" />',
  "send": '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" /> <path d="m21.854 2.147-10.94 10.939" />',
  "instagram": '<rect width="20" height="20" x="2" y="2" rx="5" ry="5" /> <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /> <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />',
  "facebook": '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />',
  "check": '<path d="M20 6 9 17l-5-5" />',
  "minus": '<path d="M5 12h14" />',
  "plus": '<path d="M5 12h14" /> <path d="M12 5v14" />',
  "arrow-left": '<path d="m12 19-7-7 7-7" /> <path d="M19 12H5" />',
  "arrow-right": '<path d="M5 12h14" /> <path d="m12 5 7 7-7 7" />',
  "alert-circle": '<circle cx="12" cy="12" r="10" /> <line x1="12" x2="12" y1="8" y2="12" /> <line x1="12" x2="12.01" y1="16" y2="16" />'
};
function Icon({
  name,
  size = 20,
  strokeWidth,
  className = "",
  style,
  title
}) {
  const inner = PATHS[name];
  if (!inner) return null;
  return /*#__PURE__*/React.createElement("svg", {
    className: ("fr-icon " + className).trim(),
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: strokeWidth || "var(--stroke-icon)",
    role: title ? "img" : undefined,
    "aria-hidden": title ? undefined : true,
    focusable: "false",
    style: style,
    dangerouslySetInnerHTML: {
      __html: (title ? "<title>" + title + "</title>" : "") + inner
    }
  });
}
const ICON_NAMES = Object.keys(PATHS);
Object.assign(__ds_scope, { Icon, ICON_NAMES });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Icon.jsx", error: String((e && e.message) || e) }); }

// components/brand/Logo.jsx
try { (() => {
/* §6 Logo. Three brand-book lockups, used as-is: the primary horizontal logo (mark + FORREST +
   Trinity Resort) in header and footer, the integrator (mark + Trinity Resort) for favicons,
   small badges and repeated marks, and the wordmark / mark for tight spaces.
   Rendered as a CSS mask of the real SVG so the fill is a palette token and the outlines are
   never redrawn. variant="forrest" is the wordmark with the Trinity Resort line removed — the
   same vector paths under a cropped viewBox — for oversized settings like the photo footer.
   Minimum width 120px. Clear space = height of the mark on all sides. */
const LOCKUPS = {
  primary: {
    file: "logo-primary.svg",
    ratio: 593.9 / 116.5,
    minWidth: 120
  },
  integrator: {
    file: "logo-integrator.svg",
    ratio: 392.84 / 169.83,
    minWidth: 96
  },
  wordmark: {
    file: "logo-forrest.svg",
    ratio: 1000 / 275,
    minWidth: 120
  },
  forrest: {
    file: "logo-forrest-word.svg",
    ratio: 1000 / 167.791,
    minWidth: 120
  },
  mark: {
    file: "logo-mark.svg",
    ratio: 188.41 / 168.19,
    minWidth: 32
  }
};

/* Permitted color variants only: spruce / bark / night-bark on light, white-sand / sea-fog /
   sea-wave on dark. night-bark is allowed on pure white and nowhere else. */
function Logo({
  variant = "primary",
  color = "var(--spruce)",
  width = 180,
  assetBase = "assets",
  label = "FORREST Trinity Resort",
  clearSpace = false,
  className = "",
  style
}) {
  const lockup = LOCKUPS[variant] || LOCKUPS.primary;
  const w = Math.max(typeof width === "number" ? width : parseFloat(width), lockup.minWidth);
  const url = "url(" + assetBase + "/" + lockup.file + ")";
  return /*#__PURE__*/React.createElement("span", {
    className: ("fr-logo " + className).trim(),
    role: "img",
    "aria-label": label,
    style: {
      width: w + "px",
      height: w / lockup.ratio + "px",
      backgroundColor: color,
      maskImage: url,
      WebkitMaskImage: url,
      margin: clearSpace ? w / lockup.ratio + "px" : undefined,
      ...style
    }
  });
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/brand/PatternBand.jsx
try { (() => {
/* §6 Patterns: WIND contour swirls, SUN rings, ROCK cell mesh. Permitted uses only —
   inside a shape, as a full-bleed band under a section title, or in the integrator mark.
   Never under body text. Line color = the world's shape/accent color; background = that
   world's surface or its dark tone. Rendered as a CSS mask so the line color is a token. */
const PATTERNS = {
  wind: "wind-swirl.svg",
  sun: "sun-rings.svg",
  rock: "rock-mesh.svg"
};
function PatternBand({
  world = "wind",
  color,
  background,
  height = 200,
  assetBase = "assets",
  className = "",
  style
}) {
  const file = PATTERNS[world];
  if (!file) return null;
  const url = "url(" + assetBase + "/patterns/" + file + ")";
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    className: className,
    style: {
      height: typeof height === "number" ? height + "px" : height,
      background: background || "var(--world-surface, var(--bg-surface-mist))",
      overflow: "hidden",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fr-pattern",
    style: {
      height: "100%",
      backgroundColor: color || "var(--world-accent, var(--accent))",
      maskImage: url,
      WebkitMaskImage: url
    }
  }));
}
Object.assign(__ds_scope, { PatternBand });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/PatternBand.jsx", error: String((e && e.message) || e) }); }

// components/content/Accordion.jsx
try { (() => {
/* §7 Accordion (advantages, FAQ). Full-width rows separated by 1px hairlines, question in
   type/h4 with 24px vertical padding, a single chevron rotating 180deg. Open adds the answer;
   the background never changes. One item open at a time. */
function Accordion({
  items = [],
  defaultOpen = null,
  onInverse = false,
  className = ""
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return /*#__PURE__*/React.createElement("div", {
    className: ["fr-accordion", onInverse ? "fr-on-inverse" : "", className].filter(Boolean).join(" ")
  }, items.map(function (item, i) {
    const isOpen = open === i;
    const id = "fr-acc-" + i;
    return /*#__PURE__*/React.createElement("div", {
      className: "fr-accordion__item",
      "data-open": isOpen,
      key: i
    }, /*#__PURE__*/React.createElement("button", {
      className: "fr-accordion__trigger",
      "aria-expanded": isOpen,
      "aria-controls": id,
      onClick: function () {
        setOpen(isOpen ? null : i);
      }
    }, /*#__PURE__*/React.createElement("span", null, item.question), /*#__PURE__*/React.createElement("span", {
      className: "fr-accordion__chevron"
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "chevron-down",
      size: 24
    }))), isOpen && /*#__PURE__*/React.createElement("div", {
      className: "fr-accordion__panel",
      id: id,
      role: "region"
    }, item.answer));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/content/PartnerRow.jsx
try { (() => {
/* §7 Partner row. Monochrome stone logos, 40px high, equal spacing, hairline above and below.
   Partner marks are masked to stone so no foreign brand color enters the page. */
function PartnerRow({
  partners = [],
  onInverse = false,
  className = ""
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ["fr-partners", onInverse ? "fr-on-inverse" : "", className].filter(Boolean).join(" ")
  }, partners.map(function (p, i) {
    const item = typeof p === "string" ? {
      name: p
    } : p;
    if (!item.src) {
      return /*#__PURE__*/React.createElement("span", {
        key: i,
        style: {
          fontFamily: "var(--font-text)",
          fontSize: "var(--type-h4-size)",
          fontWeight: "var(--type-h4-weight)",
          color: "var(--accent-earth)",
          height: "40px",
          display: "flex",
          alignItems: "center"
        }
      }, item.name);
    }
    const url = "url(" + item.src + ")";
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      role: "img",
      "aria-label": item.name,
      className: "fr-partners__logo",
      style: {
        width: (item.width || 120) + "px",
        maskImage: url,
        WebkitMaskImage: url,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskPosition: "center",
        WebkitMaskPosition: "center"
      }
    });
  }));
}
Object.assign(__ds_scope, { PartnerRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/PartnerRow.jsx", error: String((e && e.message) || e) }); }

// components/content/Quote.jsx
try { (() => {
/* §7 Quote / ambassador. Photo with sharp corners at 4:5, name in type/h4, role in
   type/small, quote in type/body. No decorative quotation marks. */
function Quote({
  photo,
  alt = "",
  quote,
  name,
  role,
  onInverse = false,
  className = ""
}) {
  return /*#__PURE__*/React.createElement("figure", {
    className: ["fr-quote", onInverse ? "fr-on-inverse" : "", className].filter(Boolean).join(" "),
    style: {
      margin: 0
    }
  }, photo && /*#__PURE__*/React.createElement("img", {
    className: "fr-quote__photo",
    src: photo,
    alt: alt
  }), /*#__PURE__*/React.createElement("div", {
    className: "fr-quote__body"
  }, /*#__PURE__*/React.createElement("blockquote", {
    className: "fr-quote__text",
    style: {
      margin: 0
    }
  }, quote), /*#__PURE__*/React.createElement("figcaption", null, /*#__PURE__*/React.createElement("div", {
    className: "fr-quote__name"
  }, name), role && /*#__PURE__*/React.createElement("div", {
    className: "fr-quote__role"
  }, role))));
}
Object.assign(__ds_scope, { Quote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Quote.jsx", error: String((e && e.message) || e) }); }

// components/content/Timeline.jsx
try { (() => {
/* §7 Timeline — project phases. A true sequence, so ordering is legible from the years
   themselves. Horizontal on desktop, vertical on mobile, one 1px border-strong line. */
function Timeline({
  items = [],
  onInverse = false,
  className = ""
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ["fr-timeline", onInverse ? "fr-on-inverse" : "", className].filter(Boolean).join(" ")
  }, items.map(function (item, i) {
    return /*#__PURE__*/React.createElement("div", {
      className: "fr-timeline__item",
      key: i
    }, /*#__PURE__*/React.createElement("span", {
      className: "fr-timeline__year"
    }, item.year), item.world && /*#__PURE__*/React.createElement("span", {
      className: "fr-timeline__world"
    }, item.world), item.text && /*#__PURE__*/React.createElement("span", {
      className: "fr-timeline__text"
    }, item.text));
  }));
}
Object.assign(__ds_scope, { Timeline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Timeline.jsx", error: String((e && e.message) || e) }); }

// components/content/WorldBlock.jsx
try { (() => {
/* §7 World block — the signature component. Full-bleed band on that world's surface;
   copy left (type/world name, type/h3 tagline, type/body description, text button),
   photo right, masked into the world's shape or the shape outlined over the photo.
   All three world blocks use this same layout: only color, shape and photo change. */
function WorldBlock({
  world = "wind",
  name,
  tagline,
  text,
  photo,
  alt = "",
  mode = "mask",
  action,
  onAction,
  reverse = false,
  className = ""
}) {
  const label = name || world.toUpperCase();
  return /*#__PURE__*/React.createElement("section", {
    "data-world": world,
    className: ("fr-world " + className).trim(),
    "aria-label": label
  }, /*#__PURE__*/React.createElement("div", {
    className: "fr-world__copy",
    style: reverse ? {
      order: 2,
      justifySelf: "start"
    } : undefined
  }, /*#__PURE__*/React.createElement("h2", {
    className: "fr-world__name"
  }, label), tagline && /*#__PURE__*/React.createElement("p", {
    className: "fr-world__tagline"
  }, tagline), text && /*#__PURE__*/React.createElement("p", {
    className: "fr-world__text"
  }, text), action && /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "text",
    onClick: onAction
  }, action))), /*#__PURE__*/React.createElement("div", {
    className: "fr-world__media",
    style: reverse ? {
      order: 1,
      justifySelf: "end"
    } : undefined
  }, /*#__PURE__*/React.createElement(__ds_scope.BrandShape, {
    world: world,
    mode: mode,
    photo: photo,
    alt: alt
  })));
}
Object.assign(__ds_scope, { WorldBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/WorldBlock.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* §7 Input. 48px high, air background, 1px border-strong, radius 4, label above in
   type/label. The placeholder is an example, not a restatement of the label. */
function Input({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  hint,
  error,
  disabled = false,
  required = false,
  multiline = false,
  className = "",
  ...rest
}) {
  const fieldId = id || "fr-input-" + (label || type).replace(/\s+/g, "-").toLowerCase();
  const describedBy = error ? fieldId + "-error" : hint ? fieldId + "-hint" : undefined;
  const Tag = multiline ? "textarea" : "input";
  return /*#__PURE__*/React.createElement("div", {
    className: ("fr-field " + className).trim()
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "fr-field__label",
    htmlFor: fieldId
  }, label), /*#__PURE__*/React.createElement(Tag, _extends({
    id: fieldId,
    className: "fr-control" + (multiline ? " fr-textarea" : ""),
    type: multiline ? undefined : type,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    disabled: disabled,
    required: required,
    "aria-invalid": error ? "true" : undefined,
    "aria-describedby": describedBy
  }, rest)), error ? /*#__PURE__*/React.createElement("span", {
    className: "fr-field__error",
    id: fieldId + "-error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "fr-field__hint",
    id: fieldId + "-hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* §7 Select. Same shell as Input; a single chevron, no custom dropdown chrome. */
function Select({
  id,
  label,
  options = [],
  value,
  onChange,
  placeholder,
  error,
  hint,
  disabled = false,
  required = false,
  className = "",
  ...rest
}) {
  const fieldId = id || "fr-select-" + (label || "field").replace(/\s+/g, "-").toLowerCase();
  const describedBy = error ? fieldId + "-error" : hint ? fieldId + "-hint" : undefined;
  return /*#__PURE__*/React.createElement("div", {
    className: ("fr-field " + className).trim()
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "fr-field__label",
    htmlFor: fieldId
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "fr-select"
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fieldId,
    className: "fr-control",
    value: value,
    onChange: onChange,
    disabled: disabled,
    required: required,
    "aria-invalid": error ? "true" : undefined,
    "aria-describedby": describedBy
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), options.map(function (o) {
    const opt = typeof o === "string" ? {
      value: o,
      label: o
    } : o;
    return /*#__PURE__*/React.createElement("option", {
      key: opt.value,
      value: opt.value
    }, opt.label);
  })), /*#__PURE__*/React.createElement("span", {
    className: "fr-select__chevron"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 20
  }))), error ? /*#__PURE__*/React.createElement("span", {
    className: "fr-field__error",
    id: fieldId + "-error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "fr-field__hint",
    id: fieldId + "-hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/FormSection.jsx
try { (() => {
/* §7 Form section. On the white-sand surface; two columns on desktop (h2 + lead left,
   form right), stacked on mobile. Fields: name, phone, contact method, investment
   category, one primary button and a type/small privacy line. */
function FormSection({
  title,
  lead,
  contactMethods = ["Телефон", "Telegram", "Email"],
  categories = [],
  submitLabel = "Отримати інвест-пропозицію",
  privacy,
  onSubmit,
  className = ""
}) {
  const [sent, setSent] = React.useState(false);
  function handle(e) {
    e.preventDefault();
    setSent(true);
    if (onSubmit) onSubmit(new FormData(e.target));
  }
  return /*#__PURE__*/React.createElement("section", {
    className: ("fr-form-section " + className).trim()
  }, /*#__PURE__*/React.createElement("div", {
    className: "fr-form-section__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fr-form-section__copy"
  }, title && /*#__PURE__*/React.createElement("h2", {
    className: "type-h2"
  }, title), lead && /*#__PURE__*/React.createElement("p", {
    className: "type-lead",
    style: {
      color: "var(--text-secondary)"
    }
  }, lead)), /*#__PURE__*/React.createElement("form", {
    className: "fr-form",
    onSubmit: handle
  }, /*#__PURE__*/React.createElement("div", {
    className: "fr-form__row"
  }, /*#__PURE__*/React.createElement(__ds_scope.Input, {
    name: "name",
    label: "\u0406\u043C\u02BC\u044F",
    placeholder: "\u041E\u043B\u0435\u043D\u0430 \u041A\u043E\u0432\u0430\u043B\u044C\u0447\u0443\u043A",
    required: true
  }), /*#__PURE__*/React.createElement(__ds_scope.Input, {
    name: "phone",
    label: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D",
    type: "tel",
    placeholder: "+380 67 000 00 00",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "fr-form__row"
  }, /*#__PURE__*/React.createElement(__ds_scope.Select, {
    name: "method",
    label: "\u0421\u043F\u043E\u0441\u0456\u0431 \u0437\u0432\u02BC\u044F\u0437\u043A\u0443",
    options: contactMethods,
    placeholder: "\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u0441\u043F\u043E\u0441\u0456\u0431"
  }), /*#__PURE__*/React.createElement(__ds_scope.Select, {
    name: "category",
    label: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044F \u0456\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0456\u0439",
    options: categories,
    placeholder: "\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044E"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    type: "submit"
  }, sent ? "Заявку надіслано" : submitLabel)), privacy && /*#__PURE__*/React.createElement("p", {
    className: "fr-form__privacy"
  }, privacy))));
}
Object.assign(__ds_scope, { FormSection });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FormSection.jsx", error: String((e && e.message) || e) }); }

// components/sections/FooterPhoto.jsx
try { (() => {
/* Footer, photo variant. A dark photograph fills the footer and one flat spruce veil at 78%
   turns it into a ground rather than an image — measured against pure white, the worst case
   any photograph can present, sea-fog over that veil is 6.13:1 and white-sand 6.29:1, so the
   brief's fallback to 85% is not needed. The photograph does not scroll independently of the
   content: no fixed attachment, no parallax.
   Four tiers inside the 1280 container, 128 above and 48 below: a centred call to action (the
   one §5.2 exception, max 6 columns), the FORREST wordmark SVG across the full container
   width, the link grid, and the legal row under a single border-on-inverse hairline.
   The wordmark is logo-forrest-word.svg — the FORREST letterforms only, without the Trinity
   Resort line. Same brand-book vector paths, cropped viewBox, nothing redrawn or rescaled.
   Three colours only: the spruce veil, white-sand, sea-fog. No icons, no arrows, no caps, no
   monospace — the reference's styling is deliberately not carried over. */
const DEFAULT_GROUPS = [{
  title: "Проєкт",
  items: ["Три світи", "Переваги", "Хід будівництва", "Новини"]
}, {
  title: "Черги",
  worlds: ["WIND", "ROCK", "SUN"]
}, {
  title: "Забудовник",
  items: ["Про компанію", "Партнери", "Амбасадори"]
}, {
  title: "Контакти",
  items: ["Telegram", "Instagram", "Facebook", "E-mail"]
}];
function FooterPhoto({
  ctaTitle = "Бажаєте побачити FORREST наживо?",
  ctaLead = "Запрошуємо на обʼєкт у Буковелі, покажемо будівництво та доступні формати апартаментів.",
  cta = "Забронювати огляд",
  onCta,
  address = "Буковель, Івано-Франківська область",
  phone = "+380 67 000 00 00",
  groups = DEFAULT_GROUPS,
  copyright = "© 2026 FORREST Trinity Resort",
  legal = [{
    label: "Політика конфіденційності",
    href: "#privacy"
  }, {
    label: "Умови використання",
    href: "#terms"
  }],
  credit = "Створено з душею",
  creditHref,
  photo = "assets/photos/footer-bridge.jpg",
  alt = "",
  mobile = false,
  assetBase = "assets",
  className = ""
}) {
  const tel = "tel:" + String(phone).replace(/[^+\d]/g, "");
  const wordmark = "url(" + assetBase + "/logo-forrest-word.svg)";
  const welldone = "url(" + assetBase + "/logo-welldone.svg)";
  const CreditTag = creditHref ? "a" : "span";
  return /*#__PURE__*/React.createElement("footer", {
    className: ["fr-pfooter", mobile ? "fr-pfooter--mobile" : "", className].filter(Boolean).join(" "),
    "data-viewport": mobile ? "mobile" : undefined
  }, /*#__PURE__*/React.createElement("div", {
    className: "fr-pfooter__media"
  }, /*#__PURE__*/React.createElement("img", {
    src: photo,
    alt: alt,
    "aria-hidden": alt ? undefined : true
  })), /*#__PURE__*/React.createElement("div", {
    className: "fr-pfooter__veil",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "fr-pfooter__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fr-pfooter__cta"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "fr-pfooter__ctatitle"
  }, ctaTitle), /*#__PURE__*/React.createElement("p", {
    className: "fr-pfooter__ctalead"
  }, ctaLead), /*#__PURE__*/React.createElement("div", {
    className: "fr-pfooter__ctabtn"
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    onInverse: true,
    onClick: onCta
  }, cta))), /*#__PURE__*/React.createElement("div", {
    className: "fr-pfooter__wordmark"
  }, /*#__PURE__*/React.createElement("span", {
    role: "img",
    "aria-label": "FORREST",
    style: {
      maskImage: wordmark,
      WebkitMaskImage: wordmark
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "fr-pfooter__grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fr-pfooter__contact"
  }, /*#__PURE__*/React.createElement("p", {
    className: "fr-pfooter__contactline"
  }, address), /*#__PURE__*/React.createElement("a", {
    className: "fr-pfooter__contactline fr-pfooter__contactlink",
    href: tel
  }, phone)), /*#__PURE__*/React.createElement("div", {
    className: "fr-pfooter__groups"
  }, groups.map(function (g) {
    return /*#__PURE__*/React.createElement("div", {
      className: "fr-pfooter__group",
      key: g.title
    }, /*#__PURE__*/React.createElement("h3", {
      className: "fr-pfooter__grouptitle"
    }, g.title), /*#__PURE__*/React.createElement("ul", {
      className: "fr-pfooter__list"
    }, (g.worlds || []).map(function (w) {
      return /*#__PURE__*/React.createElement("li", {
        key: w
      }, /*#__PURE__*/React.createElement("a", {
        className: "fr-pfooter__world",
        href: "#" + w.toLowerCase()
      }, w));
    }), (g.items || []).map(function (it) {
      const item = typeof it === "string" ? {
        label: it,
        href: "#"
      } : it;
      return /*#__PURE__*/React.createElement("li", {
        key: item.label
      }, /*#__PURE__*/React.createElement("a", {
        className: "fr-pfooter__link",
        href: item.href
      }, item.label));
    })));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "fr-pfooter__bottom"
  }, /*#__PURE__*/React.createElement("span", {
    className: "fr-pfooter__copy"
  }, copyright), /*#__PURE__*/React.createElement("span", {
    className: "fr-pfooter__legal"
  }, legal.map(function (l) {
    return /*#__PURE__*/React.createElement("a", {
      href: l.href,
      key: l.label
    }, l.label);
  })), /*#__PURE__*/React.createElement(CreditTag, {
    className: "fr-pfooter__credit",
    href: creditHref
  }, /*#__PURE__*/React.createElement("span", null, credit), /*#__PURE__*/React.createElement("span", {
    className: "fr-pfooter__creditmark",
    role: "img",
    "aria-label": "welldone",
    style: {
      maskImage: welldone,
      WebkitMaskImage: welldone
    }
  })))));
}
Object.assign(__ds_scope, { FooterPhoto });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections/FooterPhoto.jsx", error: String((e && e.message) || e) }); }

// components/sections/Hero.jsx
try { (() => {
/* Landing hero. Full-bleed render under a spruce scrim that runs 0 to 40% from the bottom
   (§3.4's single permitted photo overlay). Headline top-left, starting directly below the
   header; lead (max 5 columns) and the inverted primary CTA share one baseline 64px above
   the bottom edge. Nothing else: no stats, no scroll cue, no badge, no icons.
   The headline is set in caps — the one sanctioned exception to §4.2. */
const WIND_SHAPE = "M754.92 661.69L648.11 528.71L705.13 516.49L705.13 383L559.96 468.95C546.92 476.67 536.2 487.83 528.97 501.18L496.76 560.59L497.41 560.98L642.77 649.53C655.83 657.5 670.86 661.71 686.17 661.71L754.92 661.69Z";
function Hero({
  title = ["ТРИ СВІТИ.", "ОДИН АКТИВ У БУКОВЕЛІ"],
  lead,
  cta = "Отримати пропозицію",
  onCta,
  photo = "assets/photos/hero.jpg",
  alt = "Курортний комплекс FORREST Trinity Resort серед карпатського лісу",
  shape = true,
  mobile = false,
  height,
  className = ""
}) {
  const lines = Array.isArray(title) ? title : [title];
  return /*#__PURE__*/React.createElement("section", {
    className: ["fr-hero", mobile ? "fr-hero--mobile" : "", className].filter(Boolean).join(" "),
    "data-viewport": mobile ? "mobile" : undefined,
    style: height ? {
      minHeight: height
    } : undefined
  }, /*#__PURE__*/React.createElement("div", {
    className: "fr-hero__media"
  }, /*#__PURE__*/React.createElement("img", {
    src: photo,
    alt: alt,
    fetchPriority: "high",
    decoding: "sync"
  })), /*#__PURE__*/React.createElement("div", {
    className: "fr-hero__scrim",
    "aria-hidden": "true"
  }), shape && !mobile && /*#__PURE__*/React.createElement("svg", {
    className: "fr-hero__shape",
    viewBox: "496.76 383 258.16 278.69",
    preserveAspectRatio: "xMidYMid meet",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: WIND_SHAPE
  })), /*#__PURE__*/React.createElement("div", {
    className: "fr-hero__inner"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "fr-hero__title"
  }, lines.map(function (line, i) {
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, line, i < lines.length - 1 ? /*#__PURE__*/React.createElement("br", null) : null);
  })), lead && /*#__PURE__*/React.createElement("p", {
    className: "fr-hero__lead"
  }, lead), cta && /*#__PURE__*/React.createElement("div", {
    className: "fr-hero__cta"
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    onInverse: true,
    onClick: onCta
  }, cta))));
}
Object.assign(__ds_scope, { Hero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections/Hero.jsx", error: String((e && e.message) || e) }); }

// components/sections/HeroFramed.jsx
try { (() => {
/* Hero, version A — recomposed. No brand shape (the WIND outline crossed the headline, §6).
   The render is re-cropped so the tower fills the right 60% of the frame, the left third is
   forest trunks and the sky wedge is held to the top of the frame. The full-frame scrim is
   replaced by one local radial spruce gradient, 0 to 55%, centred on the bottom-left corner
   at 45% of the width and 65% of the height with a soft edge — the right half of the render
   is untouched. Headline is type/display in three lines, max 7 columns, flush left, and sits
   low enough to stay inside the gradient: contrast of white-sand over the lightest pixel
   under every line measures 7.9:1 or better. Lead and CTA keep their original baseline. */
function HeroFramed({
  title = ["ТРИ СВІТИ.", "ОДИН АКТИВ", "У БУКОВЕЛІ"],
  lead,
  cta = "Отримати пропозицію",
  onCta,
  photo = "assets/photos/hero.jpg",
  alt = "Курортний комплекс FORREST Trinity Resort серед карпатського лісу",
  mobile = false,
  height,
  className = ""
}) {
  const lines = Array.isArray(title) ? title : [title];
  return /*#__PURE__*/React.createElement("section", {
    className: ["fr-heroa", mobile ? "fr-heroa--mobile" : "", className].filter(Boolean).join(" "),
    "data-viewport": mobile ? "mobile" : undefined,
    style: height ? {
      minHeight: height
    } : undefined
  }, /*#__PURE__*/React.createElement("div", {
    className: "fr-heroa__media"
  }, /*#__PURE__*/React.createElement("img", {
    src: photo,
    alt: alt,
    fetchPriority: "high",
    decoding: "sync"
  })), /*#__PURE__*/React.createElement("div", {
    className: "fr-heroa__glow",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "fr-heroa__inner"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "fr-heroa__title"
  }, lines.map(function (line, i) {
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, line, i < lines.length - 1 ? /*#__PURE__*/React.createElement("br", null) : null);
  })), lead && /*#__PURE__*/React.createElement("p", {
    className: "fr-heroa__lead"
  }, lead), cta && /*#__PURE__*/React.createElement("div", {
    className: "fr-heroa__cta"
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    onInverse: true,
    onClick: onCta
  }, cta))));
}
Object.assign(__ds_scope, { HeroFramed });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections/HeroFramed.jsx", error: String((e && e.message) || e) }); }

// components/sections/HeroSplit.jsx
try { (() => {
/* Hero, version B — split. 100vh in two zones: columns 1-5 are a white-sand text panel
   (128px top, 64px bottom, 32px inner right) holding the type/display headline in spruce
   over three lines, a type/lead subhead in forest, and the primary spruce button pinned to
   the bottom of the column; columns 6-12 are the render at full height with a flush left
   edge and no scrim at all, so legibility never depends on the photo. One WIND outline,
   1px sea-fog, sits in the render's bottom-right quarter clear of both edges (§6: one shape
   per composition). Mobile stacks the white-sand text block over a 4:5 render, no shape. */
const WIND_SHAPE = "M754.92 661.69L648.11 528.71L705.13 516.49L705.13 383L559.96 468.95C546.92 476.67 536.2 487.83 528.97 501.18L496.76 560.59L497.41 560.98L642.77 649.53C655.83 657.5 670.86 661.71 686.17 661.71L754.92 661.69Z";
function HeroSplit({
  title = ["ТРИ СВІТИ.", "ОДИН АКТИВ", "У БУКОВЕЛІ"],
  lead,
  cta = "Отримати пропозицію",
  onCta,
  photo = "assets/photos/hero.jpg",
  alt = "Курортний комплекс FORREST Trinity Resort серед карпатського лісу",
  shape = true,
  mobile = false,
  height,
  className = ""
}) {
  const lines = Array.isArray(title) ? title : [title];
  return /*#__PURE__*/React.createElement("section", {
    className: ["fr-heros", mobile ? "fr-heros--mobile" : "", className].filter(Boolean).join(" "),
    "data-viewport": mobile ? "mobile" : undefined,
    style: height ? {
      minHeight: height
    } : undefined
  }, /*#__PURE__*/React.createElement("div", {
    className: "fr-heros__panel"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "fr-heros__title"
  }, lines.map(function (line, i) {
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, line, i < lines.length - 1 ? /*#__PURE__*/React.createElement("br", null) : null);
  })), lead && /*#__PURE__*/React.createElement("p", {
    className: "fr-heros__lead"
  }, lead), cta && /*#__PURE__*/React.createElement("div", {
    className: "fr-heros__cta"
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    onClick: onCta
  }, cta))), /*#__PURE__*/React.createElement("div", {
    className: "fr-heros__media"
  }, /*#__PURE__*/React.createElement("img", {
    src: photo,
    alt: alt,
    fetchPriority: "high",
    decoding: "sync"
  }), shape && !mobile && /*#__PURE__*/React.createElement("svg", {
    className: "fr-heros__shape",
    viewBox: "496.76 383 258.16 278.69",
    preserveAspectRatio: "xMidYMid meet",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: WIND_SHAPE
  }))));
}
Object.assign(__ds_scope, { HeroSplit });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections/HeroSplit.jsx", error: String((e && e.message) || e) }); }

// components/sections/LeadFormSection.jsx
try { (() => {
/* Lead form section. Full-bleed photograph, headline and lead on the left, the form in a
   white-sand panel on the right. The photo carries no full-frame scrim: one local spruce
   gradient runs 50% to 0 across the left half only, so the right half of the render is
   untouched (§3.4's local-gradient carve-out). Square edges — the section itself is never
   rounded; radius appears only on the panel (6) and the controls (4).
   On mobile the copy moves off the photograph and onto the white-sand ground above the fields.
   The 4:5 crop shows the render's full height, sunlit grass included, and at the 50% ceiling
   the lightest pixels under 18px sea-fog body text measure 2.9:1 — no crop position fixes it
   (seven were tested), so mobile legibility is structural rather than gradient-dependent.
   The option groups are radio groups: one <input type="radio"> per option, visually hidden,
   with the 48px label as the hit target. No icons, no check marks, no asterisks — every field
   is required and that is stated once in type/small under the button. */
const FORMATS = ["Пасивний дохід", "Зростання вартості активу", "Дохід + власний відпочинок", "Хочу отримати консультацію"];
const CHANNELS = ["Telegram", "Viber", "WhatsApp", "Дзвінок"];
function OptionGroup({
  name,
  label,
  options,
  value,
  onChange,
  columns,
  idBase
}) {
  return /*#__PURE__*/React.createElement("fieldset", {
    className: "fr-optgroup",
    "data-columns": columns
  }, /*#__PURE__*/React.createElement("legend", {
    className: "fr-optgroup__label"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "fr-optgroup__grid"
  }, options.map(function (opt, i) {
    const id = idBase + "-" + name + "-" + i;
    return /*#__PURE__*/React.createElement("label", {
      className: "fr-opt",
      key: opt,
      htmlFor: id,
      "data-selected": value === opt
    }, /*#__PURE__*/React.createElement("input", {
      className: "fr-opt__input",
      type: "radio",
      id: id,
      name: idBase + "-" + name,
      value: opt,
      checked: value === opt,
      onChange: function () {
        onChange(opt);
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "fr-opt__text"
    }, opt));
  })));
}
function maskPhone(raw) {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("380")) d = d.slice(3);else if (d.startsWith("0")) d = d.slice(1);
  d = d.slice(0, 9);
  if (!d) return "";
  const parts = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean);
  return "+380 " + parts.join(" ");
}
function LeadFormSection({
  title = "Оберіть свій актив у FORREST",
  lead = "Отримайте персональну фінансову модель з актуальними апартаментами, вартістю, умовами оплати, прогнозованим доходом та строком окупності.",
  formats = FORMATS,
  channels = CHANNELS,
  submitLabel = "Отримати фінансову модель",
  photo = "assets/photos/sun-carpathian-slope.jpg",
  alt = "Схили Карпат над курортом FORREST Trinity Resort",
  privacyHref = "#privacy",
  onSubmit,
  sent: sentProp,
  mobile = false,
  className = ""
}) {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [format, setFormat] = React.useState("");
  const [channel, setChannel] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [sentState, setSentState] = React.useState(false);
  const sent = sentProp === undefined ? sentState : sentProp;
  /* Ids are seeded per instance: several of these sections can sit on one page (card
     specimens, desktop + mobile side by side), and a content-derived id would make every
     label point at the first instance's control. */
  const uid = React.useId().replace(/:/g, "");
  function submit(e) {
    e.preventDefault();
    const next = {};
    if (!name.trim()) next.name = "Вкажіть імʼя";
    if (phone.replace(/\D/g, "").length < 12) next.phone = "Вкажіть номер у форматі +380";
    if (!format) next.format = "Оберіть формат інвестиції";
    if (!channel) next.channel = "Оберіть спосіб звʼязку";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSentState(true);
    if (onSubmit) onSubmit({
      name: name,
      phone: phone,
      format: format,
      channel: channel
    });
  }
  const panel = sent ? /*#__PURE__*/React.createElement("div", {
    className: "fr-leadform__panel fr-leadform__panel--sent"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "fr-leadform__thanks"
  }, "\u0414\u044F\u043A\u0443\u0454\u043C\u043E. \u041C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u0437\u0432\u02BC\u044F\u0436\u0435\u0442\u044C\u0441\u044F \u0437 \u0432\u0430\u043C\u0438 \u043F\u0440\u043E\u0442\u044F\u0433\u043E\u043C \u0440\u043E\u0431\u043E\u0447\u043E\u0433\u043E \u0434\u043D\u044F"), /*#__PURE__*/React.createElement("p", {
    className: "fr-leadform__thankstext"
  }, "\u0424\u0456\u043D\u0430\u043D\u0441\u043E\u0432\u0443 \u043C\u043E\u0434\u0435\u043B\u044C \u043D\u0430\u0434\u0456\u0448\u043B\u0435\u043C\u043E \u0442\u0438\u043C \u043A\u0430\u043D\u0430\u043B\u043E\u043C, \u044F\u043A\u0438\u0439 \u0432\u0438 \u043E\u0431\u0440\u0430\u043B\u0438. \u0423 \u043D\u0456\u0439 \u0431\u0443\u0434\u0443\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0456 \u0430\u043F\u0430\u0440\u0442\u0430\u043C\u0435\u043D\u0442\u0438, \u0432\u0430\u0440\u0442\u0456\u0441\u0442\u044C, \u0443\u043C\u043E\u0432\u0438 \u043E\u043F\u043B\u0430\u0442\u0438 \u0442\u0430 \u0440\u043E\u0437\u0440\u0430\u0445\u0443\u043D\u043E\u043A \u043E\u043A\u0443\u043F\u043D\u043E\u0441\u0442\u0456.")) : /*#__PURE__*/React.createElement("form", {
    className: "fr-leadform__panel",
    onSubmit: submit,
    noValidate: true
  }, /*#__PURE__*/React.createElement(__ds_scope.Input, {
    id: uid + "-name",
    name: "name",
    label: "\u0412\u0430\u0448\u0435 \u0456\u043C\u02BC\u044F",
    placeholder: "\u0410\u043D\u0434\u0440\u0456\u0439",
    value: name,
    onChange: function (e) {
      setName(e.target.value);
    },
    error: errors.name
  }), /*#__PURE__*/React.createElement(__ds_scope.Input, {
    id: uid + "-phone",
    name: "phone",
    label: "\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0443",
    type: "tel",
    inputMode: "tel",
    placeholder: "+380 __ ___ __ __",
    value: phone,
    onChange: function (e) {
      setPhone(maskPhone(e.target.value));
    },
    error: errors.phone
  }), /*#__PURE__*/React.createElement("div", {
    className: "fr-leadform__group"
  }, /*#__PURE__*/React.createElement(OptionGroup, {
    name: "format",
    idBase: uid,
    label: "\u042F\u043A\u0438\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0456\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0456\u0457 \u0432\u0430\u0441 \u0446\u0456\u043A\u0430\u0432\u0438\u0442\u044C?",
    options: formats,
    value: format,
    onChange: setFormat,
    columns: mobile ? 1 : 2
  }), errors.format && /*#__PURE__*/React.createElement("span", {
    className: "fr-field__error"
  }, errors.format)), /*#__PURE__*/React.createElement("div", {
    className: "fr-leadform__group"
  }, /*#__PURE__*/React.createElement(OptionGroup, {
    name: "channel",
    idBase: uid,
    label: "\u041A\u0443\u0434\u0438 \u043D\u0430\u0434\u0456\u0441\u043B\u0430\u0442\u0438 \u043C\u0430\u0442\u0435\u0440\u0456\u0430\u043B\u0438?",
    options: channels,
    value: channel,
    onChange: setChannel,
    columns: mobile ? 2 : 4
  }), errors.channel && /*#__PURE__*/React.createElement("span", {
    className: "fr-field__error"
  }, errors.channel)), /*#__PURE__*/React.createElement("div", {
    className: "fr-leadform__submit"
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    type: "submit"
  }, submitLabel)), /*#__PURE__*/React.createElement("p", {
    className: "fr-leadform__note"
  }, "\u0411\u0435\u0437 \u0437\u043E\u0431\u043E\u0432\u02BC\u044F\u0437\u0430\u043D\u044C. \u041C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u0434\u043E\u043F\u043E\u043C\u043E\u0436\u0435 \u043F\u043E\u0440\u0456\u0432\u043D\u044F\u0442\u0438 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0456 \u0444\u043E\u0440\u043C\u0430\u0442\u0438 \u0430\u043F\u0430\u0440\u0442\u0430\u043C\u0435\u043D\u0442\u0456\u0432."), /*#__PURE__*/React.createElement("p", {
    className: "fr-leadform__note fr-leadform__note--tight"
  }, "\u0423\u0441\u0456 \u043F\u043E\u043B\u044F \u043E\u0431\u043E\u0432\u02BC\u044F\u0437\u043A\u043E\u0432\u0456. \u041D\u0430\u0434\u0441\u0438\u043B\u0430\u044E\u0447\u0438 \u0444\u043E\u0440\u043C\u0443, \u0432\u0438 \u043F\u043E\u0433\u043E\u0434\u0436\u0443\u0454\u0442\u0435\u0441\u044C \u0437 ", /*#__PURE__*/React.createElement("a", {
    href: privacyHref
  }, "\u043F\u043E\u043B\u0456\u0442\u0438\u043A\u043E\u044E \u043A\u043E\u043D\u0444\u0456\u0434\u0435\u043D\u0446\u0456\u0439\u043D\u043E\u0441\u0442\u0456"), "."));
  return /*#__PURE__*/React.createElement("section", {
    className: ["fr-leadform", mobile ? "fr-leadform--mobile" : "", className].filter(Boolean).join(" "),
    "data-viewport": mobile ? "mobile" : undefined,
    "aria-label": title
  }, /*#__PURE__*/React.createElement("div", {
    className: "fr-leadform__media"
  }, /*#__PURE__*/React.createElement("img", {
    src: photo,
    alt: alt
  }), !mobile && /*#__PURE__*/React.createElement("div", {
    className: "fr-leadform__wash",
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("div", {
    className: "fr-leadform__inner"
  }, !mobile && /*#__PURE__*/React.createElement("div", {
    className: "fr-leadform__copy"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "fr-leadform__title"
  }, title), /*#__PURE__*/React.createElement("p", {
    className: "fr-leadform__lead"
  }, lead)), mobile && !sent && /*#__PURE__*/React.createElement("div", {
    className: "fr-leadform__copy"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "fr-leadform__title"
  }, title), /*#__PURE__*/React.createElement("p", {
    className: "fr-leadform__lead"
  }, lead)), panel));
}
Object.assign(__ds_scope, { LeadFormSection });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections/LeadFormSection.jsx", error: String((e && e.message) || e) }); }

// components/sections/SiteFooter.jsx
try { (() => {
/* Landing footer. Spruce ground, white-sand ink, three tiers divided by border-on-inverse:
   1) four navigation columns, the last carrying the phone in type/h3 and the social links
      as words, not icons;
   2) the FORREST wordmark SVG stretched across the 1280 container, 64px above and below —
      the brand-book vector, never type set in Unbounded;
   3) copyright left, legal links right, all type/small on text-on-inverse-2. */
const DEFAULT_COLUMNS = [{
  title: "Проєкт",
  items: ["Про комплекс", "Планування", "Локація", "Етапи будівництва"]
}, {
  title: "Черги",
  worlds: ["WIND", "ROCK", "SUN"]
}, {
  title: "Забудовник",
  items: ["Про компанію", "Реалізовані проєкти", "Партнери", "Документи"]
}];
function SiteFooter({
  columns = DEFAULT_COLUMNS,
  contactTitle = "Контакти",
  phone = "+380 (777) 999-999",
  email = "invest@forrest.ua",
  socials = ["Instagram", "Facebook", "Telegram"],
  copyright = "© 2026 FORREST Trinity Resort",
  legal = [{
    label: "Політика конфіденційності",
    href: "#"
  }, {
    label: "Умови використання",
    href: "#"
  }],
  mobile = false,
  assetBase = "assets",
  className = ""
}) {
  const [open, setOpen] = React.useState(null);
  const tel = "tel:" + String(phone).replace(/[^+\d]/g, "");
  const wordmark = "url(" + assetBase + "/logo-forrest.svg)";
  const contactCol = /*#__PURE__*/React.createElement("div", {
    className: "fr-sfooter__col",
    key: "contacts"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "fr-sfooter__coltitle"
  }, contactTitle), /*#__PURE__*/React.createElement("a", {
    className: "fr-sfooter__phone",
    href: tel
  }, phone), /*#__PURE__*/React.createElement("ul", {
    className: "fr-sfooter__list"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    className: "fr-sfooter__link",
    href: "mailto:" + email
  }, email)), socials.map(function (s) {
    return /*#__PURE__*/React.createElement("li", {
      key: s
    }, /*#__PURE__*/React.createElement("a", {
      className: "fr-sfooter__link",
      href: "#"
    }, s));
  })));
  function renderBody(col) {
    return /*#__PURE__*/React.createElement("ul", {
      className: "fr-sfooter__list"
    }, (col.worlds || []).map(function (w) {
      return /*#__PURE__*/React.createElement("li", {
        key: w
      }, /*#__PURE__*/React.createElement("a", {
        className: "fr-sfooter__world",
        href: "#" + w.toLowerCase()
      }, w));
    }), (col.items || []).map(function (it) {
      const item = typeof it === "string" ? {
        label: it,
        href: "#"
      } : it;
      return /*#__PURE__*/React.createElement("li", {
        key: item.label
      }, /*#__PURE__*/React.createElement("a", {
        className: "fr-sfooter__link",
        href: item.href
      }, item.label));
    }));
  }
  const cols = columns.concat([{
    title: contactTitle,
    contact: true
  }]);
  return /*#__PURE__*/React.createElement("footer", {
    className: ["fr-sfooter", mobile ? "fr-sfooter--mobile" : "", className].filter(Boolean).join(" "),
    "data-viewport": mobile ? "mobile" : undefined
  }, /*#__PURE__*/React.createElement("div", {
    className: "fr-sfooter__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fr-sfooter__nav"
  }, cols.map(function (col, i) {
    if (col.contact && !mobile) return contactCol;
    if (!mobile) {
      return /*#__PURE__*/React.createElement("div", {
        className: "fr-sfooter__col",
        key: col.title
      }, /*#__PURE__*/React.createElement("h2", {
        className: "fr-sfooter__coltitle"
      }, col.title), renderBody(col));
    }
    const isOpen = open === i;
    return /*#__PURE__*/React.createElement("div", {
      className: "fr-sfooter__col",
      "data-open": isOpen,
      key: col.title
    }, /*#__PURE__*/React.createElement("button", {
      className: "fr-sfooter__acc",
      "aria-expanded": isOpen,
      onClick: function () {
        setOpen(isOpen ? null : i);
      }
    }, /*#__PURE__*/React.createElement("span", null, col.title), /*#__PURE__*/React.createElement("span", {
      className: "fr-sfooter__acc-chev"
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "chevron-down",
      size: 20
    }))), isOpen && (col.contact ? /*#__PURE__*/React.createElement("ul", {
      className: "fr-sfooter__list"
    }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
      className: "fr-sfooter__phone",
      href: tel
    }, phone)), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
      className: "fr-sfooter__link",
      href: "mailto:" + email
    }, email)), socials.map(function (s) {
      return /*#__PURE__*/React.createElement("li", {
        key: s
      }, /*#__PURE__*/React.createElement("a", {
        className: "fr-sfooter__link",
        href: "#"
      }, s));
    })) : renderBody(col)));
  })), /*#__PURE__*/React.createElement("div", {
    className: "fr-sfooter__wordmark"
  }, /*#__PURE__*/React.createElement("span", {
    role: "img",
    "aria-label": "FORREST",
    style: {
      maskImage: wordmark,
      WebkitMaskImage: wordmark
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "fr-sfooter__legal"
  }, /*#__PURE__*/React.createElement("span", null, copyright), /*#__PURE__*/React.createElement("span", {
    className: "fr-sfooter__legalgroup"
  }, legal.map(function (l) {
    return /*#__PURE__*/React.createElement("a", {
      href: l.href,
      key: l.label
    }, l.label);
  })))));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// components/sections/SiteHeader.jsx
try { (() => {
/* Landing header. Three zones on the 12-column grid: logo (cols 1-3), navigation
   (cols 5-8, centred), phone + secondary button (cols 9-12, right). Transparent over the
   hero render at 96px; on scroll it turns air, every element turns spruce, a hairline
   appears and the height drops to 72px. Mobile: logo + phone + burger, and a full-screen
   spruce menu with the worlds in type/h3 and the remaining items in type/body.
   surface="sand" is the split-hero case (Hero B): the bar is white-sand with a hairline and
   spruce elements from the start, so it can cross a white-sand panel and a render at once.
   Logo width follows the brand-book clear space (the height of the mark on all sides):
   160px inside the 96px bar, 120px inside the 72px scrolled and mobile bars. */
const WORLDS = ["WIND", "ROCK", "SUN"];
function SiteHeader({
  nav = "worlds",
  worlds = WORLDS,
  sections = ["Черги", "Умови придбання", "Новини", "Хід будівництва", "Контакти"],
  active,
  phone = "+380 67 000 00 00",
  cta = "Забронювати огляд",
  onCta,
  scrolled: scrolledProp,
  surface = "auto",
  mobile = false,
  assetBase = "assets",
  className = ""
}) {
  const [scrolledState, setScrolledState] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  React.useEffect(function () {
    if (scrolledProp !== undefined) return undefined;
    const onScroll = function () {
      setScrolledState(window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    onScroll();
    return function () {
      window.removeEventListener("scroll", onScroll);
    };
  }, [scrolledProp]);
  const scrolled = scrolledProp === undefined ? scrolledState : scrolledProp;
  const sand = surface === "sand";
  const items = nav === "worlds" ? worlds : sections;
  const itemClass = nav === "worlds" ? "fr-header__world" : "fr-header__link";
  const tel = "tel:" + String(phone).replace(/[^+\d]/g, "");
  const logoColor = scrolled || sand ? "var(--spruce)" : "var(--white-sand)";
  if (mobile) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
      className: ["fr-header", "fr-header--mobile", className].filter(Boolean).join(" "),
      "data-scrolled": scrolled,
      "data-surface": sand ? "sand" : undefined
    }, /*#__PURE__*/React.createElement("div", {
      className: "fr-header__bar"
    }, /*#__PURE__*/React.createElement("a", {
      href: "#top",
      "aria-label": "FORREST Trinity Resort",
      style: {
        display: "flex"
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
      variant: "primary",
      width: 120,
      assetBase: assetBase,
      color: logoColor
    })), /*#__PURE__*/React.createElement("a", {
      className: "fr-header__phone",
      href: tel,
      style: {
        marginLeft: "auto"
      },
      "aria-label": "Телефон " + phone
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "phone",
      size: 20
    })), /*#__PURE__*/React.createElement("button", {
      className: "fr-header__burger",
      "aria-label": "\u041C\u0435\u043D\u044E",
      "aria-expanded": menu,
      onClick: function () {
        setMenu(true);
      },
      style: {
        margin: 0
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "menu",
      size: 24
    })))), menu && /*#__PURE__*/React.createElement("div", {
      className: "fr-menu",
      "data-viewport": "mobile",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "\u041C\u0435\u043D\u044E"
    }, /*#__PURE__*/React.createElement("div", {
      className: "fr-menu__top"
    }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
      variant: "primary",
      width: 120,
      assetBase: assetBase,
      color: "var(--white-sand)"
    }), /*#__PURE__*/React.createElement("button", {
      className: "fr-menu__close",
      "aria-label": "\u0417\u0430\u043A\u0440\u0438\u0442\u0438",
      onClick: function () {
        setMenu(false);
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "x",
      size: 24
    }))), /*#__PURE__*/React.createElement("nav", {
      className: "fr-menu__worlds",
      "aria-label": "\u0421\u0432\u0456\u0442\u0438"
    }, worlds.map(function (w) {
      return /*#__PURE__*/React.createElement("a", {
        className: "fr-menu__world",
        href: "#" + w.toLowerCase(),
        key: w,
        onClick: function () {
          setMenu(false);
        }
      }, w);
    })), /*#__PURE__*/React.createElement("nav", {
      className: "fr-menu__items",
      "aria-label": "\u0420\u043E\u0437\u0434\u0456\u043B\u0438"
    }, sections.map(function (s) {
      return /*#__PURE__*/React.createElement("a", {
        className: "fr-menu__item",
        href: "#",
        key: s,
        onClick: function () {
          setMenu(false);
        }
      }, s);
    })), /*#__PURE__*/React.createElement("div", {
      className: "fr-menu__foot"
    }, /*#__PURE__*/React.createElement("a", {
      className: "fr-menu__world",
      href: tel,
      style: {
        textTransform: "none",
        fontFamily: "var(--font-text)",
        fontWeight: 600
      }
    }, phone), cta && /*#__PURE__*/React.createElement(__ds_scope.Button, {
      variant: "secondary",
      onInverse: true,
      onClick: onCta
    }, cta))));
  }
  return /*#__PURE__*/React.createElement("header", {
    className: ["fr-header", className].filter(Boolean).join(" "),
    "data-scrolled": scrolled,
    "data-surface": sand ? "sand" : undefined
  }, /*#__PURE__*/React.createElement("div", {
    className: "fr-header__grid"
  }, /*#__PURE__*/React.createElement("a", {
    className: "fr-header__logo",
    href: "#top",
    "aria-label": "FORREST Trinity Resort"
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    variant: "primary",
    width: scrolled || sand ? 120 : 160,
    assetBase: assetBase,
    color: logoColor
  })), /*#__PURE__*/React.createElement("nav", {
    className: "fr-header__center",
    "aria-label": nav === "worlds" ? "Світи" : "Розділи"
  }, items.map(function (item) {
    return /*#__PURE__*/React.createElement("a", {
      className: itemClass,
      href: nav === "worlds" ? "#" + item.toLowerCase() : "#",
      key: item,
      "aria-current": active === item ? "page" : undefined
    }, item);
  })), /*#__PURE__*/React.createElement("div", {
    className: "fr-header__right"
  }, /*#__PURE__*/React.createElement("a", {
    className: "fr-header__phone",
    href: tel
  }, phone), cta && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    onInverse: !scrolled && !sand,
    onClick: onCta
  }, cta))));
}
Object.assign(__ds_scope, { SiteHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// components/sections/StatsRow.jsx
try { (() => {
/* "FORREST у цифрах." — final structure. A two-line, two-colour type/h2 (§4.2), optionally
   with a primary button on the first line's baseline, then one row of four numbers whose
   columns are sized by content, not equal. Number in Unbounded type/stat-lg spruce (72
   desktop / 48 mobile); "від" / "до" and the units in Mulish type/h4 spruce on the same
   baseline; caption in type/body spruce 16px below. All four numbers share one baseline and
   all captions start at one height. Mobile puts one value per row — see components.css.
   No green: air ground, spruce numbers, qualifiers and captions, and stone for the whole
   second title line including its accent phrase. Secondary text separates by size and weight,
   not colour. No lines, shapes, patterns or shadows. */
const ROW = [{
  prefix: "від",
  num: "9 000",
  unit: "$",
  caption: "доходу на рік"
}, {
  prefix: "до",
  num: "12",
  unit: "%",
  caption: "річних"
}, {
  prefix: "до",
  num: "10",
  unit: "років",
  caption: "окупності"
}, {
  num: "27,4–115",
  unit: "м²",
  caption: "діапазон площ"
}];
function StatsRow({
  titleLine1 = "FORREST у цифрах.",
  titleLine2 = "Актив, що примножує капітал.",
  titleLine2Accent = "капітал.",
  items = ROW,
  cta = "Отримати фінансову модель",
  onCta,
  mobile = false,
  className = ""
}) {
  const button = cta ? /*#__PURE__*/React.createElement("div", {
    className: "fr-statsrow__cta"
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    onClick: onCta
  }, cta)) : null;
  const accentAt = titleLine2Accent ? titleLine2.indexOf(titleLine2Accent) : -1;
  return /*#__PURE__*/React.createElement("section", {
    className: ["fr-statsrow", mobile ? "fr-statsrow--mobile" : "", className].filter(Boolean).join(" "),
    "data-viewport": mobile ? "mobile" : undefined,
    "aria-label": titleLine1
  }, /*#__PURE__*/React.createElement("div", {
    className: "fr-statsrow__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fr-statsrow__head"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "type-h2 fr-statsrow__title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "fr-statsrow__line1"
  }, titleLine1), /*#__PURE__*/React.createElement("span", {
    className: "fr-statsrow__line2"
  }, accentAt < 0 ? titleLine2 : /*#__PURE__*/React.createElement(React.Fragment, null, titleLine2.slice(0, accentAt), /*#__PURE__*/React.createElement("span", {
    className: "fr-statsrow__accent"
  }, titleLine2Accent), titleLine2.slice(accentAt + titleLine2Accent.length)))), !mobile && button), /*#__PURE__*/React.createElement("div", {
    className: "fr-statsrow__row"
  }, items.map(function (item, i) {
    return /*#__PURE__*/React.createElement("div", {
      className: "fr-statsrow__item",
      key: i
    }, /*#__PURE__*/React.createElement("span", {
      className: "fr-statsrow__value"
    }, item.prefix && /*#__PURE__*/React.createElement("span", {
      className: "fr-statsrow__qual"
    }, item.prefix), /*#__PURE__*/React.createElement("span", {
      className: "fr-statsrow__num"
    }, item.num), item.unit && /*#__PURE__*/React.createElement("span", {
      className: "fr-statsrow__qual"
    }, item.unit)), /*#__PURE__*/React.createElement("p", {
      className: "fr-statsrow__cap"
    }, item.caption));
  })), mobile && button));
}
Object.assign(__ds_scope, { StatsRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections/StatsRow.jsx", error: String((e && e.message) || e) }); }

// components/sections/StatsSection.jsx
try { (() => {
/* "FORREST у цифрах". Two columns 5 + 7 on air: title and the primary button left, one
   dominant type/stat-hero number and a row of five secondary values right. The secondary
   row is both the indicator and the navigation — clicking an item promotes it and resets
   the timer. §8's single motion exception: 4s rotation, 500ms ease-in-out, 12px travel,
   no digit counting; pauses on hover, focus and tab blur; with prefers-reduced-motion the
   rotation stops and all five values are shown at type/stat in a static grid. */
const STATS = [{
  prefix: "від",
  num: "9 000",
  unit: "$",
  caption: "доходу на рік",
  short: "9 000 $",
  label: "доходу на рік"
}, {
  prefix: "до",
  num: "12",
  unit: "%",
  caption: "річних",
  short: "12%",
  label: "річних"
}, {
  prefix: "до",
  num: "10",
  unit: "років",
  caption: "окупності",
  short: "10 років",
  label: "окупності"
}, {
  num: "5",
  caption: "форматів апартаментів",
  short: "5",
  label: "форматів апартаментів"
}, {
  num: "27,4–115",
  unit: "м²",
  caption: "діапазон площ",
  short: "27,4–115 м²",
  label: "діапазон площ"
}];
function Value({
  item
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "fr-stats__value"
  }, item.prefix && /*#__PURE__*/React.createElement("span", {
    className: "fr-stats__qual"
  }, item.prefix), /*#__PURE__*/React.createElement("span", {
    className: "fr-stats__num"
  }, item.num), item.unit && /*#__PURE__*/React.createElement("span", {
    className: "fr-stats__qual"
  }, item.unit));
}
function StatsSection({
  title = "FORREST у цифрах",
  items = STATS,
  cta = "Отримати фінансову модель",
  onCta,
  interval = 4000,
  mobile = false,
  className = ""
}) {
  const [index, setIndex] = React.useState(0);
  const [prev, setPrev] = React.useState(null);
  const [paused, setPaused] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(function () {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = function () {
      setReduced(mq.matches);
    };
    sync();
    mq.addEventListener("change", sync);
    return function () {
      mq.removeEventListener("change", sync);
    };
  }, []);
  React.useEffect(function () {
    const onVis = function () {
      setPaused(document.hidden);
    };
    document.addEventListener("visibilitychange", onVis);
    return function () {
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);
  const go = React.useCallback(function (next) {
    setIndex(function (cur) {
      if (next === cur) return cur;
      setPrev(cur);
      return next;
    });
  }, []);
  React.useEffect(function () {
    if (reduced || paused) return undefined;
    const id = window.setInterval(function () {
      setIndex(function (cur) {
        setPrev(cur);
        return (cur + 1) % items.length;
      });
    }, interval);
    return function () {
      window.clearInterval(id);
    };
  }, [reduced, paused, items.length, interval, index]);
  React.useEffect(function () {
    if (prev === null) return undefined;
    const id = window.setTimeout(function () {
      setPrev(null);
    }, 500);
    return function () {
      window.clearTimeout(id);
    };
  }, [prev]);
  const current = items[index];
  return /*#__PURE__*/React.createElement("section", {
    className: ["fr-stats", mobile ? "fr-stats--mobile" : "", className].filter(Boolean).join(" "),
    "data-viewport": mobile ? "mobile" : undefined,
    "aria-label": title
  }, /*#__PURE__*/React.createElement("div", {
    className: "fr-stats__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fr-stats__grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fr-stats__left"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "type-h2 fr-stats__title"
  }, title), cta && /*#__PURE__*/React.createElement("div", {
    className: "fr-stats__cta"
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    onClick: onCta
  }, cta))), /*#__PURE__*/React.createElement("div", {
    className: "fr-stats__right"
  }, reduced ? /*#__PURE__*/React.createElement("div", {
    className: "fr-stats__static"
  }, items.map(function (item, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i
    }, /*#__PURE__*/React.createElement("span", {
      className: "fr-stats__static-value"
    }, item.prefix && /*#__PURE__*/React.createElement("span", {
      className: "fr-stats__qual"
    }, item.prefix), /*#__PURE__*/React.createElement("span", null, item.num), item.unit && /*#__PURE__*/React.createElement("span", {
      className: "fr-stats__qual"
    }, item.unit)), /*#__PURE__*/React.createElement("p", {
      className: "fr-stats__caption"
    }, item.caption));
  })) : /*#__PURE__*/React.createElement("div", {
    className: "fr-stats__hero",
    onMouseEnter: function () {
      setPaused(true);
    },
    onMouseLeave: function () {
      setPaused(document.hidden);
    },
    onFocus: function () {
      setPaused(true);
    },
    onBlur: function () {
      setPaused(document.hidden);
    },
    "aria-live": "polite"
  }, prev !== null && /*#__PURE__*/React.createElement("div", {
    className: "fr-stats__slide fr-stats__slide--out",
    key: "out-" + prev,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement(Value, {
    item: items[prev]
  }), /*#__PURE__*/React.createElement("p", {
    className: "fr-stats__caption"
  }, items[prev].caption)), /*#__PURE__*/React.createElement("div", {
    className: "fr-stats__slide fr-stats__slide--in",
    key: "in-" + index
  }, /*#__PURE__*/React.createElement(Value, {
    item: current
  }), /*#__PURE__*/React.createElement("p", {
    className: "fr-stats__caption"
  }, current.caption))), /*#__PURE__*/React.createElement("div", {
    className: "fr-stats__row",
    "aria-label": title
  }, items.map(function (item, i) {
    const active = !reduced && i === index;
    return /*#__PURE__*/React.createElement("button", {
      className: "fr-stats__item",
      key: i,
      "aria-current": active ? "true" : undefined,
      "aria-pressed": active,
      onClick: function () {
        go(i);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "fr-stats__item-value"
    }, item.short), /*#__PURE__*/React.createElement("span", {
      className: "fr-stats__item-label"
    }, item.label));
  }))))));
}
Object.assign(__ds_scope, { STATS, StatsSection });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections/StatsSection.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Panel.jsx
try { (() => {
/* §7 Panel — replaces the word "card". A surface token background, 32px padding, radius 6,
   no border, no shadow. Panels in one row share height and internal structure. */
function Panel({
  surface = "warm",
  title,
  text,
  children,
  as = "div",
  className = "",
  style
}) {
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, {
    className: ["fr-panel", "fr-panel--" + surface, surface === "inverse" ? "fr-on-inverse" : "", className].filter(Boolean).join(" "),
    style: style
  }, title && /*#__PURE__*/React.createElement("h3", {
    className: "fr-panel__title"
  }, title), text && /*#__PURE__*/React.createElement("p", {
    className: "fr-panel__text"
  }, text), children);
}
Object.assign(__ds_scope, { Panel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Panel.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Stat.jsx
try { (() => {
/* §7 Stat. Number in Unbounded, label in Mulish underneath — never a caption above.
   No boxes: StatGrid separates columns with hairlines. */
function Stat({
  value,
  label,
  className = "",
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ("fr-stat " + className).trim(),
    style: style
  }, /*#__PURE__*/React.createElement("span", {
    className: "fr-stat__value"
  }, value), /*#__PURE__*/React.createElement("span", {
    className: "fr-stat__label"
  }, label));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Stat.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/StatGrid.jsx
try { (() => {
/* §7 Stat layout: four columns on desktop, two on mobile, separated by hairlines. */
function StatGrid({
  children,
  onInverse = false,
  className = "",
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ["fr-stat-grid", onInverse ? "fr-on-inverse" : "", className].filter(Boolean).join(" "),
    style: style
  }, children);
}
Object.assign(__ds_scope, { StatGrid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/StatGrid.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.BrandShape = __ds_scope.BrandShape;

__ds_ns.BRAND_SHAPES = __ds_scope.BRAND_SHAPES;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.ICON_NAMES = __ds_scope.ICON_NAMES;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.PatternBand = __ds_scope.PatternBand;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.PartnerRow = __ds_scope.PartnerRow;

__ds_ns.Quote = __ds_scope.Quote;

__ds_ns.Timeline = __ds_scope.Timeline;

__ds_ns.WorldBlock = __ds_scope.WorldBlock;

__ds_ns.FormSection = __ds_scope.FormSection;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.FooterPhoto = __ds_scope.FooterPhoto;

__ds_ns.Hero = __ds_scope.Hero;

__ds_ns.HeroFramed = __ds_scope.HeroFramed;

__ds_ns.HeroSplit = __ds_scope.HeroSplit;

__ds_ns.LeadFormSection = __ds_scope.LeadFormSection;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

__ds_ns.StatsRow = __ds_scope.StatsRow;

__ds_ns.STATS = __ds_scope.STATS;

__ds_ns.StatsSection = __ds_scope.StatsSection;

__ds_ns.Panel = __ds_scope.Panel;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.StatGrid = __ds_scope.StatGrid;

})();
