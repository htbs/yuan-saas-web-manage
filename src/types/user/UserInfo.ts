import { User } from "@heroui/react";

export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  messageCount: number;
};

export const userInfo: User = {
  id: "1",
  name: "John Doe",
  email: "<EMAIL>",
  image: "https://avatars.githubusercontent.com/u/1024025?v=4",
  role: "admin",
  messageCount: 0,
};
