import { r as reactExports, j as jsxRuntimeExports, i as cn, o as useProfile } from "./index-DyUgiqXz.js";
import { u as useAppStore, F as FeatureLockOverlay } from "./FeatureLockOverlay-Cel4siiN.js";
import { B as Badge } from "./badge-B8gmF7UY.js";
import { c as createLucideIcon, u as useComposedRefs, T as TrendingUp, B as Button, L as Lightbulb, S as Sparkles, a as Briefcase } from "./trending-up-CtEt7QQ9.js";
import { C as Card, a as CardContent } from "./card-vMn3-AtH.js";
import { I as Input, C as ChevronUp } from "./input-mtr8vhJq.js";
import { P as Primitive, a as Presence, c as createContextScope, b as composeEventHandlers, d as useCallbackRef, e as useLayoutEffect2, u as useSubscription, X } from "./useSubscription-DmQaFjSs.js";
import { u as useDirection, c as clamp } from "./index-DHJ2HlPB.js";
import { G as GraduationCap } from "./graduation-cap-Kw5_MQ5L.js";
import { B as BookOpen } from "./book-open-A_hOYFWO.js";
import { M as MapPin } from "./map-pin-CFDA9vcx.js";
import { C as ChevronDown } from "./chevron-down-BUyuzyY5.js";
import { U as Users } from "./users-C5wpk1Xy.js";
import { S as Star } from "./star-B-dD39_P.js";
import "./lock-CEB4_A0Z.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M6 3h12", key: "ggurg9" }],
  ["path", { d: "M6 8h12", key: "6g4wlu" }],
  ["path", { d: "m6 13 8.5 8", key: "u1kupk" }],
  ["path", { d: "M6 13h3", key: "wdp6ag" }],
  ["path", { d: "M9 13c6.667 0 6.667-10 0-10", key: "1nkvk2" }]
];
const IndianRupee = createLucideIcon("indian-rupee", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function useStateMachine(initialState, machine) {
  return reactExports.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}
var SCROLL_AREA_NAME = "ScrollArea";
var [createScrollAreaContext] = createContextScope(SCROLL_AREA_NAME);
var [ScrollAreaProvider, useScrollAreaContext] = createScrollAreaContext(SCROLL_AREA_NAME);
var ScrollArea$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeScrollArea,
      type = "hover",
      dir,
      scrollHideDelay = 600,
      ...scrollAreaProps
    } = props;
    const [scrollArea, setScrollArea] = reactExports.useState(null);
    const [viewport, setViewport] = reactExports.useState(null);
    const [content, setContent] = reactExports.useState(null);
    const [scrollbarX, setScrollbarX] = reactExports.useState(null);
    const [scrollbarY, setScrollbarY] = reactExports.useState(null);
    const [cornerWidth, setCornerWidth] = reactExports.useState(0);
    const [cornerHeight, setCornerHeight] = reactExports.useState(0);
    const [scrollbarXEnabled, setScrollbarXEnabled] = reactExports.useState(false);
    const [scrollbarYEnabled, setScrollbarYEnabled] = reactExports.useState(false);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setScrollArea(node));
    const direction = useDirection(dir);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaProvider,
      {
        scope: __scopeScrollArea,
        type,
        dir: direction,
        scrollHideDelay,
        scrollArea,
        viewport,
        onViewportChange: setViewport,
        content,
        onContentChange: setContent,
        scrollbarX,
        onScrollbarXChange: setScrollbarX,
        scrollbarXEnabled,
        onScrollbarXEnabledChange: setScrollbarXEnabled,
        scrollbarY,
        onScrollbarYChange: setScrollbarY,
        scrollbarYEnabled,
        onScrollbarYEnabledChange: setScrollbarYEnabled,
        onCornerWidthChange: setCornerWidth,
        onCornerHeightChange: setCornerHeight,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            ...scrollAreaProps,
            ref: composedRefs,
            style: {
              position: "relative",
              // Pass corner sizes as CSS vars to reduce re-renders of context consumers
              ["--radix-scroll-area-corner-width"]: cornerWidth + "px",
              ["--radix-scroll-area-corner-height"]: cornerHeight + "px",
              ...props.style
            }
          }
        )
      }
    );
  }
);
ScrollArea$1.displayName = SCROLL_AREA_NAME;
var VIEWPORT_NAME = "ScrollAreaViewport";
var ScrollAreaViewport = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeScrollArea, children, nonce, ...viewportProps } = props;
    const context = useScrollAreaContext(VIEWPORT_NAME, __scopeScrollArea);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref, context.onViewportChange);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: `[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}`
          },
          nonce
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          "data-radix-scroll-area-viewport": "",
          ...viewportProps,
          ref: composedRefs,
          style: {
            /**
             * We don't support `visible` because the intention is to have at least one scrollbar
             * if this component is used and `visible` will behave like `auto` in that case
             * https://developer.mozilla.org/en-US/docs/Web/CSS/overflow#description
             *
             * We don't handle `auto` because the intention is for the native implementation
             * to be hidden if using this component. We just want to ensure the node is scrollable
             * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
             * the browser from having to work out whether to render native scrollbars or not,
             * we tell it to with the intention of hiding them in CSS.
             */
            overflowX: context.scrollbarXEnabled ? "scroll" : "hidden",
            overflowY: context.scrollbarYEnabled ? "scroll" : "hidden",
            ...props.style
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: context.onContentChange, style: { minWidth: "100%", display: "table" }, children })
        }
      )
    ] });
  }
);
ScrollAreaViewport.displayName = VIEWPORT_NAME;
var SCROLLBAR_NAME = "ScrollAreaScrollbar";
var ScrollAreaScrollbar = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...scrollbarProps } = props;
    const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
    const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = context;
    const isHorizontal = props.orientation === "horizontal";
    reactExports.useEffect(() => {
      isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true);
      return () => {
        isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false);
      };
    }, [isHorizontal, onScrollbarXEnabledChange, onScrollbarYEnabledChange]);
    return context.type === "hover" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarHover, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "scroll" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarScroll, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "auto" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarAuto, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "always" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarVisible, { ...scrollbarProps, ref: forwardedRef }) : null;
  }
);
ScrollAreaScrollbar.displayName = SCROLLBAR_NAME;
var ScrollAreaScrollbarHover = reactExports.forwardRef((props, forwardedRef) => {
  const { forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const scrollArea = context.scrollArea;
    let hideTimer = 0;
    if (scrollArea) {
      const handlePointerEnter = () => {
        window.clearTimeout(hideTimer);
        setVisible(true);
      };
      const handlePointerLeave = () => {
        hideTimer = window.setTimeout(() => setVisible(false), context.scrollHideDelay);
      };
      scrollArea.addEventListener("pointerenter", handlePointerEnter);
      scrollArea.addEventListener("pointerleave", handlePointerLeave);
      return () => {
        window.clearTimeout(hideTimer);
        scrollArea.removeEventListener("pointerenter", handlePointerEnter);
        scrollArea.removeEventListener("pointerleave", handlePointerLeave);
      };
    }
  }, [context.scrollArea, context.scrollHideDelay]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || visible, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarAuto,
    {
      "data-state": visible ? "visible" : "hidden",
      ...scrollbarProps,
      ref: forwardedRef
    }
  ) });
});
var ScrollAreaScrollbarScroll = reactExports.forwardRef((props, forwardedRef) => {
  const { forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const isHorizontal = props.orientation === "horizontal";
  const debounceScrollEnd = useDebounceCallback(() => send("SCROLL_END"), 100);
  const [state, send] = useStateMachine("hidden", {
    hidden: {
      SCROLL: "scrolling"
    },
    scrolling: {
      SCROLL_END: "idle",
      POINTER_ENTER: "interacting"
    },
    interacting: {
      SCROLL: "interacting",
      POINTER_LEAVE: "idle"
    },
    idle: {
      HIDE: "hidden",
      SCROLL: "scrolling",
      POINTER_ENTER: "interacting"
    }
  });
  reactExports.useEffect(() => {
    if (state === "idle") {
      const hideTimer = window.setTimeout(() => send("HIDE"), context.scrollHideDelay);
      return () => window.clearTimeout(hideTimer);
    }
  }, [state, context.scrollHideDelay, send]);
  reactExports.useEffect(() => {
    const viewport = context.viewport;
    const scrollDirection = isHorizontal ? "scrollLeft" : "scrollTop";
    if (viewport) {
      let prevScrollPos = viewport[scrollDirection];
      const handleScroll = () => {
        const scrollPos = viewport[scrollDirection];
        const hasScrollInDirectionChanged = prevScrollPos !== scrollPos;
        if (hasScrollInDirectionChanged) {
          send("SCROLL");
          debounceScrollEnd();
        }
        prevScrollPos = scrollPos;
      };
      viewport.addEventListener("scroll", handleScroll);
      return () => viewport.removeEventListener("scroll", handleScroll);
    }
  }, [context.viewport, isHorizontal, send, debounceScrollEnd]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || state !== "hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarVisible,
    {
      "data-state": state === "hidden" ? "hidden" : "visible",
      ...scrollbarProps,
      ref: forwardedRef,
      onPointerEnter: composeEventHandlers(props.onPointerEnter, () => send("POINTER_ENTER")),
      onPointerLeave: composeEventHandlers(props.onPointerLeave, () => send("POINTER_LEAVE"))
    }
  ) });
});
var ScrollAreaScrollbarAuto = reactExports.forwardRef((props, forwardedRef) => {
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const { forceMount, ...scrollbarProps } = props;
  const [visible, setVisible] = reactExports.useState(false);
  const isHorizontal = props.orientation === "horizontal";
  const handleResize = useDebounceCallback(() => {
    if (context.viewport) {
      const isOverflowX = context.viewport.offsetWidth < context.viewport.scrollWidth;
      const isOverflowY = context.viewport.offsetHeight < context.viewport.scrollHeight;
      setVisible(isHorizontal ? isOverflowX : isOverflowY);
    }
  }, 10);
  useResizeObserver(context.viewport, handleResize);
  useResizeObserver(context.content, handleResize);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || visible, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarVisible,
    {
      "data-state": visible ? "visible" : "hidden",
      ...scrollbarProps,
      ref: forwardedRef
    }
  ) });
});
var ScrollAreaScrollbarVisible = reactExports.forwardRef((props, forwardedRef) => {
  const { orientation = "vertical", ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const thumbRef = reactExports.useRef(null);
  const pointerOffsetRef = reactExports.useRef(0);
  const [sizes, setSizes] = reactExports.useState({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  });
  const thumbRatio = getThumbRatio(sizes.viewport, sizes.content);
  const commonProps = {
    ...scrollbarProps,
    sizes,
    onSizesChange: setSizes,
    hasThumb: Boolean(thumbRatio > 0 && thumbRatio < 1),
    onThumbChange: (thumb) => thumbRef.current = thumb,
    onThumbPointerUp: () => pointerOffsetRef.current = 0,
    onThumbPointerDown: (pointerPos) => pointerOffsetRef.current = pointerPos
  };
  function getScrollPosition(pointerPos, dir) {
    return getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes, dir);
  }
  if (orientation === "horizontal") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaScrollbarX,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollLeft;
            const offset = getThumbOffsetFromScroll(scrollPos, sizes, context.dir);
            thumbRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport) context.viewport.scrollLeft = scrollPos;
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport) {
            context.viewport.scrollLeft = getScrollPosition(pointerPos, context.dir);
          }
        }
      }
    );
  }
  if (orientation === "vertical") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaScrollbarY,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollTop;
            const offset = getThumbOffsetFromScroll(scrollPos, sizes);
            thumbRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport) context.viewport.scrollTop = scrollPos;
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport) context.viewport.scrollTop = getScrollPosition(pointerPos);
        }
      }
    );
  }
  return null;
});
var ScrollAreaScrollbarX = reactExports.forwardRef((props, forwardedRef) => {
  const { sizes, onSizesChange, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [computedStyle, setComputedStyle] = reactExports.useState();
  const ref = reactExports.useRef(null);
  const composeRefs = useComposedRefs(forwardedRef, ref, context.onScrollbarXChange);
  reactExports.useEffect(() => {
    if (ref.current) setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarImpl,
    {
      "data-orientation": "horizontal",
      ...scrollbarProps,
      ref: composeRefs,
      sizes,
      style: {
        bottom: 0,
        left: context.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: context.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        ["--radix-scroll-area-thumb-width"]: getThumbSize(sizes) + "px",
        ...props.style
      },
      onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.x),
      onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.x),
      onWheelScroll: (event, maxScrollPos) => {
        if (context.viewport) {
          const scrollPos = context.viewport.scrollLeft + event.deltaX;
          props.onWheelScroll(scrollPos);
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      },
      onResize: () => {
        if (ref.current && context.viewport && computedStyle) {
          onSizesChange({
            content: context.viewport.scrollWidth,
            viewport: context.viewport.offsetWidth,
            scrollbar: {
              size: ref.current.clientWidth,
              paddingStart: toInt(computedStyle.paddingLeft),
              paddingEnd: toInt(computedStyle.paddingRight)
            }
          });
        }
      }
    }
  );
});
var ScrollAreaScrollbarY = reactExports.forwardRef((props, forwardedRef) => {
  const { sizes, onSizesChange, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [computedStyle, setComputedStyle] = reactExports.useState();
  const ref = reactExports.useRef(null);
  const composeRefs = useComposedRefs(forwardedRef, ref, context.onScrollbarYChange);
  reactExports.useEffect(() => {
    if (ref.current) setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarImpl,
    {
      "data-orientation": "vertical",
      ...scrollbarProps,
      ref: composeRefs,
      sizes,
      style: {
        top: 0,
        right: context.dir === "ltr" ? 0 : void 0,
        left: context.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        ["--radix-scroll-area-thumb-height"]: getThumbSize(sizes) + "px",
        ...props.style
      },
      onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.y),
      onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.y),
      onWheelScroll: (event, maxScrollPos) => {
        if (context.viewport) {
          const scrollPos = context.viewport.scrollTop + event.deltaY;
          props.onWheelScroll(scrollPos);
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      },
      onResize: () => {
        if (ref.current && context.viewport && computedStyle) {
          onSizesChange({
            content: context.viewport.scrollHeight,
            viewport: context.viewport.offsetHeight,
            scrollbar: {
              size: ref.current.clientHeight,
              paddingStart: toInt(computedStyle.paddingTop),
              paddingEnd: toInt(computedStyle.paddingBottom)
            }
          });
        }
      }
    }
  );
});
var [ScrollbarProvider, useScrollbarContext] = createScrollAreaContext(SCROLLBAR_NAME);
var ScrollAreaScrollbarImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeScrollArea,
    sizes,
    hasThumb,
    onThumbChange,
    onThumbPointerUp,
    onThumbPointerDown,
    onThumbPositionChange,
    onDragScroll,
    onWheelScroll,
    onResize,
    ...scrollbarProps
  } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, __scopeScrollArea);
  const [scrollbar, setScrollbar] = reactExports.useState(null);
  const composeRefs = useComposedRefs(forwardedRef, (node) => setScrollbar(node));
  const rectRef = reactExports.useRef(null);
  const prevWebkitUserSelectRef = reactExports.useRef("");
  const viewport = context.viewport;
  const maxScrollPos = sizes.content - sizes.viewport;
  const handleWheelScroll = useCallbackRef(onWheelScroll);
  const handleThumbPositionChange = useCallbackRef(onThumbPositionChange);
  const handleResize = useDebounceCallback(onResize, 10);
  function handleDragScroll(event) {
    if (rectRef.current) {
      const x = event.clientX - rectRef.current.left;
      const y = event.clientY - rectRef.current.top;
      onDragScroll({ x, y });
    }
  }
  reactExports.useEffect(() => {
    const handleWheel = (event) => {
      const element = event.target;
      const isScrollbarWheel = scrollbar == null ? void 0 : scrollbar.contains(element);
      if (isScrollbarWheel) handleWheelScroll(event, maxScrollPos);
    };
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => document.removeEventListener("wheel", handleWheel, { passive: false });
  }, [viewport, scrollbar, maxScrollPos, handleWheelScroll]);
  reactExports.useEffect(handleThumbPositionChange, [sizes, handleThumbPositionChange]);
  useResizeObserver(scrollbar, handleResize);
  useResizeObserver(context.content, handleResize);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollbarProvider,
    {
      scope: __scopeScrollArea,
      scrollbar,
      hasThumb,
      onThumbChange: useCallbackRef(onThumbChange),
      onThumbPointerUp: useCallbackRef(onThumbPointerUp),
      onThumbPositionChange: handleThumbPositionChange,
      onThumbPointerDown: useCallbackRef(onThumbPointerDown),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          ...scrollbarProps,
          ref: composeRefs,
          style: { position: "absolute", ...scrollbarProps.style },
          onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
            const mainPointer = 0;
            if (event.button === mainPointer) {
              const element = event.target;
              element.setPointerCapture(event.pointerId);
              rectRef.current = scrollbar.getBoundingClientRect();
              prevWebkitUserSelectRef.current = document.body.style.webkitUserSelect;
              document.body.style.webkitUserSelect = "none";
              if (context.viewport) context.viewport.style.scrollBehavior = "auto";
              handleDragScroll(event);
            }
          }),
          onPointerMove: composeEventHandlers(props.onPointerMove, handleDragScroll),
          onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
            const element = event.target;
            if (element.hasPointerCapture(event.pointerId)) {
              element.releasePointerCapture(event.pointerId);
            }
            document.body.style.webkitUserSelect = prevWebkitUserSelectRef.current;
            if (context.viewport) context.viewport.style.scrollBehavior = "";
            rectRef.current = null;
          })
        }
      )
    }
  );
});
var THUMB_NAME = "ScrollAreaThumb";
var ScrollAreaThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...thumbProps } = props;
    const scrollbarContext = useScrollbarContext(THUMB_NAME, props.__scopeScrollArea);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || scrollbarContext.hasThumb, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaThumbImpl, { ref: forwardedRef, ...thumbProps }) });
  }
);
var ScrollAreaThumbImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeScrollArea, style, ...thumbProps } = props;
    const scrollAreaContext = useScrollAreaContext(THUMB_NAME, __scopeScrollArea);
    const scrollbarContext = useScrollbarContext(THUMB_NAME, __scopeScrollArea);
    const { onThumbPositionChange } = scrollbarContext;
    const composedRef = useComposedRefs(
      forwardedRef,
      (node) => scrollbarContext.onThumbChange(node)
    );
    const removeUnlinkedScrollListenerRef = reactExports.useRef(void 0);
    const debounceScrollEnd = useDebounceCallback(() => {
      if (removeUnlinkedScrollListenerRef.current) {
        removeUnlinkedScrollListenerRef.current();
        removeUnlinkedScrollListenerRef.current = void 0;
      }
    }, 100);
    reactExports.useEffect(() => {
      const viewport = scrollAreaContext.viewport;
      if (viewport) {
        const handleScroll = () => {
          debounceScrollEnd();
          if (!removeUnlinkedScrollListenerRef.current) {
            const listener = addUnlinkedScrollListener(viewport, onThumbPositionChange);
            removeUnlinkedScrollListenerRef.current = listener;
            onThumbPositionChange();
          }
        };
        onThumbPositionChange();
        viewport.addEventListener("scroll", handleScroll);
        return () => viewport.removeEventListener("scroll", handleScroll);
      }
    }, [scrollAreaContext.viewport, debounceScrollEnd, onThumbPositionChange]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": scrollbarContext.hasThumb ? "visible" : "hidden",
        ...thumbProps,
        ref: composedRef,
        style: {
          width: "var(--radix-scroll-area-thumb-width)",
          height: "var(--radix-scroll-area-thumb-height)",
          ...style
        },
        onPointerDownCapture: composeEventHandlers(props.onPointerDownCapture, (event) => {
          const thumb = event.target;
          const thumbRect = thumb.getBoundingClientRect();
          const x = event.clientX - thumbRect.left;
          const y = event.clientY - thumbRect.top;
          scrollbarContext.onThumbPointerDown({ x, y });
        }),
        onPointerUp: composeEventHandlers(props.onPointerUp, scrollbarContext.onThumbPointerUp)
      }
    );
  }
);
ScrollAreaThumb.displayName = THUMB_NAME;
var CORNER_NAME = "ScrollAreaCorner";
var ScrollAreaCorner = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useScrollAreaContext(CORNER_NAME, props.__scopeScrollArea);
    const hasBothScrollbarsVisible = Boolean(context.scrollbarX && context.scrollbarY);
    const hasCorner = context.type !== "scroll" && hasBothScrollbarsVisible;
    return hasCorner ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaCornerImpl, { ...props, ref: forwardedRef }) : null;
  }
);
ScrollAreaCorner.displayName = CORNER_NAME;
var ScrollAreaCornerImpl = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeScrollArea, ...cornerProps } = props;
  const context = useScrollAreaContext(CORNER_NAME, __scopeScrollArea);
  const [width, setWidth] = reactExports.useState(0);
  const [height, setHeight] = reactExports.useState(0);
  const hasSize = Boolean(width && height);
  useResizeObserver(context.scrollbarX, () => {
    var _a;
    const height2 = ((_a = context.scrollbarX) == null ? void 0 : _a.offsetHeight) || 0;
    context.onCornerHeightChange(height2);
    setHeight(height2);
  });
  useResizeObserver(context.scrollbarY, () => {
    var _a;
    const width2 = ((_a = context.scrollbarY) == null ? void 0 : _a.offsetWidth) || 0;
    context.onCornerWidthChange(width2);
    setWidth(width2);
  });
  return hasSize ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      ...cornerProps,
      ref: forwardedRef,
      style: {
        width,
        height,
        position: "absolute",
        right: context.dir === "ltr" ? 0 : void 0,
        left: context.dir === "rtl" ? 0 : void 0,
        bottom: 0,
        ...props.style
      }
    }
  ) : null;
});
function toInt(value) {
  return value ? parseInt(value, 10) : 0;
}
function getThumbRatio(viewportSize, contentSize) {
  const ratio = viewportSize / contentSize;
  return isNaN(ratio) ? 0 : ratio;
}
function getThumbSize(sizes) {
  const ratio = getThumbRatio(sizes.viewport, sizes.content);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;
  return Math.max(thumbSize, 18);
}
function getScrollPositionFromPointer(pointerPos, pointerOffset, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const thumbCenter = thumbSizePx / 2;
  const offset = pointerOffset || thumbCenter;
  const thumbOffsetFromEnd = thumbSizePx - offset;
  const minPointerPos = sizes.scrollbar.paddingStart + offset;
  const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
  const maxScrollPos = sizes.content - sizes.viewport;
  const scrollRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const interpolate = linearScale([minPointerPos, maxPointerPos], scrollRange);
  return interpolate(pointerPos);
}
function getThumbOffsetFromScroll(scrollPos, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const scrollbar = sizes.scrollbar.size - scrollbarPadding;
  const maxScrollPos = sizes.content - sizes.viewport;
  const maxThumbPos = scrollbar - thumbSizePx;
  const scrollClampRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const scrollWithoutMomentum = clamp(scrollPos, scrollClampRange);
  const interpolate = linearScale([0, maxScrollPos], [0, maxThumbPos]);
  return interpolate(scrollWithoutMomentum);
}
function linearScale(input, output) {
  return (value) => {
    if (input[0] === input[1] || output[0] === output[1]) return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}
function isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
  return scrollPos > 0 && scrollPos < maxScrollPos;
}
var addUnlinkedScrollListener = (node, handler = () => {
}) => {
  let prevPosition = { left: node.scrollLeft, top: node.scrollTop };
  let rAF = 0;
  (function loop() {
    const position = { left: node.scrollLeft, top: node.scrollTop };
    const isHorizontalScroll = prevPosition.left !== position.left;
    const isVerticalScroll = prevPosition.top !== position.top;
    if (isHorizontalScroll || isVerticalScroll) handler();
    prevPosition = position;
    rAF = window.requestAnimationFrame(loop);
  })();
  return () => window.cancelAnimationFrame(rAF);
};
function useDebounceCallback(callback, delay) {
  const handleCallback = useCallbackRef(callback);
  const debounceTimerRef = reactExports.useRef(0);
  reactExports.useEffect(() => () => window.clearTimeout(debounceTimerRef.current), []);
  return reactExports.useCallback(() => {
    window.clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = window.setTimeout(handleCallback, delay);
  }, [handleCallback, delay]);
}
function useResizeObserver(element, onResize) {
  const handleResize = useCallbackRef(onResize);
  useLayoutEffect2(() => {
    let rAF = 0;
    if (element) {
      const resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(rAF);
        rAF = window.requestAnimationFrame(handleResize);
      });
      resizeObserver.observe(element);
      return () => {
        window.cancelAnimationFrame(rAF);
        resizeObserver.unobserve(element);
      };
    }
  }, [element, handleResize]);
}
var Root = ScrollArea$1;
var Viewport = ScrollAreaViewport;
var Corner = ScrollAreaCorner;
function ScrollArea({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Root,
    {
      "data-slot": "scroll-area",
      className: cn("relative", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Viewport,
          {
            "data-slot": "scroll-area-viewport",
            className: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
            children
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollBar, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Corner, {})
      ]
    }
  );
}
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbar,
    {
      "data-slot": "scroll-area-scrollbar",
      orientation,
      className: cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ScrollAreaThumb,
        {
          "data-slot": "scroll-area-thumb",
          className: "bg-border relative flex-1 rounded-full"
        }
      )
    }
  );
}
const after10thPaths = [
  {
    id: "science-stream",
    title: "Science Stream",
    icon: "🔬",
    duration: "2 years (Class 11–12)",
    durationYears: 2,
    feesRange: "₹5,000 – ₹40,000/year",
    skills: ["Analytical thinking", "Mathematics", "Research"],
    jobOpportunities: ["Engineering", "Medical", "Research", "Defense", "IT"],
    salaryRange: "₹3–8 LPA (entry level after further study)",
    salaryGrowth: "High — opens doors to top-paying fields",
    futureGrowth: "Science stream is the gateway to engineering, medical, and research careers with high income potential.",
    whoShouldChoose: "Students strong in Maths & Science who want engineering, medical, or research careers.",
    whatYouCanBecome: [
      "Engineer",
      "Doctor",
      "Scientist",
      "Pilot",
      "Data Analyst"
    ],
    suitableFor: ["students"],
    salaryPotential: 5
  },
  {
    id: "commerce-stream",
    title: "Commerce Stream",
    icon: "📊",
    duration: "2 years (Class 11–12)",
    durationYears: 2,
    feesRange: "₹4,000 – ₹30,000/year",
    skills: ["Accounting", "Business math", "Economics"],
    jobOpportunities: ["Banking", "Finance", "CA", "Business", "Management"],
    salaryRange: "₹2.5–6 LPA (entry level after further study)",
    salaryGrowth: "Very good — finance and management careers pay well",
    futureGrowth: "Commerce is ideal for business, finance, and management roles with stable long-term growth.",
    whoShouldChoose: "Students interested in business, finance, accounting, or entrepreneurship.",
    whatYouCanBecome: [
      "CA",
      "BBA Graduate",
      "Financial Analyst",
      "Business Owner",
      "Banker"
    ],
    suitableFor: ["students"],
    salaryPotential: 4
  },
  {
    id: "arts-stream",
    title: "Arts / Humanities Stream",
    icon: "🎨",
    duration: "2 years (Class 11–12)",
    durationYears: 2,
    feesRange: "₹3,000 – ₹20,000/year",
    skills: ["Creative thinking", "Communication", "Social awareness"],
    jobOpportunities: [
      "UPSC/Civil Services",
      "Journalism",
      "Law",
      "Social work",
      "Teaching"
    ],
    salaryRange: "₹2–5 LPA (entry level after further study)",
    salaryGrowth: "Moderate — government and civil service roles offer stability",
    futureGrowth: "Arts stream supports civil services, law, journalism, and creative industries.",
    whoShouldChoose: "Students interested in social sciences, creative fields, civil services, or law.",
    whatYouCanBecome: [
      "IAS/IPS Officer",
      "Lawyer",
      "Journalist",
      "Teacher",
      "Social Entrepreneur"
    ],
    suitableFor: ["students"],
    salaryPotential: 3
  },
  {
    id: "iti-vocational",
    title: "ITI / Vocational Training",
    icon: "🔧",
    duration: "1–2 years",
    durationYears: 1,
    feesRange: "₹2,000 – ₹15,000/year",
    skills: ["Technical skills", "Hands-on work", "Problem solving"],
    jobOpportunities: [
      "Electrician",
      "Plumber",
      "Fitter",
      "Welder",
      "Mechanic"
    ],
    salaryRange: "₹1.5–4 LPA",
    salaryGrowth: "Steady — skilled trades are always in demand",
    futureGrowth: "ITI provides quick employment with government and private sector opportunities. Many ITI graduates start their own businesses.",
    whoShouldChoose: "Students who want quick employment, prefer hands-on work, or have financial constraints.",
    whatYouCanBecome: [
      "Electrician",
      "AC Technician",
      "Auto Mechanic",
      "Workshop Owner",
      "Industrial Supervisor"
    ],
    suitableFor: ["students", "freshers"],
    salaryPotential: 2
  },
  {
    id: "diploma-courses",
    title: "Diploma Courses",
    icon: "📜",
    duration: "3 years",
    durationYears: 3,
    feesRange: "₹10,000 – ₹60,000/year",
    skills: ["Technical knowledge", "Practical application", "Industry skills"],
    jobOpportunities: [
      "Junior Engineer",
      "Technician",
      "Supervisor",
      "Quality Control"
    ],
    salaryRange: "₹2–5 LPA",
    salaryGrowth: "Good — lateral entry to B.Tech possible",
    futureGrowth: "Diploma holders can join industry directly or pursue lateral entry into engineering degree programs.",
    whoShouldChoose: "Students who want technical careers but prefer shorter, cost-effective programs.",
    whatYouCanBecome: [
      "Junior Engineer",
      "Technical Supervisor",
      "B.Tech Graduate (lateral entry)",
      "Entrepreneur"
    ],
    suitableFor: ["students"],
    salaryPotential: 3
  },
  {
    id: "skill-certification",
    title: "Skill Certification Courses",
    icon: "🏅",
    duration: "3–12 months",
    durationYears: 1,
    feesRange: "₹500 – ₹20,000",
    skills: ["Digital literacy", "Soft skills", "Domain skills"],
    jobOpportunities: [
      "Freelancing",
      "Customer service",
      "Digital roles",
      "Small business"
    ],
    salaryRange: "₹1–3 LPA",
    salaryGrowth: "Depends on skill — digital skills have higher growth",
    futureGrowth: "Short skill courses from NSDC, Skill India, or online platforms provide quick employment in service sectors.",
    whoShouldChoose: "Students who need quick income, want to learn specific skills, or are exploring career options.",
    whatYouCanBecome: [
      "Freelancer",
      "Customer Support Executive",
      "Content Creator",
      "Digital Marketer (junior)"
    ],
    suitableFor: ["students", "freshers"],
    salaryPotential: 2
  },
  {
    id: "govt-exam-prep",
    title: "Government Exam Preparation",
    icon: "🏛️",
    duration: "1–3 years prep",
    durationYears: 2,
    feesRange: "₹5,000 – ₹50,000 (coaching)",
    skills: [
      "Reasoning",
      "General knowledge",
      "English",
      "Quantitative aptitude"
    ],
    jobOpportunities: [
      "Railway",
      "Army",
      "Police",
      "Banking (clerk)",
      "State govt jobs"
    ],
    salaryRange: "₹2.5–6 LPA",
    salaryGrowth: "Stable — government jobs offer security and perks",
    futureGrowth: "Government jobs offer lifetime job security, pension, and social status. Railway, defence, and police exams are accessible after 10th.",
    whoShouldChoose: "Students who want job security, government benefits, and a stable career path.",
    whatYouCanBecome: [
      "Railway Staff",
      "Army Soldier",
      "Police Constable",
      "Bank Clerk",
      "Peon/Multi-Tasking Staff"
    ],
    suitableFor: ["students", "freshers"],
    salaryPotential: 3
  },
  {
    id: "entrepreneurship-10th",
    title: "Entrepreneurship Track",
    icon: "🚀",
    duration: "Self-paced",
    durationYears: 1,
    feesRange: "₹0 – ₹10,000 (courses)",
    skills: ["Business mindset", "Sales", "Problem solving", "Networking"],
    jobOpportunities: [
      "Small business",
      "Freelancing",
      "Reselling",
      "Service business"
    ],
    salaryRange: "₹0.5–5 LPA (depends on business)",
    salaryGrowth: "Variable — high upside with the right idea",
    futureGrowth: "Starting small businesses early builds experience. Many successful entrepreneurs started young with service-based businesses.",
    whoShouldChoose: "Students with business mindset, creativity, and willingness to take calculated risks.",
    whatYouCanBecome: [
      "Business Owner",
      "Franchise Owner",
      "Freelancer",
      "Social Entrepreneur"
    ],
    suitableFor: ["students", "freshers"],
    salaryPotential: 4
  }
];
const after12thPaths = [
  {
    id: "engineering-btech",
    title: "Engineering (B.Tech)",
    icon: "⚙️",
    duration: "4 years",
    durationYears: 4,
    feesRange: "₹80,000 – ₹3,00,000/year",
    skills: [
      "Mathematics",
      "Programming",
      "Problem solving",
      "Technical analysis"
    ],
    jobOpportunities: [
      "Software Engineer",
      "Hardware Engineer",
      "Product Manager",
      "Data Analyst",
      "Consultant"
    ],
    salaryRange: "₹3–20 LPA (entry to mid-level)",
    salaryGrowth: "Very high — top engineers earn ₹30–80 LPA",
    futureGrowth: "Engineering is one of the highest-paying careers in India. IT, core, and emerging tech fields offer tremendous growth.",
    whoShouldChoose: "Students who are strong in Maths & Physics and want high-paying technical careers.",
    whatYouCanBecome: [
      "Software Developer",
      "Systems Architect",
      "CTO",
      "Product Manager",
      "Tech Entrepreneur"
    ],
    suitableFor: ["students"],
    salaryPotential: 5
  },
  {
    id: "medical-mbbs",
    title: "Medical / MBBS",
    icon: "🩺",
    duration: "5.5 years (including internship)",
    durationYears: 4,
    feesRange: "₹50,000 – ₹15,00,000/year",
    skills: ["Biology", "Chemistry", "Empathy", "Attention to detail"],
    jobOpportunities: [
      "Doctor",
      "Surgeon",
      "Hospital Admin",
      "Research",
      "Public Health"
    ],
    salaryRange: "₹6–25 LPA (after completion)",
    salaryGrowth: "High — specialist doctors earn ₹40–100+ LPA",
    futureGrowth: "Medicine is one of the most respected and high-earning professions globally. Specialization increases income exponentially.",
    whoShouldChoose: "Students with strong Biology, Chemistry, dedication, and genuine interest in serving patients.",
    whatYouCanBecome: [
      "General Physician",
      "Surgeon",
      "Cardiologist",
      "Dermatologist",
      "Hospital Owner"
    ],
    suitableFor: ["students"],
    salaryPotential: 5
  },
  {
    id: "bcom-accounting",
    title: "B.Com / Accounting",
    icon: "📒",
    duration: "3 years",
    durationYears: 3,
    feesRange: "₹10,000 – ₹80,000/year",
    skills: ["Accounting", "Taxation", "Financial reporting", "Tally/Excel"],
    jobOpportunities: [
      "Accountant",
      "Finance Manager",
      "Tax Consultant",
      "Banking",
      "CA Article Clerk"
    ],
    salaryRange: "₹2–6 LPA (entry level)",
    salaryGrowth: "Good — CA/CMA adds significant income potential",
    futureGrowth: "B.Com is affordable and opens doors to finance, banking, and CA careers. Every business needs accountants.",
    whoShouldChoose: "Commerce stream students interested in finance, accounting, and business operations.",
    whatYouCanBecome: [
      "Accountant",
      "Tax Consultant",
      "Finance Manager",
      "CA",
      "CFO"
    ],
    suitableFor: ["students", "freshers"],
    salaryPotential: 3
  },
  {
    id: "bba-management",
    title: "BBA / Management",
    icon: "💼",
    duration: "3 years",
    durationYears: 3,
    feesRange: "₹30,000 – ₹2,00,000/year",
    skills: ["Leadership", "Marketing", "Business strategy", "Communication"],
    jobOpportunities: [
      "Marketing Executive",
      "Business Analyst",
      "Sales Manager",
      "HR",
      "Consultant"
    ],
    salaryRange: "₹2.5–7 LPA (entry level)",
    salaryGrowth: "High — MBA after BBA can lead to ₹15–30 LPA",
    futureGrowth: "BBA + MBA combination is powerful for corporate and business careers. Great foundation for entrepreneurship.",
    whoShouldChoose: "Students interested in business, management, and corporate careers. Good for future entrepreneurs.",
    whatYouCanBecome: [
      "Business Manager",
      "Marketing Head",
      "Startup Founder",
      "MBA Graduate",
      "Consultant"
    ],
    suitableFor: ["students"],
    salaryPotential: 4
  },
  {
    id: "bca-it",
    title: "BCA / IT",
    icon: "💻",
    duration: "3 years",
    durationYears: 3,
    feesRange: "₹20,000 – ₹1,50,000/year",
    skills: ["Programming", "Database", "Web development", "Problem solving"],
    jobOpportunities: [
      "Software Developer",
      "Web Developer",
      "Database Admin",
      "IT Support",
      "Testing"
    ],
    salaryRange: "₹2.5–8 LPA (entry level)",
    salaryGrowth: "Very high — IT skills are globally in demand",
    futureGrowth: "BCA is a cost-effective IT degree. With additional skills and MCA, graduates can earn comparable to B.Tech.",
    whoShouldChoose: "Students who want IT careers but didn't take Science in 12th, or want an affordable tech degree.",
    whatYouCanBecome: [
      "Software Developer",
      "App Developer",
      "Web Designer",
      "System Analyst",
      "IT Entrepreneur"
    ],
    suitableFor: ["students", "freshers"],
    salaryPotential: 4
  },
  {
    id: "hotel-management",
    title: "Hotel Management",
    icon: "🏨",
    duration: "3–4 years",
    durationYears: 3,
    feesRange: "₹50,000 – ₹2,00,000/year",
    skills: [
      "Hospitality",
      "Communication",
      "Customer service",
      "Culinary arts"
    ],
    jobOpportunities: [
      "Hotel Operations",
      "F&B Manager",
      "Travel Agency",
      "Airline crew",
      "Event Management"
    ],
    salaryRange: "₹2.5–8 LPA (India), higher abroad",
    salaryGrowth: "Good — international opportunities significantly increase pay",
    futureGrowth: "Hotel management offers global career opportunities. India's tourism sector is growing rapidly, creating demand.",
    whoShouldChoose: "Students who enjoy working with people, travelling, and the hospitality industry.",
    whatYouCanBecome: [
      "Hotel Manager",
      "Chef",
      "Airline Crew",
      "Resort Owner",
      "Event Planner"
    ],
    suitableFor: ["students", "freshers"],
    salaryPotential: 3
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: "📱",
    duration: "6 months – 1 year (certification)",
    durationYears: 1,
    feesRange: "₹15,000 – ₹80,000",
    skills: ["SEO", "Social media", "Content creation", "Analytics"],
    jobOpportunities: [
      "Digital Marketer",
      "Content Creator",
      "SEO Specialist",
      "Social Media Manager",
      "Freelancer"
    ],
    salaryRange: "₹2–8 LPA (experience-based)",
    salaryGrowth: "High — skilled digital marketers are highly sought after",
    futureGrowth: "Digital marketing is one of the fastest-growing fields. Every business needs online presence, creating massive job demand.",
    whoShouldChoose: "Creative students who understand social media, want flexible work, or wish to freelance.",
    whatYouCanBecome: [
      "Digital Marketing Manager",
      "Content Strategist",
      "Agency Owner",
      "YouTube Creator",
      "Freelancer"
    ],
    suitableFor: ["students", "freshers", "career-changers"],
    salaryPotential: 4
  },
  {
    id: "aviation",
    title: "Aviation",
    icon: "✈️",
    duration: "2–4 years",
    durationYears: 3,
    feesRange: "₹80,000 – ₹15,00,000 (pilot training)",
    skills: [
      "English proficiency",
      "Customer service",
      "Technical knowledge",
      "Presence of mind"
    ],
    jobOpportunities: [
      "Pilot",
      "Cabin Crew",
      "Ground Staff",
      "ATC",
      "Airport Operations"
    ],
    salaryRange: "₹3–15 LPA (cabin crew), ₹15–50 LPA (pilots)",
    salaryGrowth: "High for pilots, moderate for cabin crew",
    futureGrowth: "India's aviation sector is one of the fastest-growing globally. Demand for trained aviation professionals is rising.",
    whoShouldChoose: "Students who meet physical requirements, have good English, and want travel-based careers.",
    whatYouCanBecome: [
      "Commercial Pilot",
      "Cabin Crew",
      "Airport Manager",
      "Air Traffic Controller"
    ],
    suitableFor: ["students"],
    salaryPotential: 4
  },
  {
    id: "nursing-paramedical",
    title: "Nursing / Paramedical",
    icon: "🏥",
    duration: "3–4 years",
    durationYears: 3,
    feesRange: "₹20,000 – ₹1,00,000/year",
    skills: [
      "Patient care",
      "Medical knowledge",
      "Empathy",
      "Attention to detail"
    ],
    jobOpportunities: [
      "Staff Nurse",
      "Paramedic",
      "Lab Technician",
      "Physiotherapist",
      "Radiology Tech"
    ],
    salaryRange: "₹2–6 LPA (India), much higher abroad",
    salaryGrowth: "High for international opportunities",
    futureGrowth: "Healthcare is always in demand. Nursing has strong overseas career prospects in USA, UK, and Gulf countries.",
    whoShouldChoose: "Students interested in healthcare, patient care, and those considering international career opportunities.",
    whatYouCanBecome: [
      "Registered Nurse",
      "Head Nurse",
      "Hospital Administrator",
      "Healthcare Entrepreneur"
    ],
    suitableFor: ["students", "freshers"],
    salaryPotential: 3
  },
  {
    id: "govt-exams-12th",
    title: "Government Exams (UPSC/SSC)",
    icon: "🏛️",
    duration: "2–5 years prep",
    durationYears: 3,
    feesRange: "₹10,000 – ₹1,50,000 (coaching)",
    skills: [
      "General knowledge",
      "Current affairs",
      "Analytical reasoning",
      "Essay writing"
    ],
    jobOpportunities: ["IAS", "IPS", "SSC CGL", "Banking", "State PSC"],
    salaryRange: "₹4–12 LPA + perks",
    salaryGrowth: "Stable — senior officials earn significantly higher with perks",
    futureGrowth: "Government services offer unmatched job security, social status, and perks. IAS/IPS officers have nationwide impact.",
    whoShouldChoose: "Students with discipline, strong reading habits, and interest in public service.",
    whatYouCanBecome: [
      "IAS Officer",
      "IPS Officer",
      "Bank Manager",
      "Tax Inspector",
      "SSC Officer"
    ],
    suitableFor: ["students", "freshers"],
    salaryPotential: 3
  },
  {
    id: "skill-based-careers",
    title: "Skill-Based Careers",
    icon: "🎯",
    duration: "6 months – 2 years",
    durationYears: 1,
    feesRange: "₹5,000 – ₹50,000",
    skills: [
      "Specific technical skill",
      "Portfolio building",
      "Self-marketing"
    ],
    jobOpportunities: [
      "Graphic Designer",
      "Video Editor",
      "Photographer",
      "Web Designer",
      "App Developer"
    ],
    salaryRange: "₹1.5–10 LPA (skill-dependent)",
    salaryGrowth: "High for in-demand skills like design, coding, video editing",
    futureGrowth: "Skill-based careers offer flexibility and growing income. Freelancing and remote work options are abundant.",
    whoShouldChoose: "Creative, self-driven students who prefer hands-on learning over traditional degrees.",
    whatYouCanBecome: [
      "Graphic Designer",
      "UI/UX Designer",
      "Video Creator",
      "Freelancer",
      "Creative Agency Owner"
    ],
    suitableFor: ["students", "freshers", "career-changers"],
    salaryPotential: 3
  }
];
const afterGraduationPaths = [
  {
    id: "mba-masters",
    title: "MBA / Masters",
    icon: "🎓",
    duration: "2 years",
    durationYears: 2,
    feesRange: "₹1,50,000 – ₹20,00,000/year",
    skills: [
      "Leadership",
      "Strategic thinking",
      "Business analytics",
      "Communication"
    ],
    jobOpportunities: [
      "Management Consultant",
      "Product Manager",
      "Finance Manager",
      "Marketing Director",
      "Startup Founder"
    ],
    salaryRange: "₹8–30 LPA (IIM graduates ₹25–80 LPA)",
    salaryGrowth: "Very high — IIM/top MBA is a career accelerator",
    futureGrowth: "MBA from a reputed institute can multiply salary 3-5x. Opens doors to leadership and C-suite roles.",
    whoShouldChoose: "Graduates who want corporate leadership roles, career switches, or to scale a business.",
    whatYouCanBecome: [
      "CEO/COO",
      "Management Consultant",
      "Investment Banker",
      "Startup Founder",
      "Business Head"
    ],
    suitableFor: ["freshers", "workers"],
    salaryPotential: 5
  },
  {
    id: "law-llb",
    title: "Law (LLB)",
    icon: "⚖️",
    duration: "3 years (LLB) or 5 years (BA LLB)",
    durationYears: 3,
    feesRange: "₹20,000 – ₹3,00,000/year",
    skills: [
      "Legal reasoning",
      "Research",
      "Articulation",
      "Critical thinking"
    ],
    jobOpportunities: [
      "Advocate",
      "Corporate Lawyer",
      "Legal Advisor",
      "Judiciary",
      "Government Law"
    ],
    salaryRange: "₹3–20 LPA (experience-dependent)",
    salaryGrowth: "High for corporate and specialization areas",
    futureGrowth: "Law is a respected profession with diverse practice areas. Corporate lawyers and specialized attorneys earn very well.",
    whoShouldChoose: "Graduates with strong reasoning, writing skills, and interest in justice, business law, or civil services.",
    whatYouCanBecome: [
      "Senior Advocate",
      "Corporate Counsel",
      "Judge",
      "Legal Entrepreneur",
      "Policy Expert"
    ],
    suitableFor: ["students", "freshers"],
    salaryPotential: 4
  },
  {
    id: "ca-cma",
    title: "CA / CMA",
    icon: "🧮",
    duration: "3–5 years (after B.Com/12th)",
    durationYears: 4,
    feesRange: "₹30,000 – ₹1,00,000 (ICAI fees)",
    skills: ["Accounting", "Taxation", "Auditing", "Financial analysis"],
    jobOpportunities: [
      "Chartered Accountant",
      "Tax Consultant",
      "CFO",
      "Auditor",
      "Financial Advisor"
    ],
    salaryRange: "₹6–25 LPA (Big 4 firms can pay more)",
    salaryGrowth: "Very high — senior CAs earn ₹30–80 LPA",
    futureGrowth: "CA is one of the highest-paying professional qualifications in India. Demand is consistent across all sectors.",
    whoShouldChoose: "Committed graduates who are strong in finance, can handle rigorous study, and want professional qualification.",
    whatYouCanBecome: [
      "Chartered Accountant",
      "Tax Partner",
      "CFO",
      "Finance Director",
      "CA Firm Owner"
    ],
    suitableFor: ["students", "freshers"],
    salaryPotential: 5
  },
  {
    id: "government-services",
    title: "Government Services",
    icon: "🏛️",
    duration: "2–4 years prep",
    durationYears: 3,
    feesRange: "₹20,000 – ₹2,00,000 (coaching)",
    skills: [
      "Current affairs",
      "Administrative ability",
      "Ethics",
      "Decision making"
    ],
    jobOpportunities: ["IAS", "IPS", "IRS", "UPSC Civil Services", "State PSC"],
    salaryRange: "₹7–15 LPA + perks (IAS in-hand)",
    salaryGrowth: "Stable — career progression is structured and assured",
    futureGrowth: "Civil services offer power, prestige, and opportunity to drive national change. Post-retirement options are also strong.",
    whoShouldChoose: "Graduates with public service mindset, discipline, and ability to handle high-pressure examination.",
    whatYouCanBecome: [
      "IAS Officer",
      "IPS Officer",
      "Collector",
      "Commissioner",
      "District Magistrate"
    ],
    suitableFor: ["students", "freshers"],
    salaryPotential: 3
  },
  {
    id: "it-software",
    title: "IT / Software",
    icon: "💻",
    duration: "Immediate + skill building",
    durationYears: 1,
    feesRange: "₹10,000 – ₹1,00,000 (bootcamps/courses)",
    skills: ["Programming", "System design", "Cloud", "Agile"],
    jobOpportunities: [
      "Software Engineer",
      "DevOps",
      "Cloud Architect",
      "Security Analyst",
      "Tech Lead"
    ],
    salaryRange: "₹5–25 LPA (India), ₹50–150 LPA (USA)",
    salaryGrowth: "Very high — especially in product companies",
    futureGrowth: "IT is the highest-paying career sector. Remote work opportunities allow earning global salaries from India.",
    whoShouldChoose: "Tech graduates who want high salaries, remote work, and international career opportunities.",
    whatYouCanBecome: [
      "Senior Engineer",
      "Principal Architect",
      "Engineering Manager",
      "CTO",
      "Tech Entrepreneur"
    ],
    suitableFor: ["students", "freshers", "workers"],
    salaryPotential: 5
  },
  {
    id: "data-science-ai",
    title: "Data Science / AI",
    icon: "🤖",
    duration: "6 months – 1 year (additional)",
    durationYears: 1,
    feesRange: "₹20,000 – ₹2,00,000 (courses)",
    skills: ["Python", "Statistics", "Machine learning", "Data visualization"],
    jobOpportunities: [
      "Data Scientist",
      "ML Engineer",
      "AI Researcher",
      "Business Analyst",
      "Quant Analyst"
    ],
    salaryRange: "₹8–40 LPA (India), higher abroad",
    salaryGrowth: "Extremely high — AI skills are the most in-demand globally",
    futureGrowth: "AI and data science are transforming every industry. This is the fastest-growing and highest-paying field globally.",
    whoShouldChoose: "Tech/math graduates who enjoy analysis, want cutting-edge careers, and have strong coding interest.",
    whatYouCanBecome: [
      "Data Scientist",
      "AI Engineer",
      "Research Scientist",
      "AI Startup Founder",
      "Consultant"
    ],
    suitableFor: ["students", "freshers", "workers"],
    salaryPotential: 5
  },
  {
    id: "entrepreneurship-grad",
    title: "Entrepreneurship",
    icon: "🚀",
    duration: "Self-paced",
    durationYears: 1,
    feesRange: "Depends on business (₹0 – ₹5 lakh)",
    skills: ["Business development", "Sales", "Operations", "Leadership"],
    jobOpportunities: [
      "Startup Founder",
      "Franchise Owner",
      "E-commerce",
      "Service Business",
      "Consulting"
    ],
    salaryRange: "Variable — ₹0 in early stage to unlimited",
    salaryGrowth: "Unlimited potential with the right idea and execution",
    futureGrowth: "Entrepreneurship is the path to financial independence. Most successful businesses start small and scale.",
    whoShouldChoose: "Graduates with ideas, risk appetite, and willingness to put in effort for 2-3 years without guaranteed income.",
    whatYouCanBecome: [
      "CEO/Founder",
      "Franchise Network Owner",
      "Export Business Owner",
      "Tech Startup Founder"
    ],
    suitableFor: ["freshers", "workers"],
    salaryPotential: 5
  },
  {
    id: "freelancing-consulting",
    title: "Freelancing / Consulting",
    icon: "🌐",
    duration: "3–12 months to build client base",
    durationYears: 1,
    feesRange: "₹5,000 – ₹50,000 (skill courses)",
    skills: [
      "Domain expertise",
      "Client management",
      "Self-marketing",
      "Project management"
    ],
    jobOpportunities: [
      "Independent Consultant",
      "Remote Freelancer",
      "Agency Owner",
      "Online Trainer",
      "Coach"
    ],
    salaryRange: "₹2–30 LPA (skill and client base dependent)",
    salaryGrowth: "High — international clients pay significantly more",
    futureGrowth: "Freelancing offers freedom, flexibility, and global income. With the right skills, earning ₹1–3 lakh/month is achievable.",
    whoShouldChoose: "Graduates with specialized skills, entrepreneurial spirit, and preference for flexible work arrangements.",
    whatYouCanBecome: [
      "Independent Consultant",
      "Agency Founder",
      "Online Coach",
      "Remote Professional"
    ],
    suitableFor: ["freshers", "workers", "career-changers"],
    salaryPotential: 4
  }
];
const tabData = {
  after10th: after10thPaths,
  after12th: after12thPaths,
  afterGraduation: afterGraduationPaths
};
const TAB_LABELS = [
  { key: "after10th", label: "After 10th" },
  { key: "after12th", label: "After 12th" },
  { key: "afterGraduation", label: "After Graduation" }
];
const DURATION_FILTER_OPTIONS = [
  { value: "all", label: "All Durations" },
  { value: "1yr", label: "Up to 1 Year" },
  { value: "2yr", label: "2 Years" },
  { value: "3yr", label: "3 Years" },
  { value: "4yr+", label: "4+ Years" }
];
const ROADMAP_SUGGESTIONS = {
  science: {
    stream: "Science → Engineering / Medical",
    why: "Your analytical profile and tech interest align with science-based careers.",
    outcomes: [
      "High starting salary (₹4–12 LPA)",
      "Global job opportunities",
      "Path to ₹25+ LPA in 5 years"
    ]
  },
  commerce: {
    stream: "Commerce → CA / MBA / Finance",
    why: "Your goal of financial stability aligns with commerce and finance career paths.",
    outcomes: [
      "Stable career with growth",
      "CA earning ₹8–25 LPA",
      "Respected professional qualification"
    ]
  },
  arts: {
    stream: "Arts → Civil Services / Law / Media",
    why: "Your interest in public service and communication makes arts stream ideal.",
    outcomes: [
      "Government job security",
      "Social impact career",
      "Diverse industry options"
    ]
  },
  default: {
    stream: "Skill-First → Digital Career",
    why: "Based on your profile, building marketable skills is the fastest path to income growth.",
    outcomes: [
      "Start earning in 6–12 months",
      "Freelance or job ready",
      "Path to ₹5–15 LPA with experience"
    ]
  }
};
function CareerCard({
  career,
  index,
  onViewDetails
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "card-elevated hover:card-premium transition-smooth group border-border bg-card h-full",
      "data-ocid": `career.card.${index}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex flex-col gap-4 h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-3xl leading-none flex-shrink-0",
              role: "img",
              "aria-label": career.title,
              children: career.icon
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground leading-tight text-sm", children: career.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1 text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs truncate", children: career.duration })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-primary font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-3 h-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: career.feesRange })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: career.skills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "secondary",
            className: "text-xs px-2 py-0.5",
            children: skill
          },
          skill
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-smooth text-xs",
            onClick: () => onViewDetails(career),
            "data-ocid": `career.view_details_button.${index}`,
            children: "View Details"
          }
        ) })
      ] })
    }
  );
}
function CareerDetailDrawer({
  career,
  isPremium,
  onClose
}) {
  const openPremiumModal = useAppStore((s) => s.openPremiumModal);
  if (!career) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center",
      "data-ocid": "career.detail_drawer",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-foreground/40 backdrop-blur-sm",
            onClick: onClose,
            onKeyDown: (e) => e.key === "Escape" && onClose(),
            role: "button",
            tabIndex: -1,
            "aria-label": "Close dialog"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 w-full sm:max-w-2xl max-h-[90vh] bg-card rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 p-5 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", role: "img", "aria-label": career.title, children: career.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground text-lg leading-tight", children: career.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-0.5", children: [
                "Duration: ",
                career.duration
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: onClose,
                className: "flex-shrink-0 rounded-lg p-1.5 hover:bg-muted transition-colors",
                "aria-label": "Close",
                "data-ocid": "career.detail.close_button",
                type: "button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5 text-muted-foreground" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-2", children: "Estimated Fees Range" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: career.feesRange }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "*Fees vary by institution and location" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-2", children: "Skills Needed" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: career.skills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: "bg-primary/10 text-primary border-primary/20",
                  children: skill
                },
                skill
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-2", children: "Suggested Job Opportunities" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: career.jobOpportunities.map((job) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-3.5 h-3.5 text-primary flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: job })
              ] }, job)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-2", children: "Expected Salary Range" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FeatureLockOverlay,
                {
                  locked: !isPremium,
                  title: "Salary & Growth Data",
                  description: "Upgrade to Premium to unlock salary ranges, growth projections, and detailed career data.",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 p-3 bg-muted/30 rounded-lg", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-4 h-4 text-accent" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: career.salaryRange }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "*Estimated range based on market data" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: career.salaryGrowth })
                    ] })
                  ] })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-2", children: "Future Growth Potential" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FeatureLockOverlay,
                {
                  locked: !isPremium,
                  title: "Growth Analysis",
                  description: "Unlock detailed growth analysis with Premium.",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed p-3 bg-muted/30 rounded-lg", children: career.futureGrowth })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-2", children: "Who May Benefit From This Path" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 p-3 bg-accent/10 rounded-lg border border-accent/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-accent mt-0.5 flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: career.whoShouldChoose })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-2", children: "Possible Roles After Completion" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: career.whatYouCanBecome.map((role) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  className: "bg-accent/10 text-accent-foreground border-accent/30 text-xs",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-2.5 h-2.5 mr-1" }),
                    role
                  ]
                },
                role
              )) })
            ] }),
            !isPremium && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl bg-primary/5 border border-primary/20 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-6 h-6 text-primary mx-auto mb-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-semibold text-foreground", children: "Get Full Career Report" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 mb-3", children: "Premium includes salary data, growth projections, personalized roadmap, and PDF report." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  className: "bg-primary hover:bg-primary/90 text-primary-foreground",
                  onClick: openPremiumModal,
                  "data-ocid": "career.detail.upgrade_button",
                  children: "Upgrade to Premium"
                }
              )
            ] })
          ] }) })
        ] })
      ]
    }
  );
}
function EducationRoadmap({
  profile,
  isPremium
}) {
  const [expanded, setExpanded] = reactExports.useState(true);
  const openPremiumModal = useAppStore((s) => s.openPremiumModal);
  const suggestion = reactExports.useMemo(() => {
    if (!profile) return ROADMAP_SUGGESTIONS.default;
    const level = (profile.educationLevel || "").toLowerCase();
    const interest = (profile.careerInterest || "").toLowerCase();
    if (interest.includes("tech") || interest.includes("engineer") || interest.includes("science"))
      return ROADMAP_SUGGESTIONS.science;
    if (interest.includes("business") || interest.includes("finance") || level.includes("commerce"))
      return ROADMAP_SUGGESTIONS.commerce;
    if (interest.includes("civil") || interest.includes("law") || interest.includes("arts"))
      return ROADMAP_SUGGESTIONS.arts;
    return ROADMAP_SUGGESTIONS.default;
  }, [profile]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl border border-border bg-card overflow-hidden mb-6 card-elevated",
      "data-ocid": "career.roadmap_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-colors text-left",
            onClick: () => setExpanded((v) => !v),
            "data-ocid": "career.roadmap.toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm", children: "Education Roadmap" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Suggested path based on your profile" })
                ] })
              ] }),
              expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-5 h-5 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-5 h-5 text-muted-foreground" })
            ]
          }
        ),
        expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          FeatureLockOverlay,
          {
            locked: !isPremium,
            title: "Personalized Roadmap",
            description: "Upgrade to Premium for your personalized education roadmap based on your profile.",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-5 grid sm:grid-cols-3 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-1 p-4 rounded-xl bg-primary/5 border border-primary/20", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-primary text-sm mb-1", children: "Recommended Stream" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium text-sm", children: suggestion.stream })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-1 p-4 rounded-xl bg-muted/40", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-1", children: "Why This Path" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-sm", children: suggestion.why })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-1 p-4 rounded-xl bg-accent/5 border border-accent/20", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-2", children: "Expected Outcomes" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: suggestion.outcomes.map((outcome) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent mt-0.5", children: "✦" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: outcome })
                  ] }, outcome)) })
                ] })
              ] }),
              !isPremium && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-5 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  className: "bg-accent hover:bg-accent/90 text-accent-foreground",
                  onClick: openPremiumModal,
                  "data-ocid": "career.roadmap.upgrade_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 mr-1" }),
                    "Unlock Full Personalized Roadmap"
                  ]
                }
              ) })
            ]
          }
        )
      ]
    }
  );
}
function Career() {
  const { data: profile } = useProfile();
  const [activeTab, setActiveTab] = reactExports.useState("after10th");
  const [selectedCareer, setSelectedCareer] = reactExports.useState(null);
  const [search, setSearch] = reactExports.useState("");
  const [durationFilter, setDurationFilter] = reactExports.useState("all");
  const [sortBySalary, setSortBySalary] = reactExports.useState(false);
  const { data: sub } = useSubscription();
  const isPremium = (sub == null ? void 0 : sub.status) === "active";
  const profileData = profile ? {
    educationLevel: profile.educationLevel,
    careerInterest: profile.careerInterest
  } : null;
  const filteredCareers = reactExports.useMemo(() => {
    let list = tabData[activeTab];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) => c.title.toLowerCase().includes(q) || c.skills.some((s) => s.toLowerCase().includes(q))
      );
    }
    if (durationFilter !== "all") {
      list = list.filter((c) => {
        if (durationFilter === "1yr") return c.durationYears <= 1;
        if (durationFilter === "2yr") return c.durationYears === 2;
        if (durationFilter === "3yr") return c.durationYears === 3;
        if (durationFilter === "4yr+") return c.durationYears >= 4;
        return true;
      });
    }
    if (sortBySalary) {
      list = [...list].sort((a, b) => b.salaryPotential - a.salaryPotential);
    }
    return list;
  }, [activeTab, search, durationFilter, sortBySalary]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-6 h-6 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl sm:text-3xl text-foreground", children: "Career Guidance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm sm:text-base", children: "Find the right path based on your education and goals" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex gap-1 mt-6 border-b border-border -mb-px",
          role: "tablist",
          "data-ocid": "career.tabs",
          children: TAB_LABELS.map(({ key, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": activeTab === key,
              onClick: () => {
                setActiveTab(key);
                setSearch("");
                setDurationFilter("all");
                setSortBySalary(false);
              },
              className: `px-4 py-2.5 text-sm font-medium font-display transition-colors relative whitespace-nowrap ${activeTab === key ? "text-primary border-b-2 border-primary -mb-px" : "text-muted-foreground hover:text-foreground"}`,
              "data-ocid": `career.tab.${key}`,
              children: label
            },
            key
          ))
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(EducationRoadmap, { profile: profileData, isPremium }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card rounded-2xl border border-border p-4 mb-6 flex flex-col sm:flex-row gap-3",
          "data-ocid": "career.filter_bar",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Search careers or skills…",
                  value: search,
                  onChange: (e) => setSearch(e.target.value),
                  className: "pl-9 text-sm",
                  "data-ocid": "career.search_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 flex-wrap", children: DURATION_FILTER_OPTIONS.map(({ value, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setDurationFilter(value),
                className: `px-3 py-1.5 rounded-lg text-xs font-medium transition-smooth ${durationFilter === value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`,
                "data-ocid": `career.duration_filter.${value}`,
                children: label
              },
              value
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setSortBySalary((v) => !v),
                className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-smooth whitespace-nowrap ${sortBySalary ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`,
                "data-ocid": "career.sort_salary_toggle",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5" }),
                  "Sort by Salary"
                ]
              }
            )
          ]
        }
      ),
      filteredCareers.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
          "data-ocid": "career.cards_list",
          children: filteredCareers.map((career, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            CareerCard,
            {
              career,
              index: index + 1,
              onViewDetails: setSelectedCareer
            },
            career.id
          ))
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-20 text-center",
          "data-ocid": "career.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-8 h-8 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "No careers found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Try adjusting your search or filters." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                className: "mt-4",
                onClick: () => {
                  setSearch("");
                  setDurationFilter("all");
                  setSortBySalary(false);
                },
                "data-ocid": "career.empty_state.reset_button",
                children: "Clear Filters"
              }
            )
          ]
        }
      ),
      !isPremium && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 rounded-2xl overflow-hidden border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-accent/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center sm:text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center sm:justify-start gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-5 h-5 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-accent uppercase tracking-wider", children: "Premium Career Guidance" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl text-foreground", children: "Get Your Full Career Roadmap" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-2", children: "Unlock salary data, personalized education roadmap, PDF career report, and detailed 10-year career planning — based on your profile." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 w-full sm:w-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              className: "bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap",
              "data-ocid": "career.premium_cta.upgrade_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 mr-2" }),
                "Get Premium — ₹99/month"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground", children: "Cancel anytime" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CareerDetailDrawer,
      {
        career: selectedCareer,
        isPremium,
        onClose: () => setSelectedCareer(null)
      }
    )
  ] });
}
export {
  Career as default
};
