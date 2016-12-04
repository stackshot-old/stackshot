import React, {PropTypes} from 'react'
import{
  View,
  Text
} from 'react-native'

const format = {
  'zh': ['不知道','水瓶座','双鱼座','牡羊座','金牛座','双子座','巨蟹座','狮子座','处女座','天秤座','天蝎座','射手座','魔羯座'],
  "en": ['Unclear','Aquarius','Pisces','Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn']
}

export default class Constellation extends React.Component {
  static defaultProps = {
    language: 'en',
    date: ''
  }

  checkDate = () => {
    const {language} = this.props
    const date = new Date(this.props.date)
    const month = date.getMonth() + 1
    const day = date.getDate()

    if(month === 1) return day >= 20 ? format[language][1] : format[language][12]

    if(month === 2) return day >= 19 ? format[language][2] : format[language][1]

    if(month === 3) return day >= 21 ? format[language][3] : format[language][2]

    if(month === 4) return day >= 21 ? format[language][4] : format[language][3]

    if(month === 5) return day >= 21 ? format[language][5] : format[language][4]

    if(month === 6) return day >= 22 ? format[language][6] : format[language][5]

    if(month === 7) return day >= 23 ? format[language][7] : format[language][6]

    if(month === 8) return day >= 23 ? format[language][8] : format[language][7]

    if(month === 9) return day >= 23 ? format[language][9] : format[language][8]

    if(month === 10) return day >= 23 ? format[language][10] : format[language][9]

    if(month === 11) return day >= 22 ? format[language][11] : format[language][10]

    if(month === 12) return day >= 22 ? format[language][12] : format[language][11]

    return format[language][0]
  }

  render() {
    const {date, language, style} = this.props
    return (
      <Text style={style}>{this.checkDate()}</Text>
    )
  }
}
