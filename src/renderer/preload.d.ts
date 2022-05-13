declare global {
    interface Window {
        electron: {
            ipcRenderer: {
                on(
                    channel: string,
                    func: (...args: unknown[]) => void
                ): (() => void) | undefined
                once(channel: string, func: (...args: unknown[]) => void): void
            }
            quit: () => Promise<void>
            loadImages: () => Promise<string[]>
        };
    }
}

export {};
