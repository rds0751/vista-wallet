import { Colors, Dialog, LoaderScreen, Text, View } from "react-native-ui-lib"
import { runInAction } from "mobx"
import React from "react"
import { useInstance } from "react-ioc"
import { WalletMenuDialogViewModel } from "./WalletMenuDialogViewModel"
import { observer } from "mobx-react-lite"
import FAIcon from "react-native-vector-icons/FontAwesome5"
import Ripple from "react-native-material-ripple"
import { DialogHeader } from "../dialogHeader/DalogHeader"

export const WalletMenuDialog = observer(() => {
    const view = useInstance(WalletMenuDialogViewModel)

    return <Dialog
            width={ "100%" }
            containerStyle={ { backgroundColor: Colors.grey80, borderTopLeftRadius: 30, borderTopRightRadius: 30 } }
            onDismiss={ () => runInAction(() => view.display = false) }
            visible={ view.display }
            bottom
    >
        <View>
            <DialogHeader onPressIn={ () => view.display = false }/>
            { !view.pending &&
            <View marginB-20>
                { view.items.map(i => {
                    return <Ripple
                            key={ i.name }
                            rippleColor={ Colors.primary }
                            onPress={ i.action }
                    >
                        <View padding-20 row>
                            <FAIcon size={ 20 } color={ Colors.primary } name={ i.icon }/>
                            <Text marginL-20 text60R dark20>{ i.name }</Text>
                        </View>

                    </Ripple>
                }) }
            </View>
            }
            {
                view.pending &&
                <View marginH-30 marginV-10 height={ 200 }><LoaderScreen color={ Colors.grey20 }/></View>
            }
        </View>
    </Dialog>
})
