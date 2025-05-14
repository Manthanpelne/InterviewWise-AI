import React, { useRef, useState } from 'react'
import { LuTrash, LuUpload, LuUser } from 'react-icons/lu'

export const ProfilePhotoSelector = ({image, setImage, preview, setPreview}) => {

  const inputRef = useRef(null)
  const [previewUrl, setPreviewUrl] = useState()

  const handleImageChange = (e)=>{
    const file = e.target.files[0]
    if(file){
      setImage(file)

      const preview = URL.createObjectURL(file)
      if(setPreview){
        setPreview(preview)
      }
      setPreviewUrl(preview)
    }
  }


  const handleRemoveImg = () =>{
    setImage(null)
    setPreviewUrl(null)

    if(setPreview){
      setPreview(null)
    }
  }


  const onChooseFile=()=>{
    inputRef.current.click()
  }

  return (
    <div className='flex justify-center mt-5'>
        <input className='hidden' type="file" accept='image/*' ref={inputRef} onChange={handleImageChange} />
         
        {!image ? (
          <div className='w-20 h-20 flex items-center justify-center bg-[#f8e5e5] rounded-full cursor-pointer relative'>
             <LuUser className='text-3xl' />
             <button className='absolute -bottom-1 -right-1 cursor-pointer rounded-full  w-8 h-8 flex items-center justify-center bg-black text-white' type='button' onClick={onChooseFile}>
              <LuUpload className=''/></button>
          </div>
        ) : (
          <div className='relative'>
            <img className='w-20 h-20 rounded-full object-cover' src={preview || previewUrl} alt='profilephoto' />
            <button className='w-8 h-8 flex items-center justify-center bg-[#bb4a4a] text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer' type='button' onClick={handleRemoveImg}><LuTrash /></button>
          </div>
        )}
    </div>
  )
}
