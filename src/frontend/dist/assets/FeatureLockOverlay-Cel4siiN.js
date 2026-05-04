import { R as React, u as useNavigate, j as jsxRuntimeExports } from "./index-DyUgiqXz.js";
import { B as Button } from "./trending-up-CtEt7QQ9.js";
import { L as Lock } from "./lock-CEB4_A0Z.js";
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
const identity = (arg) => arg;
function useStore(api, selector = identity) {
  const slice = React.useSyncExternalStore(
    api.subscribe,
    React.useCallback(() => selector(api.getState()), [api, selector]),
    React.useCallback(() => selector(api.getInitialState()), [api, selector])
  );
  React.useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  const api = createStore(createState);
  const useBoundStore = (selector) => useStore(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = (createState) => createState ? createImpl(createState) : createImpl;
const useAppStore = create((set) => ({
  onboardingStep: 0,
  isPremiumModalOpen: false,
  pageTitle: "SaveFuture AI",
  setOnboardingStep: (step) => set({ onboardingStep: step }),
  openPremiumModal: () => set({ isPremiumModalOpen: true }),
  closePremiumModal: () => set({ isPremiumModalOpen: false }),
  setPageTitle: (title) => set({ pageTitle: title })
}));
function FeatureLockOverlay({
  children,
  locked = true,
  title = "Premium Feature",
  description = "Upgrade to unlock full access to this feature."
}) {
  const navigate = useNavigate();
  const openPremiumModal = useAppStore((s) => s.openPremiumModal);
  if (!locked) return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative overflow-hidden rounded-xl",
      "data-ocid": "feature_lock_overlay",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none select-none blur-sm opacity-60", children }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm rounded-xl gap-3 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-6 h-6 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-base", children: title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => navigate({ to: "/premium" }),
                "data-ocid": "feature_lock.view_plans_button",
                children: "View Plans"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                className: "bg-accent hover:bg-accent/90 text-accent-foreground",
                onClick: openPremiumModal,
                "data-ocid": "feature_lock.upgrade_button",
                children: "Upgrade Now"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  FeatureLockOverlay as F,
  useAppStore as u
};
