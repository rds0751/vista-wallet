import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import {
  Button,
  Colors,
  ExpandableSection,
  LoaderScreen,
  RadioButton,
  Text,
  TextField,
  View
} from "react-native-ui-lib";
import { useInstance } from "react-ioc";
import { SendTransactionViewModel } from "./SendTransactionViewModel";
import { Screen } from "../../../components";
import { t } from "../../../i18n";
import { useNavigation } from "@react-navigation/native";
import UpIcon from '../../../assets/icons/up.svg'
import DownIcon from '../../../assets/icons/down.svg'
import { getWalletStore } from "../../../App";
import Ripple from "react-native-material-ripple"
import { RootNavigation } from "../../../navigators";
import { ScrollView } from "react-native";
import { SelectWalletTokenViewModel } from "../../../components/dialogs/selectWalletTokenDialog/SelectWalletTokenViewModel";
import { Header, ICON_HEADER } from "../../../components/header/Header";

export const SelectAddressScreen = observer<{ route: any }>(({ route }) => {
  const view = useInstance(SendTransactionViewModel)
  const nav = useNavigation()
  const inputRef = useRef()
  const selectWalletTokenView = useInstance(SelectWalletTokenViewModel)

  useEffect(() => {
    view.init(route.params)
    selectWalletTokenView.init(view.walletAddress)
  }, [])

  useEffect(() => {
    inputRef.current?.focus()
  }, [ inputRef?.current ])

  return <Screen
      backgroundColor={ Colors.white }
      statusBarBg={ Colors.white }
      style={ { height: "100%" } }
  >
    <Header icon={ ICON_HEADER.CROSS } rightText={ t('selectValueScreen.step') }/>
    { view.initialized && <>
        <View padding-16>
            <TextField
                multiline={ true }
                errorColor={ view.inputAddressError ? Colors.error : Colors.textGrey }
                error={ view.inputAddressErrorMessage }
                onChangeText={ (val) => {
                  view.txData.to = val
                } }
                value={ view.txData.to }
                ref={ inputRef }
                hideUnderline
                floatingPlaceholder
                rightButtonProps={ {
                  iconSource: require("../../../assets/images/camera.png"),
                  style: {
                    alignSelf: "center",
                    marginRight: 15,
                  },
                  onPress: () => {
                    nav.navigate("QRScanner", {
                      onScanSuccess: meta => {
                        console.log(meta)
                        if (meta.action === "send-eth" && meta.target_address) {
                          view.txData.to = meta.target_address
                          console.log("set-value", view.txData.to)
                        }
                      }
                    })
                  }
                } }
                floatingPlaceholderStyle={ !view.txData.to ? {
                  left: 15,
                  top: 13,
                  fontFamily: "Roboto-Medium"
                } : {} }
                floatingPlaceholderColor={ {
                  focus: Colors.primary,
                  error: Colors.error,
                  default: Colors.primary,
                  disabled: Colors.primary
                } }
                placeholder={ "Address" }
                style={ {
                  paddingRight: 50,
                  padding: 10,
                  borderRadius: 5,
                  borderColor: view.inputAddressError ? Colors.error : Colors.primary
                } }
            />
        </View>
        <View bg-bg flex br50>
            <ScrollView>
                <View paddingH-16 marginB-90>
                    <Text text16 robotoM marginV-24>{ t("selectAddressScreen.transfer") }</Text>
                    <ExpandableSection
                        expanded={ view.betweenMyAddress }
                        onPress={ () => {
                          view.betweenMyAddress = !view.betweenMyAddress
                        } }
                        sectionHeader={ (() =>
                            <View bg-white padding-10 br20 row centerV spread>
                              <Text text16>{ t("selectAddressScreen.betweenMyAddresses") }</Text>
                              <Button link style={ { height: 30, width: 30 } }
                                      onPress={ () => {
                                        view.betweenMyAddress = !view.betweenMyAddress
                                      } }
                              >
                                { !view.betweenMyAddress && <UpIcon width={ 14 } style={ { color: Colors.black } }/> }
                                { view.betweenMyAddress && <DownIcon width={ 14 } style={ { color: Colors.black } }/> }
                              </Button>
                            </View>)() }
                    >
                        <View
                            style={ {
                              borderBottomLeftRadius: 12,
                              borderBottomRightRadius: 12,
                              backgroundColor: Colors.white
                            } }>
                          {
                            getWalletStore().allWallets.map(w => {
                              return <View key={ w.address }>
                                <View
                                    style={ { borderBottomWidth: 1, borderBottomColor: Colors.grey, marginLeft: 10 } }/>
                                <Ripple onPress={ () => {
                                  if (view.txData.to === w.address) {
                                    view.txData.to = ""
                                  } else {
                                    view.txData.to = w.address
                                  }
                                } } rippleColor={ Colors.primary }>
                                  <View margin-12 row spread paddingR-3>
                                    <Text text16>{ w.formatAddress }</Text>
                                    <RadioButton size={ 20 }
                                                 color={ view.txData.to !== w.address ? Colors.textGrey : undefined }
                                                 selected={ view.txData.to === w.address }/>
                                  </View>
                                </Ripple></View>
                            })
                          }
                        </View>
                    </ExpandableSection>
                </View>
            </ScrollView>
            <View style={ { width: "100%" } } center row padding-20 bg-bg paddingB-8>
                <Button disabled={ view.inputAddressError || !view.txData.to }
                        style={ { width: "100%", borderRadius: 12 } }
                        label={ t("selectValueScreen.nextBtn") }
                        onPress={ () => {
                          RootNavigation.navigate("sendTransaction", {
                            screen: "selectValue"
                          })
                        } }
                />
            </View>
        </View>
    </> }
    {
      !view.initialized && <LoaderScreen/>
    }
  </Screen>
})