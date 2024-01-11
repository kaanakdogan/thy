import { createPortal } from 'react-dom';

export function Modal({
  isOpen,
  children,
  onClose,
  testId,
}: {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  testId?: string;
}) {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      data-testid={`modal-${testId}`}
      className='absolute left-0 top-0 h-screen w-screen bg-gray-600/50'
    >
      <div className='m-auto flex h-40 w-60 translate-y-full flex-col rounded-lg bg-white opacity-100'>
        <button
          className='w-5 self-end rounded rounded-tr-lg bg-[#E81932] text-white'
          onClick={onClose}
        >
          x
        </button>
        <div className='p-3'>{children}</div>
      </div>
    </div>,
    document.body
  );
}
