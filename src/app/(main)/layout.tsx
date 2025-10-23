"use client";

import React, { useEffect } from "react";
import { HiMiniSparkles } from "react-icons/hi2";
import { Avatar, Button, ScrollShadow, Spacer } from "@heroui/react";
import Sidebar from "@/features/menu/components/Sidebar";
import { sectionNestedItems } from "@/features/menu/components/SidebarItem";
import { TbLogout } from "react-icons/tb";
import { Image } from "@heroui/react";
import { userInfo } from "@/types/user/UserInfo";
import {
  IoIosNotificationsOutline,
  IoMdNotificationsOutline,
} from "react-icons/io";
import { getGreeting } from "@/utils/DateUtil";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  // 处理问候语，客户端渲染避免水合差异
  const [greetingText, setGreetingText] = React.useState("");

  useEffect(() => {
    setGreetingText(getGreeting());
    console.log("layout 加载");
  }, []);

  return (
    <div className="flex h-screen w-full">
      {/* 左侧 Sidebar */}
      <aside className="w-72 border-r-small border-divider flex flex-col">
        <div className="p-6">
          <Spacer y={4} />
          <div className="flex items-center gap-2 px-2">
            <div className=" flex h-10 w-10 items-center justify-center rounded-full">
              <Image
                alt="元识·ONE"
                height={28}
                width={28}
                src={"/logo/image.png"}
              />
            </div>

            <span className="text-lg font-bold uppercase">元识·ONE</span>
          </div>
          <Spacer y={8} />
          <hr className="w-full border-divider " />
        </div>

        <ScrollShadow hideScrollBar className="flex-1 p-6 pt-0">
          <Sidebar defaultSelectedKey="home" items={sectionNestedItems} />
        </ScrollShadow>

        <div className="p-6 mt-auto">
          <Button
            fullWidth
            className="text-default-500 data-[hover=true]:text-foreground justify-start"
            startContent={
              <HiMiniSparkles className="text-default-500" width={24} />
            }
            variant="light"
          >
            帮助和升级
          </Button>
          <Button
            fullWidth
            className="text-default-500 data-[hover=true]:text-foreground justify-start"
            startContent={
              <TbLogout className="text-default-500 rotate-180" width={24} />
            }
            variant="light"
          >
            退出登录
          </Button>
        </div>
      </aside>

      {/* 右侧内容区 */}
      {/* <main className="flex-1 overflow-auto bg-content1"> */}
      <div className="w-full flex-1 flex-col p-4">
        {/* 右侧上内容 */}
        <header className="rounded-medium border-small border-divider flex items-center gap-3 p-4">
          <div className="grow-3">
            <h2 className="text-medium text-default-700 font-medium">
              {greetingText} ：{userInfo.name}
            </h2>
          </div>
          {userInfo.messageCount > 0 ? (
            <div className="size-8 animate-bounce  rounded-full items-center justify-center flex border-1 border-red-300">
              <IoIosNotificationsOutline className=" text-red-500" size={20} />
            </div>
          ) : (
            <div className="size-8  rounded-full items-center justify-center flex border-1 border-zinc-300">
              <IoMdNotificationsOutline size={20} />
            </div>
          )}
          <div className="">
            <Avatar src={userInfo.image} size="sm" />
          </div>
        </header>
        {/* 这里是右侧下内容区域，也是主内容区 */}
        <main className="mt-4 h-[90%] w-full overflow-visible">
          <div className="rounded-medium border-small border-divider flex h-full w-full flex-col gap-4 ">
            {children}
          </div>
        </main>
      </div>
      {/* </main> */}
    </div>
  );
}
