import ReactDOM from 'react-dom';
import './modal.css';
import {EventDto} from "../../types/EventDto.ts";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedEvent: EventDto;
    venueName: string | undefined;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, selectedEvent, venueName }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modal">
            <div className="modal-content">
                <h1>{selectedEvent.name}</h1>

                <p>start time: {selectedEvent.startDateDay}</p>

                <p>venue: {venueName}</p>
                <button onClick={onClose}>close</button>

            </div>
        </div>,
        // @ts-ignore
        document.getElementById('modal-root')
);
};

export default Modal;
