"use client";

import InviteModal from "@/components/custom/modals/invite-modal";
import ManageMembersModal from "@/components/custom/modals/manage-members-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <InviteModal />
      <ManageMembersModal />
    </>
  );
};
