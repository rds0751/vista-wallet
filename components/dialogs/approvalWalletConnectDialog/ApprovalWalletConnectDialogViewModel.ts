import { makeAutoObservable } from "mobx"
import { getWalletStore } from "../../../App"

export class ApprovalWalletConnectDialogViewModel {
    display = false
    pending = false
    approvalRequest
    sessionData: any

    constructor() {
        makeAutoObservable(this)
    }

    get url() {
        try {
            return new URL(this.sessionData?.peerMeta?.url).host
        } catch {
            return ""
        }
    }

    /**
     * When user clicks on approve to connect with a dapp
     */
    onAccountsConfirm = async () => {
        this.display = false
        this.approvalRequest.resolve(getWalletStore().selectedWallet?.address)
        await Promise.all([
            getWalletStore().selectedWallet.updateBalanceFromProvider(),
            getWalletStore().selectedWallet.getTokenBalances()
        ])
    }

    /**
     * When user clicks on reject to connect with a dapp
     */
    onAccountsRejected = () => {
        this.display = false
        this.approvalRequest.resolve(false)
    }
}
