
function MainLayout ({header, sidebar, footer, children}){
    return(
        <div>
            {header}
            <div>
                {sidebar}
                <main className='main_layout'>
                    {children}
                </main>
            </div>
            {footer}
        </div>
    )
}

export default MainLayout