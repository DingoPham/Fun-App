import { useState } from "react"

function UserProfile({user, onSave}){

    const [name,setName] = useState(user.name)
    const [email,setEmail] = useState(user.email)

    const handleSubmit = (e)=>{
        e.preventDefault()

        onSave({
            ...user,
            name,
            email
        })
    }

    return(
        <form onSubmit={handleSubmit} className="user-edit-form">

            <h3>Edit User</h3>

            <div>
                <label>Name</label>
                <input
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
            </div>

            <div>
                <label>Email</label>
                <input
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </div>

            <button type="submit">Save</button>

        </form>
    )
}

export default UserProfile