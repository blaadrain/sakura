import * as Dialog from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';

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
    <Dialog.Root
      open={isOpen}
      defaultOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <Dialog.Portal>
        <Dialog.Overlay
          className="
            bg-neutral-900/90 
            backdrop-blur-sm 
            fixed 
            inset-0
          "
        />
        <Dialog.Content
          className="
            fixed 
            drop-shadow-md 
            lg:border 
            border-neutral-700 
            top-[50%] 
            left-[50%] 
            max-h-full 
            h-full 
            md:max-h-[85vh] 
            md:h-auto 
            w-full 
            md:w-[90vw] 
            md:max-w-[450px] 
            translate-x-[-50%] 
            translate-y-[-50%] 
            rounded-lg 
            bg-neutral-800 
            p-[25px]
            focus:outline-none
          "
        >
          <Dialog.Title className="text-2xl text-center font-bold mb-4">
            {title}
          </Dialog.Title>
          <Dialog.Description className="mb-5 text-lg leading-normal text-center">
            {description}
          </Dialog.Description>
          <div className="">{children}</div>
          <Dialog.Close asChild>
            <button
              className="
              text-neutral-400 
              hover:text-white 
                absolute 
                top-[15px] 
                right-[15px] 
                inline-flex 
                h-[35px] 
                w-[35px] 
                appearance-none 
                justify-center 
                items-center 
                rounded-full 
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
