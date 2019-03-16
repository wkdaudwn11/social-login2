const Joi = require('joi');

module.exports = {
    validateBody: (schema) => { // body의 데이터를 유효성 검사 해주는 라이브러리
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if(result.error){
                return res.status(400).json(result.error);
            }

            if(!req.value){
                req.value = {};
            }

            req.value['body'] = result.value;
            next();
        }
    },
    schemas: {
        authSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    }
}