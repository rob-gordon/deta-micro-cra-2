import { ComponentPropsWithRef, ElementType, ReactNode } from "react";
import { createClassGroup } from "tonami";

const timesSpacer = (x?: number) => `calc(var(--spacer) * ${x})`;
const exists = (x: unknown) => Boolean(typeof x !== "undefined");
const firstExists = (x: unknown[]): any => {
  for (let n of x) {
    if (typeof n !== "undefined") return n;
  }
};
const { useClassGroup } = createClassGroup<BoxProps>(
  {
    css: { paddingTop: (x) => timesSpacer(firstExists([x.pt, x.py, x.p])) },
    condition: (x) => [x.pt, x.py, x.p].some(exists),
  },
  {
    css: { paddingRight: (x) => timesSpacer(firstExists([x.pr, x.px, x.p])) },
    condition: (x) => [x.pr, x.px, x.p].some(exists),
  },
  {
    css: { paddingBottom: (x) => timesSpacer(firstExists([x.pb, x.py, x.p])) },
    condition: (x) => [x.pb, x.py, x.p].some(exists),
  },
  {
    css: { paddingLeft: (x) => timesSpacer(firstExists([x.pl, x.px, x.p])) },
    condition: (x) => [x.pl, x.px, x.p].some(exists),
  },
  {
    css: {
      display: "grid",
    },
    vars: {
      spacer: "5px",
    },
  },
  {
    css: {
      gridAutoFlow: (x) => x.flow,
    },
    condition: (x) => Boolean(x.flow),
  },
  {
    css: {
      gridTemplate: (x) => x.template,
    },
    condition: (x) => Boolean(x.template),
  },
  { css: { gap: (x) => x.gap && timesSpacer(x.gap) }, condition: (x) => x.gap },
  { css: { placeContent: (x) => x.content }, condition: (x) => x.content },
  { css: { placeItems: (x) => x.items }, condition: (x) => x.items },
  { css: { placeSelf: (x) => x.self }, condition: (x) => x.self },
  { css: { gridArea: (x) => x.area }, condition: (x) => x.area }
);

type BoxProps = {
  children: ReactNode;
  p?: number;
  px?: number;
  py?: number;
  pt?: number;
  pr?: number;
  pb?: number;
  pl?: number;
  flow?: string;
  template?: string;
  gap?: number;
  content?: string;
  items?: string;
  self?: string;
  area?: string;
};

type AsProps<T extends ElementType> = { as?: T } & ComponentPropsWithRef<T>;

export default function Box<T extends ElementType = "div">({
  as,
  children,
  p,
  px,
  py,
  pt,
  pr,
  pb,
  pl,
  flow,
  template,
  gap,
  content,
  items,
  self,
  area,
  ...props
}: AsProps<T> & BoxProps) {
  const c = useClassGroup({
    children,
    p,
    px,
    py,
    pt,
    pr,
    pb,
    pl,
    flow,
    template,
    gap,
    content,
    items,
    self,
    area,
  });
  const Component = as ?? "div";
  return (
    <Component {...props} {...c}>
      {children}
    </Component>
  );
}
