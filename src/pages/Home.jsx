import banner from "../assets/img/banner.png"
import {useEffect, useState} from "react";
import {api} from "../services/API";
import Pagination from "../components/Pagination";

function Home(){
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([])
    const [selectedMedia, setSelectedMedia] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [filterType, setFilterType] = useState("all")
    const [sortOrder, setSortOrder] = useState("newest")

    const itemsPerPage = 5

    const indexOfLast = currentPage * itemsPerPage
    const indexOfFirst = indexOfLast - itemsPerPage

    useEffect(() => {
        api.get("/illustration").then(setImages)
        api.get("/animation").then(setVideos)
    }, [])

    const media = [
        ...(images || []).map(i => ({...i, type:"image"})),
        ...(videos || []).map(v => ({...v, type:"video"}))
    ]

    const filteredMedia = media
        .filter(item => {
            if(filterType === "image") return item.type === "image"
            if(filterType === "video") return item.type === "video"
            return true
        })
        .sort((a,b)=>{
            if(sortOrder === "newest") return b.id - a.id
            if(sortOrder === "oldest") return a.id - b.id
            return 0
        })

    const currentMedia = filteredMedia.slice(indexOfFirst, indexOfLast)

    const handleDelete = async (item) => {

        const endpoint =
            item.type === "image"
                ? `/illustration/${item.id}`
                : `/animation/${item.id}`

        await api.delete(endpoint)

        if(item.type === "image"){
            setImages(prev => prev.filter(i => i.id !== item.id))
        }else{
            setVideos(prev => prev.filter(v => v.id !== item.id))
        }
    }

    const handleEdit = async (item) => {

        const newUrl = prompt(
            "Enter new URL",
            item.type === "image" ? item.imageUrl : item.videoUrl
        )

        if(!newUrl) return

        const newTitle = prompt("Enter title", item.title)

        const endpoint =
            item.type === "image"
                ? `/illustration/${item.id}`
                : `/animation/${item.id}`

        const body =
            item.type === "image"
                ? {
                    imageUrl: newUrl,
                    title: newTitle
                }
                : {
                    videoUrl: newUrl,
                    title: newTitle
                }

        const updated = await api.put(endpoint, body)

        if(item.type === "image"){
            setImages(prev =>
                prev.map(i => i.id === item.id ? updated : i)
            )
        }else{
            setVideos(prev =>
                prev.map(v => v.id === item.id ? updated : v)
            )
        }
    }
    return(
        <>
            <div className='content_main'>
                <h3>Welcome, Guest</h3>
                <h3>Welcome back, Master</h3>
                <div className='banner_content' style={{backgroundImage: `url(${banner})`}}/>
            </div>
            <div className='home-table-container'>
                <div className="table-filter">

                    <select
                        value={filterType}
                        onChange={(e)=> {
                            setFilterType(e.target.value)
                            setCurrentPage(1)
                        }}
                    >
                        <option value="all">All</option>
                        <option value="image">Images</option>
                        <option value="video">Videos</option>
                    </select>

                    <select
                        value={sortOrder}
                        onChange={(e)=>{
                            setSortOrder(e.target.value)
                            setCurrentPage(1)
                        }}
                    >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>

                </div>
                <table className="home_table">
                    <thead>
                    <tr>
                        <th>Preview</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {currentMedia.map((item,index)=>(
                        <tr key={index}>
                            <td>
                                {item.type === "image" ? (
                                    <img
                                        src={item.imageUrl}
                                        alt=""
                                        onClick={() => setSelectedMedia(item)}
                                        style={{cursor:"pointer"}}
                                    />
                                ) : (
                                    <video
                                        src={item.videoUrl}
                                        muted
                                        onClick={() => setSelectedMedia(item)}
                                        style={{cursor:"pointer"}}
                                    />
                                )}
                            </td>

                            <td>{item.title}</td>

                            <td>{item.type}</td>

                            <td>
                                <div className='action-button-container'>
                                    <button onClick={() => handleEdit(item)} className='action-button-ui'>
                                        Edit
                                    </button>

                                    <button onClick={() => handleDelete(item)} className='action-button-ui'>
                                        Delete
                                    </button>
                                </div>
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </table>
                <Pagination
                    totalItems={filteredMedia.length}
                    itemsPerPage={itemsPerPage}
                    onPageData={setCurrentPage}
                />
                {selectedMedia && (
                    <div
                        className="media_overlay"
                        onClick={() => setSelectedMedia(null)}
                    >
                        {selectedMedia.type === "image" ? (
                            <img
                                src={selectedMedia.imageUrl}
                                alt=""
                                onClick={(e) => e.stopPropagation()}
                            />
                        ) : (
                            <video
                                src={selectedMedia.videoUrl}
                                controls
                                autoPlay
                                onClick={(e) => e.stopPropagation()}
                            />
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default Home