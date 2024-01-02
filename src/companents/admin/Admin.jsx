import { observer } from "mobx-react"
import './Admin.css'
import Login from '../login/Login'
import MyStore from '../../store/MyStore'
import PageAdmin from '../pageAdmin/PageAdmin'

const Admin = (observer(() => {
    MyStore.setIsAdmin(true);
    return (
        <>
            {!MyStore.isLogin ?
                <Login></Login> :
                <PageAdmin />
            }
        </>
    )
}))

export default Admin