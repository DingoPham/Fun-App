import { useEffect, useState } from "react"
import { api } from "../../services/API"

function UserTable(){

    const [users,setUsers] = useState([])

    useEffect(()=>{
        api.get("/users").then(setUsers)
    },[])

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

                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>

                        <td>
                            <button>Edit</button>
                            <button>Delete</button>
                        </td>

                    </tr>
                ))}
            </tbody>

        </table>
    )
}

export default UserTable