import { MessageWithMeta } from '@/api-client/types';
import { formatTime, participantMap } from '@/utils/util';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { MessageAttachment } from './MessageAttachment';
import { MessageReactions } from './MessageReactions';

interface ChatMessageProps {
    item: MessageWithMeta;
    index: number;
    messages: MessageWithMeta[];
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ item, index, messages }) => {
    const participant = participantMap[item.authorUuid] || {
        name: 'Unknown',
        avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
    };
    const isEdited = item.updatedAt > item.sentAt;
    const prevMessage = index > 0 ? messages[index - 1] : null;
    const showHeader = !prevMessage || prevMessage.authorUuid !== item.authorUuid;

    // Date separator logic
    const currentDate = new Date(item.sentAt);
    const prevDate = prevMessage ? new Date(prevMessage.sentAt) : null;
    const isNewDay =
        !prevDate ||
        currentDate.getFullYear() !== prevDate.getFullYear() ||
        currentDate.getMonth() !== prevDate.getMonth() ||
        currentDate.getDate() !== prevDate.getDate();

    return (
        <>
            {isNewDay && (
                <View style={styles.dateSeparator}>
                    <Text style={styles.dateSeparatorText}>
                        {currentDate.toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}
                    </Text>
                </View>
            )}
            <View style={styles.messageWrapper}>
                {showHeader && (
                    <View style={styles.messageHeader}>
                        <Image source={{ uri: participant.avatar }} style={styles.avatar} />
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.participantName}>{participant.name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.timeText}>{formatTime(item.sentAt)}</Text>
                                {isEdited && <Text style={styles.editedLabel}> (edited)</Text>}
                            </View>
                        </View>
                    </View>
                )}
                <View style={styles.messageContainer}>
                    <Text style={styles.messageText}>{item.text}</Text>
                    <MessageAttachment attachments={item.attachments} />
                </View>
                <MessageReactions reactions={item.reactions} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    messageWrapper: {
        marginBottom: 16,
    },
    messageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 10,
        backgroundColor: '#eee',
    },
    headerTextContainer: {
        flexDirection: 'column',
    },
    participantName: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#222',
    },
    timeText: {
        fontSize: 12,
        color: '#888',
    },
    editedLabel: {
        fontSize: 12,
        color: '#888',
        marginLeft: 4,
        fontStyle: 'italic',
    },
    messageContainer: {
        backgroundColor: '#fff',
        borderRadius: 18,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        maxWidth: '80%',
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
        lineHeight: 20,
        color: '#000',
    },
    dateSeparator: {
        alignItems: 'center',
        marginVertical: 12,
    },
    dateSeparatorText: {
        backgroundColor: '#e0e0e0',
        color: '#555',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        fontSize: 13,
        fontWeight: '500',
    },
}); 