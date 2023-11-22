interface ModalProps {
    children?: any;
    onClose: () => void;
    className?: string;
}

export function Modal({ children, onClose, className }: ModalProps) {
    return (
        <div className= 'absolute top-0 left-0 w-full min-h-full flex'>
            <div onClick={onClose} className='z-20 absolute h-full w-full top-0 left-0 bg-black/50'></div>
            <div className='z-30 absolute top-0 right-0 flex min-w-modal max-w-xl h-full overflow-y-auto bg-white'>
                {children}
            </div>
        </div>
    );
}
