
export const showAlert = (app : any,title: string,text: Array<string> | string,type: string) => {
    app.$swal.fire({
        title,
        text,
        icon: type,
        confirmButtonText: "Ok",
    });
}