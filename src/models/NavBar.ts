import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type Items = {
  title?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
}
  href?: string | any;
};

type Style = {
  paddingLeft: number;
};

export type ChildNavBar = Items & {
  items?: Items[];
  title?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
}
  href?: string | any;
};

export type NavBarCommon = {
  title: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
}
  href?: string | any;
  items?: ChildNavBar[];
};

export type NavBarItem = {
  depth: number;
  icon: any;
  title: string;
  open?: boolean;
  href: string;
  label?: string;
  isExternalLink: boolean;
  children?: any;
  expandedNavTitle: string,
  setExpandedNavTitle: Function
};

export type NavBarExpandItem = {
  icon: any;
  title: string;
  open?: boolean;
  children?: any;
  style: Style;
  expandedNavTitle: string,
  setExpandedNavTitle: Function
};
