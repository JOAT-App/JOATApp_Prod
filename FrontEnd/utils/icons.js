import { MaterialCommunityIcons, MaterialIcons, FontAwesome, FontAwesome5, Entypo } from '@expo/vector-icons';
import React, {useState} from 'react'
const icons = new Map()
    .set(0,<MaterialCommunityIcons name="cards" size={40} color="#0F2441" />)
    .set(1,<MaterialIcons name="grass" size={30} color="black" />)
    .set(2,<FontAwesome name="graduation-cap" size={30} color="black" />)
    .set(3,<FontAwesome5 name="baby-carriage" size={30} color="black" />)
    .set(4,<FontAwesome5 name="truck-moving" size={30} color="black" />)
    .set(5,<Entypo name="dots-three-horizontal" size={30} color="black" />)
    .set(6,<MaterialCommunityIcons name="arm-flex" size={40} color="#0F2441"/>)
    .set('',<MaterialCommunityIcons name="axe" size={40} color="#0F2441"/>)

export function getIcon(type){
        return icons.get(type) || <> </>;
};
