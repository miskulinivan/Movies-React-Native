import { Dimensions } from 'react-native';

export default function useDimensions() {
    const { width, height } = Dimensions.get('window');

    return { height, width };
}
