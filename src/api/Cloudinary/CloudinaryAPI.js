import axios from "axios";


const CLOUDINARY_CLOUD_NAME = "https://api.cloudinary.com/v1_1/dr1ogkaha/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "my_preset";
const CLOUDINARY_API_BASE_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
const CLOUDINARY_DELETE_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/destroy`;

/**
 * Uploads an image file to Cloudinary and returns the uploaded image URL.
 * @param {File} file - The image file to upload.
 * @returns {Promise<string>} - The URL of the uploaded image.
 */
export const uploadImageToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const response = await axios.post(CLOUDINARY_API_BASE_URL, formData);
    return response.data.secure_url; // Return the uploaded image URL
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};

/**
 * Deletes an image from Cloudinary using its public ID.
 * @param {string} imageUrl - The URL of the image to delete.
 * @returns {Promise<void>}
 */
export const deleteImageFromCloudinary = async (imageUrl) => {
  try {
    const publicId = extractPublicIdFromUrl(imageUrl);
    if (!publicId) throw new Error("Invalid image URL");

    const response = await axios.post(CLOUDINARY_DELETE_URL, {
      public_id: publicId,
    });

    console.log("Image deleted successfully:", response.data);
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    throw error;
  }
};

/**
 * Extracts the public ID from a Cloudinary image URL.
 * @param {string} imageUrl - The full image URL from Cloudinary.
 * @returns {string | null} - The extracted public ID or null if invalid.
 */
const extractPublicIdFromUrl = (imageUrl) => {
  const matches = imageUrl.match(/\/v\d+\/(.+)\.\w+$/);
  return matches ? matches[1] : null;
};
