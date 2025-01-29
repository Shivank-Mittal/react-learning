import {RootState} from '../store'
import { useSelector } from 'react-redux'


export const useColor = () => {
    return useSelector((state: RootState) => state.ThemeReducer.color)
}
