import React from "react";
import { observer } from "mobx-react-lite";
import { Colors, Image, Text, View } from "react-native-ui-lib";
import { BrowserTab } from "../../../store/browser/BrowserStore";
import { getHost } from "../../../utils/browser";
import { DAPPS_CONFIG } from "../../../config/dapp";
import { Dimensions, StyleSheet } from "react-native";
import { t } from "../../../i18n";
import { HIcon } from "../../../components/icon";
import Ripple from "react-native-material-ripple"


export interface ITabsScreenProps {
  tabs: Array<BrowserTab>
  activeTab: BrowserTab
  switchToTab: (id: string) => any
  newTab: (url?: string) => any
  closeTab: (id: string) => any
  closeTabsView: () => any
  closeAllTabs: () => any
}

const margin = 15;
const width = Dimensions.get('window').width / 2 - margin * 2;
const height = Dimensions.get('window').height / 4


export const TabsScreen = observer<ITabsScreenProps>((props) => {

  return <View style={ { minHeight: "100%" } }>
    <View row padding-16 centerV>
      <Ripple rippleColor={ Colors.primary } style={ { padding: 10 } } onPress={ () => props.newTab() }>
        <HIcon name={ "plus" } size={ 18 }/>
      </Ripple>
      <Text numberOfLines={ 1 } text20 marginL-20 robotoM>
        { t("browserScreen.newTab") }
      </Text>
    </View>
    <View row padding-20 style={ { flexWrap: "wrap" } }>
      {
        props.tabs.map((tab, index) => {
          const hostname = getHost(tab.url);
          const isHomepage = hostname === getHost(DAPPS_CONFIG.HOMEPAGE_HOST);
          return <View key={ tab.id } style={ { overflow: "hidden", display: "flex", margin: 5, } }>
            <View
                style={ {
                  display: "flex",
                  borderRadius: 10,
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  overflow: 'hidden',
                  borderColor: Colors.grey,
                  borderWidth: 1,
                  width,
                  height,
                } }>
              <View row paddingL-10 spread centerV>
                <Text robotoM numberOfLines={ 1 }>{ isHomepage ? t("browserScreen.newTab") : hostname }</Text>
                <Ripple onPress={ () => props.closeTab(tab.id) } rippleColor={ Colors.primary }
                        style={ { padding: 10 } }><HIcon name={ "cross" }/></Ripple>
              </View>
              <Ripple style={ {
                width: width - 20,
                backgroundColor: Colors.white,
                flex: 1,
              } }
                      rippleColor={ Colors.primary }
                      onPress={ () => props.switchToTab(tab.id) }
              >
                <Image source={ { uri: tab.image } }
                       style={ {
                         ...StyleSheet.absoluteFillObject,
                         // width,
                         resizeMode: 'cover',
                       } }
                       resizeMode={ "cover" }
                />
              </Ripple>
            </View>
          </View>
        })
      }
    </View>
  </View>
})