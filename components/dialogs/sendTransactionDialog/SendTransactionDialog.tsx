import { Avatar, Button, Card, Colors, Dialog, ExpandableSection, Text, View } from "react-native-ui-lib"
import React, { useState } from "react"
import { useInstance } from "react-ioc"
import { observer } from "mobx-react-lite"
import { DialogHeader } from "../dialogHeader/DalogHeader"
import { SendTransactionViewModel } from "./SendTransactionViewModel"
import { t } from "../../../i18n"
import { getEVMProvider, getWalletStore } from "../../../App"
import { HIcon } from "../../icon";
import { WalletItem } from "../../walletItem/WalletItem";
import Ripple from "react-native-material-ripple"
import { ScrollView } from "react-native";
import { NATIVE_COIN_SYMBOL } from "../../../config/network";
import { renderShortAddress } from "../../../utils/address";
import { ExpandableView } from "../../expandable/ExpandableView";
import { preciseRound } from "../../../utils/number";
import { formatUnits } from "ethers/lib/utils";

export const SendTransactionDialog = observer(() => {
    const view = useInstance(SendTransactionViewModel)

    const [ expanded, setExpanded ] = useState(false)

    return <Dialog
        testID={ 'sendTransactionDialog' }
        ignoreBackgroundPress={ !view.txHash }
        width={ "100%" }
        containerStyle={ {
            backgroundColor: Colors.transparent,
            paddingTop: 16,
        } }
        visible={ view.display }
        bottom
        onDismiss={ () => {
            if (view.txHash) {
                view.clear()
                view.display = false
            }
        } }
    >
        <DialogHeader onPressIn={ () => {
            view.display = false
        } }
                      buttonStyle={ {
                          marginTop: 2,
                          padding: 2,
                          paddingHorizontal: 22,
                          backgroundColor: Colors.white
                      } }
        />
        <ScrollView
            contentContainerStyle={ {
                backgroundColor: Colors.bg,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            } }>
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
                        <Text text16 robotoM color={ Colors.textGrey }> { view.hostname } </Text>
                    </View>
                    { view.isKnownTxFunction && view.functionName === "APPROVE" && <>
                        <Text marginT-20 marginB-20 text16 robotoM style={ {
                            alignSelf: 'flex-start'
                        } }>{ t("sendTransactionDialog.approve.title", { 0: view.knownTokenAddress?.symbol }) }</Text>
                        <Text color={ Colors.textBlack } text14 grey30 style={ {
                            alignSelf: 'flex-start'
                        } }>{ t("sendTransactionDialog.approve.description") }</Text>
                        <View marginV-16 style={ {
                            alignSelf: "stretch"
                        } }>
                            <ExpandableView title={ renderShortAddress(view.txDescription.args[0]) }
                                            description={ view.txDescription.args[1].toString() }/>
                        </View>
                    </>
                    }
                    { view.isKnownTxFunction && view.functionName === "TRANSFER" && <>
                        <Text marginT-20 text16 robotoM style={ {
                            alignSelf: 'flex-start'
                        } }>{ t("sendTransactionDialog.transfer.title", { 0: view.knownTokenAddress?.symbol }) }</Text>
                        <Card marginV-16 width={ "100%" }>
                            <View padding-10 paddingH-15 paddingR-20>
                                <View row centerV>
                                    <View>
                                        {
                                            <Avatar size={ 44 } backgroundColor={ Colors.greyLight }>
                                                <HIcon name={ "wallet" } size={ 20 }
                                                       style={ { color: Colors.primary } }/>
                                            </Avatar>
                                        }
                                    </View>
                                    <View marginL-16 flex-1>
                                        <Text numberOfLines={ 1 } textM text16
                                              black>{ renderShortAddress(view.txDescription.args[0]) }</Text>
                                    </View>
                                    <View right>
                                        <Text numberOfLines={ 1 } text16 robotoM>
                                            { view.knownTokenAddress ?
                                                preciseRound(+formatUnits(view.txDescription.args[1].toString(), view.knownTokenAddress?.decimals).toString()).toString() :
                                                view.txDescription.args[1].toString() }
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </Card>
                    </>
                    }
                    <Text text16 robotoM style={ {
                        alignSelf: 'flex-start'
                    } }>{ t("transactionScreen.from") }</Text>
                    <View row paddingV-16>
                        <Card width={ "100%" }><WalletItem token={ view.knownTokenAddress?.addressHex?.toLowerCase() }
                                                           wallet={ getWalletStore().selectedWallet }/></Card>
                    </View>
                    <Text style={ {
                        alignSelf: 'flex-start'
                    } } text16 robotoM>{ t("transactionScreen.howMany") }</Text>
                    <View row paddingV-16>
                        <Card width={ "100%" }>
                            <View row spread padding-12 centerV>
                                <View flex>
                                    <Text robotoM text16>{ t("transactionScreen.suggestedFee") }</Text>
                                </View>
                                <View right>
                                    <Text robotoM text16>{ view.txHumanReadable.feeFiat }</Text>
                                    <Text marginT-5
                                          textGrey>{ `${ Number(view.txHumanReadable.fee).toFixed(4) } ${ view.token.symbol }` }</Text>
                                </View>
                            </View>
                        </Card>
                    </View>
                    { getEVMProvider().currentNetwork.nativeSymbol !== NATIVE_COIN_SYMBOL.BNB &&
                        <View row paddingV-8>
                            <Card width={ "100%" }>
                                <ExpandableSection
                                    onPress={ () => setExpanded(!expanded) }
                                    expanded={ expanded }
                                    sectionHeader={ <><View row padding-8 spread centerV>
                                        <Text text16 robotoM>{ t("transactionScreen.changeFee") }</Text>
                                        <Button link style={ { height: 30, width: 30 } }
                                                onPress={ () => {
                                                    setExpanded(!expanded)
                                                } }
                                        >
                                            { !expanded &&
                                                <HIcon name={ "down" } width={ 14 }
                                                       style={ { color: Colors.black } }/> }
                                            { expanded &&
                                                <HIcon name={ "up" } width={ 14 } style={ { color: Colors.black } }/> }
                                        </Button>
                                    </View>
                                        { expanded && <View style={ {
                                            borderBottomWidth: 1,
                                            borderBottomColor: Colors.grey,
                                            marginLeft: 8
                                        } }/> }
                                    </> }
                                >
                                    <View row spread padding-16>
                                        {
                                            view.transactionFeeView.options.map((option, index) => {
                                                return <Ripple onPress={ () => option.onOptionPress() } key={ index }
                                                               style={ {
                                                                   borderWidth: 1,
                                                                   borderRadius: 12,
                                                                   borderColor: Colors.grey,
                                                                   width: '30%',
                                                                   overflow: 'hidden'
                                                               } }
                                                >
                                                    <View paddingH-16 paddingV-10 width={ '100%' }>
                                                        <View centerH>
                                                            <Avatar imageStyle={ {
                                                                height: 24,
                                                                width: 24,
                                                                position: "absolute",
                                                                left: 10,
                                                                top: 10
                                                            } }
                                                                    backgroundColor={ Colors.greyLight } size={ 44 }
                                                                // source={ (option.label as any).icon }
                                                            >
                                                                { (option.label as any).icon }
                                                            </Avatar>
                                                            <Text black text16 center
                                                                  robotoM>{ (option.label as any).name }</Text>
                                                        </View>
                                                    </View>
                                                </Ripple>
                                            })
                                        }
                                    </View>
                                </ExpandableSection>
                            </Card>
                        </View> }

                    { !view.isKnownTxFunction &&
                        <View row paddingV-8>
                            <Text center grey30 text80>{
                                t('sendTransactionDialog.smartContractInteraction') }
                            </Text>
                        </View>
                    }
                    { !view.enoughBalance && !view.pending &&
                        <View row center>
                            <Text center grey30 text80>{
                                t('sendTransactionDialog.insufficientBalance') }
                            </Text>
                        </View>
                    }
                    <View row width={ "100%" } center paddingT-20>
                        <Button onPress={ () => {
                            view.pending ? view.display = false : view.onAccountsRejected()
                        } }
                                link br50 bg-primary marginB-20 robotoM
                                label={ view.pending ? t("common.cancel") : t('sendTransactionDialog.deny') }/>
                    </View>
                    <View width={ "100%" } paddingB-8>
                        <Button disabled={ !view.enoughBalance || view.pending }
                                onPress={ view.onAccountsConfirm }
                                marginH-10
                                fullWidth
                                style={ { borderRadius: 12 } }
                                label={ t('sendTransactionDialog.allow') }/>
                    </View>
                </View>
            }
        </ScrollView>
    </Dialog>
})
