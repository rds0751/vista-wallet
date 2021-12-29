import { Button, Card, Colors, Dialog, LoaderScreen, Text, View } from "react-native-ui-lib"
import React from "react"
import { useInstance } from "react-ioc"
import { observer } from "mobx-react-lite"
import { DialogHeader } from "../dialogHeader/DalogHeader"
import { SendTransactionViewModel } from "./SendTransactionViewModel"
import { t } from "../../../i18n"
import { getWalletStore } from "../../../App"
import { amountFormat } from "../../../utils/number"
import { HIcon } from "../../icon";

export const SendTransactionDialog = observer(() => {
  const view = useInstance(SendTransactionViewModel)

  return <Dialog
      ignoreBackgroundPress={ !view.txHash }
      width={ "100%" }
      containerStyle={ { backgroundColor: Colors.bg, borderTopLeftRadius: 30, borderTopRightRadius: 30 } }
      visible={ view.display }
      bottom
      onDismiss={ () => {
        if (view.txHash) {
          view.clear()
          view.display = false
        }
      } }
  >
    <View>
      <DialogHeader onPressIn={ () => view.display = false }/>
      { view.initialized && !!view.txHash &&
          <View center padding-20>
              <View row>
                  <HIcon name={ "check-circle" } size={ 80 } color={ Colors.primary }/>
              </View>
              <View>
                  <Text text50 center grey30>{ t("sendTransactionDialog.successSendTx") }</Text>
              </View>
          </View>
      }
      { view.initialized && !view.txHash &&
          <View center padding-20>
              <View row center>
                  <Text primary text60R> { view.hostname } </Text>
              </View>
              <View row center marginT-20>
                  <Text grey20
                        text20BO bold>{ `${ view.txHumanReadable.value } ${ view.symbol.toUpperCase() }` }</Text>
              </View>
              <View row center marginB-20>
                  <Text grey20
                        text60R>{ `${ view.txHumanReadable.valueFiat }` }</Text>
              </View>
              <View row center marginB-10>
                  <Card flex padding-20>
                      <View row>
                          <View flex-4>
                              <Text grey20 text60>
                                { getWalletStore().selectedWallet.formatAddress }
                              </Text>
                          </View>
                          <View flex-6 right>
                              <Text grey20 text60>

                              </Text>
                          </View>
                      </View>
                      <View row>
                          <View flex-4>
                              <Text grey20 text80R>
                                { t("common.balance") }
                              </Text>
                          </View>
                          <View flex-6 right>
                              <View row>
                                  <Text grey20 text80R marginR-20>
                                    { getWalletStore().selectedWallet.fiatBalance }
                                  </Text>
                                  <Text grey20 text80R>
                                    { `${ getWalletStore().selectedWallet.formatBalance } ${ view.symbol }` }
                                  </Text>
                              </View>
                          </View>
                      </View>
                  </Card>
              </View>
              <View row center marginB-20>
                  <Card flex padding-20>
                      <View row paddingB-10>
                          <View flex-4>
                              <Text purple40
                                    bold>{ `${ view.hostname } ${ t('sendTransactionDialog.suggestedFee').toLowerCase() }` }</Text>
                          </View>
                          <View flex-6>
                              <View row right>
                                  <Text grey20 marginR-20 text80>{ view.txHumanReadable.feeFiat }</Text>
                                  <Text grey20
                                        text80
                                        bold>{ `${ amountFormat(view.txHumanReadable.fee, 8) } ${ view.symbol }` }</Text>
                              </View>
                              <View row right>
                                  <Text grey20 text90R>{ `${ t("sendTransactionDialog.outerSuggestion") }: ` }</Text>
                                  <Text grey40 text90R>{ view.txHumanReadable.feeMax }</Text>
                              </View>
                          </View>
                      </View>
                      <View row style={ { borderBottomWidth: 1, borderBottomColor: Colors.grey50 } }/>
                      <View row paddingT-10>
                          <View flex-4>
                              <Text grey20 bold>{ `${ t('common.total') }` }</Text>
                          </View>
                          <View flex-6>
                              <View row right>
                                  <Text grey20 marginR-20 text80>{ view.txHumanReadable.totalFiat }</Text>
                                  <Text grey20
                                        text80
                                        bold>{ `${ amountFormat(view.txHumanReadable.total, 8) } ${ view.symbol }` }</Text>
                              </View>
                              <View row right>
                                  <Text grey20 text90R>{ `${ t("sendTransactionDialog.outerSuggestion") }: ` }</Text>
                                  <Text grey40 text90R>{ view.txHumanReadable.maxAmount }</Text>
                              </View>
                          </View>
                      </View>
                  </Card>
              </View>
            { !view.enoughBalance && !view.pending &&
                <View row center>
                    <Text center grey30
                          text80>{ t('sendTransactionDialog.insufficientBalance',
                        // { balance: `${ Math.abs(view.diffBalanceTotal) } ${ view.symbol }` }
                    ) }</Text>
                </View>
            }
            {
                view.pending &&
                <View row center paddingV-20><LoaderScreen color={ Colors.grey20 }/></View>
            }
              <View row width={ "100%" } center paddingT-20>
                  <Button onPress={ () => { view.pending ? view.display = false : view.onAccountsRejected() } }
                          link br50 bg-primary marginB-20 robotoM
                          label={ view.pending ? t("common.cancel") :t('common.deny') }/>
              </View>
              <View width={ "100%" }>
                  <Button disabled={ !view.enoughBalance || view.pending }
                          onPress={ view.onAccountsConfirm }
                          marginH-10
                          fullWidth
                          style={ { borderRadius: 12 } }
                          label={ t('common.allow') }/>
              </View>
          </View>
      }
    </View>
  </Dialog>
})
