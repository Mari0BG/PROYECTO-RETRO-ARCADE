export const CreateError = (statusError, messageError) =>{
    const err = new Error()
    err.status = statusError
    err.message = messageError
    return err
}