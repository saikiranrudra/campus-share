import axios from "axios"

/**
 * 
 * @param {File} file - file Object to be uploaded
 * @param {String} uploadPreset - Cloudinary uploadPreset
 * @param {String} cloudName - Cloudinary cloud Name 
 * @returns Promise
 */

export const uploadFile = (file, uploadPreset, cloudName) => {
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('cloud_name', cloudName);
    axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    });
  }) 
}