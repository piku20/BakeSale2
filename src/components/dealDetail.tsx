import {
    Animated,
    Button,
    Dimensions,
    Image,
    Linking,
    PanResponder,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, {FC, useEffect, useRef, useState} from "react";

import { fetchDealDetail } from '../ajax';
import { priceDisplay } from './../util';

interface Props{
    initialDealData: object;
    onBack: ()=>void;
};

const DealDetail:FC<Props> = ({
    initialDealData,
    onBack,
}) => {
    
    const [deal, setDeal] = useState(initialDealData);
    const [imageIndex, setImageIndex] = useState <number>(0);

    const prevImageIndex = useRef();

    const imageXPos = new Animated.Value(0);
    const width = Dimensions.get('window').width;

    useEffect(async()=>{
        setDeal(await fetchDealDetail(deal.key));
    }, []);

    const openDealUrl = ()=> {
        Linking.openURL(deal.url);
    }

    const imagePanResponder = PanResponder.create({
        onStartShouldSetPanResponder: ()=> true,
        onPanResponderMove: (evt, gs) => {
            imageXPos.setValue(gs.dx);
        },
        onPanResponderRelease: (evt, gs) => {
            //const width = Dimensions.get('window').width;
            if(Math.abs(gs.dx) > width * 0.4){
                const direction = Math.sign(gs.dx);
                // -1 for left, 1 for right
                
                Animated.timing(imageXPos, {
                    toValue: direction * width,
                    duration: 250,
                    useNativeDriver: false,
                }).start(()=> handleSwipe(-1*direction));
            }else{
                Animated.spring(imageXPos, {
                    toValue: 0,
                    useNativeDriver: false,
                }).start();
            }
        },
    });

    const handleSwipe = (indexDirection: number)=> {
        if(!deal.media[imageIndex+indexDirection]){
            Animated.spring(imageXPos,{
                toValue: 0,
                useNativeDriver: false,
            }).start();
            return;
        }
        
        const prevIndex = prevImageIndex.current;
        setImageIndex(imageIndex + indexDirection);

        //Next image animation
        imageXPos.setValue(indexDirection * width);
        Animated.spring(imageXPos,{
            useNativeDriver:false,
            toValue:0,
        }).start();
    };
    
    return(
        <View style= {styles.deal}>
            <TouchableOpacity onPress={onBack}>
                <Text style= {styles.backLink}>Back</Text>
            </TouchableOpacity>
            <Animated.Image 
                {...imagePanResponder.panHandlers}
                source = {{uri: deal.media[imageIndex] }}
                style= {[{left: imageXPos}, styles.image]}
            />
            <View>
                <Text style= {styles.title}>{deal.title}</Text>
            </View>
            <ScrollView style= {styles.detail}>
                <View style= {styles.footer}>
                    <View style= {styles.info}>
                        <Text style= {styles.price}>{priceDisplay(deal.price)}</Text>
                        <Text style= {styles.cause}>{deal.cause.name}</Text>
                    </View>
                    {deal.user && (
                        <View style= {styles.user}>
                            <Image 
                                source = {{uri: deal.user.avatar}}
                                style= {styles.avatar}
                            />
                            <Text>{deal.user.name}</Text>
                        </View>
                    )}                    
                </View>
                <View style= {styles.description}>
                    <Text>{deal.description}</Text>
                </View>
                <Button title="Buy this deal!" onPress={openDealUrl} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    deal:{
        marginBottom:20,
    },
    backLink:{
        marginBottom: 5,
        color: '#22f',
        marginLeft: 10,
    },
    image:{
        width: '100%',
        height: 150,
        backgroundColor: '#ccc',
    },
    title:{
        fontSize: 16,
        padding:10,
        fontWeight: 'bold',
        backgroundColor: 'rgba(237, 149, 45, 0.4)',
    },
    footer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 15,
    },
    info:{
        alignItems: 'center',
    },
    user:{
        alignItems: 'center',
    },
    cause:{
        marginVertical: 10,
    },
    price:{
        fontWeight: 'bold',
    },
    avatar:{
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    description:{
        borderColor: '#ddd',
        borderWidth: 1,
        borderStyle: 'dotted',
        margin: 10,
        padding: 10,
    },
    detail:{},
});

export default DealDetail;