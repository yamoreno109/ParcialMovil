import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';

import BarraMedio from './components/BarraMedio';
import BarraInferior from './components/BarraInferior';
import BarraSuperior from "./components/BarraSuperior";
import AnimeData from './components/AnimeData';
import MangaData from './components/MangaData';
import FavoritosScreen from "./components/Favoritos";

const TabNav = createBottomTabNavigator();
const StackNav = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawler(){
    return(
        <Drawer.Navigator screenOptions={{
            drawerActiveTintColor: '#ee8121', 
            drawerInactiveTintColor: '#888', 
            drawerStyle: { backgroundColor: '#000' }, 
            headerStyle: { backgroundColor: '#1a1a1a' }, 
            headerTintColor: '#ee8121', 
            headerTitleStyle: { fontWeight: 'bold' }, 
        }}>
            <Drawer.Screen name= 'Inicio' component={MyTabs} options= {{title: 'AnimePulse' }}/>
            <Drawer.Screen name= 'Favoritos' component={FavoritosScreen}/>
        </Drawer.Navigator>
    )
}

function HomeStackScreen(){
    return(
        <StackNav.Navigator initialRouteName="Inicio" screenOptions={{
            tabBarActiveTintColor: '#ee8121', 
                tabBarInactiveTintColor: '#888', 
                tabBarStyle: { backgroundColor: '#000' }, 
                headerStyle: { backgroundColor: '#1a1a1a' }, 
                headerTintColor: '#ee8121', 
                headerTitleStyle: { fontWeight: 'bold' }, 
        }}>
            <StackNav.Screen 
            name ='InicioScreen' 
            component={BarraMedio} 
            options={{ headerShown: false
             }}/>
            <StackNav.Screen name ='AnimeData' component={AnimeData} 
            options = {{title : 'Información'}}/>
            <StackNav.Screen name ='MangaData' component={MangaData}
            options ={{title: 'Información'}}/>

        <StackNav.Screen name="FavoritosScreen" component={FavoritosScreen} />
            
        </StackNav.Navigator>
    )
}

function MyTabs (){
    return(
        <TabNav.Navigator 
        screenOptions={{
            tabBarActiveTintColor: '#ee8121',
                tabBarInactiveTintColor: '#888',  
                tabBarStyle: { backgroundColor: '#000' }, 
                headerStyle: { backgroundColor: '#1a1a1a' }, 
                headerTintColor: '#ee8121', 
                headerTitleStyle: { fontWeight: 'bold' }, 
                headerShown: false
        }}>
            <TabNav.Screen 
            name = 'Inicio' 
            component={HomeStackScreen} 
            options ={{
                tabBarLabel : 'Anime',
                tabBarIcon : ({color, size}) => <AntDesign name="user" size={24} color="#ee8121" />,
            }}>
            </TabNav.Screen>
            <TabNav.Screen name = 'Manga' 
            component={BarraSuperior}
            options ={{
                tabBarLabel : 'Manga',
                tabBarIcon : ({color, size}) => <AntDesign name="contacts" size={24} color="#ee8121" />
            }}></TabNav.Screen>
        </TabNav.Navigator>
    )
}

export default function Navigation(){
    return(
        <NavigationContainer>
            <MyDrawler/>
        </NavigationContainer>
    )
}