import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type IItems = {
  title?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
}
  href?: string | any;
};

type IStyle = {
  paddingLeft: number;
};

export type IChildNavBar = IItems & {
  items?: IItems[];
  title?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
}
  href?: string | any;
};

export type INavBarCommon = {
  title: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
}
  href?: string | any;
  items?: IChildNavBar[];
};

export type INavBarItem = {
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

export type INavBarExpandItem = {
  icon: any;
  title: string;
  open?: boolean;
  children?: any;
  style: IStyle;
  expandedNavTitle: string,
  setExpandedNavTitle: Function
};
