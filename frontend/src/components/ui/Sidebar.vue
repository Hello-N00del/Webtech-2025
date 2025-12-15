<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, provide, ref, type CSSProperties } from "vue"
import { Slot } from "radix-vue"
import { cva, type VariantProps } from "class-variance-authority"
import { PanelLeftIcon } from "lucide-vue-next"

import { useIsMobile } from "./use-mobile"
import { cn } from "./utils"
import Button from "./Button.vue"
import Input from "./Input.vue"
import Separator from "./Separator.vue"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./Sheet.vue"
import Skeleton from "./Skeleton.vue"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./Tooltip.vue"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarState = "expanded" | "collapsed"

type SidebarContextProps = {
  state: SidebarState
  open: boolean
  setOpen: (open: boolean | ((open: boolean) => boolean)) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarSymbol = Symbol("SidebarContext")

function readInitialCookie(): boolean | null {
  if (typeof document === "undefined") return null
  const cookie = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${SIDEBAR_COOKIE_NAME}=`))
  if (!cookie) return null
  const value = cookie.split("=")[1]
  return value === "true"
}

function writeCookie(value: boolean) {
  if (typeof document === "undefined") return
  document.cookie = `${SIDEBAR_COOKIE_NAME}=${value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
}

function useSidebarInternal(defaultOpen: boolean) {
  const isMobile = useIsMobile()
  const openMobile = ref(false)

  const cookieOpen = readInitialCookie()
  const _open = ref(cookieOpen ?? defaultOpen)
  const open = computed(() => _open.value)

  function setOpen(value: boolean | ((open: boolean) => boolean)) {
    const next = typeof value === "function" ? value(open.value) : value
    _open.value = next
    writeCookie(next)
  }

  function setOpenMobile(value: boolean) {
    openMobile.value = value
  }

  function toggleSidebar() {
    if (isMobile.value) {
      setOpenMobile(!openMobile.value)
    } else {
      setOpen((prev) => !prev)
    }
  }

  const state = computed<SidebarState>(() =>
    open.value ? "expanded" : "collapsed",
  )

  onMounted(() => {
    const handler = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }
    window.addEventListener("keydown", handler)
    onBeforeUnmount(() => window.removeEventListener("keydown", handler))
  })

  return {
    isMobile,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    toggleSidebar,
    state,
  }
}

export function useSidebar(): SidebarContextProps {
  const ctx = inject<SidebarContextProps | null>(SidebarSymbol, null)
  if (!ctx) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return ctx
}

type SidebarProviderProps = {
  defaultOpen?: boolean
  class?: string
  style?: CSSProperties
}

const props = withDefaults(defineProps<SidebarProviderProps>(), {
  defaultOpen: true,
})

const internal = useSidebarInternal(props.defaultOpen)

provide<SidebarContextProps>(SidebarSymbol, {
  get state() {
    return internal.state.value
  },
  get open() {
    return internal.open.value
  },
  setOpen: internal.setOpen,
  get openMobile() {
    return internal.openMobile.value
  },
  setOpenMobile: internal.setOpenMobile,
  get isMobile() {
    return internal.isMobile.value
  },
  toggleSidebar: internal.toggleSidebar,
})
</script>

<template>
  <TooltipProvider :delay-duration="0">
    <div
      data-slot="sidebar-wrapper"
      :style="{
        '--sidebar-width': SIDEBAR_WIDTH,
        '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
        ...(style || {}),
      }"
      :class="cn(
        'group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full',
        props.class,
      )"
    >
      <slot />
    </div>
  </TooltipProvider>
</template>

<script lang="ts">
import { defineComponent, h } from "vue"

// Sidebar

export const Sidebar = defineComponent({
  name: "Sidebar",
  props: {
    side: {
      type: String as () => "left" | "right",
      default: "left",
    },
    variant: {
      type: String as () => "sidebar" | "floating" | "inset",
      default: "sidebar",
    },
    collapsible: {
      type: String as () => "offcanvas" | "icon" | "none",
      default: "offcanvas",
    },
    class: String,
  },
  setup(props, { slots, attrs }) {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    return () => {
      if (props.collapsible === "none") {
        return h(
          "div",
          {
            ...(attrs as any),
            "data-slot": "sidebar",
            class: cn(
              "bg-sidebar text-sidebar-foreground flex h-full w-[var(--sidebar-width)] flex-col",
              props.class,
            ),
          },
          slots,
        )
      }

      if (isMobile.value) {
        return h(
          Sheet,
          {
            ...(attrs as any),
            open: openMobile.value,
            "onUpdate:open": setOpenMobile,
          },
          {
            default: () =>
              h(
                SheetContent,
                {
                  "data-sidebar": "sidebar",
                  "data-slot": "sidebar",
                  "data-mobile": "true",
                  class:
                    "bg-sidebar text-sidebar-foreground w-[var(--sidebar-width)] p-0 [&>button]:hidden",
                  style: {
                    "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
                  } as CSSProperties,
                  side: props.side,
                },
                {
                  default: () => [
                    h(
                      SheetHeader,
                      { class: "sr-only" },
                      {
                        default: () => [
                          h(SheetTitle, null, { default: () => "Sidebar" }),
                          h(SheetDescription, null, {
                            default: () => "Displays the mobile sidebar.",
                          }),
                        ],
                      },
                    ),
                    h(
                      "div",
                      { class: "flex h-full w-full flex-col" },
                      slots.default?.(),
                    ),
                  ],
                },
              ),
          },
        )
      }

      return h(
        "div",
        {
          class:
            "group peer text-sidebar-foreground hidden md:block",
          "data-state": state.value,
          "data-collapsible":
            state.value === "collapsed" ? props.collapsible : "",
          "data-variant": props.variant,
          "data-side": props.side,
          "data-slot": "sidebar",
        },
        [
          h("div", {
            "data-slot": "sidebar-gap",
            class: cn(
              "relative w-[var(--sidebar-width)] bg-transparent transition-[width] duration-200 ease-linear",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              props.variant === "floating" || props.variant === "inset"
                ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+theme(spacing.4))]"
                : "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)]",
            ),
          }),
          h(
            "div",
            {
              ...(attrs as any),
              "data-slot": "sidebar-container",
              class: cn(
                "fixed inset-y-0 z-10 hidden h-svh w-[var(--sidebar-width)] transition-[left,right,width] duration-200 ease-linear md:flex",
                props.side === "left"
                  ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
                  : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
                props.variant === "floating" || props.variant === "inset"
                  ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+theme(spacing.4)+2px)]"
                  : "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)] group-data-[side=left]:border-r group-data-[side=right]:border-l",
                props.class,
              ),
            },
            [
              h(
                "div",
                {
                  "data-sidebar": "sidebar",
                  "data-slot": "sidebar-inner",
                  class:
                    "bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm",
                },
                slots.default?.(),
              ),
            ],
          ),
        ],
      )
    }
  },
})

// Trigger

export const SidebarTrigger = defineComponent({
  name: "SidebarTrigger",
  props: { class: String },
  setup(props, { attrs }) {
    const { toggleSidebar } = useSidebar()
    return () =>
      h(
        Button,
        {
          ...(attrs as any),
          "data-sidebar": "trigger",
          "data-slot": "sidebar-trigger",
          variant: "ghost",
          size: "icon",
          class: cn("size-7", props.class),
          onClick: (event: MouseEvent) => {
            ;(attrs as any)?.onClick?.(event)
            toggleSidebar()
          },
        },
        {
          default: () => [
            h(PanelLeftIcon),
            h("span", { class: "sr-only" }, "Toggle Sidebar"),
          ],
        },
      )
  },
})

// Inset

export const SidebarInset = defineComponent({
  name: "SidebarInset",
  props: { class: String },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "main",
        {
          ...(attrs as any),
          "data-slot": "sidebar-inset",
          class: cn(
            "bg-background relative flex w-full flex-1 flex-col",
            "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
            props.class,
          ),
        },
        slots,
      )
  },
})

// Header/Footer/Content/Groups/Menu

export const SidebarHeader = defineComponent({
  name: "SidebarHeader",
  props: { class: String },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "div",
        {
          ...(attrs as any),
          "data-slot": "sidebar-header",
          "data-sidebar": "header",
          class: cn("flex flex-col gap-2 p-2", props.class),
        },
        slots,
      )
  },
})

export const SidebarFooter = defineComponent({
  name: "SidebarFooter",
  props: { class: String },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "div",
        {
          ...(attrs as any),
          "data-slot": "sidebar-footer",
          "data-sidebar": "footer",
          class: cn("flex flex-col gap-2 p-2", props.class),
        },
        slots,
      )
  },
})

export const SidebarContent = defineComponent({
  name: "SidebarContent",
  props: { class: String },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "div",
        {
          ...(attrs as any),
          "data-slot": "sidebar-content",
          "data-sidebar": "content",
          class: cn(
            "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
            props.class,
          ),
        },
        slots,
      )
  },
})

export const SidebarGroup = defineComponent({
  name: "SidebarGroup",
  props: { class: String },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "div",
        {
          ...(attrs as any),
          "data-slot": "sidebar-group",
          "data-sidebar": "group",
          class: cn("relative flex w-full min-w-0 flex-col p-2", props.class),
        },
        slots,
      )
  },
})

export const SidebarGroupLabel = defineComponent({
  name: "SidebarGroupLabel",
  props: { class: String, asChild: { type: Boolean, default: false } },
  setup(props, { attrs, slots }) {
    const Comp: any = props.asChild ? Slot : "div"
    return () =>
      h(
        Comp,
        {
          ...(attrs as any),
          "data-slot": "sidebar-group-label",
          "data-sidebar": "group-label",
          class: cn(
            "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
            "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
            props.class,
          ),
        },
        slots,
      )
  },
})

export const SidebarGroupContent = defineComponent({
  name: "SidebarGroupContent",
  props: { class: String },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "div",
        {
          ...(attrs as any),
          "data-slot": "sidebar-group-content",
          "data-sidebar": "group-content",
          class: cn("w-full text-sm", props.class),
        },
        slots,
      )
  },
})

export const SidebarMenu = defineComponent({
  name: "SidebarMenu",
  props: { class: String },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "ul",
        {
          ...(attrs as any),
          "data-slot": "sidebar-menu",
          "data-sidebar": "menu",
          class: cn("flex w-full min-w-0 flex-col gap-1", props.class),
        },
        slots,
      )
  },
})

export const SidebarMenuItem = defineComponent({
  name: "SidebarMenuItem",
  props: { class: String },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "li",
        {
          ...(attrs as any),
          "data-slot": "sidebar-menu-item",
          "data-sidebar": "menu-item",
          class: cn("group/menu-item relative", props.class),
        },
        slots,
      )
  },
})

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

type SidebarMenuButtonVariant = VariantProps<typeof sidebarMenuButtonVariants>["variant"]
type SidebarMenuButtonSize = VariantProps<typeof sidebarMenuButtonVariants>["size"]

export const SidebarMenuButton = defineComponent({
  name: "SidebarMenuButton",
  props: {
    asChild: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    tooltip: { type: [String, Object] as any, default: undefined },
    variant: {
      type: String as () => SidebarMenuButtonVariant,
      default: "default",
    },
    size: {
      type: String as () => SidebarMenuButtonSize,
      default: "default",
    },
    class: String,
  },
  setup(props, { attrs, slots }) {
    const { isMobile, state } = useSidebar()
    const Comp: any = props.asChild ? Slot : "button"

    const buttonVNode = () =>
      h(
        Comp,
        {
          ...(attrs as any),
          "data-slot": "sidebar-menu-button",
          "data-sidebar": "menu-button",
          "data-size": props.size,
          "data-active": props.isActive,
          class: cn(
            sidebarMenuButtonVariants({
              variant: props.variant as any,
              size: props.size as any,
            }),
            props.class,
          ),
        },
        slots,
      )

    return () => {
      if (!props.tooltip) return buttonVNode()

      const tooltipProps =
        typeof props.tooltip === "string"
          ? { children: props.tooltip }
          : props.tooltip

      return h(
        Tooltip,
        null,
        {
          default: () => [
            h(
              TooltipTrigger,
              { asChild: true },
              { default: () => buttonVNode() },
            ),
            h(
              TooltipContent,
              {
                side: "right",
                align: "center",
                hidden: state.value !== "collapsed" || isMobile.value,
                ...(tooltipProps as any),
              },
            ),
          ],
        },
      )
    }
  },
})

export const SidebarSeparator = defineComponent({
  name: "SidebarSeparator",
  props: { class: String },
  setup(props, { attrs }) {
    return () =>
      h(
        Separator,
        {
          ...(attrs as any),
          "data-slot": "sidebar-separator",
          "data-sidebar": "separator",
          class: cn("bg-sidebar-border mx-2 w-auto", props.class),
        },
      )
  },
})

export const SidebarInput = defineComponent({
  name: "SidebarInput",
  props: { class: String },
  setup(props, { attrs }) {
    return () =>
      h(
        Input,
        {
          ...(attrs as any),
          "data-slot": "sidebar-input",
          "data-sidebar": "input",
          class: cn("bg-background h-8 w-full shadow-none", props.class),
        },
      )
  },
})

export const SidebarRail = defineComponent({
  name: "SidebarRail",
  props: { class: String },
  setup(props, { attrs }) {
    const { toggleSidebar } = useSidebar()
    return () =>
      h(
        "button",
        {
          ...(attrs as any),
          "data-sidebar": "rail",
          "data-slot": "sidebar-rail",
          "aria-label": "Toggle Sidebar",
          tabindex: -1,
          onClick: toggleSidebar,
          title: "Toggle Sidebar",
          class: cn(
            "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
            "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
            "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
            "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
            "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
            "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
            props.class,
          ),
        },
      )
  },
})

// weitere MenuAction/Badge/Skeleton/Sub könntest du bei Bedarf ergänzen
</script>
