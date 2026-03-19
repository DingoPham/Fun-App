import { useEffect, useState } from "react"
import { api } from "../../services/API"

function UserTable(){

    const [users,setUsers] = useState([])
    const [editingId,setEditingId] = useState(null)
    const [editData,setEditData] = useState({
        username:"",
        email:"",
        role:""
    })

    useEffect(()=>{
        api.get("/users").then(setUsers)
    },[])

    // 🗑 Delete
    const handleDelete = async(id)=>{
        const confirmDelete = window.confirm("Delete this user?")
        if(!confirmDelete) return

        await api.delete(`/users/${id}`)
        setUsers(prev => prev.filter(u => u.id !== id))
    }

    // ✏️ Start edit
    const handleEdit = (user)=>{
        setEditingId(user.id)
        setEditData({
            username: user.username,
            email: user.email,
            role: user.role
        })
    }

    // 💾 Save edit
    const handleSave = async(id)=>{
        const updated = await api.put(`/users/${id}`, editData)

        setUsers(prev =>
            prev.map(u => u.id === id ? updated : u)
        )

        setEditingId(null)
    }

    return(
        <table className="home_table">

            <thead>
            <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
            </tr>
            </thead>

            <tbody>
            {users.map(user=>(
                <tr key={user.id}>

                    {/* USERNAME */}
                    <td>
                        {editingId === user.id ? (
                            <input
                                value={editData.username}
                                onChange={(e)=>setEditData({...editData, username:e.target.value})}
                            />
                        ) : (
                            user.username
                        )}
                    </td>

                    {/* EMAIL */}
                    <td>
                        {editingId === user.id ? (
                            <input
                                value={editData.email}
                                onChange={(e)=>setEditData({...editData, email:e.target.value})}
                            />
                        ) : (
                            user.email
                        )}
                    </td>

                    {/* ROLE */}
                    <td>
                        {editingId === user.id ? (
                            <select
                                value={editData.role}
                                onChange={(e)=>setEditData({...editData, role:e.target.value})}
                            >
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        ) : (
                            user.role
                        )}
                    </td>

                    {/* ACTION */}
                    <td>
                        {editingId === user.id ? (
                            <>
                                <button onClick={()=>handleSave(user.id)}>
                                    Save
                                </button>
                                <button onClick={()=>setEditingId(null)}>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={()=>handleEdit(user)}>
                                    Edit
                                </button>
                                <button onClick={()=>handleDelete(user.id)}>
                                    Delete
                                </button>
                            </>
                        )}
                    </td>

                </tr>
            ))}
            </tbody>

        </table>
    )
}

export default UserTable