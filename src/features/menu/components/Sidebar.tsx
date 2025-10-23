// "use client";

// import { Accordion, AccordionItem, type Selection } from "@heroui/react";
// import React, { useEffect } from "react";
// import { Listbox, ListboxItem, ListboxSection } from "@heroui/react";
// import { cn } from "@heroui/react";
// import { MenuProps, MenuItem, MenuItemType } from "../types/Menu";
// import { findParentKey, findPathByKey, findKeyByPath } from "../utils/menu";
// import { usePathname, useRouter } from "next/navigation";

// const Sidebar = React.forwardRef<HTMLElement, MenuProps>(
//   (
//     {
//       items,
//       defaultSelectedKey,
//       onSelect,
//       hideEndContent,
//       sectionClasses: sectionClassesProp = {},
//       itemClasses: itemClassesProp = {},
//       iconClassName,
//       classNames,
//       className,
//       ...props
//     },
//     ref
//   ) => {
//     const [selected, setSelected] =
//       React.useState<React.Key>(defaultSelectedKey);
//     // const [selectedKey, setSelectedKey] = React.useState<string | null>(null);
//     // 获取当前路径
//     const pathname = usePathname();
//     const router = useRouter();
//     React.useEffect(() => {
//       const key = findKeyByPath(items, pathname) ?? defaultSelectedKey;
//       setSelected(key);
//     }, [items, pathname, defaultSelectedKey]);

//     // 获取子项选中的key
//     const [childSelectedKeys, setChildSelectedKeys] = React.useState<Selection>(
//       new Set<string>()
//     );

//     // useEffect(() => {
//     //   const parent = findParentKey(items, selected as string);
//     //   if (parent) setChildSelectedKeys((prev) => new Set([...prev, parent]));
//     // }, [selected, items]);
//     const sectionClasses = {
//       ...sectionClassesProp,
//       base: cn(sectionClassesProp?.base, "w-full"),
//       group: cn(sectionClassesProp?.group),
//       heading: cn(sectionClassesProp?.heading),
//     };

//     const itemClasses = {
//       ...itemClassesProp,
//       base: cn(itemClassesProp?.base),
//     };

//     // const [nestItemSelectedKeys, setNestItemSelectedKeys] =
//     //   React.useState<Selection>(new Set(""));

//     function renderNestItem(item: MenuItem) {
//       const Icon = item.icon;
//       // 是否有子项
//       const isNestType =
//         item.items &&
//         item.items?.length > 0 &&
//         item?.type === MenuItemType.Nest;

//       if (isNestType) {
//         // Is a nest type item , so we need to remove the href
//         delete item.href;
//       }
//       /* 2. 剔除 icon，其余属性留给 ListboxItem */
//       const { icon: _, ...itemProps } = item;
//       return (
//         <ListboxItem
//           // {...itemProps}
//           key={item.key}
//           textValue={item.title}
//           classNames={{
//             base: cn({
//               "h-auto p-0": isNestType,
//             }),
//           }}
//           endContent={
//             isNestType || hideEndContent ? null : item.endContent ?? null
//           }
//           startContent={
//             isNestType ? null : Icon ? (
//               <Icon
//                 className={cn(
//                   "text-default-500 group-data-[selected=true]:text-foreground",
//                   iconClassName
//                 )}
//                 width={24}
//               />
//             ) : (
//               item.startContent ?? null
//             )
//           }
//           title={isNestType ? null : item.title}
//         >
//           {isNestType ? (
//             <Accordion
//               className={"p-0"}
//               selectionMode="multiple"
//               defaultSelectedKeys={childSelectedKeys}
//               onSelectionChange={(keys) => {
//                 // setChildSelectedKeys(
//                 //   keys === "all"
//                 //     ? new Set<string>()
//                 //     : new Set(Array.from(keys).map(String))
//                 // );
//                 const next =
//                   keys === "all"
//                     ? new Set<string>()
//                     : new Set(Array.from(keys).map(String));
//                 setChildSelectedKeys(next);
//               }}
//             >
//               <AccordionItem
//                 key={item.key}
//                 aria-label={item.title}
//                 classNames={{
//                   heading: "pr-3",
//                   trigger: "p-0",
//                   content: "py-0 pl-4",
//                 }}
//                 title={
//                   Icon ? (
//                     <div className={"flex h-11 items-center gap-2 px-3 py-1.5"}>
//                       <Icon
//                         className={cn(
//                           "text-default-500 group-data-[selected=true]:text-foreground",
//                           iconClassName
//                         )}
//                         width={24}
//                       />
//                       <span className="text-small text-default-500 group-data-[selected=true]:text-foreground font-medium">
//                         {item.title}
//                       </span>
//                     </div>
//                   ) : (
//                     item.startContent ?? null
//                   )
//                 }
//               >
//                 {item.items && item.items?.length > 0 ? (
//                   <Listbox
//                     className={"mt-0.5"}
//                     classNames={{
//                       list: cn("border-l border-default-200 pl-4"),
//                     }}
//                     aria-labelledby="nest-item-title"
//                     // items={item.items}
//                     variant="flat"
//                     selectionMode="single"
//                     selectedKeys={selected as Selection}
//                     onSelectionChange={(keys) => {
//                       console.log("Listbox keyssss", keys);
//                       const key = Array.from(keys)[0] as string;
//                       console.log("Listbox key", key);
//                       const path = findPathByKey(items, key as string);
//                       console.log("Listbox path", path);
//                       if (path) {
//                         router.push(path);
//                       }
//                       setChildSelectedKeys(
//                         (prev) => new Set([...prev, item.key])
//                       );
//                       setSelected(key);
//                       console.log("Listbox selected", selected);
//                     }}
//                   >
//                     {item.items.map(renderItem)}
//                   </Listbox>
//                 ) : (
//                   renderItem(item)
//                 )}
//               </AccordionItem>
//             </Accordion>
//           ) : null}
//         </ListboxItem>
//       );
//     }

//     function renderItem(item: MenuItem) {
//       const isNestType =
//         item.items &&
//         item.items?.length > 0 &&
//         item?.type === MenuItemType.Nest;
//       const Icon = item.icon;
//       if (isNestType) {
//         return renderNestItem(item);
//       }
//       const { icon: _, ...newItem } = item;
//       return (
//         <ListboxItem
//           // {...newItem}
//           key={item.key}
//           endContent={hideEndContent ? null : item.endContent ?? null}
//           startContent={
//             Icon ? (
//               <Icon
//                 className={cn(
//                   "text-default-500 group-data-[selected=true]:text-foreground",
//                   iconClassName
//                 )}
//                 width={24}
//               />
//             ) : (
//               item.startContent ?? null
//             )
//           }
//           textValue={item.title}
//           title={item.title}
//           href={item.href}
//           data-key={item.key}
//         >
//           <div className="flex items-center gap-2 p-2">{item.title}</div>
//         </ListboxItem>
//       );
//     }

//     return (
//       <Listbox
//         key="default"
//         ref={ref}
//         hideSelectedIcon
//         as="nav"
//         className={cn("list-none", className)}
//         classNames={{
//           ...classNames,
//           list: cn("items-center", classNames?.list),
//         }}
//         color="default"
//         aria-label="Main navigation"
//         itemClasses={{
//           ...itemClasses,
//           base: cn(
//             "px-3 min-h-11 rounded-large h-[44px] data-[selected=true]:bg-default-100",
//             itemClasses?.base
//           ),
//           title: cn(
//             "text-small font-medium text-default-500 group-data-[selected=true]:text-foreground",
//             itemClasses?.title
//           ),
//         }}
//         items={items}
//         selectedKeys={selected as Selection}
//         selectionMode="single"
//         variant="flat"
//         onSelectionChange={(keys) => {
//           console.log("✅ selected", keys);
//           // const key = Array.from(keys)[0];
//           // // setSelected((key) => {
//           // //   return findPathByKey(items, key as string) || "#";
//           // // });
//           // // onSelect?.(key as string);
//           // const path = findKeyByPath(items, key as string);
//           // console.log("✅ selected", key, path);
//           // if (path) {
//           //   router.push(path);
//           // }
//         }}
//         // shouldFocusWrap={false}
//         // shouldUseVirtualFocus={false}
//         {...props}
//       >
//         {(item) => {
//           return item.items &&
//             item.items?.length > 0 &&
//             item?.type === MenuItemType.Nest ? (
//             renderNestItem(item)
//           ) : item.items && item.items?.length > 0 ? (
//             <ListboxSection
//               key={item.key}
//               classNames={sectionClasses}
//               title={item.title}
//             >
//               {item.items.map(renderItem)}
//             </ListboxSection>
//           ) : (
//             (console.log("item.items", item), renderItem(item))
//           );
//         }}
//       </Listbox>
//     );
//   }
// );

// Sidebar.displayName = "Sidebar";

// export default Sidebar;

"use client";

import { Accordion, AccordionItem, type Selection } from "@heroui/react";
import React, { useEffect } from "react";
import { Listbox, ListboxItem, ListboxSection } from "@heroui/react";
import { cn } from "@heroui/react";
import { MenuProps, MenuItem, MenuItemType } from "../types/Menu";
import { findParentKey, findPathByKey, findKeyByPath } from "../utils/menu";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = React.forwardRef<HTMLElement, MenuProps>(
  (
    {
      items,
      defaultSelectedKey,
      onSelect,
      hideEndContent,
      sectionClasses: sectionClassesProp = {},
      itemClasses: itemClassesProp = {},
      iconClassName,
      classNames,
      className,
      ...props
    },
    ref
  ) => {
    const [selected, setSelected] =
      React.useState<React.Key>(defaultSelectedKey);
    const [childSelected, setChildSelected] = React.useState<React.Key>();

    // 获取当前路径
    const pathname = usePathname();
    const router = useRouter();

    const sectionClasses = {
      ...sectionClassesProp,
      base: cn(sectionClassesProp?.base, "w-full"),
      group: cn(sectionClassesProp?.group),
      heading: cn(sectionClassesProp?.heading),
    };

    const itemClasses = {
      ...itemClassesProp,
      base: cn(itemClassesProp?.base),
    };
    // 有子项的菜单
    function renderNestItem(item: MenuItem) {
      const Icon = item.icon;
      // 是否有子项
      const isNestType =
        item.items &&
        item.items?.length > 0 &&
        item?.type === MenuItemType.Nest;

      if (isNestType) {
        // Is a nest type item , so we need to remove the href
        delete item.href;
      }
      return (
        <ListboxItem
          // {...itemProps}
          key={item.key}
          textValue={item.title}
          className="h-auto p-0"
        >
          {isNestType ? (
            <Accordion className={"p-0"} selectionMode="single">
              <AccordionItem
                key={item.key}
                aria-label={item.title}
                classNames={{
                  heading: "pr-3",
                  trigger: "p-0",
                  content: "py-0 pl-4",
                }}
                title={
                  Icon ? (
                    <div className={"flex h-11 items-center gap-2 px-3 py-1.5"}>
                      <Icon
                        className={cn(
                          "text-default-500 group-data-[selected=true]:text-foreground",
                          iconClassName
                        )}
                        width={24}
                      />
                      <span className="text-small text-default-500 group-data-[selected=true]:text-foreground font-medium">
                        {item.title}
                      </span>
                    </div>
                  ) : (
                    item.startContent ?? null
                  )
                }
              >
                <Listbox
                  className={"mt-0.5"}
                  classNames={{
                    list: cn("border-l border-default-200 pl-4"),
                  }}
                  aria-labelledby="nest-item-title"
                  items={item.items}
                  variant="flat"
                  selectionMode="single"
                  // selectedKeys={
                  //   new Set([selected, childSelected]) as unknown as Selection
                  // }
                  selectedKeys={childSelected as unknown as Selection}
                  itemClasses={{
                    ...itemClasses,
                    base: cn(
                      "px-3 min-h-11 rounded-large h-[44px] data-[childSelected=true]:bg-default-100",
                      itemClasses?.base
                    ),
                    title: cn(
                      "text-small font-medium text-default-500 group-data-[childSelected=true]:text-foreground",
                      itemClasses?.title
                    ),
                  }}
                  onSelectionChange={(keys) => {
                    const key = Array.from(keys)[0];
                    console.log("Selected key:", key, key === undefined);
                    if (key === undefined) {
                      return;
                    }
                    console.log("Selected key 后点击");
                    const parentKey = findParentKey(
                      items,
                      key as string
                    ) as string;
                    setSelected(parentKey);
                    setChildSelected(key);
                    console.log("Selected key:", key, typeof key);
                    const path = findPathByKey(items, key as string);
                    if (path) {
                      router.push(path);
                    }
                  }}
                >
                  {(child) => renderItem(child)}
                </Listbox>
              </AccordionItem>
            </Accordion>
          ) : null}
        </ListboxItem>
      );
    }

    // 没有子项的菜单
    function renderItem(item: MenuItem) {
      const Icon = item.icon;
      // ✅ 判断当前项是否被选中
      // const { icon: _, ...newItem } = item;
      return (
        <ListboxItem
          // {...newItem}
          {...sectionClasses}
          key={item.key}
          endContent={hideEndContent ? null : item.endContent ?? null}
          startContent={
            Icon ? (
              <Icon
                className={cn(
                  "text-default-500 group-data-[selected=true]:text-foreground",
                  iconClassName
                )}
                width={24}
              />
            ) : (
              item.startContent ?? null
            )
          }
          textValue={item.title}
          title={item.title}
        >
          <div className="flex items-center gap-2 p-2">{item.title}</div>
        </ListboxItem>
      );
    }

    return (
      <Listbox
        key="default"
        ref={ref}
        hideSelectedIcon
        as="nav"
        className={cn("list-none", className)}
        classNames={{
          ...classNames,
          list: cn("items-center", classNames?.list),
        }}
        color="default"
        aria-label="Main navigation"
        itemClasses={{
          ...itemClasses,
          base: cn(
            "px-3 min-h-11 rounded-large h-[44px] data-[selected=true]:bg-default-100",
            itemClasses?.base
          ),
          title: cn(
            "text-small font-medium text-default-500 group-data-[selected=true]:text-foreground",
            itemClasses?.title
          ),
        }}
        items={items}
        // selectedKeys={new Set([selected]) as unknown as Selection}
        selectedKeys={
          items.some((i) => i.key === selected)
            ? (new Set([selected]) as unknown as Selection)
            : (new Set() as unknown as Selection)
        }
        selectionMode="single"
        variant="flat"
        onSelectionChange={(keys) => {
          const key = Array.from(keys)[0];
          if (key === undefined) {
            return;
          }
          setSelected(key);
          const path = findPathByKey(items, key as string);
          if (path) {
            router.push(path);
          }
        }}
        {...props}
      >
        {(item) => {
          return item.items &&
            item.items?.length > 0 &&
            item?.type === MenuItemType.Nest
            ? renderNestItem(item)
            : renderItem(item);
        }}
      </Listbox>
    );
  }
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
