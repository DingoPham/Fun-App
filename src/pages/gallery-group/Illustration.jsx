import {useEffect, useRef, useState} from "react";
import {api} from "../../services/API";
import { BsPlusCircleDotted } from "react-icons/bs";
import Pagination from "../../components/Pagination";

function Illustration(){
    const [images, setImages] = useState([])
    useEffect(() => {
        api.get('/illustration')
            .then(data => setImages(data))
            .catch(err => console.error(err))
    }, []);

    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 8

    const imagesWithAddSlot = [...images, { id: "add-slot", isAdd: true }]

    const indexOfLast = currentPage * itemsPerPage
    const indexOfFirst = indexOfLast - itemsPerPage
    const currentImages = imagesWithAddSlot.slice(indexOfFirst, indexOfLast)

    const fileInputRef = useRef(null)

    const openFilePicker = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0]

        if (!file) return

        try{
            const formData = new FormData()
            formData.append("file", file)

            const res = await fetch("http://localhost:5151/api/illustration/upload", {
                method: "POST",
                body: formData
            })

            const created = await res.json()

            setImages(prev => [...prev, created])

            e.target.value = null
        }
        catch(err){
            console.error(err)
        }
    }

    return(
        <>
            <div className='illustration-container'>
                {currentImages.map(img => {

                    if (img.isAdd) {
                        return (
                            <div
                                key="add-slot"
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
                        <img key={img.id} src={img.imageUrl} alt={img.title}/>
                    )
                })}
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