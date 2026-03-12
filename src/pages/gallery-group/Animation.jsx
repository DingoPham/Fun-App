import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import AddFileButton from "../../components/AddFileButton";
import {useEffect, useRef, useState} from "react";
import {api} from "../../services/API";
import Pagination from "../../components/Pagination";
import { BsPlusCircleDotted } from "react-icons/bs";

function Animation(){
    const [videos, setVideos] = useState([])
    const [selectedVideo, setSelectedVideo] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)

    const fileInputRef = useRef(null)

    useEffect(() => {
        api.get('/animation')
            .then(data => {
                setVideos(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") setSelectedVideo(null)
        }

        window.addEventListener("keydown", handleEsc)
        return () => window.removeEventListener("keydown", handleEsc)
    }, [])

    const itemsPerPage = 8

    const videosWithAddSlot = [...videos, { id: "add-slot", isAdd: true }]

    const indexOfLast = currentPage * itemsPerPage
    const indexOfFirst = indexOfLast - itemsPerPage
    const currentVideos = videosWithAddSlot.slice(indexOfFirst, indexOfLast)

    const openFilePicker = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = async (e) => {

        const file = e.target.files[0]
        if (!file) return

        try {
            const formData = new FormData()
            formData.append("file", file)

            const created = await api.upload('/animation/upload', formData)

            setVideos(prev => [...prev, created])

            e.target.value = null
        }
        catch (err) {
            console.error(err)
        }
    }

    if (loading) {
        return <LoadingSpinner />
    }

    if (videos.length === 0) {
        return (
            <>
                <div className='empty-container'>
                    <EmptyState />
                    <AddFileButton onClick={openFilePicker} />

                    <input
                        type="file"
                        accept="video/*"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                </div>
            </>
        )
    }

    return (
        <>
            <div className='illustration-container'>

                {currentVideos.map((video, index) => {

                    if (video.isAdd) {
                        return (
                            <div
                                key={`add-slot-${index}`}
                                className='increase-img-slot'
                                onClick={openFilePicker}
                            >
                                <div className='increase-img-slot-button'>
                                    <BsPlusCircleDotted />
                                </div>
                            </div>
                        )
                    }

                    return (
                        <video
                            key={video.id}
                            src={video.videoUrl}
                            onClick={() => setSelectedVideo(video.videoUrl)}
                            muted
                        />
                    )
                })}

                {selectedVideo && (
                    <div
                        className="image-overlay"
                        onClick={() => setSelectedVideo(null)}
                    >
                        <video
                            src={selectedVideo}
                            controls
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                )}

            </div>

            <input
                type="file"
                accept="video/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
            />

            <Pagination
                totalItems={videos.length + 1}
                itemsPerPage={itemsPerPage}
                onPageData={setCurrentPage}
            />
        </>
    )
}

export default Animation