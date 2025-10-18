import { type ListboxProps, type ListboxSectionProps } from "@heroui/react";
import { IconType } from "react-icons";

export enum MenuItemType {
  Nest = "nest",
}

// 菜单项类型
export type MenuItem = {
  key: string; // 菜单项的key
  title: string; // 菜单项的标题
  icon?: IconType; // 菜单项的图标
  href?: string; // 菜单项的链接
  type?: MenuItemType.Nest; // 菜单项的子菜单
  startContent?: React.ReactNode; // 菜单项的开始内容
  endContent?: React.ReactNode; // 菜单项的结束内容
  items?: MenuItem[]; // 菜单项的子菜单项
  className?: string; // 菜单项的样式
};

// 侧边栏属性
export type MenuProps = Omit<ListboxProps<MenuItem>, "children"> & {
  items: MenuItem[];
  isCompact?: boolean;
  hideEndContent?: boolean;
  iconClassName?: string;
  sectionClasses?: ListboxSectionProps["classNames"];
  classNames?: ListboxProps["classNames"];
  defaultSelectedKey: string;
  onSelect?: (key: string) => void;
};
