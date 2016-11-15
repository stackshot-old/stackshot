import {AsyncStorage} from 'react-native'

export const HANDLE_THEME_CHANGE = 'HANDLE_THEME_CHANGE'
export const handleThemeChange = (data) => async (dispatch, getState) => {
  const {baseColor, themeColor} = data
  await AsyncStorage.setItem('storeTheme', JSON.stringify(data))

  dispatch({
    type: HANDLE_THEME_CHANGE,
  	data: {
      baseColor,
      themeColor,
  	}
  })
}
