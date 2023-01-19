import { useState } from 'react'
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase/firebase'
import { Modal, Button, Placeholder } from 'rsuite';
import "rsuite/dist/rsuite.css";
import TextareaAutosize from 'react-textarea-autosize';
import "./styles/textarea.css"

function EditTodo({DATABASE_NAME, open, onClose, preValue, id }) {

    const [valueUpdate, setValueUpdate] = useState(preValue)

    /* function to update firestore */
    const handleUpdate = async (e) => {
        e.preventDefault()
        if(valueUpdate === "")
        {
            alert("Todo should not be Empty.")
            return;
        }
        const taskDocRef = doc(db, DATABASE_NAME, id)
        try {
            await updateDoc(taskDocRef, {
                todo: valueUpdate
            })
            onClose()
        } catch (err) {
            alert(err)
        }
    }

    return (
        <>
            <Modal size={"md"} open={open} backdrop="static" onClose={onClose}>
                <Modal.Header>
                    <Modal.Title>Update Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="grow-wrap">
                        <textarea value={valueUpdate}
                        autoFocus
                        onChange={(e) => setValueUpdate(e.target.value)}  
                        name="text" id="text">
                        </textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onClose} appearance="subtle">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} appearance="primary">
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};



export default EditTodo
