import {useEffect, useRef, useState} from "react";
import {api} from "../../services/API";
import { BsPlusCircleDotted } from "react-icons/bs";
import Pagination from "../../components/Pagination";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import AddFileButton from "../../components/AddFileButton";
import ReturnButton from "../../components/ReturnButton";

function Illustration(){
    const [images, setImages] = useState([])
    const [selectedImage, setSelectedImage] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)

    const fileInputRef = useRef(null)
    useEffect(() => {
        api.get('/illustration')
            .then(data =>{
                setImages(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, []);
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") setSelectedImage(null)
        }

        window.addEventListener("keydown", handleEsc)
        return () => window.removeEventListener("keydown", handleEsc)
    }, [])



    const itemsPerPage = 8

    const imagesWithAddSlot = [...images, { id: "add-slot", isAdd: true }]

    const indexOfLast = currentPage * itemsPerPage
    const indexOfFirst = indexOfLast - itemsPerPage
    const currentImages = imagesWithAddSlot.slice(indexOfFirst, indexOfLast)

    const openFilePicker = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0]

        if (!file) return

        try{
            const formData = new FormData()
            formData.append("file", file)

            const created = await api.upload('/illustration/upload', formData)

            setImages(prev => [...prev, created])

            e.target.value = null
        }
        catch(err){
            console.error(err)
        }
    }

    if(loading){
        return <LoadingSpinner />
    }
    if(images.length === 0){
        return (
            <>
                <ReturnButton />
                <div className='empty-container'>
                    <EmptyState />
                    <AddFileButton onClick={openFilePicker}/>

                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{display: "none"}}
                        onChange={handleFileChange}
                    />
                </div>
            </>
        )
    }



    return(
        <>
            <ReturnButton />
            <div className='illustration-container'>
                {currentImages.map((img, index) => {
                    if (img.isAdd) {
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
                        <img key={img.id }
                             src={img.imageUrl}
                             alt={img.title}
                             onClick={() => setSelectedImage(img.imageUrl)}/>
                    )
                })}
                {selectedImage && (
                    <div className="image-overlay" onClick={() => setSelectedImage(null)}>
                        <img src={selectedImage}
                             alt=""
                             onClick={(e) => e.stopPropagation()} />
                    </div>
                )}
            </div>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
            <Pagination totalItems={images.length + 1}
                        itemsPerPage={itemsPerPage}
                        onPageData={setCurrentPage} />
        </>
    )
}

export default Illustration