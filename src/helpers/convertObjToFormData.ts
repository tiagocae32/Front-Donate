
export const convertObjToFormData = (obj : object)  : FormData => {
    const formData = new FormData();

    Object.entries(obj).forEach(([key, value]) => {
        if(key === "images"){
            value.forEach((file : File, index: Number) => {
                formData.append(`images[${index}]`, file);
            });
        }else formData.append(key,value) 
    });
    return formData;
}