export function dataURLtoFile(dataurl) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    const extname = mime.includes("/") ? mime.split("/")[1] : mime;
    const newFilename = `${Math.floor(
      Math.random() * 1000
    )}${Date.now()}.${extname}`;
    return new File([u8arr], `${newFilename}`, { type: mime });
  }