import { observer } from "mobx-react-lite"
import { Modal } from "react-native-ui-lib"
import React from "react"
import { useInstance } from "react-ioc"
import { SelectWalletDialogViewModel } from "./SelectWalletDialogViewModel"
import { SelectWallet } from "../../selectWallet/SelectWallet";
import { getWalletStore } from "../../../App";

export const SelectWalletDialog = observer(() => {
  const view = useInstance(SelectWalletDialogViewModel)

  return <Modal
      onRequestClose={ () => { view.display = false} }
      animationType={ "slide" }
      visible={ view.display }>
    <SelectWallet onBackPress={ () => {
      view.display = false
    } }
                  totalBalance={ getWalletStore().formatTotalAllWalletsFiatBalance } wallets={ view.options }
                  onPressWallet={ (_, i) => {
                   // @ts-ignore
                   getWalletStore().setSelectedWalletIndex(i);
                   view.display = false
                 } }/>
  </Modal>
})