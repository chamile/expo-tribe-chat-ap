import { Attachment } from '@/api-client/types';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface MessageAttachmentProps {
    attachments: Attachment[];
}

export const MessageAttachment: React.FC<MessageAttachmentProps> = ({ attachments }) => {
    if (!attachments || attachments.length === 0) return null;
    const imageAttachment = attachments.find(att => att.type === 'image');
    if (!imageAttachment) return null;
    const { url, width, height } = imageAttachment;
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: url }}
                style={[
                    styles.image,
                    width && height
                        ? { width: width / 2, height: height / 2 }
                        : { width: 200, height: 120 }
                ]}
                resizeMode="cover"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        alignItems: 'flex-start',
    },
    image: {
        borderRadius: 10,
        backgroundColor: '#eee',
        maxWidth: 300,
        maxHeight: 200,
    },
}); 