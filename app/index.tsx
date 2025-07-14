import { MessageWithMeta } from '@/api-client/types';
import { ChatInput } from '@/components/ChatInput';
import { ChatMessage } from '@/components/ChatMessage';
import { useMessageStore } from '@/stores';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
    const { messages, loading, error, fetchMessages, postMessage } = useMessageStore();
    const [inputText, setInputText] = useState('');
    const flatListRef = useRef<FlatList>(null);
    const [shouldScrollToEnd, setShouldScrollToEnd] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    useEffect(() => {
        if (messages.length > 0) {
            setShouldScrollToEnd(true);
        }
    }, [messages.length]);

    const handleSendMessage = async () => {
        if (inputText.trim()) {
            await postMessage(inputText);
            setInputText('');
        }
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
                ref={flatListRef}
                data={messages as MessageWithMeta[]}
                renderItem={({ item, index }) => (
                    <ChatMessage item={item} index={index} messages={messages as MessageWithMeta[]} />
                )}
                keyExtractor={(item) => item.uuid}
                style={styles.messagesList}
                contentContainerStyle={styles.messagesContent}
                showsVerticalScrollIndicator={false}
                onContentSizeChange={() => {
                    if (shouldScrollToEnd && flatListRef.current) {
                        flatListRef.current.scrollToEnd({ animated: false });
                        setShouldScrollToEnd(false);
                    }
                }}
            />
            <ChatInput
                inputText={inputText}
                setInputText={setInputText}
                onSend={handleSendMessage}
                loading={loading}
            />
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
}); 