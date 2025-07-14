import { Reaction } from '@/api-client/types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MessageReactionsProps {
    reactions: Reaction[];
}

export const MessageReactions: React.FC<MessageReactionsProps> = ({ reactions }) => {
    if (!reactions || reactions.length === 0) return null;
    return (
        <View style={styles.reactionsRow}>
            {reactions.map((reaction) => (
                <View key={reaction.uuid} style={styles.reactionBubble}>
                    <Text style={styles.reactionText}>{reaction.value}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    reactionsRow: {
        flexDirection: 'row',
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    reactionBubble: {
        backgroundColor: '#e0e0e0',
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 5,
    },
    reactionText: {
        fontSize: 12,
        color: '#333',
    },
}); 