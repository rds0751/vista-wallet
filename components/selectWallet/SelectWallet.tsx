import { Header, ICON_HEADER } from "../header/Header";
import { t } from "../../i18n";
import { Avatar, Card, Colors, RadioButton, Text, View } from "react-native-ui-lib";
import { Wallet } from "../../store/wallet/Wallet";
import { getWalletStore } from "../../App";
import { HIcon } from "../icon";
import React from "react";
import Ripple from "react-native-material-ripple";
import { Dimensions } from "react-native";

export interface IWalletsListProps {
    totalBalance: string | number
    wallets: Array<Wallet>
    onPressWallet: (w: Wallet, i: number) => void | Promise<void>
    onBackPress?: () => void
    backIcon?: ICON_HEADER
}

const windowWidth = Dimensions.get('window').width;

export const SelectWallet: React.FC<IWalletsListProps> = ({
                                                              wallets,
                                                              totalBalance,
                                                              onPressWallet,
                                                              backIcon,
                                                              onBackPress
                                                          }) => {
    return <View flex bg-bg>
        <Header title={ t('walletScreen.allAddresses') } onBackPress={ onBackPress } icon={ backIcon }/>
        <View padding-16>
            <View row spread centerV>
                <View>
                    <Text black text32 robotoB>{ totalBalance }</Text>
                    <Text text-grey>{ t("walletScreen.totalBalanceTittle") }</Text>
                </View>
            </View>
        </View>
        <View padding-16>
            <Card>
                {
                    !!wallets && wallets.map((w: Wallet, i) => {
                        return <Ripple testID={ `selectWallet-${ w.address }` } key={ w.address }
                                       rippleColor={ Colors.primary }
                                       onPress={ () => onPressWallet(w, i) }
                        >
                            <View padding-10 paddingH-15 paddingR-20>
                                <View row centerV>
                                    <View flex-2>
                                        {
                                            <Avatar size={ 44 } backgroundColor={ Colors.greyLight }>
                                                <HIcon name={ "wallet" } size={ 20 } style={ { color: Colors.primary } }/>
                                            </Avatar>
                                        }
                                    </View>
                                    <View flex-6>
                                        <Text numberOfLines={ 1 } textM text16 black>{ w.formatAddress }</Text>
                                        <Text numberOfLines={ 1 } text14 robotoR textGrey>
                                            { w.formatTotalWalletFiatBalance }
                                        </Text>
                                    </View>
                                    <View flex-3 right>
                                        <RadioButton size={ 20 }
                                                     color={ getWalletStore().selectedWalletIndex !== i ? Colors.textGrey : Colors.primary }
                                                     selected={ getWalletStore().selectedWalletIndex === i }/>
                                    </View>

                                </View>
                                { i !== 0 && <View absR style={ {
                                    borderWidth: 1,
                                    borderColor: Colors.grey,
                                    width: windowWidth-106,
                                    borderBottomColor: "transparent"
                                } }/> }
                            </View></Ripple>
                    })
                }
            </Card>
        </View>
    </View>
}
