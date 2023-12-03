import { Button, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { UserPopoverContent } from "./UserPopoverContent.tsx";

interface UserPopoverProps {
  userId: string;
  setUserId: (newId: string) => void;
}

export const UserPopover = ({ userId, setUserId }: UserPopoverProps) => {
  const [isUserPopoverOpen, setIsUserPopoverOpen] = useState(false);

  return (
    <Popover
      content={
        <UserPopoverContent
          userId={userId}
          setUserId={setUserId}
          closePopover={() => setIsUserPopoverOpen(false)}
        />
      }
      title="Switch User ID"
      trigger="click"
      open={isUserPopoverOpen}
      onOpenChange={() => setIsUserPopoverOpen(true)}
    >
      <Button shape={"circle"} size={"large"} icon={<UserOutlined />} />
    </Popover>
  );
};
