import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAsync = async (key, value)=>{
  try{
    await AsyncStorage.setItem(key, value);
  } catch(e){
    console.log(e);
  }
}
export const getAsync = async(key)=>{
  try{
    const value = await AsyncStorage.getItem(key)
    console.log(value);
    return value != null ? JSON.parse(value) : null
  }catch(e){
    console.log(e);
  }
}
