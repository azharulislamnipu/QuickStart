module.exports = {
    serverError (res, error){
        res.status(500).json({
            message:'Server Error Occured'
        });
    },

    resourceError(res, message){
        res.status(500).json({
            message
        });
    }
}