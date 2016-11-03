import {AsyncStorage} from 'react-native'

export const HANDLE_THEME_CHANGE = 'HANDLE_THEME_CHANGE'
export const handleThemeChange = (value) => async (dispatch, getState) => {
  await AsyncStorage.setItem('storeTheme', value)

  dispatch({
    type: HANDLE_THEME_CHANGE,
  	data: {
      activeTheme: value,
      storeTheme: value
  	}
  })
}
