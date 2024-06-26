const messages = {
    disconnect: [
        '[OLDB] Disconnected',
        '[OLDB] Come back soon'
    ],
    offline: [
        '[OLDB] No MQTT broker found at this Url'
    ],
    connect: [
        '[OLDB] Connected',
        '[OLDB] Waiting for Events'
    ],
    error: [
        '[MQTT] Connection error: '
    ]
}

export const useLogMessage = (key: keyof typeof messages) => messages[key].join('\n')
