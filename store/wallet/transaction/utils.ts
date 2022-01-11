import { runUnprotected } from "mobx-keystone";
import { getAppStore } from "../../../App";
import { TOASTER_TYPE } from "../../app/AppStore";
import { TOAST_POSITION } from "../../../components/toasts/appToast/AppToast";


export const setPendingAppToast = (message = "pending") => {
  runUnprotected(() => {
    getAppStore().toast.type = TOASTER_TYPE.PENDING
    getAppStore().toast.message = message
    getAppStore().toast.display = true
    getAppStore().toast.position = TOAST_POSITION.BOTTOM
  })
}

export const closeToast = () => {
  runUnprotected(() => {
    getAppStore().toast.type = TOASTER_TYPE.SUCCESS
  })

  setTimeout(() => {
    runUnprotected(() => {
      getAppStore().toast.display = false
    })
  }, 3000)
}