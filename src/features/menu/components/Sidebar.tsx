"use client";

import { Accordion, AccordionItem, type Selection } from "@heroui/react";
import React from "react";
import { Listbox, Tooltip, ListboxItem, ListboxSection } from "@heroui/react";
import { cn } from "@heroui/react";
import { MenuProps, MenuItem, MenuItemType } from "../types/Menu";

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

    const renderNestItem = React.useCallback(
      (item: MenuItem) => {
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
        /* 2. 剔除 icon，其余属性留给 ListboxItem */
        const { icon: _, ...itemProps } = item;
        return (
          <ListboxItem
            {...itemProps}
            key={item.key}
            textValue={item.title}
            classNames={{
              base: cn({
                "h-auto p-0": isNestType,
              }),
            }}
            endContent={
              isNestType || hideEndContent ? null : item.endContent ?? null
            }
            startContent={
              isNestType ? null : Icon ? (
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
            title={isNestType ? null : item.title}
          >
            {isNestType ? (
              <Accordion className={"p-0"}>
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
                      <div
                        className={"flex h-11 items-center gap-2 px-3 py-1.5"}
                      >
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
                  {item.items && item.items?.length > 0 ? (
                    <Listbox
                      className={"mt-0.5"}
                      classNames={{
                        list: cn("border-l border-default-200 pl-4"),
                      }}
                      items={item.items}
                      variant="flat"
                      shouldUseVirtualFocus={false}
                      shouldFocusWrap={false}
                    >
                      {item.items.map(renderItem)}
                    </Listbox>
                  ) : (
                    renderItem(item)
                  )}
                </AccordionItem>
              </Accordion>
            ) : null}
          </ListboxItem>
        );
      },

      [hideEndContent, iconClassName, items]
    );

    const renderItem = React.useCallback(
      (item: MenuItem) => {
        const isNestType =
          item.items &&
          item.items?.length > 0 &&
          item?.type === MenuItemType.Nest;
        const Icon = item.icon;
        if (isNestType) {
          return renderNestItem(item);
        }
        const { icon: _, ...newItem } = item;
        return (
          <ListboxItem
            {...newItem}
            key={newItem.key}
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
          ></ListboxItem>
        );
      },

      [hideEndContent, iconClassName, itemClasses?.base]
    );

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
        selectedKeys={[selected] as unknown as Selection}
        selectionMode="single"
        variant="flat"
        onSelectionChange={(keys) => {
          const key = Array.from(keys)[0];
          setSelected(key as React.Key);
          onSelect?.(key as string);
        }}
        shouldFocusWrap={false}
        shouldUseVirtualFocus={false}
        {...props}
      >
        {(item) => {
          return item.items &&
            item.items?.length > 0 &&
            item?.type === MenuItemType.Nest ? (
            renderNestItem(item)
          ) : item.items && item.items?.length > 0 ? (
            <ListboxSection
              key={item.key}
              classNames={sectionClasses}
              title={item.title}
            >
              {item.items.map(renderItem)}
            </ListboxSection>
          ) : (
            renderItem(item)
          );
        }}
      </Listbox>
    );
  }
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
