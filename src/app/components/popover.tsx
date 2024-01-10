import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type PopoverProps = {
  isOpen: boolean;
  children: React.ReactNode;
  parentRef: React.RefObject<HTMLElement>;
  close: () => void;
};

type PositionType = {
  top: string;
  left: string;
};

function PopoverContent({
  children,
  close,
  parentRef,
}: {
  children: React.ReactNode;
  close: () => void;
  parentRef: React.RefObject<HTMLElement>;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<PositionType>({
    top: '0',
    left: '0',
  });

  useLayoutEffect(() => {
    if (parentRef.current && contentRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
      const top = rect.top + rect.height + 2;
      const contentRect = contentRef.current.getBoundingClientRect();
      const left = rect.left + rect.width / 2 - contentRect.width / 2;
      setPosition({ top: `${top}px`, left: `${left}px` });
    }

    const clickListener = (e: MouseEvent) => {
      if (
        e.target !== contentRef.current &&
        !contentRef.current?.contains(e.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener('click', clickListener);

    return () => {
      document.removeEventListener('click', clickListener);
    };
  }, []);

  return (
    <div
      ref={contentRef}
      style={{ top: position.top, left: position.left }}
      className='size-50 absolute bg-white'
    >
      {children}
    </div>
  );
}

export function Popover({ isOpen, children, close, parentRef }: PopoverProps) {
  if (isOpen) {
    return createPortal(
      <PopoverContent close={close} parentRef={parentRef}>
        {children}
      </PopoverContent>,
      document.body
    );
  }

  return null;
}
