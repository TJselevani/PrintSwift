import React, { ReactNode } from 'react';
import { View } from 'react-native';

interface CardContainerProps {
    children: ReactNode; // Define the type for children
}

const CardContainer: React.FC<CardContainerProps> = ({ children }) => {
    return (
        <View className="bg-white rounded-lg shadow-lg p-4 mb-5">
            {children}
        </View>
    );
};

export default CardContainer;