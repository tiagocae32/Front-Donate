import axios from "../services/ClientAxios"

export const downloadFiles = async ({url,typeBlob,fileName}) => {
    const res = await axios.get(url,{ responseType: "blob" })
        
    const blob = new Blob([res.data], {
        type : typeBlob
    });

    const blob_url = window.URL.createObjectURL(blob);
    const downloadRef = document.createElement("a");

    downloadRef.style.display = "none";
    downloadRef.href = blob_url;
    downloadRef.download = fileName

    downloadRef.click();
    window.URL.revokeObjectURL(blob_url);
    
    
}