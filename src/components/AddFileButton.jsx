import { BsPlusCircleDotted } from "react-icons/bs"

function AddFileButton({ onClick }) {
    return (
        <div className="empty-add-file" onClick={onClick}>
            <BsPlusCircleDotted size={40} />
            <p>Add file</p>
        </div>
    )
}

export default AddFileButton