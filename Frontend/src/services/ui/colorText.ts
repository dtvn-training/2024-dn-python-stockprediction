export const setColorText = async (xText: number): Promise<string> => {
    let textColor = 'white'; // Default color for text
    
    // Set text color based on the value of 'xText'
    if (xText > 0) {
        textColor = 'green'; // Green color for positive numbers
    } else if (xText < 0) {
        textColor = 'red'; // Red color for negative numbers
    } else {
        textColor = 'yellow'; // Yellow color for zero
    }
    return textColor;
};
