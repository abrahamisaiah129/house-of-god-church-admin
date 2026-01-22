// Cloudinary Upload Utility
export async function uploadToCloudinary(file, folder = "hog-church") {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  );
  formData.append("folder", folder);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      url: data.secure_url,
      publicId: data.public_id,
      data,
    };
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Delete image from Cloudinary
export async function deleteFromCloudinary(publicId) {
  try {
    const response = await fetch("/api/cloudinary/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicId }),
    });

    if (!response.ok) {
      throw new Error(`Delete failed: ${response.statusText}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Cloudinary Delete Error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Transform Cloudinary URL for different sizes
export function getCloudinaryUrl(url, transformations = {}) {
  const { width, height, quality = "auto", crop = "fill" } = transformations;

  if (!url || !url.includes("cloudinary")) {
    return url;
  }

  const parts = url.split("/upload/");
  if (parts.length !== 2) return url;

  let transform = `c_${crop}`;
  if (quality) transform += `,q_${quality}`;
  if (width) transform += `,w_${width}`;
  if (height) transform += `,h_${height}`;

  return `${parts[0]}/upload/${transform}/${parts[1]}`;
}
