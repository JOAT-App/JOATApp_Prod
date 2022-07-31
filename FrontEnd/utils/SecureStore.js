import * as SecureStore from 'expo-secure-store';

export async function saveKey(key, value) {
    await SecureStore.setItemAsync(key, value);
    console.log('SecureStore - saveKey', key, value)
}

export async function getValueForKey(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        console.log('this is the token ?',result);
        return result
    } else {
        return null;
    }
}