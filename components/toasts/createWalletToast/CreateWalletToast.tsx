import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Avatar, Button, Card, Colors, Text, Toast, View } from "react-native-ui-lib";
import { useInstance } from "react-ioc";
import { WalletsScreenModel } from "../../../screens/wallets/WalletsScreenModel";
import { t } from "../../../i18n";
import { HIcon } from "../../icon";
import { TOAST_POSITION } from "../appToast/AppToast";
import { CircularProgress } from "../../progress/CircularProgress";
import { useNavigation } from "@react-navigation/native";
import { RootNavigation } from "../../../navigators";

export const CreateWalletToast = observer(() => {
    const view = useInstance(WalletsScreenModel)
    const nav = useNavigation()
    const [ isWalletsList, setIsWalletsList ] = useState(false)

    useEffect(() => {
        setIsWalletsList(!!(RootNavigation.getRootState().routes.find(r => r.name === "walletsList")))
    }, [ view.walletDialogs.pendingDialog.display ])

    return <Toast
        // zIndex={ 2147483647 }
        position={ "bottom" }
        visible={ view.walletDialogs.pendingDialog.display }
        backgroundColor={ Colors.transparent }
    >
        <View
            style={ { marginBottom: view.walletDialogs.pendingDialog.position === TOAST_POSITION.UNDER_TAB_BAR ? 65 : 10 } }>
            <Card padding-12 marginH-16>
                <View row centerV>
                    { !view.walletDialogs.pendingDialog.walletCreated ?
                        <CircularProgress indeterminate strokeWidth={ 2 } radius={ 18 }>
                            <Avatar backgroundColor={ Colors.rgba(Colors.warning, 0.07) } size={ 32 }>
                                <HIcon name={ "clock-arrows" } size={ 18 } color={ Colors.warning }/></Avatar>
                        </CircularProgress> :
                        <Avatar backgroundColor={ Colors.rgba(Colors.success, 0.07) } size={ 32 }>
                            <HIcon name={ "done" } size={ 19 } color={ Colors.success }/></Avatar> }
                    <Text marginL-8 robotoR> { !view.walletDialogs.pendingDialog.walletCreated ?
                        t("walletScreen.menuDialog.createWallet.createWalletMessage") :
                        t("walletScreen.menuDialog.createWallet.createWalletMessageDone")
                    } </Text>
                    <View flex right>
                        { view.walletDialogs.pendingDialog.walletCreated && !isWalletsList &&
                            <Button link label={ t("common.view") }
                                    onPress={ () => nav.navigate("walletsList", { animate: true }) }/> }
                    </View>
                </View>
            </Card>
        </View>
    </Toast>
})
