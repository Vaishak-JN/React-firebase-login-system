import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"


const RequireAuth = ({ children }) => {

    const token = useSelector(state => state.users.token)
    const user = useSelector(state => state.users.user)

    // console.log(user)
    // console.log(token)

    return (
        (token) ? (children) : <Navigate to="/login" replace />
    )
}

export default RequireAuth
