export async function imageUpload(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "myUploads");
  try {
    let res = await fetch(`${process.env.REACT_APP_IMAGE_UPLOAD_URI}`, {
      method: "POST",
      body: formData,
    });
    let data = await res.json();
    console.log(data);
    return data.url;
  } catch (error) {
    console.log(error);
    return null;
  }
}
