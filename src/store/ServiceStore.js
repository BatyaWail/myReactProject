import { observable, makeObservable, action } from 'mobx';
import i1 from "../../src/assets/images/komix.png"
import i3 from "../../src/assets/images/child.png"
class ServiceStore {
    constructor() {
        makeObservable(this, {
            countId: observable,
            addCountId: action,
            getServices: action,
            serviceArr: observable,
            saveService: action,        
        })
    }
    serviceArr = []
    service1 = {
        id: 1,
        name: "ציורי קומיקס",
        description: "לדמויות ומסרים שיחקקו עמוק בלב ",
        price: 500,
        duration: 60,
        img: i1
    }
    service2 = {
        id: 2,
        name: "ציורים בטעם של פעם",
        description: "להרגיש את העבר, לאהוב, להתחבר--מכניס אהבת תורה לילדים הרכים",
        price: 40,
        duration: 20,
        img: i3
    }

    countId = 0;
    addCountId = () => {
        this.countId = eval(this.countId + 1);
        console.log(this.countId)
    }
    getServices = async () => {
        const response = await fetch("http://localhost:8787/service", {
            method: "POST",
            body: JSON.stringify(this.service1),
            headers: {
                "Content-Type": "application/json"
            },
        });
        const response2 = await fetch("http://localhost:8787/service", {
            method: "POST",
            body: JSON.stringify(this.service2),
            headers: {
                "Content-Type": "application/json"
            },
        });

        const response1 = await fetch("http://localhost:8787/services", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        console.log("after get")
        this.serviceArr = await response1.json();
    }

    saveService = async (x) => {
        const response = await fetch("http://localhost:8787/service", {
            method: "POST",
            body: JSON.stringify(x),
            headers: {
                "Content-Type": "application/json",
            },
        });
        this.getServices()
    }
}
export default new ServiceStore();