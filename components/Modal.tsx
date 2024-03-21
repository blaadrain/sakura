import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

type ModalProps = {
  isOpen: boolean;
  title: string;
  description: string;
  children: React.ReactNode;
  onOpenChange: (open: boolean) => void;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  description,
  children,
  onOpenChange,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="
            fixed 
            inset-0 
            bg-neutral-900/90 
            backdrop-blur-sm
          "
        />
        <Dialog.Content
          className="
            fixed 
            left-[50%] 
            top-[50%] 
            h-full 
            max-h-full 
            w-full 
            translate-x-[-50%] 
            translate-y-[-50%] 
            rounded-lg 
            border-neutral-700 
            bg-neutral-800 
            p-[25px] 
            drop-shadow-md 
            focus:outline-none 
            md:h-auto 
            md:max-h-[85vh] 
            md:w-[90vw] 
            md:max-w-[450px]
            lg:border
          "
        >
          <Dialog.Title className="mb-4 text-center text-2xl font-bold">
            {title}
          </Dialog.Title>
          <Dialog.Description className="mb-5 text-center text-lg leading-normal">
            {description}
          </Dialog.Description>
          <div className="">{children}</div>
          <Dialog.Close asChild>
            <button
              className="
              absolute 
              right-[15px] 
                top-[15px] 
                inline-flex 
                h-[35px] 
                w-[35px] 
                appearance-none 
                items-center 
                justify-center 
                rounded-full 
                text-neutral-400 
                hover:text-white 
                focus:outline-none
              "
            >
              <IoMdClose size={35} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
