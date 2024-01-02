// import {number} from 'react'
import { observable, makeObservable, action } from 'mobx';
import Swal from 'sweetalert2'

class MeetingStore {

    constructor() {
        makeObservable(this, {
            meetingArr: observable,
            saveMeeting: action,
            getMeeting: action,
            setMeetingArr: observable

        })
    }

    meetingArr = [];
    setMeetingArr = (x) => {
        this.meetingArr = x;
    }
    getMeeting = async () => {
        this.isAddingMeetingGood = false;
        const response1 = await fetch("http://localhost:8787/appointments", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const data = await response1.json();
        data.sort((a, b) => {
            return new Date(a.dateTime) - new Date(b.dateTime)
        })
        this.setMeetingArr(data)

    }
    saveMeeting = async (x) => {
        const response2 = await fetch("http://localhost:8787/appointment", {
            method: "POST",
            body: JSON.stringify(x),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response2.status === 200) {
            console.log("---------------------------------------- TRUE")
            this.isAddingMeetingGood = true;
        }

    }

    setIsAddingMeetingGood(value) {
        this.isAddingMeetingGood = value;
    }
}
export default new MeetingStore();