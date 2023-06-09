


export const convertObjToFormData = (obj : object)  : FormData => {
    const formData = new FormData();

    Object.entries(obj).forEach(([key, value]) => {

        console.log("key", key, "value", value);

        if(!Array.isArray(value)) formData.append(key,value) 
        else {
            value.forEach((file, index: Number) => {
                formData.append(`images[${index}]`, file);
            });
        }    
    });


    for (const value of formData.values()) {
        console.log(value);
      }

    return formData

}