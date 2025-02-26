export const validate = (schema) => {
    const { error } = schema.validate({...req.body, ...req.params, ...req.query}, {abortEarly: false});
    if (error) {
        next()
    }else {
        let errMsg = error.details.map((err) => {
            return err.message;
        });
        next (new Error(errMsg));
    }
    
}



