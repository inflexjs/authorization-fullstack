import ApiError from "../exceptions/api.error.js";
import TokenService from "../services/token.service.js";

export default function (req, res, next) {
	try {
		console.log(req, req, res)
		next()
	} catch (e) {
		return next(ApiError.ForbiddenError())
	}
}