import { MenuItem } from "../types/Menu";

// 递归根据菜单key查找路径
export function findPathByKey(
  items: MenuItem[],
  key: string
): string | undefined {
  for (const item of items) {
    if (item.key === key && item.href && item.href !== "#") return item.href;
    if (item.items?.length) {
      const child = findPathByKey(item.items, key);
      if (child) return child;
    }
  }
  return undefined;
}

// 递归根据路径查找key
export function findKeyByPath(
  items: MenuItem[],
  path: string
): string | undefined {
  for (const item of items) {
    if (item.href === path) return item.key;
    if (item.items?.length) {
      const child = findKeyByPath(item.items, path);
      if (child) return child;
    }
  }
  return undefined;
}

// 递归根据key查找父级key
export function findParentKey(
  items: MenuItem[],
  targetKey: string
): string | undefined {
  for (const item of items) {
    if (item.items?.length) {
      // 先看当前节点的子项里有没有目标
      if (item.items.some((child) => child.key === targetKey)) {
        return item.key;
      }
      // 递归查更深层级
      const found = findParentKey(item.items, targetKey);
      if (found) return found;
    }
  }
  return undefined;
}
