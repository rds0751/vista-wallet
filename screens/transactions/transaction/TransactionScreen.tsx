import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Button, Card, Colors, LoaderScreen, Text, TouchableOpacity, View } from "react-native-ui-lib";
import { provider, useInstance } from "react-ioc";
import { TransactionScreenViewModel } from "./TransactionScreenViewModel";
import { Screen } from "../../../components";
import Cross from "../../../assets/icons/cross.svg";
import { useNavigation } from "@react-navigation/native";
import { t } from "../../../i18n";
import { renderShortAddress } from "../../../utils/address";
import { Linking } from "react-native";
import { getEthereumProvider } from "../../../App";

const Transaction = observer<{ route: any }>(({ route }) => {
  const view = useInstance(TransactionScreenViewModel)
  const nav = useNavigation()

  useEffect(() => {
    view.init(route.params)
    console.log("TRANSACTION", view.transaction)
  }, [])

  return <Screen
      backgroundColor={ Colors.bg }
      statusBarBg={ Colors.bg }
      preset="fixed"
  >
    <TouchableOpacity onPress={ nav.goBack } padding-20 paddingL-16 left row centerV>
      <Cross height={ 16 } width={ 16 } style={ { color: Colors.primary } }/>
    </TouchableOpacity>
    {
      view.initialized && <View flex>
          <View row spread padding-16>
              <Text text16 robotoM>{
                t("transactionScreen.transactionDetails")
              }</Text>
              <Button onPress={ async () => {
                const baseUrl = getEthereumProvider().currentNetwork.type === "mainnet" ? "https://etherscan.io/tx/" : `https://${ getEthereumProvider().currentNetwork.type }.etherscan.io/tx/`
                const url = baseUrl + view.transaction.hash
                await Linking.openURL(url)
              }
              } robotoM link text14 label={ t("transactionScreen.viewOnEtherScan") }/>
          </View>
          <View padding-16>
              <Card>
                  <View row spread margin-16>
                      <Text text-grey>
                        { t("transactionScreen.status") }
                      </Text>
                      <Text black text16 robotoM>{ view.transaction.actionName }</Text>
                  </View>
                  <View>
                      <View row spread margin-16>
                          <Text text-grey>
                            { t("transactionScreen.date") }
                          </Text>
                          <Text black text16 robotoM>{ view.transaction.formatDate }</Text>

                      </View>
                      <View absR style={ {
                        borderWidth: 1,
                        borderColor: Colors.grey,
                        width: "100%",
                        borderBottomColor: "transparent"
                      } }/>
                  </View>
                  <View>
                      <View row spread margin-16>
                          <Text text-grey>
                            { t("transactionScreen.from") }
                          </Text>
                          <Text text16 robotoM black>{ renderShortAddress(view.transaction.fromAddress) }</Text>

                      </View>
                      <View absR style={ {
                        borderWidth: 1,
                        borderColor: Colors.grey,
                        width: "100%",
                        borderBottomColor: "transparent"
                      } }/>
                  </View>
                  <View>
                      <View row spread margin-16>
                          <Text text-grey>
                            { t("transactionScreen.to") }
                          </Text>
                          <Text black text16 robotoM>{ renderShortAddress(view.transaction.toAddress) }</Text>

                      </View>
                      <View absR style={ {
                        borderWidth: 1,
                        borderColor: Colors.grey,
                        width: "100%",
                        borderBottomColor: "transparent"
                      } }/>
                  </View>
              </Card>
          </View>
          <View padding-16>
              <Card>
                  <View row spread margin-16 centerV>
                      <Text black text16 robotoM>
                        { t("transactionScreen.amount") }
                      </Text>
                      <View right>
                          <Text black text16 robotoM>{ "$" + view.transaction.fiatValue }</Text>
                          <Text text-grey
                                robotoM>{ `${ view.transaction.formatValue } ${ view.transaction.symbol || 'ETH' }` }</Text>
                      </View>

                  </View>
                { !!view.transaction?.fiatFee && <View>
                    <View row spread margin-16 centerV>
                        <Text black text16 robotoM>
                          { t("transactionScreen.suggestedFee") }
                        </Text>
                        <View right>
                            <Text black text16 robotoM>{ "$" + view.transaction.fiatFee }</Text>
                            <Text text-grey
                                  robotoM>{ `${ view.transaction.formatFee } ${ view.transaction.symbol || 'ETH' }` }</Text>
                        </View>
                    </View>
                    <View absR style={ {
                      borderWidth: 1,
                      borderColor: Colors.grey,
                      width: "100%",
                      borderBottomColor: "transparent"
                    } }/>
                </View>
                }
                { !!view.transaction?.fiatTotal && <View>
                    <View row spread margin-16 centerV>
                        <Text black text16 robotoM>
                          { t("transactionScreen.total") }
                        </Text>
                        <View right>
                            <Text black text16 robotoM>{ "$" + view.transaction.fiatTotal }</Text>
                            <Text text-grey
                                  robotoM>{ `${ view.transaction.formatTotal } ${ view.transaction.symbol || 'ETH' }` }</Text>
                        </View>
                    </View>
                    <View absR style={ {
                      borderWidth: 1,
                      borderColor: Colors.grey,
                      width: "100%",
                      borderBottomColor: "transparent"
                    } }/>
                </View>
                }
              </Card>
          </View>
        { view.transaction.receiptStatus === "" &&
        <View flex bottom padding-20>
            <Button disabled={ !view.transaction.canRewriteTransaction } onPress={ view.transaction.cancelTx }
                    paddingB-20 link
                    label={ t("transactionScreen.cancelTransaction") }/>
            <Button disabled={ !view.transaction.canRewriteTransaction } onPress={ view.transaction.speedUpTransaction }
                    br50
                    label={ t("transactionScreen.speedUpTransaction") }/>
        </View>
        }
      </View>
    }
    {
      !view.initialized && <View flex><LoaderScreen/></View>
    }

  </Screen>
})

export const TransactionScreen = provider()(Transaction)
TransactionScreen.register(TransactionScreenViewModel)