
function MainLayout ({header, sidebar, footer, children}){
    return(
        <div className='main_layout'>
            {sidebar}
            {header}
            <div>
                <main className='main_content'>
                    {children}
                </main>
            </div>
            {footer}
        </div>
    )
}

export default MainLayout