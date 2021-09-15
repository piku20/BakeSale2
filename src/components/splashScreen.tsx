import {
    Animated,
    Dimensions,
    Easing,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, {FC, useEffect} from "react";

interface Props{};

const SplashScreen:FC<Props> = ()=>{
    
    const titleXPos: any = new Animated.Value(0);

    const animateTitle = (direction = 1)=>{
        const width = Dimensions.get('window').width -150;
        Animated.timing(titleXPos,{
            toValue: direction * (width/2),
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start(({finished})=>{
            if(finished){
                animateTitle(-1 * direction);
            }
        });
    };

    useEffect(() => {
        animateTitle();
        
    }, [])
    
    return(
        <Animated.View style={[{left: titleXPos}, styles.container]}>
            <Text style={styles.header}>Bakesale</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header:{
        fontSize: 40,
    },
});

export default SplashScreen;