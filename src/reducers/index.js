import { combineReducers } from "redux"

import plans from "./plans"
import user from "./user"
import trainings from "./trainings"

export default combineReducers({
    plans,
    trainings,
    user
})
