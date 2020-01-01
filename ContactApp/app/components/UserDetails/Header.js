import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './styles';
import { capitalizeFirstLetter } from '../../helpers/string';

const Header = ({ picture, name }) => {
    const fullName = name.first.capitalizeFirstLetter() + " " + name.last.capitalizeFirstLetter();

    return (
        <View style={styles.headerContainer}>
            <Image
                source={{ uri: picture.large }}
                style={styles.image}
            />
            <Text style={styles.name}>{fullName}</Text>
        </View>
    );
};

export default Header;