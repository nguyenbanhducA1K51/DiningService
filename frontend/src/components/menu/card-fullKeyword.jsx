import { Modal } from 'react-bootstrap';
export const FloatFullKeyword = ({ prop }) => {

    const { keywords,modelVisible, modelClose}=prop
    return (
        <>
<div> <span> full keyword</span></div>
            <Modal  show={modelVisible} onHide={modelClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Full keywords </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="flex space-x-3 w-full justify-center flex-wrap">
                        {keywords.map((key, index) => (
                            <div key={key} id={index} className="flex items-center space-x-1 border border-gray-500 rounded pl-1 pr-1">
                                <span>{key}</span>
                             
                            </div>
                        ))}

                    </div>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>

        </>
    )
}