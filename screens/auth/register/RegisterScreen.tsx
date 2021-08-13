import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Button, Colors, Image, Text, TouchableOpacity, View } from "react-native-ui-lib";
import { Screen } from "../../../components";
import { provider, useInstance } from "react-ioc";
import { REGISTER_STATE, RegisterViewModel } from "./RegisterViewModel";
import { t } from "../../../i18n";
import * as Animatable from "react-native-animatable";

const Register = observer(function() {
  const view = useInstance(RegisterViewModel);
  useEffect(() => {
    view.init();
  }, []);
  return (
    <View testID={ "RegisterScreen" } flex style={ { height: "100%" } }>
      { view.initialized && <Screen
        statusBar={ "light-content" }
        preset={ "fixed" }
        backgroundColor={ Colors.primary }
        statusBarBg={ Colors.primary }>
        { view.state === REGISTER_STATE.MAIN &&
        <Animatable.View animation={ "fadeIn" } style={ { height: "100%" } }>
          <View flex center>
            <View bottom flex>
              <Image width={ 200 } height={ 40 } source={ require("../../../assets/images/logo-brand-white.png") } />
            </View>
            <View bottom flex paddingB-20>
              <Button bg-violet10 marginB-20 onPress={ () => view.state = REGISTER_STATE.REGISTER }
                      label={ t("common.register") } />
              <TouchableOpacity>
                <View row center>
                  <Text text70 white>
                    { t("registerScreen.repareFromMnemonicOne") }
                  </Text>
                </View>
                <View row center>
                  <Text text70 white>
                    { t("registerScreen.repareFromMnemonicTwo") }
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Animatable.View>
        }
        { view.state === REGISTER_STATE.REGISTER &&
        <Animatable.View animation={ "fadeIn" } style={ { height: "100%" } }>
          <View flex center>
            <View top flex marginT-60>
              <Image width={ 120 } height={ 25 } source={ require("../../../assets/images/logo-brand-white.png") } />
            </View>
            <View flex paddingB-20>
              <Text>FFFF</Text>
            </View>
            <View flex bottom paddingB-20>
              <Button onPress={ () => view.state = REGISTER_STATE.MAIN } label={ t("common.back") } />
            </View>
          </View>
        </Animatable.View> }
      </Screen>
      }
    </View>
  );
});

export const RegisterScreen = provider()(Register);
RegisterScreen.register(RegisterViewModel);
