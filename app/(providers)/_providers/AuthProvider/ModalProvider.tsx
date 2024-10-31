"use client";

import { useModalStore } from "@/zustand/modal.store";
import { PropsWithChildren } from "react";
import Backdrop from "../../(root)/_components/Backdrop/Backdrop";

function ModalProvider({ children }: PropsWithChildren) {
  const modal = useModalStore((state) => state.modal);

  return (
    <>
      {children}
      {modal && <Backdrop>{modal}</Backdrop>}
    </>
  );
}

export default ModalProvider;
