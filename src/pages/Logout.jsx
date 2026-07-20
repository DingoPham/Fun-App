const { logout } = useAuth();

<button onClick={()=>{
    logout();
}}>
    Logout
</button>