import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { HandleFileChange } from '../HandleFileChange'

export function DragAndDropZone() {
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
  }, [])

  const handleFileChange = (event: any) => {
    HandleFileChange(event, setJsonXmlList)
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()} className="mb-32">
      <input {...getInputProps()}
        type="file"
        multiple
        accept="text/xml"
        onChange={handleFileChange}
      />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}