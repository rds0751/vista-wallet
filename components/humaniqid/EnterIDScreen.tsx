import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { Button, Colors, Text, TextField, TouchableOpacity, View } from "react-native-ui-lib";
import { provider, useInstance } from "react-ioc";
import { HIcon } from "../icon";
import { getProfileStore } from "../../App";
import { SUGGESTION_STEP } from "../../store/profile/ProfileStore";
import { t } from "../../i18n";
import { throttle } from "../../utils/general";
import { InteractionManager } from "react-native";
import CloseIcon from "../../assets/images/circle-xmark-solid.svg";
import { makeAutoObservable } from "mobx";
import { closeToast, setToast } from "../../utils/toast";


class EnterIDViewModel {

    constructor() {
        makeAutoObservable(this)
    }

    value = ""

    get inputValueError() {
        return this.value && this.value.length > 6
    }

    get inputValueErrorMessage() {
        return this.inputValueError ? t("humaniqID.form.error") : ""
    }
}

const EnterID = observer(() => {

    const view = useInstance(EnterIDViewModel)

    const inputRef = useRef()

    // @ts-ignore
    const thr = throttle(() => {
        InteractionManager.runAfterInteractions(() => {
            // @ts-ignore
            inputRef.current?.focus();
        })
    }, 300)

    useEffect(() => {
        try {
            // @ts-ignore
            inputRef?.current && thr()
        } catch (e) {
            console.log("ERROR", e)
        }
    }, [ inputRef?.current ])

    return <View flex>
        <TouchableOpacity testID={ 'backBtn' } padding-20 paddingB-0 left row centerV
                          onPress={ () => {
                              // @ts-ignore
                              getProfileStore().setFormStep(SUGGESTION_STEP.SUGGESTION)
                          } }>
            <HIcon name={ "arrow-left" } size={ 16 } color={ { color: Colors.black } }/>
        </TouchableOpacity>
        <View padding-16>
            <Text text16 robotoM>
                { t("humaniqID.form.tittle") }
            </Text>
        </View>
        <View paddingH-16>
            <TextField
                testID={ 'inputCode' }
                autoFocus
                multiline={ false }
                selectionColor={ Colors.primary }
                errorColor={ view.inputValueError ? Colors.error : Colors.textGrey }
                error={ view.inputValueErrorMessage }
                onChangeText={ (val) => {
                    view.value = val
                } }
                value={ view.value }
                ref={ inputRef }
                hideUnderline
                floatingPlaceholder
                rightButtonProps={ {
                    iconSource: CloseIcon,
                    style: {
                        alignSelf: "center",
                        marginRight: 15,
                    },
                    onPress: () => view.value = ""
                } }
                floatingPlaceholderStyle={ !view.value ? {
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
                placeholder={ t("humaniqID.form.label") }
                placeholderTextColor={ Colors.textGrey }
                style={ {
                    paddingRight: 50,
                    padding: 10,
                    borderRadius: 5,
                    borderColor: view.inputValueError ? Colors.error : Colors.primary
                } }
            />
        </View>
        { !view.inputValueError && <View paddingH-16 style={ { position: "relative" } }>
            <View style={ {
                position: "absolute",
                top: -20,
                left: 20
            } }
            >
                <Text textGrey text12>
                    { t("humaniqID.form.helper") }
                </Text>
            </View>
            <View style={ {
                position: "absolute",
                top: -20,
                right: 20
            } }>
                <Text primary robotoM>{ t("humaniqID.form.paste") }</Text>
            </View>
        </View>
        }
        <View flex bottom padding-16>
            <Button testID={ 'nextStep' } disabled={ view.inputValueError || !view.value }
                    style={ { width: "100%", borderRadius: 12 } }
                    label={ t("selectValueScreen.nextBtn") }
                    onPress={ () => {
                        // @ts-ignore
                        getProfileStore().setVerified(true)
                        // @ts-ignore
                        getProfileStore().setFormStep(SUGGESTION_STEP.VERIFICATION)
                        setToast(t("humaniqID.approved"))
                        closeToast()
                        setTimeout(() => {
                            // @ts-ignore
                            getProfileStore().setIsSuggested(true)
                        }, 3000)
                    } }
            />
        </View>
    </View>
})

export const EnterIDScreen = provider()(EnterID)
EnterIDScreen.register(EnterIDViewModel)