import { observable, makeObservable, action } from 'mobx';
import logo1 from '../../src/assets/images/logo10.jpg'
class DetailsStore {
    detailsEdit = {
        id: "123",
        name: "ציורים שמדברים",
        address: "הרב כהנמן 177",
        phone: "0583299119",
        owner: "אתי ברקוביץ",
        logo: logo1,
        description: "ציורים קלילים וחמודים, במגוון רחב מאוד של סגנונות לבחירה: דמותגים, סגנון עתיק, ציורי ילדים, ציורי קומיקס מרהיבים, המחשה למשניות, שחור לבן, ידני- מעובד ועוד ועוד",
    };
    constructor() {
        makeObservable(this, {
            detailsEdit: observable,
            setIsSave: action,
            isSave: observable,
            getDetails: action,
            saveDetails: action,
            isEditBefore: observable,
            setisEditBefore: action,
            setEditDetails:action,
            initialbusinessServices:action
        })
    }
    initialbusinessServices = async () => {
        const response = await fetch("http://localhost:8787/businessData");
        const data = await response.json();
        this.detailsEdit = Object.keys(data).length === 0 ? this.detailsEdit :data ;
    }

    getDetails = async () => {
        const response1 = await fetch("http://localhost:8787/businessData", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const x = await response1.json();
        this.setEditDetails(x)
    }

    saveDetails = async (x) => {
        const response = await fetch("http://localhost:8787/businessData", {
            method: "POST",
            body: JSON.stringify(x),
            headers: {
                "Content-Type": "application/json",
            },
        });
        this.getDetails()
    }
    setEditDetails = (value) => {
        this.detailsEdit.id=value.id
        this.detailsEdit.address=value.address,
        this.detailsEdit.description=value.description,
        this.detailsEdit.logo=value.logo,
        this.detailsEdit.name=value.name,
        this.detailsEdit.owner=value.owner,
        this.detailsEdit.phone=value.phone
    }
    isEditBefore = false;
    isSave = false;
    setIsSave = (value) => {
        this.isSave = value;
    }
    setisEditBefore = (value) => {
        this.isEditBefore = value;
    }
}
export default new DetailsStore();