class ApiError {
    constructor(status, massege){
        super();
        this.status= status
        this.massege = massege
    }
    static badRequest(massege){
        return new ApiError(404, massege)
    }
    static internal(massege){
        return new ApiError(500, massege)
    }
    static forbiden(massege){
        return new ApiError(403, massege)
    }
}