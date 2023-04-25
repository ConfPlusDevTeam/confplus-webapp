import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function UploadField() {
    return (
        <div className="file-input">
          <label htmlFor="file-upload">
          <FontAwesomeIcon icon="fa-solid fa-upload" />
            Drag and drop or select a file
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileUpload}
            onDrop={handleDragAndDrop}
            onDragOver={handleDragOver}
          />
          {file && <p>File selected: {file.name}</p>}
        </div>
      );
}
