import { Colors, Text, View } from "react-native-ui-lib";
import React from "react";
import Ripple from "react-native-material-ripple";
import { t as tr } from "../../i18n";

export const TransactionItem = ({ item, index, onPress }) => {
    return <Ripple testID={ 'transactionItem' } rippleColor={ Colors.primary }
                   onPress={ onPress }
    >
        <View backgroundColor={ Colors.white } key={ item.key }>
            <View row padding-8 paddingH-16>
                <View center>
                    {
                        item.statusIcon
                    }
                </View>
                <View paddingL-15>
                    <View>
                        <Text numberOfLines={ 1 } black text16 robotoR>{ item.title }</Text>
                    </View>
                    <View paddingT-5>
                        <Text textGrey text14 robotoR>{ item.formatDate }</Text>
                    </View>
                </View>
                <View right centerV flex-1>
                    <View>
                        <Text numberOfLines={ 1 } black text16 robotoR
                              color={ item.valueColor }>{ item.formatValue }</Text>
                    </View>
                    { item.action === 3 &&
                        <View paddingT-5>
                            <Text textGrey text14 robotoR>
                                { tr("transactionScreen.smartContract") }
                            </Text>
                        </View>
                    }
                </View>
            </View>
            {/* eslint-disable-next-line react-native/no-color-literals */ }
            { index !== 0 && <View absR style={ {
                borderWidth: 1,
                borderColor: Colors.grey,
                width: "83%",
                borderBottomColor: "transparent"
            } }/> }
        </View>
    </Ripple>
}
