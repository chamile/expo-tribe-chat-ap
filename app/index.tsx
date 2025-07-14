import { MessageWithMeta } from '@/api-client/types';
import { useMessageStore } from '@/stores';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Mock participant info
const participantMap: Record<string, { name: string; avatar: string }> = {
    '1f12596f-cee6-4f3c-9495-de1a17623a6b': {
        name: 'Alice',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    '3e0c96f5-371b-4e58-bf3d-11f3e77e8f15': {
        name: 'Bob',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    // Add more mock participants as needed
};

function formatTime(timestamp: number) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function HomeScreen() {
    const { messages, loading, error, fetchMessages, postMessage } = useMessageStore();
    const [inputText, setInputText] = useState('');

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    useEffect(() => {
        if (messages.length > 0) {
            console.log('Messages in store:', JSON.stringify(messages, null, 2));
        }
    }, [messages]);

    useEffect(() => {
        if (loading) {
            console.log('Loading messages from API...');
        }
    }, [loading]);

    useEffect(() => {
        if (error) {
            console.log('Error loading messages:', error);
        }
    }, [error]);

    const handleSendMessage = async () => {
        if (inputText.trim()) {
            await postMessage(inputText);
            setInputText('');
        }
    };

    // For demo, treat messages as MessageWithMeta if possible
    const renderMessage = ({ item }: { item: MessageWithMeta }) => {
        const participant = participantMap[item.authorUuid] || {
            name: 'Unknown',
            avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
        };
        return (
            <View style={styles.messageWrapper}>
                <View style={styles.messageHeader}>
                    <Image source={{ uri: participant.avatar }} style={styles.avatar} />
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.participantName}>{participant.name}</Text>
                        <Text style={styles.timeText}>{formatTime(item.sentAt)}</Text>
                    </View>
                </View>
                <View style={styles.messageContainer}>
                    <Text style={styles.messageText}>{item.text}</Text>
                </View>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.header}>
                <Text style={styles.title}>TribeChat</Text>
                {loading && <Text style={styles.statusText}>Loading...</Text>}
                {error && <Text style={styles.errorText}>Error: {error}</Text>}
            </View>

            <FlatList
                data={messages as MessageWithMeta[]}
                renderItem={renderMessage}
                keyExtractor={(item) => item.uuid}
                style={styles.messagesList}
                contentContainerStyle={styles.messagesContent}
                showsVerticalScrollIndicator={false}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Type a message..."
                    placeholderTextColor="#999"
                    multiline
                    maxLength={500}
                />
                <TouchableOpacity
                    style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
                    onPress={handleSendMessage}
                    disabled={!inputText.trim()}
                >
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#007AFF',
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    statusText: {
        fontSize: 14,
        color: '#fff',
        marginTop: 5,
    },
    errorText: {
        fontSize: 14,
        color: '#ffcccb',
        marginTop: 5,
    },
    messagesList: {
        flex: 1,
    },
    messagesContent: {
        padding: 16,
        paddingBottom: 20,
    },
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
    inputContainer: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        alignItems: 'flex-end',
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginRight: 8,
        maxHeight: 100,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    sendButton: {
        backgroundColor: '#007AFF',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonDisabled: {
        backgroundColor: '#ccc',
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
}); 