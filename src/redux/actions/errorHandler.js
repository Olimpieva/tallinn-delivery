import { FAILURE, GET_ORDER_BY_ID } from "./actionTypes";
import { requestErrorMessages } from "../../utils/constants";

const handleError = ({ errorCode = 500, action }) => {

    return {
        type: action + FAILURE,
        payload: (() => {
            switch (errorCode) {
                case 404:
                    return requestErrorMessages.orderNotFound();
                case 401:
                    return requestErrorMessages.invalidAuthUserData();
                case 500:
                    return requestErrorMessages.serverError();
                default:
                    return requestErrorMessages.otherError({ errorCode, action });
            };
        })(),
    };
};

export default handleError;
