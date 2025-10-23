import { Chip } from "@heroui/react";

import { MenuItem, MenuItemType } from "../types/Menu";
import {
  HiAdjustmentsHorizontal,
  HiMiniFire,
  HiChartPie,
  HiMiniCalendarDays,
  HiMiniCube,
  HiMiniRectangleStack,
  HiMiniUsers,
  HiMiniUser,
  HiMiniPresentationChartBar,
} from "react-icons/hi2";

export const sectionNestedItems: MenuItem[] = [
  {
    key: "home",
    href: "/",
    icon: HiChartPie,
    title: "数据看板",
    endContent: <HiMiniFire className="text-red-500" />,
  },
  {
    key: "projects",
    href: "#",
    icon: HiMiniCube,
    title: "店铺装修",
    // endContent: <HiAdjustmentsHorizontal />,
  },
  {
    key: "tasks",
    href: "#",
    icon: HiMiniCalendarDays,
    title: "预约管理",
    endContent: <HiAdjustmentsHorizontal />,
    type: MenuItemType.Nest,
    items: [
      {
        key: "tasks_1",
        href: "/reservation/details-list",
        // href: "#",
        title: "预约明细",
      },
      {
        key: "tasks_2",
        href: "/reservation/dashboard",
        title: "预约看板",
      },
    ],
  },
  {
    key: "team",
    href: "#",
    icon: HiMiniRectangleStack,
    title: "作品管理",
    type: MenuItemType.Nest,
    items: [
      {
        key: "team_1",
        href: "#",
        title: "作品管理",
      },
      {
        key: "team_2",
        href: "#",
        title: "作品分类",
      },
      {
        key: "team_3",
        href: "#",
        title: "数据看板",
      },
    ],
  },
  {
    key: "customer",
    href: "/customer/details-list",
    icon: HiMiniUsers,
    title: "客户管理",
  },
  {
    key: "employee",
    href: "/employee/details-list",
    icon: HiMiniUser,
    title: "员工管理",
  },
  {
    key: "perks",
    href: "#",
    icon: HiMiniPresentationChartBar,
    title: "数据分析",
    endContent: (
      <Chip size="sm" variant="flat" className="bg-yellow-500 text-zinc-50">
        New
      </Chip>
    ),
  },
  // {
  //   key: "cap_table",
  //   title: "Cap Table",
  //   icon: HiAcademicCap,
  //   type: MenuItemType.Nest,
  //   items: [
  //     {
  //       key: "shareholders",
  //       icon: HiAcademicCap,
  //       href: "#",
  //       title: "Shareholders",
  //     },
  //     {
  //       key: "note_holders",
  //       icon: HiAcademicCap,
  //       href: "#",
  //       title: "Note Holders",
  //     },
  //     {
  //       key: "transactions_log",
  //       icon: HiAcademicCap,
  //       href: "#",
  //       title: "Transactions Log",
  //     },
  //   ],
  // },
  // {
  //   key: "expenses",
  //   href: "#",
  //   icon: HiAcademicCap,
  //   title: "Expenses",
  // },
  // {
  //   key: "expenses1",
  //   href: "#",
  //   icon: HiAcademicCap,
  //   title: "Expenses",
  // },
  // {
  //   key: "expenses2",
  //   href: "#",
  //   icon: HiAcademicCap,
  //   title: "Expenses",
  // },
  // {
  //   key: "expenses5",
  //   href: "#",
  //   icon: HiAcademicCap,
  //   title: "Expenses",
  // },
  // {
  //   key: "expenses3",
  //   href: "#",
  //   icon: HiAcademicCap,
  //   title: "Expenses",
  // },
  // {
  //   key: "expenses4",
  //   href: "#",
  //   icon: HiAcademicCap,
  //   title: "Expenses",
  // },
  // {
  //   key: "expenses6",
  //   href: "#",
  //   icon: HiAcademicCap,
  //   title: "Expenses",
  // },
  // {
  //   key: "expenses7",
  //   href: "#",
  //   icon: HiAcademicCap,
  //   title: "Expenses",
  // },
  // {
  //   key: "expenses8",
  //   href: "#",
  //   icon: HiAcademicCap,
  //   title: "Expenses",
  // },
  // {
  //   key: "expenses9",
  //   href: "#",
  //   icon: HiAcademicCap,
  //   title: "Expenses",
  // },
  // {
  //   key: "expenses11",
  //   href: "#",
  //   icon: HiAcademicCap,
  //   title: "Expenses",
  // },
  // {
  //   key: "expenses12",
  //   href: "#",
  //   icon: HiAcademicCap,
  //   title: "Expenses",
  // },
];
