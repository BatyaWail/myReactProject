import { observable, makeObservable, action } from 'mobx';

class MyStore {
    isLogin = false;
    isAdmin = false;
    
    constructor() {
        makeObservable(this, {
            isLogin: observable,
            isAdmin: observable,
            setIsLogin: action,
            setIsAdmin: action,
        })
    }

    setIsLogin = (value) => {
        this.isLogin = value;
    }
    setIsAdmin = (value) => {
        this.isAdmin = value;
    }

}

export default new MyStore();